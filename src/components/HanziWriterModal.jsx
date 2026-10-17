import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { Volume2, Play, Edit3, CheckCircle2, X, Lightbulb } from 'lucide-react';
import { speakChinese } from '../utils/audio';
import { getLearningTipForWord } from '../data/learningTips';

export default function HanziWriterModal({ word, onClose }) {
  const containerRef = useRef(null);
  const writerRef = useRef(null);
  const [mode, setMode] = useState('animate'); // 'animate' or 'quiz'
  const [quizStatus, setQuizStatus] = useState(null);
  const [charIndex, setCharIndex] = useState(0);

  const characters = (word?.hanzi || '').split('');
  const currentChar = characters[charIndex] || characters[0] || '你';
  const tip = getLearningTipForWord(word);

  useEffect(() => {
    if (!containerRef.current || !currentChar) return;

    containerRef.current.innerHTML = '';

    try {
      const size = Math.min(260, window.innerWidth - 60);
      const writer = HanziWriter.create(containerRef.current, currentChar, {
        width: size,
        height: size,
        padding: 18,
        showOutline: true,
        strokeAnimationSpeed: 0.95,
        delayBetweenStrokes: 240,
        strokeColor: '#C24138',
        outlineColor: '#D5C9B5',
        highlightColor: '#2E6F62',
        drawingColor: '#141813',
        drawingWidth: 14,
        showCharacter: mode === 'animate',
      });

      writerRef.current = writer;

      if (mode === 'animate') {
        writer.animateCharacter();
        setQuizStatus(null);
      } else {
        startQuiz(writer);
      }
    } catch (e) {
      console.error('Failed to init HanziWriter:', e);
    }

    return () => {
      if (writerRef.current) {
        try {
          writerRef.current.cancelQuiz();
        } catch (e) {}
      }
    };
  }, [currentChar, mode]);

  const startQuiz = (writer) => {
    setQuizStatus('writing');
    writer.quiz({
      onCorrectStroke: () => {
        setQuizStatus('correct_stroke');
      },
      onMistake: () => {
        setQuizStatus('mistake');
      },
      onComplete: () => {
        setQuizStatus('complete');
      }
    });
  };

  const handleAnimate = () => {
    setMode('animate');
    if (writerRef.current) {
      writerRef.current.showCharacter();
      writerRef.current.animateCharacter();
    }
  };

  const handleQuizMode = () => {
    setMode('quiz');
    if (writerRef.current) {
      writerRef.current.hideCharacter();
      startQuiz(writerRef.current);
    }
  };

  const handleAudio = () => {
    speakChinese(word?.hanzi || currentChar, 0.55);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FDFCF9] rounded-3xl shadow-xl border-2 border-[#D5C9B5] max-w-md w-full p-6 overflow-hidden relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-ink-400 hover:text-ink-700 hover:bg-paper-200 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Word Info Header with large fonts */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-6xl font-extrabold font-hanzi text-ink-900 tracking-wide">{word?.hanzi}</span>
            <button
              onClick={handleAudio}
              className="p-2.5 rounded-full bg-cinnabar-50 text-cinnabar-600 hover:bg-cinnabar-100 transition-all"
              title="Nghe phát âm chuẩn"
            >
              <Volume2 size={22} />
            </button>
          </div>
          <div className="text-2xl font-bold text-cinnabar-600 tracking-wide mt-1">{word?.pinyin}</div>
          <div className="text-sm text-ink-700 mt-1.5 flex items-center justify-center gap-2">
            <span className="text-xs font-bold text-amberseal-800 bg-[#FAF2E6] border border-[#EEDBBA] px-2 py-0.5 rounded-md">
              {word?.han_viet}
            </span>
            <span className="text-ink-400">•</span>
            <span className="font-semibold text-ink-900 text-base">"{word?.vietnamese}"</span>
          </div>
        </div>

        {/* Character Selector for multi-character words */}
        {characters.length > 1 && (
          <div className="flex justify-center gap-2 mb-4">
            {characters.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setCharIndex(idx)}
                className={`px-4 py-2 rounded-xl font-bold font-hanzi text-lg transition-all ${
                  charIndex === idx
                    ? 'bg-cinnabar-500 text-white shadow-sm'
                    : 'bg-[#F2ECE1] text-ink-700 hover:bg-[#E8E2D5]'
                }`}
              >
                Viết chữ: {c}
              </button>
            ))}
          </div>
        )}

        {/* Writing Canvas / Tianzige Grid */}
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="relative rounded-3xl border-2 border-dashed border-cinnabar-300 p-2 tianzige-grid shadow-inner">
            <div ref={containerRef} className="cursor-crosshair flex items-center justify-center" />
          </div>

          {/* Quiz Feedback Banner */}
          {mode === 'quiz' && (
            <div className="mt-3 text-xs sm:text-sm font-semibold transition-all">
              {quizStatus === 'complete' && (
                <div className="flex items-center gap-1.5 text-jade-700 bg-jade-50 border border-jade-200 px-4 py-2 rounded-full">
                  <CheckCircle2 size={18} />
                  <span>Viết xuất sắc! Đúng 100% thứ tự nét bút! 🍵</span>
                </div>
              )}
              {quizStatus === 'mistake' && (
                <div className="text-amberseal-700 bg-[#FAF2E6] border border-[#EEDBBA] px-4 py-1.5 rounded-full">
                  Sai nét hoặc sai chiều bút rồi, xem lại hướng dẫn nhé.
                </div>
              )}
              {quizStatus === 'correct_stroke' && (
                <div className="text-cinnabar-700 bg-cinnabar-50 border border-cinnabar-200 px-4 py-1.5 rounded-full">
                  Đúng nét rồi, viết tiếp nào!
                </div>
              )}
              {quizStatus === 'writing' && (
                <div className="text-ink-400 bg-paper-200 px-4 py-1.5 rounded-full">
                  Dùng ngón tay hoặc chuột vẽ từng nét theo ô Mễ
                </div>
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E8E2D5]">
          <button
            onClick={handleAnimate}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
              mode === 'animate'
                ? 'bg-cinnabar-500 text-white shadow-sm'
                : 'bg-[#F2ECE1] text-ink-700 hover:bg-[#E8E2D5]'
            }`}
          >
            <Play size={16} />
            <span>Xem thứ tự nét</span>
          </button>

          <button
            onClick={handleQuizMode}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
              mode === 'quiz'
                ? 'bg-jade-600 text-white shadow-sm'
                : 'bg-[#F2ECE1] text-ink-700 hover:bg-[#E8E2D5]'
            }`}
          >
            <Edit3 size={16} />
            <span>Tự vẽ bằng ngón tay</span>
          </button>
        </div>

        {/* Character Breakdown Tip */}
        {tip && (
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E8E0D0] text-left text-sm space-y-1.5 mt-4">
            <div className="font-bold text-amberseal-800 flex items-center gap-1.5 text-xs sm:text-sm">
              <Lightbulb size={15} className="text-amberseal-600 fill-amberseal-500 flex-shrink-0" />
              <span>Chiết tự: {tip.breakdown}</span>
            </div>
            <div className="text-ink-700 leading-relaxed text-xs sm:text-sm pl-5">
              📖 {tip.story}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
