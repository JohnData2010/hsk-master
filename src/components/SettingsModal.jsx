import React, { useState, useEffect } from 'react';
import { X, Volume2, Key, RotateCcw, Check, Sliders } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../utils/nativeGrader';

export default function SettingsModal({ settings, onUpdateSettings, onClose, onResetProgress }) {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setApiKey(getStoredApiKey());
  }, []);

  const handleSaveApiKey = () => {
    setStoredApiKey(apiKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FDFCF9] rounded-3xl shadow-xl border border-[#D5C9B5] max-w-md w-full p-6 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5] mb-5">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-cinnabar-600" />
            <h3 className="font-extrabold text-ink-900 text-base">Cài Đặt Học Tập</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-ink-400 hover:text-ink-700 hover:bg-paper-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {/* Tốc độ đọc phát âm */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-bold text-ink-800">
              <span className="flex items-center gap-1.5">
                <Volume2 size={15} className="text-cinnabar-500" />
                Tốc độ đọc giọng mẫu
              </span>
              <span className="bg-[#FAF2E6] text-amberseal-700 border border-[#EEDBBA] px-2 py-0.5 rounded-lg font-bold">
                {settings?.speechRate || 0.65}x
              </span>
            </div>
            <input
              type="range"
              min="0.4"
              max="1.1"
              step="0.05"
              value={settings?.speechRate || 0.65}
              onChange={(e) => onUpdateSettings({ ...settings, speechRate: parseFloat(e.target.value) })}
              className="w-full accent-cinnabar-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-ink-400 font-medium">
              <span>Rất chậm cho người mới (0.4x)</span>
              <span>Bình thường (0.65x)</span>
              <span>Đời thực (1.0x)</span>
            </div>
          </div>

          {/* Hiển thị Pinyin */}
          <div className="flex items-center justify-between py-2 border-t border-[#E8E2D5]">
            <div>
              <div className="font-bold text-ink-800">Hiện phiên âm Pinyin</div>
              <div className="text-[11px] text-ink-400">Tắt đi nếu bạn muốn thử thách nhớ mặt chữ Hán</div>
            </div>
            <input
              type="checkbox"
              checked={settings?.showPinyin ?? true}
              onChange={(e) => onUpdateSettings({ ...settings, showPinyin: e.target.checked })}
              className="w-4 h-4 accent-cinnabar-500 rounded cursor-pointer"
            />
          </div>

          {/* Hiển thị Hán Việt */}
          <div className="flex items-center justify-between py-2 border-t border-[#E8E2D5]">
            <div>
              <div className="font-bold text-ink-800">Hiện âm Hán - Việt</div>
              <div className="text-[11px] text-ink-400">Rất hữu ích cho người Việt liên tưởng nghĩa gốc</div>
            </div>
            <input
              type="checkbox"
              checked={settings?.showHanViet ?? true}
              onChange={(e) => onUpdateSettings({ ...settings, showHanViet: e.target.checked })}
              className="w-4 h-4 accent-cinnabar-500 rounded cursor-pointer"
            />
          </div>

          {/* Gemini API Key */}
          <div className="pt-2 border-t border-[#E8E2D5] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-ink-800">
              <Key size={15} className="text-amberseal-500" />
              <span>Khóa Google Gemini API (Tùy chọn)</span>
            </div>
            <p className="text-[11px] text-ink-400 leading-relaxed">
              Ứng dụng đã có sẵn Thầy Vương hỗ trợ sửa câu 100% offline. Nếu bạn muốn mở rộng chấm mọi câu văn tự do không giới hạn, có thể nhập khóa API miễn phí từ Google AI Studio:
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 p-2.5 rounded-xl bg-[#F9F6F0] border border-[#D5C9B5] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-cinnabar-500"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 bg-cinnabar-500 hover:bg-cinnabar-600 text-white rounded-xl font-bold text-xs shadow-sm flex items-center gap-1"
              >
                {isSaved ? <Check size={13} /> : null}
                <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
              </button>
            </div>
          </div>

          {/* Reset tiến độ */}
          <div className="pt-3 border-t border-[#E8E2D5] flex items-center justify-between">
            <div>
              <div className="font-bold text-cinnabar-600 text-xs">Đặt lại tiến độ học tập</div>
              <div className="text-[11px] text-ink-400">Xóa dữ liệu ôn tập thẻ SRS và XP</div>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học tập không?')) {
                  if (onResetProgress) onResetProgress();
                }
              }}
              className="px-3 py-1.5 rounded-xl border border-cinnabar-300 text-cinnabar-600 text-xs font-bold hover:bg-[#FCF3F2] active:scale-95 transition-all flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Đặt lại</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
