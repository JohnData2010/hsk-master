import React, { useState } from 'react';
import { CheckCircle2, XCircle, Volume2, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoundEffect, speakChinese } from '../utils/audio';
import { updateUserStats } from '../utils/srs';

const SENTENCE_CHALLENGES = {
  hsk1: [
    {
      vi: "Hôm nay tôi đi trường học học tiếng Trung.",
      tokens: ["今天", "我", "去", "学校", "学", "汉语"],
      correct: "今天我去学校学汉语",
      grammarNote: "Trật tự câu liên động: Chủ ngữ + Đi đâu (去学校) + Làm gì (学汉语)."
    },
    {
      vi: "Bác sĩ này là bạn của bố tôi.",
      tokens: ["这个", "医生", "是", "我", "爸爸", "的", "朋友"],
      correct: "这个医生是我爸爸的朋友",
      grammarNote: "Cụm danh từ chữ 的: 我爸爸的朋友 (bạn của bố tôi)."
    },
    {
      vi: "Con gái của cô ấy năm nay 20 tuổi rồi.",
      tokens: ["她", "女儿", "今年", "二十岁", "了"],
      correct: "她女儿今年二十岁了",
      grammarNote: "Thời gian (今年) đứng trước tuổi tác, trợ từ 了 ở cuối câu biểu thị sự thay đổi."
    },
    {
      vi: "Tôi muốn uống một cốc trà nóng.",
      tokens: ["我", "想", "喝", "一杯", "热茶"],
      correct: "我想喝一杯热茶",
      grammarNote: "Số lượng + Danh từ: 一杯热茶 (một cốc trà nóng)."
    }
  ],
  hsk2: [
    {
      vi: "Tháng 9 đi Bắc Kinh du lịch là tốt nhất.",
      tokens: ["九月", "去", "北京", "旅游", "最好"],
      correct: "九月去北京旅游最好",
      grammarNote: "Thời gian đặt ở đầu câu, phó từ 最 đứng trước tính từ 好."
    },
    {
      vi: "Anh ấy lớn hơn tôi ba tuổi.",
      tokens: ["他", "比", "我", "大", "三岁"],
      correct: "他比我大三岁",
      grammarNote: "Câu so sánh hơn: A + 比 + B + Tính từ + Mức độ chênh lệch."
    },
    {
      vi: "Đừng xem nữa, điện thoại ở trên bàn kìa.",
      tokens: ["别看了", "手机", "在", "桌子上", "呢"],
      correct: "别看了手机在桌子上呢",
      grammarNote: "别看了 (Đừng xem nữa), phương vị từ 桌子上 (trên bàn)."
    },
    {
      vi: "Tôi chạy bộ nhanh hơn anh ấy nhiều.",
      tokens: ["我", "跑得", "比", "他", "快多了"],
      correct: "我跑得比他快多了",
      grammarNote: "So sánh kết hợp bổ ngữ trạng thái: 跑得比他快多了."
    }
  ],
  hsk3: [
    {
      vi: "Làm ơn hãy giúp tôi đóng cửa sổ lại.",
      tokens: ["请", "帮我", "把", "窗户", "关上"],
      correct: "请帮我把窗户关上",
      grammarNote: "Câu chữ 把: S + 把 + O + V + Bổ ngữ kết quả (关上)."
    },
    {
      vi: "Dạo gần đây công việc của tôi càng ngày càng bận.",
      tokens: ["最近", "我的", "工作", "越来越", "忙了"],
      correct: "最近我的工作越来越忙了",
      grammarNote: "Cấu trúc tăng tiến 越来越 + Tính từ."
    },
    {
      vi: "Cuốn sách trên bàn bị em trai lấy đi rồi.",
      tokens: ["桌子上的", "书", "被", "弟弟", "拿走了"],
      correct: "桌子上的书被弟弟拿走了",
      grammarNote: "Câu bị động chữ 被: Vật chịu tác động + 被 + Người tác động + Động từ + Bổ ngữ."
    },
    {
      vi: "Tôi vừa tan làm là về nhà ngay.",
      tokens: ["我", "一下班", "就", "回家了"],
      correct: "我一下班就回家了",
      grammarNote: "Cặp liên từ hô ứng: 一... 就... (Vừa... là... ngay)."
    }
  ]
};

export default function GameSentenceBuilder({ level = 'hsk1' }) {
  const list = SENTENCE_CHALLENGES[level] || SENTENCE_CHALLENGES.hsk1;
  const [index, setIndex] = useState(0);
  const challenge = list[index] || list[0];

  const [availableTokens, setAvailableTokens] = useState(() => {
    return [...challenge.tokens].sort(() => 0.5 - Math.random());
  });
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [status, setStatus] = useState(null);

  // Sync whenever user changes HSK level
  useEffect(() => {
    const currentList = SENTENCE_CHALLENGES[level] || SENTENCE_CHALLENGES.hsk1;
    setIndex(0);
    setStatus(null);
    setSelectedTokens([]);
    if (currentList[0]) {
      setAvailableTokens([...currentList[0].tokens].sort(() => 0.5 - Math.random()));
    }
  }, [level]);

  const handleSelectToken = (token, tIdx) => {
    if (status === 'correct') return;
    setStatus(null);
    setSelectedTokens([...selectedTokens, token]);
    setAvailableTokens(availableTokens.filter((_, i) => i !== tIdx));
  };

  const handleRemoveToken = (token, sIdx) => {
    if (status === 'correct') return;
    setStatus(null);
    setSelectedTokens(selectedTokens.filter((_, i) => i !== sIdx));
    setAvailableTokens([...availableTokens, token]);
  };

  const handleCheck = () => {
    const userSentence = selectedTokens.join('');
    if (userSentence === challenge.correct.replace(/\s+/g, '')) {
      playSoundEffect('correct');
      setStatus('correct');
      speakChinese(challenge.correct);
      updateUserStats(15, 2);
      if (index === list.length - 1) {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      playSoundEffect('wrong');
      setStatus('wrong');
    }
  };

  const handleReset = () => {
    setStatus(null);
    setSelectedTokens([]);
    setAvailableTokens([...challenge.tokens].sort(() => 0.5 - Math.random()));
  };

  const handleNext = () => {
    const nextIdx = (index + 1) % list.length;
    setIndex(nextIdx);
    const nextChal = list[nextIdx];
    setStatus(null);
    setSelectedTokens([]);
    setAvailableTokens([...nextChal.tokens].sort(() => 0.5 - Math.random()));
  };

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 text-xs font-semibold text-ink-400">
        <span className="bg-[#F2ECE1] text-ink-700 px-3 py-1 rounded-xl border border-[#D5C9B5]">
          Câu {index + 1} / {list.length}
        </span>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-ink-400 hover:text-ink-700"
        >
          <RefreshCw size={13} />
          <span>Làm lại</span>
        </button>
      </div>

      {/* Target Vietnamese sentence card */}
      <div className="bg-[#FDFCF9] rounded-3xl p-5 border border-[#E8E2D5] shadow-paper mb-4 text-center">
        <div className="text-base sm:text-lg font-bold text-ink-900 leading-relaxed">
          "{challenge.vi}"
        </div>
      </div>

      {/* Placement Area */}
      <div className="min-h-[96px] p-4 bg-[#F9F6F0] rounded-3xl border-2 border-dashed border-[#D5C9B5] flex flex-wrap gap-2.5 items-center justify-center mb-4 transition-all">
        {selectedTokens.length === 0 ? (
          <span className="text-xs sm:text-sm text-ink-400 font-medium mx-auto text-center">
            Chạm các từ bên dưới để ghép câu hoàn chỉnh
          </span>
        ) : (
          selectedTokens.map((token, idx) => (
            <button
              key={idx}
              onClick={() => handleRemoveToken(token, idx)}
              className="px-3.5 py-2 rounded-2xl bg-[#FDFCF9] border border-cinnabar-300 shadow-sm text-ink-900 font-hanzi font-bold text-base sm:text-lg hover:bg-[#FCF3F2] active:scale-95 transition-all"
            >
              {token}
            </button>
          ))
        )}
      </div>

      {/* Token Pool */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-6 min-h-[70px]">
        {availableTokens.map((token, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectToken(token, idx)}
            className="px-3.5 py-2 rounded-2xl bg-[#FDFCF9] border border-[#D5C9B5] shadow-paper text-ink-900 font-hanzi font-bold text-base sm:text-lg hover:border-cinnabar-400 active:scale-95 transition-all"
          >
            {token}
          </button>
        ))}
      </div>

      {/* Feedback Banner */}
      {status === 'correct' && (
        <div className="p-4 rounded-3xl bg-[#F2F7F5] border border-jade-200 text-jade-900 mb-4 animate-fade-in space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 size={18} className="text-jade-600" />
            <span>Xếp đúng ngữ pháp rồi! 🎉</span>
            <button
              onClick={() => speakChinese(challenge.correct)}
              className="p-1 rounded-full text-jade-700 hover:bg-jade-100"
            >
              <Volume2 size={16} />
            </button>
          </div>
          <div className="text-sm text-jade-800 leading-relaxed pl-6">
            💡 <span className="font-semibold">Thầy nhắc:</span> {challenge.grammarNote}
          </div>
        </div>
      )}

      {status === 'wrong' && (
        <div className="p-3.5 rounded-2xl bg-[#FCF3F2] border border-[#F1CCC8] text-cinnabar-800 mb-4 animate-fade-in flex items-center gap-2 text-xs font-semibold">
          <XCircle size={17} className="text-cinnabar-600 flex-shrink-0" />
          <span>Thứ tự từ chưa chuẩn, bạn thử đổi vị trí thời gian hoặc động từ xem nhé.</span>
        </div>
      )}

      {/* Action Buttons */}
      {status === 'correct' ? (
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-2xl bg-jade-600 hover:bg-jade-700 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <span>Làm câu tiếp theo</span>
          <ArrowRight size={17} />
        </button>
      ) : (
        <button
          onClick={handleCheck}
          disabled={selectedTokens.length === 0}
          className="w-full py-3.5 rounded-2xl bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm shadow-sm active:scale-98 disabled:opacity-40 disabled:pointer-events-none transition-all"
        >
          Kiểm tra trật tự câu
        </button>
      )}
    </div>
  );
}
