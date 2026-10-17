import React from 'react';
import { BookOpen, Layers, Edit3, Sparkles } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'curriculum', label: 'Bài học', icon: BookOpen },
    { id: 'flashcards', label: 'Từ vựng', icon: Layers },
    { id: 'writing', label: 'Tập viết', icon: Edit3 },
    { id: 'practice', label: 'Luyện tập', icon: Sparkles },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFCF9]/95 backdrop-blur-md border-t border-[#E8E2D5] shadow-[0_-4px_16px_rgba(42,48,41,0.05)] safe-area-bottom">
      <div className="max-w-md mx-auto px-2 flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-2xl transition-all relative ${
                isActive
                  ? 'text-cinnabar-600 font-bold scale-102'
                  : 'text-ink-500 hover:text-ink-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon size={22} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
              </div>
              <span className={`text-xs mt-1 tracking-tight ${isActive ? 'font-extrabold text-cinnabar-600' : 'text-ink-600'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-5 h-1 rounded-full bg-cinnabar-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
