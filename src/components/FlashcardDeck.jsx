import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, Edit3, RotateCw, Sparkles, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakChinese } from '../utils/audio';
import { getSRSData, updateCardReview } from '../utils/srs';
import { getLearningTipForWord } from '../data/learningTips';

export default function FlashcardDeck({ words, onOpenWriter, settings }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'review', 'unlearned'
  const [selectedLesson, setSelectedLesson] = useState('all');
  const [deck, setDeck] = useState([]);
  const [srsMap, setSrsMap] = useState({});

  const availableLessons = useMemo(() => {
    return [...new Set(words.map(w => w.lesson_number).filter(Boolean))].sort((a, b) => a - b);
  }, [words]);

  useEffect(() => {
    const srs = getSRSData();
    setSrsMap(srs);

    let filtered = [...words];

    // Filter by lesson if selected
    if (selectedLesson !== 'all') {
      filtered = filtered.filter(w => w.lesson_number === Number(selectedLesson));
    }

    const now = Date.now();
    if (filterMode === 'review') {
      const reviewWords = filtered.filter(w => {
        const item = srs[w.id];
        return item && item.dueDate <= now;
      });
      filtered = reviewWords.length > 0 ? reviewWords : filtered;
    } else if (filterMode === 'unlearned') {
      const unlearnedWords = filtered.filter(w => !srs[w.id]);
      filtered = unlearnedWords.length > 0 ? unlearnedWords : filtered;
    }

    setDeck(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [words, filterMode, selectedLesson]);

  const currentWord = deck[currentIndex];
  const learningTip = getLearningTipForWord(currentWord);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && currentWord) {
      speakChinese(currentWord.hanzi, settings?.speechRate || 0.65);
    }
  };

  const handleSpeech = (e, slow = false) => {
    e.stopPropagation();
    if (currentWord) {
      speakChinese(currentWord.hanzi, slow ? 0.45 : (settings?.speechRate || 0.65));
    }
  };

  const handleWriting = (e) => {
    e.stopPropagation();
    if (currentWord && onOpenWriter) {
      onOpenWriter(currentWord);
    }
  };

  const handleRate = (rating) => {
    if (!currentWord) return;

    updateCardReview(currentWord.id, rating);
    const updated = getSRSData();
    setSrsMap(updated);

    if (currentIndex + 1 >= deck.length) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      setCurrentIndex(0);
      setIsFlipped(false);
    } else {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 150);
    }
  };

  if (!currentWord) {
    return (
      <div className="text-center py-12 bg-[#FDFCF9] rounded-3xl p-6 border border-[#E8E2D5] shadow-paper">
        <Sparkles className="w-12 h-12 text-amberseal-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-ink-900">Bạn đã hoàn thành lượt ôn này rồi!</h3>
        <p className="text-sm text-ink-400 mt-1">Nghỉ ngơi uống ngụm trà hoặc chọn chế độ 'Tất cả' để xem tiếp nhé.</p>
        <button
          onClick={() => setFilterMode('all')}
          className="mt-4 px-6 py-3 bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm rounded-2xl shadow-sm transition-all"
        >
          Xem lại tất cả thẻ
        </button>
      </div>
    );
  }

  const renderFrontHanzi = (hanzi) => {
    if (!hanzi) return null;
    const chars = hanzi.split('');

    if (chars.length === 1) {
      return (
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl border-2 border-dashed border-cinnabar-300 tianzige-grid flex items-center justify-center shadow-inner">
          <span className="text-5xl sm:text-6xl font-hanzi font-bold text-ink-900 leading-none select-none">
            {chars[0]}
          </span>
        </div>
      );
    }

    if (chars.length === 2) {
      return (
        <div className="flex items-center justify-center gap-2.5 sm:gap-3">
          {chars.map((c, i) => (
            <div
              key={i}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-dashed border-cinnabar-300 tianzige-grid flex items-center justify-center shadow-inner"
            >
              <span className="text-4xl sm:text-5xl font-hanzi font-bold text-ink-900 leading-none select-none">
                {c}
              </span>
            </div>
          ))}
        </div>
      );
    }

    if (chars.length === 3) {
      return (
        <div className="flex items-center justify-center gap-2">
          {chars.map((c, i) => (
            <div
              key={i}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-dashed border-cinnabar-300 tianzige-grid flex items-center justify-center shadow-inner"
            >
              <span className="text-3xl sm:text-4xl font-hanzi font-bold text-ink-900 leading-none select-none">
                {c}
              </span>
            </div>
          ))}
        </div>
      );
    }

    // 4 or more characters
    return (
      <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-sm">
        {chars.map((c, i) => (
          <div
            key={i}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl border border-dashed border-cinnabar-300 tianzige-grid flex items-center justify-center shadow-inner"
          >
            <span className="text-2xl sm:text-3xl font-hanzi font-bold text-ink-900 leading-none select-none">
              {c}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const srsInfo = srsMap[currentWord.id];

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Top Filter, Lesson Dropdown & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-sm font-semibold text-ink-600">
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex gap-1 bg-[#F2ECE1] p-1 rounded-xl border border-[#E0D7C7]">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                filterMode === 'all' ? 'bg-[#FDFCF9] text-ink-900 shadow-sm font-bold' : 'text-ink-600'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterMode('review')}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                filterMode === 'review' ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-bold' : 'text-ink-600'
              }`}
            >
              Cần ôn
            </button>
          </div>

          {/* Lesson Selector Dropdown */}
          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            className="text-xs font-bold bg-[#FDFCF9] text-cinnabar-700 border border-[#D5C9B5] px-2.5 py-1.5 rounded-xl shadow-xs focus:outline-none cursor-pointer"
          >
            <option value="all">Tất cả bài ({words.length} từ)</option>
            {availableLessons.map(num => {
              const count = words.filter(w => w.lesson_number === num).length;
              return (
                <option key={num} value={num}>
                  Bài {num} ({count} từ)
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex items-center gap-1 font-bold text-ink-700 text-sm">
          <span>{currentIndex + 1}</span>
          <span className="text-ink-300">/</span>
          <span>{deck.length}</span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-[#E8E2D5] h-2 rounded-full overflow-hidden mb-4">
        <div
          className="bg-cinnabar-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
        />
      </div>

      {/* Large Physical-feeling Flashcard */}
      <div
        onClick={handleFlip}
        className="w-full min-h-[440px] bg-[#FDFCF9] rounded-3xl border-2 border-[#D5C9B5] shadow-paper hover:shadow-paper-hover p-6 flex flex-col justify-between cursor-pointer relative select-none transition-all duration-200 active:scale-[0.99]"
      >
        {/* Top Card Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="stamp-seal text-xs px-2.5 py-0.5">
              {currentWord.level?.toUpperCase()}
            </span>
            {currentWord.lesson_number && (
              <span className="text-xs font-bold text-amberseal-800 bg-[#FAF2E6] border border-[#EEDBBA] px-2 py-0.5 rounded-md">
                Bài {currentWord.lesson_number}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWriting}
              className="p-2.5 rounded-xl text-ink-600 hover:text-cinnabar-600 hover:bg-[#F2ECE1] transition-colors"
              title="Luyện viết chữ Hán từng nét"
            >
              <Edit3 size={20} />
            </button>
            <button
              onClick={(e) => handleSpeech(e, false)}
              className="p-2.5 rounded-xl text-cinnabar-600 hover:bg-cinnabar-50 transition-colors"
              title="Nghe phát âm chuẩn"
            >
              <Volume2 size={20} />
            </button>
          </div>
        </div>

        {/* Center Content */}
        {!isFlipped ? (
          /* FRONT SIDE - AUTHENTIC TIANZIGE GRID BOXES (HORIZONTAL, NEVER OVERFLOW) */
          <div className="my-auto text-center py-4">
            <div className="relative mb-4 flex items-center justify-center">
              {renderFrontHanzi(currentWord.hanzi)}
            </div>

            {settings?.showPinyin && (
              <div className="text-xl sm:text-2xl font-bold text-cinnabar-600 tracking-wide mb-1">
                {currentWord.pinyin}
              </div>
            )}

            <div className="text-xs text-ink-400 font-medium flex items-center justify-center gap-1.5 mt-3">
              <RotateCw size={14} className="text-ink-400" />
              <span>Chạm để lật thẻ</span>
            </div>
          </div>
        ) : (
          /* BACK SIDE - RICH DETAILS & PEDAGOGICAL TIPS */
          <div className="my-auto text-center py-2 animate-fade-in space-y-3">
            {/* Main Character Header */}
            <div className={`font-hanzi font-bold text-ink-900 tracking-wide whitespace-nowrap ${
              currentWord.hanzi.length > 3 ? 'text-2xl sm:text-3xl' : currentWord.hanzi.length > 2 ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'
            }`}>
              {currentWord.hanzi}
            </div>

            {/* Pinyin with large clear tone marks */}
            <div className="text-lg sm:text-xl font-bold text-cinnabar-600 tracking-wide flex items-center justify-center gap-2">
              <span>{currentWord.pinyin}</span>
              <button
                onClick={(e) => handleSpeech(e, true)}
                className="text-xs text-cinnabar-700 bg-cinnabar-50 border border-cinnabar-200 px-2.5 py-0.5 rounded-lg hover:bg-cinnabar-100 transition-colors"
                title="Nghe chậm phát âm"
              >
                🐢 0.45x
              </button>
            </div>

            {/* Sino-Vietnamese (Hán Việt) */}
            {settings?.showHanViet && (
              <div className="inline-block bg-[#FAF2E6] text-amberseal-800 text-xs sm:text-sm font-semibold px-3 py-0.5 rounded-full border border-[#EEDBBA]">
                Âm Hán Việt: <span className="font-bold">{currentWord.han_viet}</span>
              </div>
            )}

            {/* Vietnamese Meaning - Standard emphasis */}
            <div className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight py-0.5 px-2">
              "{currentWord.vietnamese}"
            </div>

            {/* MNEMONICS & CHARACTER BREAKDOWN (Chiết tự & Mẹo nhớ chữ) */}
            {learningTip && (
              <div className="bg-[#FAF8F2] border border-[#E8E0D0] p-3 sm:p-3.5 rounded-2xl text-left space-y-1">
                <div className="flex items-center gap-2 font-bold text-amberseal-900 text-xs sm:text-sm">
                  <Lightbulb size={15} className="text-amberseal-600 fill-amberseal-500 flex-shrink-0" />
                  <span>Chiết tự: {learningTip.breakdown}</span>
                </div>
                <div className="text-ink-800 leading-relaxed text-xs sm:text-sm pl-5 font-normal">
                  {learningTip.story}
                </div>
              </div>
            )}

            {/* Example sentence */}
            {currentWord.example && (
              <div className="bg-[#F9F6F0] border border-[#E8E2D5] p-3 sm:p-3.5 rounded-2xl text-left space-y-1">
                <div className="font-semibold text-ink-900 flex items-center justify-between gap-2">
                  <span className="font-hanzi font-bold text-base sm:text-lg text-ink-900 leading-snug">{currentWord.example.cn}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakChinese(currentWord.example.cn, 0.65);
                    }}
                    className="text-cinnabar-600 hover:text-cinnabar-700 p-1.5 rounded-lg hover:bg-cinnabar-50 flex-shrink-0"
                    title="Nghe câu ví dụ"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
                <div className="text-cinnabar-700 text-xs sm:text-sm font-semibold">{currentWord.example.pinyin}</div>
                <div className="text-ink-700 text-xs sm:text-sm font-medium">{currentWord.example.vi}</div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Hint */}
        <div className="text-center text-xs text-ink-400 border-t border-[#E8E2D5] pt-3 flex items-center justify-between">
          <span>{srsInfo ? `Đã ôn ${srsInfo.repetitions} lần` : 'Chưa ôn lần nào'}</span>
          <span className="font-medium text-cinnabar-600">Chạm để lật thẻ ↺</span>
        </div>
      </div>

      {/* SRS Rating Actions */}
      {isFlipped ? (
        <div className="grid grid-cols-4 gap-2 mt-4 animate-fade-in">
          <button
            onClick={() => handleRate(1)}
            className="flex flex-col items-center py-3 px-1 rounded-2xl bg-[#FCF3F2] hover:bg-[#F8E4E2] text-cinnabar-700 border border-[#F1CCC8] active:scale-95 transition-all"
          >
            <span className="text-xs font-extrabold">Chưa nhớ</span>
            <span className="text-[10px] text-cinnabar-500 mt-0.5">1 ngày</span>
          </button>
          <button
            onClick={() => handleRate(2)}
            className="flex flex-col items-center py-3 px-1 rounded-2xl bg-[#FAF2E6] hover:bg-[#F5E7D0] text-amberseal-700 border border-[#EEDBBA] active:scale-95 transition-all"
          >
            <span className="text-xs font-extrabold">Hơi khó</span>
            <span className="text-[10px] text-amberseal-600 mt-0.5">2 ngày</span>
          </button>
          <button
            onClick={() => handleRate(3)}
            className="flex flex-col items-center py-3 px-1 rounded-2xl bg-[#F2F7F5] hover:bg-[#DFECE7] text-jade-700 border border-[#C5DDD5] active:scale-95 transition-all"
          >
            <span className="text-xs font-extrabold">Nhớ tốt</span>
            <span className="text-[10px] text-jade-600 mt-0.5">4 ngày</span>
          </button>
          <button
            onClick={() => handleRate(4)}
            className="flex flex-col items-center py-3 px-1 rounded-2xl bg-[#F0F4F8] hover:bg-[#E2EAF1] text-slate-700 border border-[#CCD8E4] active:scale-95 transition-all"
          >
            <span className="text-xs font-extrabold">Đã thuộc</span>
            <span className="text-[10px] text-slate-500 mt-0.5">7 ngày</span>
          </button>
        </div>
      ) : (
        <div className="flex gap-2.5 mt-4">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="p-3.5 rounded-2xl bg-[#FDFCF9] border border-[#D5C9B5] text-ink-600 disabled:opacity-30 disabled:pointer-events-none hover:bg-paper-200 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleFlip}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <RotateCw size={16} />
            <span>Lật thẻ</span>
          </button>
          <button
            onClick={() => setCurrentIndex(prev => Math.min(deck.length - 1, prev + 1))}
            disabled={currentIndex === deck.length - 1}
            className="p-3.5 rounded-2xl bg-[#FDFCF9] border border-[#D5C9B5] text-ink-600 disabled:opacity-30 disabled:pointer-events-none hover:bg-paper-200 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
