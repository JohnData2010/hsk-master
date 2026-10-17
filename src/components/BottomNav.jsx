import React from 'react';
import { Volume2, Edit3, BookOpen, Layers, MessageSquareQuote } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'pinyin', label: 'Phát âm', icon: Volume2, badge: 'Căn bản' },
    { id: 'writing', label: 'Tập viết', icon: Edit3 },
    { id: 'curriculum', label: 'Bài học', icon: BookOpen },
    { id: 'flashcards', label: 'Sổ từ', icon: Layers },
    { id: 'ai_grader', label: 'Thầy Vương', icon: MessageSquareQuote },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#F9F6F0]/95 backdrop-blur-md border-t border-[#E8E2D5] shadow-[0_-4px_16px_rgba(42,48,41,0.04)] safe-area-bottom">
      <div className="max-w-md mx-auto px-1.5 flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-2xl transition-all relative ${
                isActive
                  ? 'text-cinnabar-500 font-bold scale-102'
                  : 'text-ink-400 hover:text-ink-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon size={20} className={isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'} />
                {tab.badge && !isActive && (
                  <span className="absolute -top-1 -right-3 text-[8px] font-extrabold bg-cinnabar-500 text-white px-1 py-0.2 rounded-full leading-none">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-1 tracking-tight ${isActive ? 'font-bold text-cinnabar-600' : 'text-ink-600'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-4 h-1 rounded-full bg-cinnabar-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
