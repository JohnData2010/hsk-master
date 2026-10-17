import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, BookOpen, MessageSquare, ChevronRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakChinese } from '../utils/audio';
import { createSpeechRecognizer, evaluatePronunciation, isSpeechRecognitionSupported } from '../utils/speechRecognition';
import { evaluateNativeTask } from '../utils/nativeGrader';
import { updateUserStats } from '../utils/srs';
import nativePrompts from '../data/native_prompts.json';

export default function NativeAIEvaluator({ currentLevel = 'hsk1' }) {
  const [activeSubMode, setActiveSubMode] = useState('writing'); // 'writing' or 'speaking'
  const [prompts, setPrompts] = useState([]);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [userText, setUserText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Speech recognition states
  const [isRecording, setIsRecording] = useState(false);
  const [speechResult, setSpeechResult] = useState(null);
  const [recognizer, setRecognizer] = useState(null);
  const [micNotice, setMicNotice] = useState(null);

  // Filter prompts by level
  useEffect(() => {
    const filtered = nativePrompts.filter(p => p.level === currentLevel);
    setPrompts(filtered.length > 0 ? filtered : nativePrompts);
    setSelectedPromptIndex(0);
    setUserText('');
    setEvaluationResult(null);
    setSpeechResult(null);
    setMicNotice(null);
  }, [currentLevel]);

  const currentPrompt = prompts[selectedPromptIndex] || nativePrompts[0];

  // Initialize speech recognition
  useEffect(() => {
    if (!isSpeechRecognitionSupported()) return;

    const rec = createSpeechRecognizer({
      onStart: () => {
        setIsRecording(true);
        setMicNotice(null);
      },
      onEnd: () => setIsRecording(false),
      onError: (err) => {
        setIsRecording(false);
        console.warn('Speech error:', err);
        if (err === 'not-allowed') {
          setMicNotice('Trình duyệt chưa được cấp quyền Micro. Vui lòng bật quyền truy cập Micro trên thanh địa chỉ để luyện nói!');
        } else if (err === 'audio-capture') {
          setMicNotice('Không tìm thấy thiết bị thu âm Micro trên máy tính/điện thoại.');
        } else if (err === 'no-speech') {
          setMicNotice('Chưa nghe thấy giọng nói, bạn hãy thử lại và nói to hơn chút nhé.');
        } else {
          setMicNotice('Không thể thu âm giọng nói lúc này. Bạn hãy thử lại nhé.');
        }
      },
      onResult: (res) => {
        setUserText(res.text);
        if (res.final) {
          setIsRecording(false);
          const evalScore = evaluatePronunciation(res.final, currentPrompt.target_cn);
          setSpeechResult(evalScore);
          if (evalScore.score >= 85) {
            confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
          }
        }
      }
    });

    setRecognizer(rec);

    return () => {
      if (rec) {
        try { rec.abort(); } catch (e) {}
      }
    };
  }, [currentPrompt]);

  const toggleRecording = () => {
    if (!recognizer) {
      alert('Trình duyệt chưa hỗ trợ ghi âm tiếng Trung. Bạn hãy dùng Chrome hoặc Edge trên điện thoại/máy tính nhé!');
      return;
    }
    if (isRecording) {
      recognizer.stop();
      setIsRecording(false);
    } else {
      setSpeechResult(null);
      try {
        recognizer.start();
      } catch (e) {
        console.warn('Start record err:', e);
      }
    }
  };

  const handleGradeWriting = async () => {
    if (!userText.trim()) return;
    setIsEvaluating(true);
    setEvaluationResult(null);

    try {
      const result = await evaluateNativeTask(currentPrompt, userText);
      setEvaluationResult(result);
      if (result.score >= 80) {
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      }
      updateUserStats(20, 3);
    } catch (e) {
      console.error('Grading error:', e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-2">
      {/* Teacher Persona Introduction Card */}
      <div className="bg-[#FDFCF9] rounded-3xl p-4 border border-[#E8E2D5] shadow-paper mb-4 flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-[#F2ECE1] border border-[#D5C9B5] text-2xl flex items-center justify-center flex-shrink-0 select-none shadow-sm">
          👨🏻‍🏫
        </div>
        <div>
          <h3 className="font-extrabold text-ink-900 text-sm">Thầy Vương (王老师)</h3>
          <p className="text-xs text-ink-500 mt-0.5 leading-snug">
            "Cứ viết hoặc nói tự nhiên, thầy sẽ hỗ trợ sửa lỗi và cách dùng từ chuẩn nhé."
          </p>
        </div>
      </div>

      {/* Submode Switcher */}
      <div className="flex bg-[#F2ECE1] p-1 rounded-2xl mb-4 text-xs font-bold border border-[#E0D7C7]">
        <button
          onClick={() => {
            setActiveSubMode('writing');
            setEvaluationResult(null);
            setSpeechResult(null);
          }}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeSubMode === 'writing'
              ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold'
              : 'text-ink-600 hover:text-ink-800'
          }`}
        >
          ✍️ Viết câu
        </button>
        <button
          onClick={() => {
            setActiveSubMode('speaking');
            setEvaluationResult(null);
            setSpeechResult(null);
          }}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeSubMode === 'speaking'
              ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold'
              : 'text-ink-600 hover:text-ink-800'
          }`}
        >
          🎙️ Luyện phát âm
        </button>
      </div>

      {/* Challenge Prompt Box */}
      <div className="bg-[#FDFCF9] rounded-3xl p-5 border border-[#E8E2D5] shadow-paper mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cinnabar-600 bg-cinnabar-50 border border-cinnabar-200 px-2 py-0.5 rounded-md">
            {currentPrompt.category}
          </span>

          <select
            value={selectedPromptIndex}
            onChange={(e) => {
              setSelectedPromptIndex(Number(e.target.value));
              setUserText('');
              setEvaluationResult(null);
              setSpeechResult(null);
            }}
            className="text-xs font-semibold text-ink-600 bg-paper-100 border border-[#D5C9B5] rounded-xl px-2.5 py-1 focus:outline-none"
          >
            {prompts.map((p, idx) => (
              <option key={p.id} value={idx}>
                Bài {idx + 1}: {p.category}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm sm:text-base font-extrabold text-ink-900 leading-snug">
          {currentPrompt.prompt_vi}
        </div>

        {activeSubMode === 'speaking' && (
          <div className="mt-3.5 p-4 rounded-2xl bg-[#F9F6F0] border border-[#E8E2D5] flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-xl font-bold font-hanzi text-ink-900 tracking-wide leading-relaxed">{currentPrompt.target_cn}</div>
              <div className="text-xs sm:text-sm font-semibold text-cinnabar-700 mt-1">{currentPrompt.target_pinyin}</div>
            </div>
            <button
              onClick={() => speakChinese(currentPrompt.target_cn)}
              className="p-3 rounded-xl bg-cinnabar-50 text-cinnabar-600 hover:bg-cinnabar-100 transition-colors flex-shrink-0 ml-3"
              title="Nghe thầy đọc mẫu"
            >
              <Volume2 size={20} />
            </button>
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      {activeSubMode === 'writing' ? (
        <div className="bg-[#FDFCF9] rounded-3xl p-4 border border-[#E8E2D5] shadow-paper mb-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-ink-500 font-medium">
            <span>Nhập câu tiếng Trung của bạn:</span>
            <button
              onClick={toggleRecording}
              className={`flex items-center gap-1 font-bold px-2 py-0.5 rounded-lg transition-all ${
                isRecording ? 'bg-cinnabar-600 text-white animate-pulse' : 'text-cinnabar-600 hover:bg-cinnabar-50'
              }`}
            >
              <Mic size={14} />
              <span>{isRecording ? 'Đang nghe bạn...' : 'Nói bằng mic'}</span>
            </button>
          </div>

          <textarea
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Ví dụ: 你好，我是越南人..."
            rows={3}
            className="w-full p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#D5C9B5] text-ink-900 font-hanzi font-bold text-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-cinnabar-500/30 transition-all resize-none placeholder:font-sans placeholder:font-normal placeholder:text-xs placeholder:text-ink-400"
          />

          <button
            onClick={handleGradeWriting}
            disabled={!userText.trim() || isEvaluating}
            className="w-full py-3.5 rounded-2xl bg-cinnabar-500 hover:bg-cinnabar-600 text-white font-bold text-sm shadow-sm active:scale-98 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
          >
            {isEvaluating ? (
              <span className="animate-pulse">Thầy Vương đang xem bài cho bạn...</span>
            ) : (
              <span>Gửi thầy Vương nhận xét</span>
            )}
          </button>
        </div>
      ) : (
        /* SPEAKING PRONUNCIATION RECORDER */
        <div className="bg-[#FDFCF9] rounded-3xl p-6 border border-[#E8E2D5] shadow-paper mb-4 text-center">
          <div className="text-sm text-ink-600 font-medium mb-3.5">
            Chạm vào mic để đọc câu mẫu:
          </div>

          <button
            onClick={toggleRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-sm transition-all duration-300 ${
              isRecording
                ? 'bg-cinnabar-600 text-white ring-8 ring-cinnabar-100 scale-105 animate-pulse'
                : 'bg-cinnabar-500 text-white hover:bg-cinnabar-600 hover:scale-102 active:scale-95'
            }`}
          >
            {isRecording ? <MicOff size={30} /> : <Mic size={30} />}
          </button>

          <div className="text-xs font-bold text-ink-700 mt-3">
            {isRecording ? 'Thầy đang lắng nghe bạn đọc...' : 'Chạm để bắt đầu nói'}
          </div>

          {micNotice && (
            <div className="mt-3.5 p-3 rounded-2xl bg-[#FAF2E6] border border-[#EEDBBA] text-amberseal-800 text-xs flex items-center justify-between gap-2 text-left">
              <span>⚠️ {micNotice}</span>
              <button onClick={() => setMicNotice(null)} className="font-bold text-amberseal-700 hover:text-amberseal-900 px-1">✕</button>
            </div>
          )}

          {userText && (
            <div className="mt-4 p-3.5 rounded-2xl bg-[#F9F6F0] text-ink-700 text-xs text-left">
              <span className="text-ink-500 font-medium">Giọng của bạn thu được: </span>
              <span className="font-bold text-ink-900 font-hanzi text-lg block mt-1">{userText}</span>
            </div>
          )}
        </div>
      )}

      {/* PRONUNCIATION EVALUATION RESULT */}
      {activeSubMode === 'speaking' && speechResult && (
        <div className="bg-[#FDFCF9] rounded-3xl p-5 border border-[#E8E2D5] shadow-paper mb-4 animate-fade-in space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
            <div>
              <div className="text-xs font-bold text-ink-400 uppercase">Điểm phát âm</div>
              <div className="text-3xl font-extrabold text-cinnabar-600">{speechResult.score} / 100</div>
            </div>
            <div className="p-2.5 rounded-2xl bg-paper-200 border border-[#D5C9B5] text-ink-800 font-bold text-xs">
              Độ chuẩn: {speechResult.accuracy}%
            </div>
          </div>

          {/* Character Match Breakdown */}
          <div>
            <div className="text-xs font-bold text-ink-600 mb-2">Kết quả từng âm tiết:</div>
            <div className="flex flex-wrap gap-2">
              {speechResult.charDetails.map((item, idx) => (
                <div
                  key={idx}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-hanzi font-bold text-xl border shadow-sm ${
                    item.matched
                      ? 'bg-jade-50 text-jade-700 border-jade-200'
                      : 'bg-[#FCF3F2] text-cinnabar-700 border-cinnabar-200'
                  }`}
                  title={item.matched ? 'Phát âm chuẩn' : 'Chưa rõ âm/lệch thanh điệu'}
                >
                  {item.char}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs text-ink-500 mt-2">
              <span className="flex items-center gap-1 text-jade-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-jade-500" /> Đúng âm
              </span>
              <span className="flex items-center gap-1 text-cinnabar-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-cinnabar-500" /> Cần chỉnh lại
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F9F6F0] border border-[#E8E2D5] text-sm text-ink-800 leading-relaxed">
            💬 <span className="font-bold text-ink-900">Thầy Vương nhắn:</span> {speechResult.feedback}
          </div>
        </div>
      )}

      {/* WRITING EVALUATION RESULT (THẦY VƯƠNG NHẬN XÉT) */}
      {activeSubMode === 'writing' && evaluationResult && (
        <div className="bg-[#FDFCF9] rounded-3xl p-5 border border-[#D5C9B5] shadow-paper mb-4 animate-fade-in space-y-4">
          {/* Header Note */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
            <div>
              <div className="text-[11px] font-bold text-ink-400 uppercase tracking-wider">
                Sổ tay góp ý của Thầy Vương
              </div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-3xl font-extrabold text-cinnabar-600">{evaluationResult.score}</span>
                <span className="text-xs text-ink-400 font-semibold">/ 100 điểm</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-bold text-ink-400 uppercase">Độ tự nhiên</div>
              <span className="inline-block px-2.5 py-0.5 rounded-lg bg-[#FAF2E6] text-amberseal-600 border border-[#EEDBBA] font-extrabold text-xs">
                Mức {evaluationResult.authenticityRating}
              </span>
            </div>
          </div>

          {/* Comparison */}
          <div className="space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-[#F9F6F0] border border-[#E8E2D5] text-xs">
              <div className="text-ink-500 font-medium mb-1">Câu của bạn:</div>
              <div className="font-hanzi font-bold text-ink-900 text-lg">{userText}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FCF3F2] border border-cinnabar-200 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-cinnabar-800 font-bold flex items-center gap-1 text-xs sm:text-sm">
                  Cách nói bản xứ (地道说法):
                </span>
                <button
                  onClick={() => speakChinese(evaluationResult.nativeExpression)}
                  className="text-cinnabar-600 hover:text-cinnabar-800 p-1"
                  title="Nghe đọc mẫu"
                >
                  <Volume2 size={18} />
                </button>
              </div>
              <div className="font-hanzi font-bold text-cinnabar-900 text-lg sm:text-xl mt-1 tracking-wide leading-relaxed">
                {evaluationResult.nativeExpression}
              </div>
              {evaluationResult.nativePinyin && (
                <div className="text-cinnabar-700 font-semibold text-xs sm:text-sm mt-0.5">
                  {evaluationResult.nativePinyin}
                </div>
              )}
            </div>
          </div>

          {/* Grammar Corrections */}
          {evaluationResult.grammarErrors && evaluationResult.grammarErrors.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#FAF2E6] border border-[#EEDBBA] text-sm space-y-2">
              <div className="font-bold text-amberseal-800 flex items-center gap-1.5 text-sm">
                <AlertCircle size={16} className="text-amberseal-600 flex-shrink-0" />
                <span>Lưu ý ngữ pháp:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-amberseal-900 leading-relaxed pl-1 text-xs sm:text-sm">
                {evaluationResult.grammarErrors.map((err, eIdx) => (
                  <li key={eIdx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Cultural & Linguistic Insight */}
          <div className="text-xs sm:text-sm text-ink-800 leading-relaxed bg-[#F9F6F0] p-4 rounded-2xl border border-[#E8E2D5]">
            <span className="font-bold text-ink-900">💡 Thầy mách nhỏ: </span>
            {evaluationResult.nativeExplanation}
          </div>

          {/* Teacher's personal encouragement */}
          <div className="p-3.5 rounded-2xl bg-[#F2F7F5] border border-jade-200 text-xs sm:text-sm text-jade-800 flex items-start gap-2.5">
            <span className="text-base flex-shrink-0">🍵</span>
            <div className="leading-relaxed">
              <span className="font-bold text-jade-900">Lời dặn của thầy: </span>
              {evaluationResult.teacherEncouragement}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
