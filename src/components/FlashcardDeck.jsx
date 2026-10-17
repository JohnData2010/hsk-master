import React, { useState, useEffect } from 'react';
import { Volume2, Edit3, RotateCw, Sparkles, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakChinese } from '../utils/audio';
import { getSRSData, updateCardReview } from '../utils/srs';
import { getLearningTipForWord } from '../data/learningTips';

export default function FlashcardDeck({ words, onOpenWriter, settings }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'review', 'unlearned'
  const [deck, setDeck] = useState([]);
  const [srsMap, setSrsMap] = useState({});

  useEffect(() => {
    const srs = getSRSData();
    setSrsMap(srs);

    let filtered = [...words];
    const now = Date.now();

    if (filterMode === 'review') {
      filtered = words.filter(w => {
        const item = srs[w.id];
        return item && item.dueDate <= now;
      });
      if (filtered.length === 0) filtered = [...words];
    } else if (filterMode === 'unlearned') {
      filtered = words.filter(w => !srs[w.id]);
      if (filtered.length === 0) filtered = [...words];
    }

    setDeck(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [words, filterMode]);

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

  const srsInfo = srsMap[currentWord.id];

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Top Filter & Counter */}
      <div className="flex items-center justify-between mb-3 text-sm font-semibold text-ink-400">
        <div className="flex gap-1 bg-[#F2ECE1] p-1 rounded-xl border border-[#E0D7C7]">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-lg text-xs transition-all ${
              filterMode === 'all' ? 'bg-[#FDFCF9] text-ink-900 shadow-sm font-bold' : 'text-ink-600'
            }`}
          >
            Tất cả ({words.length})
          </button>
          <button
            onClick={() => setFilterMode('review')}
            className={`px-3 py-1 rounded-lg text-xs transition-all ${
              filterMode === 'review' ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-bold' : 'text-ink-600'
            }`}
          >
            Cần ôn lại
          </button>
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

      {/* Large Physical-feeling Flashcard (Standard Size like xue-hanzi & Pleco) */}
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
              <span className="text-[11px] font-bold text-amberseal-800 bg-[#FAF2E6] border border-[#EEDBBA] px-2 py-0.5 rounded-md">
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
          /* FRONT SIDE - BIG BOLD CHARACTERS (text-7xl / text-8xl like xue-hanzi) */
          <div className="my-auto text-center py-6">
            <div className="relative inline-block mb-3">
              <div className="w-44 h-44 mx-auto rounded-3xl border-2 border-dashed border-cinnabar-300 tianzige-grid flex items-center justify-center shadow-inner">
                <span className="text-7xl sm:text-8xl font-hanzi font-bold text-ink-900 tracking-wider">
                  {currentWord.hanzi}
                </span>
              </div>
            </div>

            {settings?.showPinyin && (
              <div className="text-2xl font-bold text-cinnabar-600 tracking-wide mb-1">
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
          <div className="my-auto text-center py-2 animate-fade-in space-y-3.5">
            {/* Main Character Header */}
            <div className="text-5xl sm:text-6xl font-hanzi font-bold text-ink-900 tracking-wide">
              {currentWord.hanzi}
            </div>

            {/* Pinyin with large clear tone marks */}
            <div className="text-2xl font-bold text-cinnabar-600 tracking-wide flex items-center justify-center gap-2.5">
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
              <div className="inline-block bg-[#FAF2E6] text-amberseal-800 text-xs sm:text-sm font-semibold px-3.5 py-1 rounded-full border border-[#EEDBBA]">
                Âm Hán Việt: <span className="font-bold">{currentWord.han_viet}</span>
              </div>
            )}

            {/* Vietnamese Meaning - Large font */}
            <div className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight py-1 px-2">
              "{currentWord.vietnamese}"
            </div>

            {/* MNEMONICS & CHARACTER BREAKDOWN (Chiết tự & Mẹo nhớ chữ) */}
            {learningTip && (
              <div className="bg-[#FAF8F2] border border-[#E8E0D0] p-4 rounded-2xl text-left space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amberseal-800 text-xs sm:text-sm">
                  <Lightbulb size={15} className="text-amberseal-600 fill-amberseal-500 flex-shrink-0" />
                  <span>Chiết tự: {learningTip.breakdown}</span>
                </div>
                <div className="text-ink-700 leading-relaxed text-xs sm:text-sm pl-5">
                  📖 {learningTip.story}
                </div>
              </div>
            )}

            {/* Example sentence */}
            {currentWord.example && (
              <div className="bg-[#F9F6F0] border border-[#E8E2D5] p-4 rounded-2xl text-left space-y-1.5">
                <div className="font-semibold text-ink-900 flex items-center justify-between">
                  <span className="font-hanzi font-bold text-lg text-ink-900">{currentWord.example.cn}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakChinese(currentWord.example.cn, 0.65);
                    }}
                    className="text-cinnabar-600 hover:text-cinnabar-700 p-1.5 rounded-lg hover:bg-cinnabar-50"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
                <div className="text-cinnabar-700 text-sm font-semibold">{currentWord.example.pinyin}</div>
                <div className="text-ink-700 text-sm">{currentWord.example.vi}</div>
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
