import React, { useState, useEffect, useRef, useMemo } from 'react';
import HanziWriter from 'hanzi-writer';
import { Play, Edit3, Volume2, CheckCircle2, RotateCcw, Lightbulb, Search, BookOpen, Sparkles, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakChinese, playSoundEffect } from '../utils/audio';
import { BASIC_STROKES, STROKE_RULES } from '../data/pinyinData';
import { getLearningTipForWord } from '../data/learningTips';

export default function WritingStudioView({ words = [], onOpenWriter }) {
  const [activeTab, setActiveTab] = useState('practice'); // 'practice', 'stroke_rules'
  const [selectedWord, setSelectedWord] = useState(words[0] || { hanzi: '你', pinyin: 'nǐ', han_viet: 'Nễ', vietnamese: 'Bạn, anh, chị' });
  const [selectedLesson, setSelectedLesson] = useState('all');
  const [charIndex, setCharIndex] = useState(0);
  const [wordFilter, setWordFilter] = useState('');

  // Extract unique lesson numbers
  const availableLessons = useMemo(() => {
    return [...new Set(words.map(w => w.lesson_number).filter(Boolean))].sort((a, b) => a - b);
  }, [words]);

  // Filter words by selected lesson and search query
  const filteredWords = useMemo(() => {
    let list = words;
    if (selectedLesson !== 'all') {
      list = list.filter(w => w.lesson_number === Number(selectedLesson));
    }
    if (wordFilter.trim()) {
      const q = wordFilter.trim().toLowerCase();
      list = list.filter(w =>
        (w.hanzi && w.hanzi.includes(q)) ||
        (w.pinyin && w.pinyin.toLowerCase().includes(q)) ||
        (w.vietnamese && w.vietnamese.toLowerCase().includes(q))
      );
    }
    return list;
  }, [words, selectedLesson, wordFilter]);

  // Sync selected word whenever the user changes level in Navbar
  useEffect(() => {
    if (words && words.length > 0) {
      setSelectedWord(words[0]);
      setCharIndex(0);
      setWordFilter('');
      setSelectedLesson('all');
    }
  }, [words]);

  // When filteredWords changes, keep selectedWord if it exists, otherwise select the first word
  useEffect(() => {
    if (filteredWords.length > 0) {
      const exists = filteredWords.some(w => w.hanzi === selectedWord?.hanzi);
      if (!exists) {
        setSelectedWord(filteredWords[0]);
        setCharIndex(0);
      }
    }
  }, [filteredWords]);

  const containerRef = useRef(null);
  const writerRef = useRef(null);
  const [mode, setMode] = useState('quiz'); // 'animate' or 'quiz'
  const [mistakeCount, setMistakeCount] = useState(0);
  const [correctStrokes, setCorrectStrokes] = useState(0);
  const [quizStatus, setQuizStatus] = useState('writing');
  const [quizScore, setQuizScore] = useState(null);

  const chars = (selectedWord?.hanzi || '你').split('');
  const currentChar = chars[charIndex] || chars[0] || '你';
  const tip = getLearningTipForWord(selectedWord);

  useEffect(() => {
    if (!containerRef.current || !currentChar) return;

    containerRef.current.innerHTML = '';
    setMistakeCount(0);
    setCorrectStrokes(0);
    setQuizScore(null);

    try {
      // Large comfortable canvas for mobile finger writing
      const size = Math.min(280, window.innerWidth - 48);
      const writer = HanziWriter.create(containerRef.current, currentChar, {
        width: size,
        height: size,
        padding: 18,
        showOutline: true,
        strokeAnimationSpeed: 0.9,
        delayBetweenStrokes: 260,
        strokeColor: '#C24138',
        outlineColor: '#D5C9B5',
        highlightColor: '#2E6F62',
        drawingColor: '#141813',
        drawingWidth: 15,
        showCharacter: mode === 'animate',
      });

      writerRef.current = writer;

      if (mode === 'animate') {
        writer.animateCharacter();
        setQuizStatus('animating');
      } else {
        startInteractiveQuiz(writer);
      }
    } catch (e) {
      console.error('HanziWriter init error:', e);
    }

    return () => {
      if (writerRef.current) {
        try { writerRef.current.cancelQuiz(); } catch (e) {}
      }
    };
  }, [currentChar, mode]);

  const startInteractiveQuiz = (writer) => {
    setQuizStatus('writing');
    writer.quiz({
      onCorrectStroke: () => {
        playSoundEffect('correct');
        setCorrectStrokes(prev => prev + 1);
        setQuizStatus('correct_stroke');
      },
      onMistake: (strokeData) => {
        playSoundEffect('wrong');
        setMistakeCount(prev => prev + 1);
        setQuizStatus('mistake');
      },
      onComplete: (summaryData) => {
        playSoundEffect('level_up');
        confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
        setQuizStatus('complete');
        const score = Math.max(60, 100 - (summaryData.totalMistakes || 0) * 15);
        setQuizScore(score);
      }
    });
  };

  const handleShowAnimation = () => {
    setMode('animate');
    if (writerRef.current) {
      writerRef.current.showCharacter();
      writerRef.current.animateCharacter();
    }
  };

  const handleStartSelfWriting = () => {
    setMode('quiz');
    if (writerRef.current) {
      writerRef.current.hideCharacter();
      startInteractiveQuiz(writerRef.current);
    }
  };

  const handleGiveHint = () => {
    if (writerRef.current && mode === 'quiz') {
      writerRef.current.showOutline();
      writerRef.current.animateStroke(correctStrokes);
    }
  };

  const handleSelectWord = (w) => {
    setSelectedWord(w);
    setCharIndex(0);
  };

  const currentWordIndex = filteredWords.findIndex(w => w.hanzi === selectedWord?.hanzi);

  const handlePrevWord = () => {
    if (currentWordIndex > 0) {
      setSelectedWord(filteredWords[currentWordIndex - 1]);
      setCharIndex(0);
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex >= 0 && currentWordIndex < filteredWords.length - 1) {
      setSelectedWord(filteredWords[currentWordIndex + 1]);
      setCharIndex(0);
    }
  };

  const hanziLen = (selectedWord?.hanzi || '').length;
  const hanziSizeClass = hanziLen >= 4
    ? 'text-3xl sm:text-4xl'
    : hanziLen === 3
      ? 'text-4xl sm:text-5xl'
      : 'text-5xl sm:text-6xl';

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Header */}
      <div className="p-4 rounded-3xl bg-[#FDFCF9] border border-[#E8E2D5] shadow-paper mb-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-cinnabar-50 text-cinnabar-600 border border-cinnabar-200 flex items-center justify-center font-bold text-xl flex-shrink-0">
          笔
        </div>
        <div>
          <h2 className="text-base font-extrabold text-ink-900">Phòng Luyện Viết Bút Thuận</h2>
          <p className="text-xs text-ink-400 mt-0.5 leading-snug">
            Tập viết từng nét chữ Hán trên ô Mễ, hệ thống tự động kiểm tra đúng nét hay sai chiều.
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex bg-[#F2ECE1] p-1 rounded-2xl mb-4 text-xs font-bold border border-[#E0D7C7]">
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'practice'
              ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold text-sm'
              : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          ✍️ Tập Viết & Kiểm Tra Nét
        </button>
        <button
          onClick={() => setActiveTab('stroke_rules')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'stroke_rules'
              ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold text-sm'
              : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          📜 8 Nét Cơ Bản & Quy Tắc
        </button>
      </div>

      {activeTab === 'practice' && (
        <div className="space-y-4 animate-fade-in">
          {/* Word Selector Bar with Lesson Filter */}
          <div className="bg-[#FDFCF9] rounded-3xl p-3.5 border-2 border-[#E8E2D5] shadow-paper space-y-2.5">
            {/* Top Lesson Selector and Count */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-ink-700">Lọc theo bài:</span>
                <select
                  value={selectedLesson}
                  onChange={(e) => setSelectedLesson(e.target.value)}
                  className="text-xs font-bold bg-[#FAF2E6] text-amberseal-900 border border-[#EEDBBA] px-2.5 py-1.5 rounded-xl shadow-xs focus:outline-none cursor-pointer"
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
              <span className="text-xs font-bold text-cinnabar-600 bg-cinnabar-50 border border-cinnabar-200 px-2.5 py-1 rounded-xl">
                {filteredWords.length} từ
              </span>
            </div>

            {/* Quick search input */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                value={wordFilter}
                onChange={(e) => setWordFilter(e.target.value)}
                placeholder="Lọc từ nhanh: gõ chữ Hán, Pinyin hoặc nghĩa..."
                className="w-full pl-8 pr-8 py-1.5 rounded-xl bg-[#F9F6F0] border border-[#D5C9B5] text-xs font-medium text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-1 focus:ring-cinnabar-500"
              />
              {wordFilter && (
                <button
                  onClick={() => setWordFilter('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-ink-400 hover:text-ink-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Horizontal word pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {filteredWords.map((w, idx) => (
                <button
                  key={w.id || idx}
                  onClick={() => handleSelectWord(w)}
                  className={`px-3.5 py-1.5 rounded-xl font-hanzi font-bold text-base whitespace-nowrap transition-all border ${
                    selectedWord?.hanzi === w.hanzi
                      ? 'bg-cinnabar-500 text-white border-cinnabar-600 shadow-sm scale-105'
                      : 'bg-[#F9F6F0] text-ink-800 border-[#E8E2D5] hover:border-cinnabar-300'
                  }`}
                  title={`${w.pinyin} - ${w.vietnamese}`}
                >
                  {w.hanzi}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas & Word Information Card */}
          <div className="bg-[#FDFCF9] rounded-3xl p-5 sm:p-6 border-2 border-[#E8E2D5] shadow-paper text-center space-y-3.5">
            {/* Word metadata with responsive font scaling and no wrapping */}
            <div>
              <div className="flex items-center justify-center gap-3">
                <span className={`${hanziSizeClass} font-extrabold font-hanzi text-ink-900 tracking-wide whitespace-nowrap`}>
                  {selectedWord?.hanzi || ''}
                </span>
                <button
                  onClick={() => speakChinese(selectedWord?.hanzi || '', 0.55)}
                  className="p-2.5 rounded-full bg-cinnabar-50 text-cinnabar-600 hover:bg-cinnabar-100 transition-colors"
                  title="Nghe phát âm thật chậm"
                >
                  <Volume2 size={22} />
                </button>
              </div>
              <div className="text-2xl font-bold text-cinnabar-600 mt-1.5 tracking-wide">{selectedWord?.pinyin || ''}</div>
              <div className="text-sm text-ink-700 mt-1.5 flex items-center justify-center gap-2">
                <span className="text-xs font-bold text-amberseal-800 bg-[#FAF2E6] border border-[#EEDBBA] px-2 py-0.5 rounded-md">
                  {selectedWord?.han_viet || ''}
                </span>
                <span className="text-ink-400">•</span>
                <span className="font-semibold text-ink-900 text-base">"{selectedWord?.vietnamese || ''}"</span>
              </div>
            </div>

            {/* If multi-character, show character selector buttons */}
            {chars.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {chars.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCharIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-xl font-hanzi font-bold text-base transition-all border ${
                      charIndex === idx
                        ? 'bg-cinnabar-500 text-white border-cinnabar-600 shadow-sm'
                        : 'bg-[#F2ECE1] text-ink-700 border-[#D5C9B5] hover:bg-[#E8E2D5]'
                    }`}
                  >
                    Chữ {idx + 1}: <span className="text-lg">{c}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Tianzige Interactive Canvas - Large 280px */}
            <div className="flex flex-col items-center justify-center pt-2">
              <div className="relative rounded-3xl border-2 border-dashed border-cinnabar-300 p-2 tianzige-grid shadow-inner">
                <div ref={containerRef} className="cursor-crosshair flex items-center justify-center" />
              </div>

              {/* Status Message */}
              <div className="mt-3 text-sm font-semibold">
                {quizStatus === 'complete' && (
                  <div className="space-y-2">
                    <div className="p-3.5 rounded-2xl bg-jade-50 border border-jade-200 text-jade-800 flex items-center justify-center gap-2">
                      <CheckCircle2 size={20} className="text-jade-600 flex-shrink-0" />
                      <span>
                        {chars.length > 1 && charIndex < chars.length - 1
                          ? `Đúng nét chữ '${currentChar}' (${quizScore}/100 điểm)! ✨`
                          : `Hoàn hảo! Viết đúng thứ tự nét bút (${quizScore}/100 điểm) 🍵`}
                      </span>
                    </div>

                    {chars.length > 1 && charIndex < chars.length - 1 && (
                      <button
                        onClick={() => setCharIndex(prev => prev + 1)}
                        className="w-full py-2.5 px-4 bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Viết tiếp chữ "{chars[charIndex + 1]}"</span>
                        <span>👉</span>
                      </button>
                    )}

                    {chars.length > 1 && charIndex === chars.length - 1 && (
                      <div className="text-xs font-bold text-jade-700 py-1">
                        🎉 Xuất sắc! Bạn đã viết hoàn thành toàn bộ chữ "{selectedWord?.hanzi}"!
                      </div>
                    )}
                  </div>
                )}
                {quizStatus === 'mistake' && (
                  <div className="p-3 rounded-xl bg-[#FCF3F2] border border-[#F1CCC8] text-cinnabar-700 flex items-center justify-center gap-1.5">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>Sai nét hoặc chiều bút rồi! Bấm "Gợi ý nét" để xem nhé.</span>
                  </div>
                )}
                {quizStatus === 'correct_stroke' && (
                  <div className="text-jade-700 font-bold py-1">
                    Đúng nét rồi, viết nét tiếp theo nào! ✨
                  </div>
                )}
                {quizStatus === 'writing' && (
                  <div className="text-ink-400 py-1">
                    Dùng ngón tay hoặc chuột vẽ từng nét vào ô Mễ
                  </div>
                )}
                {quizStatus === 'animating' && (
                  <div className="text-cinnabar-600 font-bold py-1">
                    Đang vẽ mẫu từng nét theo bút thuận chuẩn...
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#E8E2D5]">
              <button
                onClick={handleShowAnimation}
                className={`py-3 px-2 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'animate'
                    ? 'bg-cinnabar-500 text-white shadow-sm'
                    : 'bg-[#F2ECE1] text-ink-700 hover:bg-[#E8E2D5]'
                }`}
              >
                <Play size={15} />
                <span>Thầy viết mẫu</span>
              </button>

              <button
                onClick={handleStartSelfWriting}
                className={`py-3 px-2 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'quiz'
                    ? 'bg-jade-600 text-white shadow-sm'
                    : 'bg-[#F2ECE1] text-ink-700 hover:bg-[#E8E2D5]'
                }`}
              >
                <Edit3 size={15} />
                <span>Tôi tự viết</span>
              </button>

              <button
                onClick={handleGiveHint}
                className="py-3 px-2 rounded-2xl bg-[#FAF2E6] border border-[#EEDBBA] text-amberseal-700 hover:bg-[#F5E7D0] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5"
                title="Gợi ý nét tiếp theo"
              >
                <Lightbulb size={15} />
                <span>Gợi ý nét</span>
              </button>
            </div>

            {/* Mnemonic Story & Character Breakdown Tip */}
            {tip && (
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E8E0D0] text-left text-sm space-y-1.5 mt-3">
                <div className="font-bold text-amberseal-800 text-xs sm:text-sm flex items-center gap-1.5">
                  <Lightbulb size={15} className="text-amberseal-600 fill-amberseal-500 flex-shrink-0" />
                  <span>Chiết tự & Mẹo nhớ chữ:</span>
                </div>
                <div className="text-ink-900 font-semibold leading-relaxed pl-5">
                  {tip.breakdown}
                </div>
                <div className="text-ink-700 leading-relaxed text-xs sm:text-sm pl-5">
                  📖 {tip.story}
                </div>
              </div>
            )}

            {/* Quick Word Pagination Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D5] text-xs font-semibold text-ink-600">
              <button
                onClick={handlePrevWord}
                disabled={currentWordIndex <= 0}
                className="px-3.5 py-2 rounded-xl bg-[#F2ECE1] text-ink-700 hover:bg-[#E8E2D5] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition-colors"
              >
                <ChevronLeft size={16} /> Từ trước
              </button>
              <span className="font-bold text-ink-600">
                {currentWordIndex >= 0 ? `${currentWordIndex + 1} / ${filteredWords.length} từ` : ''}
              </span>
              <button
                onClick={handleNextWord}
                disabled={currentWordIndex < 0 || currentWordIndex >= filteredWords.length - 1}
                className="px-3.5 py-2 rounded-xl bg-[#F2ECE1] text-ink-700 hover:bg-[#E8E2D5] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition-colors"
              >
                Từ tiếp theo <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 8 STROKES & 7 GOLDEN RULES */}
      {activeTab === 'stroke_rules' && (
        <div className="space-y-4 animate-fade-in">
          {/* 8 Basic Strokes */}
          <div className="bg-[#FDFCF9] rounded-3xl p-5 border-2 border-[#E8E2D5] shadow-paper space-y-3.5">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-ink-900 text-base">8 Nét chữ Hán cơ bản</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {BASIC_STROKES.map((st, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#E8E2D5] space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-4xl font-bold font-hanzi text-cinnabar-600">{st.shape}</span>
                    <span className="text-base font-bold text-ink-900">{st.name}</span>
                  </div>
                  <div className="text-sm text-cinnabar-700 font-semibold">{st.cn}</div>
                  <p className="text-sm text-ink-700 leading-relaxed">{st.desc}</p>
                  <div className="text-xs text-ink-500 pt-1 flex items-center gap-1.5">
                    <span>Ví dụ:</span>
                    <span className="font-hanzi font-bold text-lg text-ink-900">{st.example}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7 Stroke Order Rules */}
          <div className="bg-[#FDFCF9] rounded-3xl p-5 border-2 border-[#D5C9B5] shadow-paper space-y-3.5">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-ink-900 text-base">7 Quy tắc bút thuận</h3>
            </div>

            <div className="space-y-3 text-sm">
              {STROKE_RULES.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#E8E2D5] space-y-2">
                  <div className="font-bold text-cinnabar-700 text-base">{rule.title}</div>
                  <p className="text-ink-700 leading-relaxed text-sm">{rule.desc}</p>
                  <div className="text-sm text-ink-700 font-medium bg-[#F2ECE1] p-2.5 rounded-xl flex items-center gap-2">
                    <span>Ví dụ áp dụng:</span>
                    <span className="font-hanzi font-bold text-lg text-ink-900">{rule.example}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
