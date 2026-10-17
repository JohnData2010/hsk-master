import React, { useState, useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';
import { Play, Edit3, Volume2, CheckCircle2, RotateCcw, Lightbulb, Search, BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakChinese, playSoundEffect } from '../utils/audio';
import { BASIC_STROKES, STROKE_RULES } from '../data/pinyinData';
import { getLearningTipForWord } from '../data/learningTips';

export default function WritingStudioView({ words = [], onOpenWriter }) {
  const [activeTab, setActiveTab] = useState('practice'); // 'practice', 'stroke_rules'
  const [selectedWord, setSelectedWord] = useState(words[0] || { hanzi: '你', pinyin: 'nǐ', han_viet: 'Nễ', vietnamese: 'Bạn, anh, chị' });
  const [charIndex, setCharIndex] = useState(0);
  const [wordFilter, setWordFilter] = useState('');

  // Sync selected word whenever the user changes level in Navbar
  useEffect(() => {
    if (words && words.length > 0) {
      setSelectedWord(words[0]);
      setCharIndex(0);
      setWordFilter('');
    }
  }, [words]);

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
          {/* Word Selector Bar */}
          <div className="bg-[#FDFCF9] rounded-3xl p-3.5 border-2 border-[#E8E2D5] shadow-paper space-y-2">
            <div className="text-xs font-bold text-ink-600 flex items-center justify-between">
              <span>Chọn từ vựng để luyện viết:</span>
              <span className="text-cinnabar-600 font-bold">{words.length} từ có sẵn</span>
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

            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {(wordFilter.trim()
                ? words.filter(w =>
                    w.hanzi.includes(wordFilter) ||
                    w.pinyin.toLowerCase().includes(wordFilter.toLowerCase()) ||
                    w.vietnamese.toLowerCase().includes(wordFilter.toLowerCase())
                  )
                : words
              ).slice(0, 36).map((w, idx) => (
                <button
                  key={w.id || idx}
                  onClick={() => handleSelectWord(w)}
                  className={`px-3.5 py-1.5 rounded-xl font-hanzi font-bold text-base whitespace-nowrap transition-all border ${
                    selectedWord?.hanzi === w.hanzi
                      ? 'bg-cinnabar-500 text-white border-cinnabar-600 shadow-sm'
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
            {/* Word metadata with large fonts */}
            <div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-6xl font-extrabold font-hanzi text-ink-900 tracking-wide">{selectedWord?.hanzi || ''}</span>
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
                <span className="font-semibold text-ink-900">"{selectedWord?.vietnamese || ''}"</span>
              </div>
            </div>

            {/* If multi-character, show character selector buttons */}
            {chars.length > 1 && (
              <div className="flex justify-center gap-2 pt-1">
                {chars.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCharIndex(idx)}
                    className={`px-4 py-2 rounded-xl font-hanzi font-bold text-lg transition-all border ${
                      charIndex === idx
                        ? 'bg-cinnabar-500 text-white border-cinnabar-600 shadow-sm'
                        : 'bg-[#F2ECE1] text-ink-700 border-[#D5C9B5]'
                    }`}
                  >
                    Viết chữ: {c}
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
                  <div className="p-3.5 rounded-2xl bg-jade-50 border border-jade-200 text-jade-800 flex items-center justify-center gap-2">
                    <CheckCircle2 size={20} className="text-jade-600 flex-shrink-0" />
                    <span>Hoàn hảo! Viết đúng thứ tự nét bút ({quizScore}/100 điểm) 🍵</span>
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
