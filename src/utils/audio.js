// Optimized Audio utility for Chinese learners with ultra-clear pronunciation and beginner-friendly speeds

let selectedVoice = null;

// Best voice selection prioritizing natural standard Mandarin (zh-CN)
const getBestChineseVoice = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  if (selectedVoice) return selectedVoice;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Priority order for natural Mandarin Chinese voices
  const voice =
    voices.find(v => v.lang === 'zh-CN' && (v.name.includes('Xiaoxiao') || v.name.includes('Yunxi') || v.name.includes('Natural') || v.name.includes('Google'))) ||
    voices.find(v => v.lang === 'zh-CN' || v.lang === 'cmn-Hans-CN') ||
    voices.find(v => v.lang.startsWith('zh') && !v.lang.includes('TW') && !v.lang.includes('HK')) ||
    voices.find(v => v.lang.startsWith('zh'));

  if (voice) {
    selectedVoice = voice;
  }
  return voice;
};

// Listen for voicesloaded event (Chrome / Safari need this)
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    selectedVoice = null;
    getBestChineseVoice();
  };
}

// Set to retain SpeechSynthesisUtterance references in JS memory, preventing Chrome/WebKit premature GC cut-offs
const activeUtterances = new Set();
let speechResumeInterval = null;

/**
 * Clean Chinese text before passing to TTS voice:
 * - Removes bracketed annotations (both ASCII and fullwidth)
 * - Removes speaker prefixes (e.g. "A: ", "B: ", "王老师：")
 * - Cleans stray markdown formatting symbols
 */
export const cleanChineseText = (text) => {
  if (!text) return '';
  let cleaned = String(text);
  // Remove content in brackets / parentheses
  cleaned = cleaned.replace(/\([^)]*\)/g, ' ');
  cleaned = cleaned.replace(/（[^）]*）/g, ' ');
  cleaned = cleaned.replace(/\[[^\]]*\]/g, ' ');
  cleaned = cleaned.replace(/【[^】]*】/g, ' ');
  // Remove speaker prefixes like "A: ", "B: ", "李老师："
  cleaned = cleaned.replace(/^[A-Za-z\u4e00-\u9fa5]{1,6}[：:]\s*/, ' ');
  // Remove markdown symbols
  cleaned = cleaned.replace(/[#*~_`]/g, '');
  return cleaned.trim();
};

/**
 * Stop any currently playing speech immediately and clear timers
 */
export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (speechResumeInterval) {
      clearInterval(speechResumeInterval);
      speechResumeInterval = null;
    }
    window.speechSynthesis.cancel();
    activeUtterances.clear();
  }
};

/**
 * Speak Chinese text with beginner-friendly speed and robust lifecycle management
 * @param {string} text - Chinese characters or pinyin
 * @param {number} rate - default 0.65 (slow, clear for learners). Can be set to 0.45 for ultra-slow pronunciation
 * @param {function} onEnd - callback when done
 */
export const speakChinese = (text, rate = 0.65, onEnd = null) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech first
  stopSpeech();

  const cleaned = cleanChineseText(text);
  if (!cleaned) {
    if (onEnd) onEnd();
    return;
  }

  // Small timeout (15ms) after cancel to avoid Chromium race condition where speak() is dropped immediately after cancel()
  setTimeout(() => {
    try {
      // Ensure synthesizer is not paused
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = 'zh-CN';
      utterance.rate = Math.max(0.4, Math.min(1.0, rate));
      utterance.pitch = 1.0; // stable pitch for accurate tones

      const bestVoice = getBestChineseVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      // Keep strong reference to prevent GC premature cut-off in Chromium
      activeUtterances.add(utterance);

      let finished = false;
      let safetyTimeout = null;

      const finish = () => {
        if (finished) return;
        finished = true;
        if (safetyTimeout) {
          clearTimeout(safetyTimeout);
          safetyTimeout = null;
        }
        if (speechResumeInterval && activeUtterances.size <= 1) {
          clearInterval(speechResumeInterval);
          speechResumeInterval = null;
        }
        activeUtterances.delete(utterance);
        if (onEnd) {
          try {
            onEnd();
          } catch (err) {
            console.error('Error in onEnd callback:', err);
          }
        }
      };

      utterance.onend = () => {
        finish();
      };

      utterance.onerror = (e) => {
        // e.error === 'canceled' or 'interrupted' is normal when stopSpeech() is called
        finish();
      };

      // Safety timeout: in case browser drops onend event, trigger finish after expected maximum duration
      const estimatedMaxMs = Math.max(4500, Math.ceil((cleaned.length * 1600) / utterance.rate) + 2500);
      safetyTimeout = setTimeout(() => {
        if (!finished && !window.speechSynthesis.speaking) {
          finish();
        }
      }, estimatedMaxMs);

      // Start periodic resume pulse to work around Chromium 15-second speech silence bug
      if (!speechResumeInterval) {
        speechResumeInterval = setInterval(() => {
          if (!window.speechSynthesis.speaking) {
            clearInterval(speechResumeInterval);
            speechResumeInterval = null;
          } else if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        }, 3000);
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('speakChinese error:', err);
      if (onEnd) onEnd();
    }
  }, 15);
};

// Play short auditory feedback for writing and quizzes
export const playSoundEffect = (type = 'correct') => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'correct') {
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15);
      gain1.gain.setValueAtTime(0.18, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.35);
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'level_up') {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.25);
      });
    }
  } catch (err) {}
};
