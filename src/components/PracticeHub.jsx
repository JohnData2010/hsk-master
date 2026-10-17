import React, { useState } from 'react';
import { Gamepad2, Sparkles, MessageSquare, BookOpen } from 'lucide-react';
import GamesHub from './GamesHub';
import NativeAIEvaluator from './NativeAIEvaluator';
import SituationalDialogues from './SituationalDialogues';

export default function PracticeHub({ words, currentLevel, situationalDialogues }) {
  const [activeSection, setActiveSection] = useState('games'); // 'games' or 'mentor'
  const [mentorSubMode, setMentorSubMode] = useState('evaluator'); // 'evaluator' or 'dialogues'

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Top Main Section Switcher */}
      <div className="flex bg-[#F2ECE1] p-1.5 rounded-2xl mb-4 border border-[#E0D7C7] shadow-xs">
        <button
          onClick={() => setActiveSection('games')}
          className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
            activeSection === 'games'
              ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold text-sm'
              : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          <Gamepad2 size={16} />
          <span>Trò chơi phản xạ</span>
        </button>

        <button
          onClick={() => setActiveSection('mentor')}
          className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
            activeSection === 'mentor'
              ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold text-sm'
              : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          <Sparkles size={16} />
          <span>Thầy Vương AI</span>
        </button>
      </div>

      {/* SECTION 1: TRÒ CHƠI PHẢN XẠ */}
      {activeSection === 'games' && (
        <div className="animate-fade-in">
          <GamesHub words={words} currentLevel={currentLevel} />
        </div>
      )}

      {/* SECTION 2: THẦY VƯƠNG AI & HỘI THOẠI */}
      {activeSection === 'mentor' && (
        <div className="animate-fade-in space-y-4">
          {/* Sub-selector between Sửa câu and Hội thoại */}
          <div className="flex bg-[#FAF5EB] p-1 rounded-xl border border-[#E8E0D0] text-xs font-bold">
            <button
              onClick={() => setMentorSubMode('evaluator')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mentorSubMode === 'evaluator'
                  ? 'bg-white text-cinnabar-600 shadow-xs font-extrabold'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              ✍️ Sửa lỗi câu & Phát âm
            </button>
            <button
              onClick={() => setMentorSubMode('dialogues')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mentorSubMode === 'dialogues'
                  ? 'bg-white text-cinnabar-600 shadow-xs font-extrabold'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              💬 Hội thoại tình huống (6 cảnh)
            </button>
          </div>

          {mentorSubMode === 'evaluator' && (
            <NativeAIEvaluator currentLevel={currentLevel} />
          )}

          {mentorSubMode === 'dialogues' && (
            <SituationalDialogues dialogues={situationalDialogues || []} />
          )}
        </div>
      )}
    </div>
  );
}
