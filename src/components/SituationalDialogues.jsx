import React, { useState } from 'react';
import { Volume2, PlayCircle, Lightbulb, User } from 'lucide-react';
import { speakChinese } from '../utils/audio';

const SCENARIO_ICONS = {
  milktea: '🧋',
  directions: '🚇',
  shopping: '🛍️',
  restaurant: '🍲'
};

export default function SituationalDialogues({ dialogues = [] }) {
  const [selectedId, setSelectedId] = useState(dialogues[0]?.id || 'milktea');
  const [activeSpeechLine, setActiveSpeechLine] = useState(null);

  const activeDialogue = dialogues.find(d => d.id === selectedId) || dialogues[0];

  const handleSpeakLine = (text, index) => {
    setActiveSpeechLine(index);
    speakChinese(text, 0.65, () => {
      setActiveSpeechLine(null);
    });
  };

  const handlePlayFull = () => {
    if (!activeDialogue) return;
    let index = 0;
    const playNext = () => {
      if (index < activeDialogue.dialogue.length) {
        setActiveSpeechLine(index);
        speakChinese(activeDialogue.dialogue[index].cn, 0.65, () => {
          index++;
          setTimeout(playNext, 600);
        });
      } else {
        setActiveSpeechLine(null);
      }
    };
    playNext();
  };

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {dialogues.map((d) => {
          const icon = SCENARIO_ICONS[d.id] || '💬';
          const isSelected = selectedId === d.id;
          return (
            <button
              key={d.id}
              onClick={() => {
                setSelectedId(d.id);
                setActiveSpeechLine(null);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-cinnabar-500 text-white shadow-sm'
                  : 'bg-[#FDFCF9] text-ink-600 border border-[#D5C9B5] hover:bg-paper-200'
              }`}
            >
              <span>{icon}</span>
              <span>{d.title}</span>
            </button>
          );
        })}
      </div>

      {activeDialogue && (
        <div className="space-y-4">
          {/* Scenario Overview Card */}
          <div className="bg-[#FDFCF9] rounded-3xl p-5 border border-[#E8E2D5] shadow-paper">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cinnabar-600 bg-cinnabar-50 border border-cinnabar-200 px-2 py-0.5 rounded-md">
                {activeDialogue.category}
              </span>
              <button
                onClick={handlePlayFull}
                className="flex items-center gap-1.5 text-xs font-bold text-cinnabar-600 hover:text-cinnabar-800 bg-[#FCF3F2] border border-[#F1CCC8] px-3 py-1 rounded-xl transition-colors"
              >
                <PlayCircle size={15} />
                <span>Nghe toàn bộ</span>
              </button>
            </div>
            <h3 className="text-base font-extrabold text-ink-900">{activeDialogue.title}</h3>
            <p className="text-xs text-ink-400 mt-1 leading-relaxed">{activeDialogue.scenario}</p>
          </div>

          {/* Dialogue Conversation Stream */}
          <div className="space-y-3">
            {activeDialogue.dialogue.map((line, idx) => {
              const isUser = line.speaker.includes('你');
              const isPlaying = activeSpeechLine === idx;

              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[11px] font-bold text-ink-400 mb-1 px-1 flex items-center gap-1">
                    <User size={12} />
                    <span>{line.speaker}</span>
                  </div>

                  <div
                    onClick={() => handleSpeakLine(line.cn, idx)}
                    className={`max-w-[90%] p-4 rounded-2xl cursor-pointer transition-all active:scale-[0.98] border shadow-sm ${
                      isUser
                        ? isPlaying
                          ? 'bg-cinnabar-600 text-white border-cinnabar-700 ring-2 ring-cinnabar-200'
                          : 'bg-cinnabar-500 text-white border-cinnabar-600'
                        : isPlaying
                        ? 'bg-[#FCF3F2] text-ink-900 border-cinnabar-300 ring-2 ring-cinnabar-200'
                        : 'bg-[#FDFCF9] text-ink-900 border-[#E8E2D5] hover:border-[#D5C9B5]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-hanzi font-bold text-xl sm:text-2xl leading-relaxed tracking-wide">
                        {line.cn}
                      </div>
                      <Volume2
                        size={18}
                        className={`flex-shrink-0 mt-1 ${isUser ? 'text-cinnabar-200' : 'text-cinnabar-500'} ${isPlaying ? 'animate-bounce' : ''}`}
                      />
                    </div>
                    <div className={`text-sm mt-1.5 ${isUser ? 'text-cinnabar-100' : 'text-cinnabar-600 font-semibold'}`}>
                      {line.pinyin}
                    </div>
                    <div className={`text-sm mt-1.5 font-medium ${isUser ? 'text-cinnabar-50/90' : 'text-ink-700'}`}>
                      {line.vi}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cultural Insights */}
          {activeDialogue.native_tips && (
            <div className="p-4 rounded-3xl bg-[#FAF2E6] border border-[#EEDBBA] shadow-paper text-sm text-amberseal-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amberseal-900">
                <Lightbulb size={16} className="text-amberseal-600 fill-amberseal-500 flex-shrink-0" />
                <span>Mẹo thực tế đời sống:</span>
              </div>
              <p className="leading-relaxed pl-5 text-amberseal-900/90 text-xs sm:text-sm">{activeDialogue.native_tips}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
