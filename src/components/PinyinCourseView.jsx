import React, { useState } from 'react';
import { Volume2, PlayCircle, Lightbulb, CheckCircle2, XCircle, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { speakChinese, playSoundEffect } from '../utils/audio';
import { TONES_GUIDE, TONE_RULES, INITIALS_DATA } from '../data/pinyinData';

export default function PinyinCourseView() {
  const [activeTab, setActiveTab] = useState('tones'); // 'tones', 'initials', 'quiz'

  // Quiz states for Tone Training
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStatus, setQuizStatus] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  // Generate 5 tone practice questions
  const toneQuestions = [
    { pinyin: "mā", tone: 1, char: "妈", vi: "Mẹ", options: [1, 2, 3, 4] },
    { pinyin: "hǎo", tone: 3, char: "好", vi: "Tốt / Đẹp", options: [1, 2, 3, 4] },
    { pinyin: "bà", tone: 4, char: "爸", vi: "Bố", options: [1, 2, 3, 4] },
    { pinyin: "lái", tone: 2, char: "来", vi: "Đến", options: [1, 2, 3, 4] },
    { pinyin: "shū", tone: 1, char: "书", vi: "Sách", options: [1, 2, 3, 4] },
  ];

  const currentQ = toneQuestions[quizIndex];

  const handlePlayToneSample = (text, slow = false) => {
    speakChinese(text, slow ? 0.45 : 0.65);
  };

  const handleAnswerQuiz = (toneNum) => {
    if (quizStatus !== null) return;
    setSelectedAnswer(toneNum);

    if (toneNum === currentQ.tone) {
      playSoundEffect('correct');
      setQuizStatus('correct');
      setQuizScore(prev => prev + 1);
    } else {
      playSoundEffect('wrong');
      setQuizStatus('wrong');
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex + 1 < toneQuestions.length) {
      setQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setQuizStatus(null);
    } else {
      setQuizStatus('finished');
    }
  };

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Intro Banner */}
      <div className="p-4 rounded-3xl bg-[#FDFCF9] border border-[#E8E2D5] shadow-paper mb-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-cinnabar-50 text-cinnabar-600 border border-cinnabar-200 flex items-center justify-center font-bold text-xl flex-shrink-0">
          声
        </div>
        <div>
          <h2 className="text-base font-extrabold text-ink-900">Ngữ Âm Pinyin & 4 Thanh Điệu</h2>
          <p className="text-xs text-ink-500 mt-0.5 leading-snug">
            Hướng dẫn phát âm thanh điệu, biến điệu và thanh mẫu chuẩn BLCUP.
          </p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-[#F2ECE1] p-1 rounded-2xl mb-4 text-xs font-bold border border-[#E0D7C7]">
        <button
          onClick={() => setActiveTab('tones')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'tones'
              ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold'
              : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          4 Thanh Điệu & Biến Điệu
        </button>
        <button
          onClick={() => setActiveTab('initials')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'initials'
              ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold'
              : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          23 Thanh Mẫu (Phụ âm)
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'quiz'
              ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold'
              : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          Luyện Tai Phân Biệt
        </button>
      </div>

      {/* TAB 1: 4 TONES & SANDHI RULES */}
      {activeTab === 'tones' && (
        <div className="space-y-4 animate-fade-in">
          {/* Tone Cards */}
          <div className="space-y-3">
            {TONES_GUIDE.map((item) => (
              <div
                key={item.tone}
                className="bg-[#FDFCF9] rounded-3xl p-4 sm:p-5 border border-[#E8E2D5] shadow-paper space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-cinnabar-500 text-white font-extrabold text-sm flex items-center justify-center">
                      {item.tone === 5 ? '·' : item.tone}
                    </span>
                    <h3 className="font-extrabold text-ink-900 text-base">{item.name}</h3>
                  </div>
                  <span className="text-xs font-bold text-cinnabar-600 bg-cinnabar-50 border border-cinnabar-200 px-3 py-1 rounded-xl">
                    Cao độ: {item.pitch}
                  </span>
                </div>

                <p className="text-sm text-ink-700 leading-relaxed">{item.howToSay}</p>
                <div className="text-sm text-amberseal-800 bg-[#FAF2E6] border border-[#EEDBBA] p-3 rounded-2xl leading-relaxed">
                  💡 <span className="font-semibold">Mẹo so sánh tiếng Việt:</span> {item.comparisonVi}
                </div>

                {/* Example Words */}
                <div className="pt-2">
                  <div className="text-xs font-bold text-ink-500 mb-2 uppercase tracking-wider">
                    Từ vựng thực hành:
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {item.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        onClick={() => handlePlayToneSample(ex.char)}
                        className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E8E2D5] hover:border-cinnabar-300 flex items-center justify-between cursor-pointer active:scale-95 transition-all shadow-sm"
                      >
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-hanzi font-bold text-3xl text-ink-900">{ex.char}</span>
                            <span className="text-lg font-bold text-cinnabar-600">{ex.pinyin}</span>
                          </div>
                          <div className="text-sm font-medium text-ink-700 mt-1">{ex.vi}</div>
                        </div>
                        <Volume2 size={20} className="text-cinnabar-600 flex-shrink-0" />
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Tone Sandhi Rules */}
          <div className="bg-[#FDFCF9] rounded-3xl p-5 border border-[#D5C9B5] shadow-paper space-y-3.5">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-ink-900 text-base">Quy tắc biến điệu thanh điệu</h3>
            </div>

            <div className="space-y-3 text-sm">
              {TONE_RULES.map((rule, rIdx) => (
                <div key={rIdx} className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#E8E2D5] space-y-2">
                  <div className="font-bold text-ink-900 text-sm sm:text-base">{rule.title}</div>
                  <p className="text-ink-700 leading-relaxed text-sm">{rule.rule}</p>
                  <div className="flex items-center justify-between text-cinnabar-800 bg-[#FCF3F2] border border-[#F1CCC8] p-3 rounded-2xl mt-1.5">
                    <span className="font-semibold text-sm">{rule.exampleVi}</span>
                    <button
                      onClick={() => handlePlayToneSample(rule.sampleAudio)}
                      className="p-1.5 rounded-xl text-cinnabar-600 hover:bg-cinnabar-100 flex-shrink-0 ml-2"
                      title="Nghe phát âm chuẩn biến điệu"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INITIALS (THANH MẪU) */}
      {activeTab === 'initials' && (
        <div className="space-y-3.5 animate-fade-in">
          <div className="text-sm text-ink-700 bg-[#FAF2E6] p-4 rounded-2xl border border-[#EEDBBA] leading-relaxed">
            💨 <span className="font-bold text-amberseal-800">Lưu ý âm BẬT HƠI:</span> Người Việt Nam thường quên bật hơi các âm <span className="font-bold text-cinnabar-600">p, t, k, q, ch, c</span>. Khi phát âm, đặt một mẩu giấy ăn trước miệng, giấy phải bay phấp phới mới chuẩn!
          </div>

          <div className="space-y-3">
            {INITIALS_DATA.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handlePlayToneSample(item.example ? item.example.split(' ')[0] : item.pinyin)}
                className="p-4 rounded-2xl bg-[#FDFCF9] border border-[#E8E2D5] shadow-paper hover:border-cinnabar-300 cursor-pointer active:scale-[0.99] transition-all flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-paper-100 border border-[#D5C9B5] text-cinnabar-600 font-extrabold text-xl flex items-center justify-center flex-shrink-0">
                    {item.pinyin}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink-900 text-base">Âm /{item.pinyin}/</span>
                      <span className="text-xs text-ink-500 font-mono">{item.ipa}</span>
                    </div>
                    <p className="text-sm text-ink-700 mt-1 leading-relaxed">{item.desc}</p>
                    <div className="text-sm text-cinnabar-700 font-semibold mt-1.5 flex items-center gap-1.5">
                      <span>Ví dụ:</span>
                      <span className="font-hanzi font-bold text-lg text-ink-900">{item.example}</span>
                    </div>
                  </div>
                </div>

                <button className="p-2.5 rounded-xl text-cinnabar-600 hover:bg-cinnabar-50 flex-shrink-0">
                  <Volume2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TONE HEARING QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-4 animate-fade-in">
          {quizStatus === 'finished' ? (
            <div className="bg-[#FDFCF9] rounded-3xl p-6 text-center border border-[#E8E2D5] shadow-paper">
              <Sparkles className="w-12 h-12 text-amberseal-500 mx-auto mb-3" />
              <h3 className="text-lg font-extrabold text-ink-900">Hoàn Thành Bài Luyện Tai! 🍵</h3>
              <p className="text-sm text-ink-500 mt-1 mb-5">
                Bạn đã phân biệt đúng <span className="font-bold text-cinnabar-600">{quizScore} / {toneQuestions.length}</span> thanh điệu.
              </p>
              <button
                onClick={() => {
                  setQuizIndex(0);
                  setSelectedAnswer(null);
                  setQuizStatus(null);
                  setQuizScore(0);
                }}
                className="w-full py-3.5 rounded-2xl bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm shadow-sm transition-all"
              >
                Luyện lại lần nữa
              </button>
            </div>
          ) : (
            <div className="bg-[#FDFCF9] rounded-3xl p-5 border border-[#E8E2D5] shadow-paper space-y-4">
              <div className="flex items-center justify-between text-xs text-ink-500 font-semibold">
                <span className="bg-[#F2ECE1] text-ink-700 px-3 py-1 rounded-xl border border-[#D5C9B5]">
                  Câu {quizIndex + 1} / {toneQuestions.length}
                </span>
                <span>Điểm: {quizScore}</span>
              </div>

              {/* Audio Box */}
              <div className="text-center py-5 bg-[#F9F6F0] rounded-2xl border border-[#E8E2D5]">
                <button
                  onClick={() => handlePlayToneSample(currentQ.char)}
                  className="w-16 h-16 rounded-full bg-cinnabar-500 text-white flex items-center justify-center mx-auto shadow-sm hover:bg-cinnabar-600 active:scale-95 transition-all mb-2.5"
                  title="Nghe phát âm"
                >
                  <Volume2 size={30} />
                </button>
                <div className="text-sm text-ink-700 font-bold">Chạm vào loa để nghe âm</div>
                <div className="text-xs text-ink-500 mt-1">
                  Nghĩa: "{currentQ.vi}"
                </div>

                {/* Slow audio button */}
                <button
                  onClick={() => handlePlayToneSample(currentQ.char, true)}
                  className="mt-2.5 text-xs font-semibold text-cinnabar-600 hover:underline"
                >
                  🐢 Nghe thật chậm (0.45x)
                </button>
              </div>

              {/* 4 Choices */}
              <div>
                <div className="text-sm font-bold text-ink-700 mb-2.5">Bạn vừa nghe được âm mang thanh mấy?</div>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((toneNum) => {
                    const isSelected = selectedAnswer === toneNum;
                    const isCorrect = toneNum === currentQ.tone;

                    let btnStyle = 'bg-[#FDFCF9] border-[#D5C9B5] text-ink-900 hover:border-cinnabar-400';
                    if (quizStatus !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-jade-50 border-2 border-jade-500 text-jade-800 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-[#FCF3F2] border-2 border-cinnabar-400 text-cinnabar-800 line-through';
                      }
                    }

                    return (
                      <button
                        key={toneNum}
                        disabled={quizStatus !== null}
                        onClick={() => handleAnswerQuiz(toneNum)}
                        className={`p-4 rounded-2xl border text-center font-bold text-base transition-all select-none ${btnStyle}`}
                      >
                        Thanh {toneNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Result explanation */}
              {quizStatus !== null && (
                <div className={`p-4 rounded-2xl text-sm leading-relaxed space-y-1.5 ${
                  quizStatus === 'correct'
                    ? 'bg-jade-50 border border-jade-200 text-jade-900'
                    : 'bg-[#FCF3F2] border border-[#F1CCC8] text-cinnabar-900'
                }`}>
                  <div className="font-bold flex items-center gap-1.5">
                    {quizStatus === 'correct' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    <span>{quizStatus === 'correct' ? 'Tai bạn nghe rất thính! Đúng rồi!' : 'Chưa đúng rồi!'}</span>
                  </div>
                  <div>
                    Đáp án đúng là: <span className="font-bold font-hanzi text-lg">{currentQ.char}</span> ({currentQ.pinyin}) mang <span className="font-bold">Thanh {currentQ.tone}</span>.
                  </div>
                </div>
              )}

              {quizStatus !== null && (
                <button
                  onClick={handleNextQuiz}
                  className="w-full py-3.5 rounded-2xl bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>{quizIndex + 1 < toneQuestions.length ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                  <ArrowRight size={17} />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
