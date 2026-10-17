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

/**
 * Speak Chinese text with beginner-friendly speed
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

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!text) {
    if (onEnd) onEnd();
    return;
  }

  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  
  // Rate: Complete beginner default is 0.65 (very clear, not rushed)
  utterance.rate = Math.max(0.4, Math.min(1.0, rate));
  utterance.pitch = 1.0; // stable pitch for accurate tones

  const bestVoice = getBestChineseVoice();
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = (e) => {
      console.warn('Speech error:', e);
      onEnd();
    };
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
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
