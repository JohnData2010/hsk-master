import React, { useState } from 'react';
import { Search, ChevronRight, Volume2, Edit3, BookOpen, Lightbulb, Sparkles, Compass } from 'lucide-react';
import { speakChinese } from '../utils/audio';
import { getLearningTipForWord } from '../data/learningTips';

export default function CurriculumView({ levelData, onSelectLesson, onOpenWriter, onOpenPinyin }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!levelData) return null;

  const lessons = levelData.lessons || [];
  const words = levelData.words || [];

  // Filter words if searching
  const searchResults = searchQuery.trim()
    ? words.filter(w =>
        w.hanzi.includes(searchQuery) ||
        w.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.vietnamese.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.han_viet.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Search Bar - Warm paper texture */}
      <div className="relative mb-3">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tra nhanh chữ Hán, Pinyin, nghĩa tiếng Việt..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#FDFCF9] border-2 border-[#D5C9B5] text-sm font-medium text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-cinnabar-500/30 focus:border-cinnabar-500 shadow-paper transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-400 hover:text-ink-600"
          >
            Xóa
          </button>
        )}
      </div>

      {/* SEARCH RESULTS VIEW */}
      {searchQuery.trim() ? (
        <div className="space-y-3 mb-6">
          <div className="text-xs font-bold text-ink-600 px-1">
            Tìm thấy {searchResults.length} từ vựng:
          </div>
          {searchResults.length === 0 ? (
            <div className="text-center py-10 bg-[#FDFCF9] rounded-3xl border border-[#E8E2D5] text-xs text-ink-400">
              Không tìm thấy từ nào khớp với "{searchQuery}"
            </div>
          ) : (
            searchResults.map((w, idx) => {
              const tip = getLearningTipForWord(w);
              return (
                <div
                  key={w.id || idx}
                  className="p-4 rounded-2xl bg-[#FDFCF9] border-2 border-[#E8E2D5] shadow-paper space-y-2 hover:border-cinnabar-300 transition-all"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-2xl sm:text-3xl font-bold font-hanzi text-ink-900 tracking-wide">{w.hanzi}</span>
                        <span className="text-base sm:text-lg font-bold text-cinnabar-700 tracking-wide">{w.pinyin}</span>
                        <span className="text-[11px] font-bold uppercase bg-paper-200 text-ink-700 px-2 py-0.5 rounded border border-[#D5C9B5]">
                          {w.level}
                        </span>
                        {w.lesson_number && (
                          <span className="text-[11px] font-bold bg-[#FAF2E6] text-amberseal-800 px-2 py-0.5 rounded border border-[#EEDBBA]">
                            Bài {w.lesson_number}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-ink-900 mt-1.5 flex items-center flex-wrap gap-2">
                        <span className="bg-[#FAF2E6] text-amberseal-800 border border-[#EEDBBA] px-2.5 py-0.5 rounded-md text-xs font-bold">
                          {w.han_viet}
                        </span>
                        <span className="font-semibold text-ink-900 text-sm sm:text-base">"{w.vietnamese}"</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => onOpenWriter && onOpenWriter(w)}
                        className="p-2 rounded-xl text-ink-600 hover:text-cinnabar-600 hover:bg-paper-100 transition-colors"
                        title="Tập viết chữ này"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => speakChinese(w.hanzi, 0.65)}
                        className="p-2 rounded-xl text-cinnabar-600 hover:bg-cinnabar-50 transition-colors"
                        title="Nghe phát âm chậm"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Character Mnemonic Box */}
                  {tip && (
                    <div className="p-3 rounded-2xl bg-[#FAF8F2] border border-[#E8E0D0] space-y-1">
                      <div className="font-bold text-amberseal-900 flex items-center gap-1.5 text-xs sm:text-sm">
                        <Lightbulb size={15} className="text-amberseal-600 fill-amberseal-500 flex-shrink-0" />
                        <span>Mẹo nhớ chữ: {tip.breakdown}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-ink-700 leading-relaxed pl-5 font-normal">{tip.story}</div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* LESSONS LIST VIEW */
        <div className="space-y-3.5">
          {/* Level Header Banner */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#F4EFE6] border-2 border-[#DECFC0] shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink-900 tracking-tight">
                {levelData.title}
              </h2>
              <p className="text-xs text-ink-600 mt-1 leading-relaxed">
                {levelData.description}
              </p>
              <div className="flex items-center gap-2.5 mt-2.5 text-xs font-bold text-ink-700">
                <span className="bg-white/80 px-2.5 py-0.5 rounded-md border border-[#E0D7C7]">
                  {lessons.length} bài học
                </span>
                <span className="bg-white/80 px-2.5 py-0.5 rounded-md border border-[#E0D7C7]">
                  {words.length} từ vựng
                </span>
              </div>
            </div>
          </div>

          {/* Starter Lesson for HSK 1: Phonetics & Pinyin (Clean design consistent with standard lesson cards) */}
          {levelData.id === 'hsk1' && (
            <div
              onClick={onOpenPinyin}
              className="p-4 sm:p-4.5 rounded-3xl bg-[#FDFCF9] border-2 border-[#E8E2D5] shadow-paper hover:shadow-paper-hover hover:border-cinnabar-300 transition-all cursor-pointer group active:scale-[0.99] flex items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                {/* Lesson 0 Number Circle */}
                <div className="w-11 h-11 rounded-2xl bg-[#F4EFE6] border border-[#D5C9B5] text-cinnabar-600 font-extrabold flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-cinnabar-500 group-hover:text-white group-hover:border-cinnabar-600 transition-colors shadow-xs">
                  0
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold font-hanzi text-2xl text-ink-900 group-hover:text-cinnabar-600 transition-colors tracking-wide">
                      语音与声调
                    </h3>
                  </div>

                  <div className="text-sm font-bold text-cinnabar-700 mt-0.5">Yǔyīn yǔ Shēngdiào</div>
                  <div className="text-sm text-ink-800 font-medium mt-0.5">Bài 0: Ngữ âm Pinyin & 4 Thanh điệu</div>

                  {/* Clean informational badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-xs text-ink-600 font-medium">
                    <span className="inline-flex items-center gap-1 whitespace-nowrap bg-[#F4EFE6] px-2 py-0.5 rounded-lg border border-[#E0D7C7] text-[11px]">
                      4 thanh điệu
                    </span>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap bg-[#F4EFE6] px-2 py-0.5 rounded-lg border border-[#E0D7C7] text-[11px]">
                      23 thanh mẫu
                    </span>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap bg-[#F4EFE6] px-2 py-0.5 rounded-lg border border-[#E0D7C7] text-[11px]">
                      Quy tắc biến điệu
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Action */}
              <div className="flex items-center gap-1 text-ink-400 group-hover:text-cinnabar-600 font-bold text-xs flex-shrink-0 transition-colors">
                <span className="hidden sm:inline">Học bài</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}

          {/* Sequential Lesson Cards */}
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <div
                key={lesson.lesson}
                onClick={() => onSelectLesson(lesson)}
                className="p-4 sm:p-4.5 rounded-3xl bg-[#FDFCF9] border-2 border-[#E8E2D5] shadow-paper hover:shadow-paper-hover hover:border-cinnabar-300 transition-all cursor-pointer group active:scale-[0.99] flex items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {/* Lesson Number Circle */}
                  <div className="w-11 h-11 rounded-2xl bg-[#F4EFE6] border border-[#D5C9B5] text-cinnabar-600 font-extrabold flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-cinnabar-500 group-hover:text-white group-hover:border-cinnabar-600 transition-colors shadow-xs">
                    {lesson.lesson}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold font-hanzi text-2xl text-ink-900 group-hover:text-cinnabar-600 transition-colors tracking-wide">
                        {lesson.title_cn}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakChinese(lesson.title_cn, 0.65);
                        }}
                        className="text-ink-400 hover:text-cinnabar-600 p-0.5"
                        title="Nghe phát âm tên bài"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>

                    <div className="text-sm font-bold text-cinnabar-700 mt-0.5">{lesson.title_pinyin}</div>
                    <div className="text-sm text-ink-800 font-medium mt-0.5">{lesson.title_vi}</div>

                    {/* Badge Details */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-xs text-ink-600 font-medium">
                      <span className="inline-flex items-center gap-1 whitespace-nowrap bg-[#F4EFE6] px-2 py-0.5 rounded-lg border border-[#E0D7C7] text-[11px]">
                        {lesson.dialogues?.length || 1} bài khóa
                      </span>
                      <span className="inline-flex items-center gap-1 whitespace-nowrap bg-[#F4EFE6] px-2 py-0.5 rounded-lg border border-[#E0D7C7] text-[11px]">
                        {lesson.word_count || lesson.words?.length || 0} từ mới
                      </span>
                      {lesson.grammar && lesson.grammar.length > 0 && (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap bg-[#F4EFE6] px-2 py-0.5 rounded-lg border border-[#E0D7C7] text-[11px]">
                          {lesson.grammar.length} {lesson.lesson <= 2 ? 'chú thích' : 'ngữ pháp'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex items-center gap-1 text-ink-400 group-hover:text-cinnabar-600 font-bold text-xs flex-shrink-0 transition-colors">
                  <span className="hidden sm:inline">Học bài</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
