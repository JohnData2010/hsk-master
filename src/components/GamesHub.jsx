import React, { useState } from 'react';
import { Zap, Puzzle, Headphones } from 'lucide-react';
import GameSpeedMatch from './GameSpeedMatch';
import GameSentenceBuilder from './GameSentenceBuilder';
import GameListeningQuiz from './GameListeningQuiz';

export default function GamesHub({ words, currentLevel }) {
  const [selectedGame, setSelectedGame] = useState('match'); // 'match', 'sentence', 'listening'

  const gameOptions = [
    { id: 'match', label: 'Ghép từ', icon: Zap },
    { id: 'sentence', label: 'Xếp câu', icon: Puzzle },
    { id: 'listening', label: 'Luyện nghe', icon: Headphones },
  ];

  return (
    <div className="max-w-md mx-auto">
      {/* Game Selector Bar */}
      <div className="px-2 sm:px-4 mb-3">
        <div className="flex bg-[#F2ECE1] p-1 rounded-2xl text-xs font-bold gap-1 border border-[#E0D7C7]">
          {gameOptions.map((g) => {
            const Icon = g.icon;
            const isActive = selectedGame === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setSelectedGame(g.id)}
                className={`flex-1 py-2 px-1 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold'
                    : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-cinnabar-600' : 'text-ink-400'} />
                <span className="truncate">{g.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Game */}
      {selectedGame === 'match' && <GameSpeedMatch words={words} />}
      {selectedGame === 'sentence' && <GameSentenceBuilder level={currentLevel} />}
      {selectedGame === 'listening' && <GameListeningQuiz words={words} />}
    </div>
  );
}
