import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Volume2, Edit3, BookOpen, CheckCircle, Lightbulb, Play, Square, Eye, EyeOff, MessageSquare } from 'lucide-react';
import { speakChinese } from '../utils/audio';
import { getLearningTipForWord } from '../data/learningTips';

export default function LessonDetailModal({ lesson, level, onClose, onOpenWriter }) {
  // Tabs: 'dialogues' (课文), 'vocab' (生词), 'grammar' (语法), 'quiz' (练习)
  const [activeTab, setActiveTab] = useState('dialogues');
  const [selectedDialogueIdx, setSelectedDialogueIdx] = useState(0);
  const [showPinyinInDialogue, setShowPinyinInDialogue] = useState(true);
  const [showViInDialogue, setShowViInDialogue] = useState(true);
  
  // Dialogue Autoplay state
  const [isPlayingDialogue, setIsPlayingDialogue] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState(null);
  const playTimeoutRef = useRef(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const dialogues = lesson?.dialogues || [];
  const words = lesson?.words || [];
  const grammarList = lesson?.grammar || [];

  const stopDialogueAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
    }
    setIsPlayingDialogue(false);
    setActiveLineIdx(null);
  };

  // Stop dialogue audio if tab changes or modal closes
  useEffect(() => {
    return () => {
      stopDialogueAudio();
    };
  }, []);

  if (!lesson) return null;

  // Autoplay full dialogue
  const handlePlayFullDialogue = (diag) => {
    if (isPlayingDialogue) {
      stopDialogueAudio();
      return;
    }

    const lines = diag.lines || [];
    if (lines.length === 0) return;

    setIsPlayingDialogue(true);
    let currentIdx = 0;

    const playNextLine = () => {
      if (currentIdx >= lines.length) {
        setIsPlayingDialogue(false);
        setActiveLineIdx(null);
        return;
      }

      setActiveLineIdx(currentIdx);
      const line = lines[currentIdx];
      speakChinese(line.cn, 0.65);

      // Estimate duration based on Chinese char length
      const durationMs = Math.max(1600, line.cn.length * 360);
      currentIdx++;
      playTimeoutRef.current = setTimeout(playNextLine, durationMs);
    };

    playNextLine();
  };

  const currentDialogue = dialogues[selectedDialogueIdx] || dialogues[0];

  // Quiz questions wrapped in useMemo to prevent option re-shuffling on click
  const quizQuestions = useMemo(() => {
    return words.slice(0, 5).map((w, idx) => {
      const others = words.filter(o => o.hanzi !== w.hanzi).map(o => o.vietnamese);
      const shuffledWrong = others.sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [w.vietnamese, ...shuffledWrong].sort(() => 0.5 - Math.random());
      return {
        id: idx,
        word: w,
        question: `Chữ "${w.hanzi}" (${w.pinyin}) có nghĩa là gì?`,
        correct: w.vietnamese,
        options
      };
    });
  }, [lesson]);

  const handleSelectOption = (qId, option) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleGradeQuiz = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    setQuizScore(correct);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FDFCF9] rounded-3xl shadow-xl border-2 border-[#D5C9B5] max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-[#E8E2D5] flex items-start justify-between bg-[#F9F6F0]">
          <div>
            <div className="flex items-center gap-2">
              <span className="stamp-seal text-xs px-2.5 py-0.5">
                Bài {lesson.lesson}
              </span>
              <span className="text-xs text-ink-500 font-bold tracking-wider">{level?.toUpperCase()}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-ink-900 mt-1 font-hanzi flex items-center gap-2">
              <span>{lesson.title_cn}</span>
              <button
                onClick={() => speakChinese(lesson.title_cn, 0.65)}
                className="text-cinnabar-600 hover:text-cinnabar-700 p-1"
                title="Nghe tiêu đề chậm"
              >
                <Volume2 size={20} />
              </button>
            </h2>
            <div className="text-sm text-cinnabar-700 font-bold">{lesson.title_pinyin}</div>
            <div className="text-sm text-ink-700 font-medium">{lesson.title_vi}</div>
          </div>

          <button
            onClick={() => {
              stopDialogueAudio();
              onClose();
            }}
            className="p-2 rounded-full text-ink-400 hover:text-ink-700 hover:bg-paper-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Authentic BLCUP 4-Section Tab Switcher */}
        <div className="flex border-b border-[#E8E2D5] bg-[#F2ECE1] px-2 sm:px-3 pt-2 gap-1 overflow-x-auto text-xs font-bold no-scrollbar">
          <button
            onClick={() => {
              setActiveTab('dialogues');
              stopDialogueAudio();
            }}
            className={`pb-2.5 px-2.5 sm:px-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'dialogues'
                ? 'border-cinnabar-500 text-cinnabar-700 font-extrabold text-sm'
                : 'border-transparent text-ink-600 hover:text-ink-900'
            }`}
          >
            1. Bài khóa ({dialogues.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('vocab');
              stopDialogueAudio();
            }}
            className={`pb-2.5 px-2.5 sm:px-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'vocab'
                ? 'border-cinnabar-500 text-cinnabar-700 font-extrabold text-sm'
                : 'border-transparent text-ink-600 hover:text-ink-900'
            }`}
          >
            2. Từ mới ({words.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('grammar');
              stopDialogueAudio();
            }}
            className={`pb-2.5 px-2.5 sm:px-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'grammar'
                ? 'border-cinnabar-500 text-cinnabar-700 font-extrabold text-sm'
                : 'border-transparent text-ink-600 hover:text-ink-900'
            }`}
          >
            3. Ngữ pháp ({grammarList.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('quiz');
              stopDialogueAudio();
            }}
            className={`pb-2.5 px-2.5 sm:px-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'quiz'
                ? 'border-cinnabar-500 text-cinnabar-700 font-extrabold text-sm'
                : 'border-transparent text-ink-600 hover:text-ink-900'
            }`}
          >
            4. Luyện tập
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {/* SECTION 1: BÀI KHÓA (课文 - DIALOGUES) */}
          {activeTab === 'dialogues' && (
            <div className="space-y-4">
              {/* Dialogue Selector (Sub-tabs if multiple dialogues in this lesson) */}
              {dialogues.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {dialogues.map((d, dIdx) => (
                    <button
                      key={d.id || dIdx}
                      onClick={() => {
                        setSelectedDialogueIdx(dIdx);
                        stopDialogueAudio();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                        selectedDialogueIdx === dIdx
                          ? 'bg-cinnabar-500 text-white border-cinnabar-600 shadow-sm'
                          : 'bg-[#F2ECE1] text-ink-700 border-[#D5C9B5] hover:bg-paper-200'
                      }`}
                    >
                      Bài khóa {dIdx + 1}
                    </button>
                  ))}
                </div>
              )}

              {/* Dialogue Meta & Autoplay Bar */}
              {currentDialogue && (
                <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E8E2D5] flex items-center justify-between gap-2">
                  <div className="text-xs font-bold text-ink-700 flex items-center gap-1.5">
                    <span className="text-cinnabar-600">📍</span>
                    <span>{currentDialogue.location || 'Trong ngữ cảnh thực tế'}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Toggle Pinyin */}
                    <button
                      onClick={() => setShowPinyinInDialogue(p => !p)}
                      className={`p-1.5 rounded-lg border text-xs font-bold transition-colors ${
                        showPinyinInDialogue
                          ? 'bg-[#FAF2E6] text-amberseal-800 border-[#EEDBBA]'
                          : 'bg-white text-ink-400 border-paper-300'
                      }`}
                      title={showPinyinInDialogue ? 'Ẩn Pinyin để tự luyện đọc chữ Hán' : 'Hiện Pinyin'}
                    >
                      {showPinyinInDialogue ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>

                    {/* Toggle Vietnamese translation */}
                    <button
                      onClick={() => setShowViInDialogue(v => !v)}
                      className={`p-1.5 rounded-lg border text-xs font-bold transition-colors ${
                        showViInDialogue
                          ? 'bg-[#FCF3F2] text-cinnabar-700 border-cinnabar-200'
                          : 'bg-white text-ink-400 border-paper-300'
                      }`}
                      title={showViInDialogue ? 'Ẩn nghĩa tiếng Việt để thử sức' : 'Hiện nghĩa tiếng Việt'}
                    >
                      <MessageSquare size={16} />
                    </button>

                    {/* Play whole dialogue button */}
                    <button
                      onClick={() => handlePlayFullDialogue(currentDialogue)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                        isPlayingDialogue
                          ? 'bg-cinnabar-600 text-white animate-pulse'
                          : 'bg-cinnabar-500 hover:bg-cinnabar-600 text-white'
                      }`}
                      title="Nghe toàn bộ bài khóa tự động"
                    >
                      {isPlayingDialogue ? (
                        <>
                          <Square size={13} className="fill-white" />
                          <span>Dừng</span>
                        </>
                      ) : (
                        <>
                          <Play size={13} className="fill-white" />
                          <span>Nghe bài khóa</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Dialogue Speech Bubbles */}
              {currentDialogue?.lines ? (
                <div className="space-y-3.5 pt-1">
                  {currentDialogue.lines.map((line, lIdx) => {
                    const isSpeakerA = line.speaker === 'A';
                    const isActive = activeLineIdx === lIdx;

                    return (
                      <div
                        key={lIdx}
                        className={`flex gap-3 items-start transition-all ${
                          isSpeakerA ? 'flex-row' : 'flex-row-reverse'
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs flex-shrink-0 border shadow-xs ${
                            isSpeakerA
                              ? 'bg-cinnabar-100 text-cinnabar-800 border-cinnabar-300'
                              : 'bg-jade-100 text-jade-800 border-jade-300'
                          }`}
                        >
                          {line.speaker}
                        </div>

                        {/* Speech Bubble */}
                        <div
                          className={`p-3.5 sm:p-4 rounded-3xl max-w-[82%] border-2 transition-all space-y-1 shadow-sm ${
                            isActive
                              ? 'bg-[#FFF8E7] border-amberseal-500 ring-2 ring-amberseal-300 scale-[1.01]'
                              : isSpeakerA
                              ? 'bg-[#FDFCF9] border-[#E8E2D5] rounded-tl-sm'
                              : 'bg-[#F6FAF6] border-[#D6E6D6] rounded-tr-sm text-right'
                          }`}
                        >
                          {/* Chinese Text */}
                          <div className={`flex items-center gap-2 ${isSpeakerA ? 'justify-start' : 'justify-end'}`}>
                            <span className="text-xl sm:text-2xl font-bold font-hanzi text-ink-900 leading-relaxed">
                              {line.cn}
                            </span>
                            <button
                              onClick={() => speakChinese(line.cn, 0.65)}
                              className="text-cinnabar-600 hover:text-cinnabar-700 p-1 flex-shrink-0"
                              title="Nghe câu này"
                            >
                              <Volume2 size={17} />
                            </button>
                          </div>

                          {/* Pinyin */}
                          {showPinyinInDialogue && (
                            <div className="text-sm font-bold text-cinnabar-700 tracking-wide">
                              {line.pinyin}
                            </div>
                          )}

                          {/* Vietnamese Translation */}
                          {showViInDialogue && (
                            <div className="text-xs sm:text-sm text-ink-700 font-medium pt-0.5">
                              {line.vi}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-ink-400">
                  Không có nội dung bài khóa cho bài học này.
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: TỪ MỚI (生词 - VOCABULARY IN SEQUENTIAL ORDER) */}
          {activeTab === 'vocab' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-ink-500 px-1 flex items-center justify-between">
                <span>Từ mới xuất hiện lần lượt theo thứ tự bài khóa:</span>
                <span className="text-cinnabar-600 font-extrabold">{words.length} từ</span>
              </div>

              {words.map((w, idx) => {
                const tip = getLearningTipForWord(w);
                return (
                  <div
                    key={w.id || idx}
                    className="p-4 rounded-2xl border-2 border-[#E8E2D5] bg-[#FDFCF9] shadow-sm hover:border-cinnabar-200 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-paper-200 text-ink-500 font-extrabold text-xs flex items-center justify-center flex-shrink-0 border border-[#D5C9B5] mt-1">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-baseline gap-2.5">
                            <span className="text-3xl sm:text-4xl font-bold font-hanzi text-ink-900">{w.hanzi}</span>
                            <span className="text-lg font-bold text-cinnabar-700">{w.pinyin}</span>
                          </div>
                          <div className="text-sm text-ink-800 mt-1.5 flex items-center flex-wrap gap-1.5">
                            <span className="bg-[#FAF2E6] text-amberseal-800 border border-[#EEDBBA] px-2 py-0.5 rounded-md text-xs font-bold">
                              {w.han_viet}
                            </span>
                            <span className="font-semibold text-ink-900">"{w.vietnamese}"</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => onOpenWriter && onOpenWriter(w)}
                          className="p-2.5 rounded-xl text-ink-600 hover:text-cinnabar-600 hover:bg-paper-100 transition-colors"
                          title="Luyện viết từng nét"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => speakChinese(w.hanzi, 0.65)}
                          className="p-2.5 rounded-xl text-cinnabar-600 hover:bg-cinnabar-50 transition-colors"
                          title="Nghe phát âm chuẩn"
                        >
                          <Volume2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Authentic Example Sentence from Lesson */}
                    {w.example && (
                      <div className="p-3 rounded-xl bg-[#F9F6F0] border border-[#E8E2D5] text-xs space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold font-hanzi text-sm text-ink-900">{w.example.cn}</span>
                          <button
                            onClick={() => speakChinese(w.example.cn, 0.65)}
                            className="text-cinnabar-600 hover:text-cinnabar-700 p-0.5"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                        <div className="text-[11px] font-semibold text-cinnabar-700">{w.example.pinyin}</div>
                        <div className="text-[11px] text-ink-600">{w.example.vi}</div>
                      </div>
                    )}

                    {/* Mnemonic Story */}
                    {tip && (
                      <div className="p-3 rounded-xl bg-[#FAF8F2] border border-[#E8E0D0] text-xs text-ink-700 space-y-1">
                        <div className="font-bold text-amberseal-800 flex items-center gap-1.5 text-xs">
                          <Lightbulb size={14} className="text-amberseal-600 fill-amberseal-500 flex-shrink-0" />
                          <span>Chiết tự: {tip.breakdown}</span>
                        </div>
                        <p className="text-xs text-ink-700 leading-relaxed pl-5">
                          {tip.story}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* SECTION 3: NGỮ PHÁP (语法 / 注释 - GRAMMAR NOTES) */}
          {activeTab === 'grammar' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-ink-500 px-1">
                Các điểm ngữ pháp và chú thích trọng điểm trong bài:
              </div>

              {grammarList.map((g, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#FDFCF9] border-2 border-[#E8E2D5] shadow-paper space-y-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cinnabar-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-ink-900 text-base">{g.point}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-700 leading-relaxed pl-8">{g.explanation}</p>
                  
                  {g.example && (
                    <div className="mt-2 pl-8">
                      <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E8E2D5] text-sm flex items-center justify-between">
                        <div>
                          <span className="font-bold text-ink-900 font-hanzi text-lg leading-relaxed">{g.example}</span>
                        </div>
                        <button
                          onClick={() => speakChinese(g.example.split('(')[0].trim(), 0.65)}
                          className="text-cinnabar-600 hover:text-cinnabar-700 p-1 flex-shrink-0 ml-2"
                          title="Nghe câu ví dụ"
                        >
                          <Volume2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* SECTION 4: LUYỆN TẬP (练习 - QUIZ) */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-ink-500 px-1">
                Luyện tập củng cố kiến thức từ mới và bài khóa vừa học:
              </div>

              {quizQuestions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-[#FDFCF9] border-2 border-[#E8E2D5] shadow-paper space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink-400">Câu {idx + 1}</span>
                    <button
                      onClick={() => speakChinese(q.word.hanzi, 0.65)}
                      className="text-cinnabar-600 hover:text-cinnabar-800"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                  <div className="text-base font-bold text-ink-900">{q.question}</div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = quizAnswers[q.id] === opt;
                      const isGraded = quizScore !== null;
                      const isCorrect = opt === q.correct;

                      let btnStyle = 'bg-[#F9F6F0] border border-[#E8E2D5] text-ink-800 hover:bg-paper-200 text-sm';
                      if (isSelected) {
                        btnStyle = 'bg-[#FCF3F2] border-2 border-cinnabar-400 text-cinnabar-800 font-bold text-sm';
                      }
                      if (isGraded) {
                        if (isCorrect) btnStyle = 'bg-jade-50 border-2 border-jade-500 text-jade-800 font-bold text-sm';
                        else if (isSelected) btnStyle = 'bg-[#FCF3F2] border-2 border-cinnabar-400 text-cinnabar-800 line-through text-sm';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isGraded}
                          onClick={() => handleSelectOption(q.id, opt)}
                          className={`p-3.5 rounded-xl text-left font-medium transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-2 text-center">
                {quizScore === null ? (
                  <button
                    onClick={handleGradeQuiz}
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                    className="w-full py-3.5 rounded-2xl bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm shadow-sm disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    Xem kết quả bài học
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-jade-50 border border-jade-200 text-jade-900">
                    <div className="font-extrabold text-base mb-1">
                      Kết quả: {quizScore} / {quizQuestions.length} câu đúng! 🍵
                    </div>
                    <button
                      onClick={() => {
                        setQuizAnswers({});
                        setQuizScore(null);
                      }}
                      className="mt-2 text-xs font-bold text-jade-700 underline"
                    >
                      Làm lại một lần nữa
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
