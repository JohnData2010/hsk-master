import React, { useState, useEffect } from 'react';
import { Timer, Zap, Trophy, RefreshCw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoundEffect, speakChinese } from '../utils/audio';
import { updateUserStats } from '../utils/srs';

export default function GameSpeedMatch({ words }) {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'finished'

  const startNewGame = () => {
    const shuffledWords = [...words].sort(() => 0.5 - Math.random()).slice(0, 6);
    
    const cardList = [];
    shuffledWords.forEach((w, idx) => {
      cardList.push({
        id: `h_${w.id}_${idx}`,
        wordId: w.id,
        type: 'hanzi',
        text: w.hanzi,
        pinyin: w.pinyin,
        han_viet: w.han_viet
      });
      cardList.push({
        id: `v_${w.id}_${idx}`,
        wordId: w.id,
        type: 'vietnamese',
        text: w.vietnamese
      });
    });

    setCards(cardList.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
    setMatchedIds(new Set());
    setScore(0);
    setCombo(0);
    setTimeLeft(60);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) {
      setGameState('finished');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleCardClick = (card) => {
    if (gameState !== 'playing') return;
    if (matchedIds.has(card.wordId)) return;
    if (selectedCards.some(c => c.id === card.id)) return;
    if (selectedCards.length >= 2) return;

    if (card.type === 'hanzi') {
      speakChinese(card.text);
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (first.wordId === second.wordId && first.type !== second.type) {
        playSoundEffect('correct');
        const nextMatched = new Set(matchedIds);
        nextMatched.add(first.wordId);
        setMatchedIds(nextMatched);

        const earnedPoints = 10 + combo * 5;
        setScore(prev => prev + earnedPoints);
        setCombo(prev => prev + 1);
        updateUserStats(earnedPoints, 1);

        setSelectedCards([]);

        if (nextMatched.size === 6) {
          playSoundEffect('level_up');
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
          setGameState('finished');
        }
      } else {
        playSoundEffect('wrong');
        setCombo(0);
        setTimeout(() => {
          setSelectedCards([]);
        }, 700);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Game Header */}
      <div className="flex items-center justify-between bg-[#FDFCF9] p-3.5 rounded-2xl border border-[#E8E2D5] shadow-paper mb-4">
        <div className="flex items-center gap-1.5 font-extrabold text-cinnabar-600 text-sm">
          <Zap size={16} className="fill-cinnabar-500" />
          <span>{score} điểm</span>
          {combo > 1 && (
            <span className="text-[11px] bg-[#FAF2E6] text-amberseal-600 border border-[#EEDBBA] px-2 py-0.5 rounded-full font-bold">
              x{combo} Chuỗi!
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 font-bold text-ink-700 text-sm">
          <Timer size={16} className={timeLeft <= 10 ? 'text-cinnabar-500 animate-spin' : 'text-ink-400'} />
          <span className={timeLeft <= 10 ? 'text-cinnabar-600 font-extrabold' : ''}>{timeLeft}s</span>
        </div>

        <button
          onClick={startNewGame}
          className="p-1.5 rounded-xl text-ink-400 hover:text-ink-800 hover:bg-paper-200"
          title="Chơi lại ván mới"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Main Playing Grid */}
      {gameState === 'playing' ? (
        <div className="grid grid-cols-3 gap-2.5">
          {cards.map((card) => {
            const isMatched = matchedIds.has(card.wordId);
            const isSelected = selectedCards.some(c => c.id === card.id);

            let cardStyle = 'bg-[#FDFCF9] border-[#D5C9B5] text-ink-900 hover:border-cinnabar-300';
            if (isSelected) {
              cardStyle = 'bg-[#FCF3F2] border-cinnabar-500 text-cinnabar-700 ring-2 ring-cinnabar-200 scale-102';
            }
            if (isMatched) {
              cardStyle = 'bg-jade-50 border-jade-300 text-jade-700 opacity-30 pointer-events-none scale-95';
            }

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                disabled={isMatched}
                className={`min-h-[92px] p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center shadow-paper transition-all duration-150 select-none ${cardStyle}`}
              >
                {card.type === 'hanzi' ? (
                  <>
                    <span className={`${card.text.length > 2 ? 'text-xl sm:text-2xl' : 'text-3xl'} font-bold font-hanzi whitespace-nowrap`}>
                      {card.text}
                    </span>
                    <span className="text-xs font-semibold text-cinnabar-600 mt-1">{card.pinyin}</span>
                  </>
                ) : (
                  <span className="text-sm font-bold leading-snug line-clamp-3">{card.text}</span>
                )}
              </button>
            );
          })}
        </div>
      ) : gameState === 'finished' ? (
        <div className="bg-[#FDFCF9] rounded-3xl p-6 text-center border border-[#E8E2D5] shadow-paper">
          <Trophy className="w-14 h-14 text-amberseal-500 mx-auto mb-3" />
          <h3 className="text-lg font-extrabold text-ink-900">
            {matchedIds.size === 6 ? 'Bạn ghép bài rất xuất sắc! 🍵' : 'Hết giờ rồi, cố thêm chút nữa nhé!'}
          </h3>
          <p className="text-xs text-ink-400 mt-1 mb-5">
            Ghép đúng <span className="font-bold text-cinnabar-600">{matchedIds.size} / 6</span> cặp từ vựng • Điểm số: <span className="font-bold text-amberseal-600">{score} điểm</span>.
          </p>
          <button
            onClick={startNewGame}
            className="w-full py-3.5 rounded-2xl bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm shadow-sm transition-all"
          >
            Chơi lại ván mới
          </button>
        </div>
      ) : (
        /* IDLE SCREEN */
        <div className="bg-[#FDFCF9] rounded-3xl p-6 text-center border border-[#E8E2D5] shadow-paper">
          <div className="w-14 h-14 rounded-2xl bg-[#FCF3F2] border border-[#F1CCC8] text-cinnabar-600 flex items-center justify-center mx-auto mb-3 text-2xl">
            🀄
          </div>
          <h3 className="text-lg font-extrabold text-ink-900">Ghép Thẻ Bài Chữ Hán</h3>
          <p className="text-xs text-ink-400 mt-1.5 mb-6 leading-relaxed max-w-xs mx-auto">
            Một bài tập phản xạ vui vẻ: Chạm nhanh vào cặp thẻ Chữ Hán và Nghĩa tiếng Việt trong 60 giây.
          </p>
          <button
            onClick={startNewGame}
            className="w-full py-3.5 rounded-2xl bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            <span>Bắt đầu ghép thẻ</span>
          </button>
        </div>
      )}
    </div>
  );
}
