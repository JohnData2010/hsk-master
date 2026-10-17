import React, { useState, useEffect } from 'react';
import { Volume2, ArrowRight, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoundEffect, speakChinese } from '../utils/audio';
import { updateUserStats } from '../utils/srs';

export default function GameListeningQuiz({ words }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizList, setQuizList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffled = [...words].sort(() => 0.5 - Math.random()).slice(0, 5);
    const questions = shuffled.map(w => {
      const others = words.filter(o => o.hanzi !== w.hanzi).sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [w, ...others].sort(() => 0.5 - Math.random());
      return {
        word: w,
        options
      };
    });
    setQuizList(questions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setStatus(null);
    setScore(0);
  }, [words]);

  const currentQ = quizList[currentIndex];

  useEffect(() => {
    if (currentQ) {
      const timer = setTimeout(() => {
        speakChinese(currentQ.word.hanzi, 0.65);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentQ]);

  const handlePlayAudio = (rate = 0.65) => {
    if (currentQ) {
      speakChinese(currentQ.word.hanzi, rate);
    }
  };

  const handleSelect = (option) => {
    if (status !== null) return;
    setSelectedOption(option);

    if (option.hanzi === currentQ.word.hanzi) {
      playSoundEffect('correct');
      setStatus('correct');
      setScore(prev => prev + 1);
      updateUserStats(10, 1);
      if (currentIndex === quizList.length - 1) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      playSoundEffect('wrong');
      setStatus('wrong');
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizList.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setStatus(null);
    } else {
      setStatus('finished');
    }
  };

  if (!currentQ) return null;

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 text-xs font-semibold text-ink-400">
        <span className="bg-[#F2ECE1] text-ink-700 px-3 py-1 rounded-xl border border-[#D5C9B5]">
          Câu {currentIndex + 1} / {quizList.length}
        </span>
        <span className="text-amberseal-600 font-bold flex items-center gap-1">
          <Trophy size={14} />
          {score} / {quizList.length} câu đúng
        </span>
      </div>

      {status === 'finished' ? (
        <div className="bg-[#FDFCF9] rounded-3xl p-6 text-center border border-[#E8E2D5] shadow-paper">
          <Sparkles className="w-12 h-12 text-amberseal-500 mx-auto mb-3" />
          <h3 className="text-lg font-extrabold text-ink-900">Hoàn Thành Lượt Nghe! 🍵</h3>
          <p className="text-xs text-ink-400 mt-1 mb-5">
            Bạn đã nghe và chọn đúng <span className="font-bold text-cinnabar-600">{score} / {quizList.length}</span> câu.
          </p>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedOption(null);
              setStatus(null);
              setScore(0);
            }}
            className="w-full py-3.5 rounded-2xl bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm shadow-sm transition-all"
          >
            Luyện tiếp vòng mới
          </button>
        </div>
      ) : (
        <>
          {/* Audio Speaker Box */}
          <div className="bg-[#FDFCF9] rounded-3xl p-6 border border-[#E8E2D5] shadow-paper text-center mb-5">
            <button
              onClick={() => handlePlayAudio(0.65)}
              className="w-20 h-20 rounded-full bg-cinnabar-500 text-white flex items-center justify-center mx-auto shadow-sm hover:bg-cinnabar-600 active:scale-95 transition-all mb-3"
              title="Nghe phát âm"
            >
              <Volume2 size={34} />
            </button>
            <div className="text-sm font-bold text-ink-800">Chạm loa để nghe và chọn từ:</div>

            {/* Slow speed button */}
            <button
              onClick={() => handlePlayAudio(0.45)}
              className="mt-2 text-xs font-semibold text-cinnabar-600 hover:text-cinnabar-700 flex items-center justify-center gap-1 mx-auto"
            >
              <span>🐢 Nghe chậm (0.45x)</span>
            </button>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption?.hanzi === opt.hanzi;
              const isCorrect = opt.hanzi === currentQ.word.hanzi;

              let btnStyle = 'bg-[#FDFCF9] border border-[#D5C9B5] text-ink-900 hover:border-cinnabar-300';
              if (status !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-jade-50 border-2 border-jade-500 text-jade-900 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-[#FCF3F2] border-2 border-cinnabar-400 text-cinnabar-800 line-through';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={status !== null}
                  onClick={() => handleSelect(opt)}
                  className={`p-3.5 rounded-2xl shadow-paper text-center flex flex-col items-center justify-center min-h-[100px] transition-all select-none ${btnStyle}`}
                >
                  <span className={`${opt.hanzi.length > 2 ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'} font-bold font-hanzi mb-1 whitespace-nowrap`}>
                    {opt.hanzi}
                  </span>
                  <span className="text-sm font-semibold text-cinnabar-600 mb-0.5">{opt.pinyin}</span>
                  <span className="text-xs sm:text-sm text-ink-600 line-clamp-1">{opt.vietnamese}</span>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {status !== null && (
            <button
              onClick={handleNext}
              className="w-full py-3.5 rounded-2xl bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{currentIndex + 1 < quizList.length ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
              <ArrowRight size={17} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
