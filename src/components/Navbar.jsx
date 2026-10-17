import React from 'react';
import { Flame, Star, Settings, ChevronDown } from 'lucide-react';

export default function Navbar({ currentLevel, onSelectLevel, userStats, onOpenSettings }) {
  return (
    <header className="sticky top-0 z-40 bg-[#F9F6F0]/90 backdrop-blur-md border-b border-[#E8E2D5] transition-all">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Seal Stamp Logo & App Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cinnabar-500 text-[#FDFCF9] flex items-center justify-center font-hanzi font-bold text-2xl shadow-sm border border-cinnabar-600/40 select-none">
            漢
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-ink-900 text-base tracking-tight font-hanzi hidden xs:inline">
                HSK Sổ Tay
              </span>
              {/* Level Dropdown styled like a warm paper badge */}
              <div className="relative inline-block">
                <select
                  value={currentLevel}
                  onChange={(e) => onSelectLevel(e.target.value)}
                  className="appearance-none bg-paper-100 hover:bg-paper-200 text-cinnabar-600 font-bold text-xs sm:text-sm pl-3 pr-7 py-1 rounded-xl border border-[#D5C9B5] cursor-pointer focus:outline-none focus:ring-2 focus:ring-cinnabar-500/40 transition-all shadow-sm"
                >
                  <option value="hsk1">HSK 1 (Nhập môn)</option>
                  <option value="hsk2">HSK 2 (Sơ cấp)</option>
                  <option value="hsk3">HSK 3 (Trung cấp)</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-cinnabar-600 pointer-events-none" />
              </div>
            </div>
            <p className="text-[11px] text-ink-400 font-medium hidden sm:block">Giáo trình thực tế & Đồng hành bản xứ</p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 bg-paper-100 border border-[#D5C9B5] px-3 py-1 rounded-xl text-amberseal-600 text-xs sm:text-sm font-bold shadow-sm"
            title="Chuỗi ngày chuyên cần"
          >
            <Flame size={16} className="text-amberseal-500 fill-amberseal-500" />
            <span>{userStats?.streak || 1}</span>
            <span className="text-[11px] text-ink-400 font-medium hidden xs:inline">ngày</span>
          </div>

          {/* XP */}
          <div
            className="flex items-center gap-1.5 bg-paper-100 border border-[#D5C9B5] px-3 py-1 rounded-xl text-jade-600 text-xs sm:text-sm font-bold shadow-sm"
            title="Điểm chuyên cần"
          >
            <Star size={16} className="text-jade-500 fill-jade-500" />
            <span>{userStats?.xp || 0}</span>
            <span className="text-[11px] text-ink-400 font-medium hidden xs:inline">XP</span>
          </div>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-ink-600 hover:text-ink-900 hover:bg-paper-200 active:scale-95 transition-all"
            title="Cài đặt"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
