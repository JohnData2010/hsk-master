// Speech recognition helper for Chinese pronunciation checking

export const isSpeechRecognitionSupported = () => {
  if (typeof window === 'undefined') return false;
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
};

export const createSpeechRecognizer = ({ onResult, onError, onEnd, onStart }) => {
  if (!isSpeechRecognitionSupported()) {
    if (onError) onError('Trình duyệt hiện tại chưa hỗ trợ nhận diện giọng nói (Web Speech API). Bạn nên dùng Chrome, Edge hoặc Safari.');
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'zh-CN';
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    if (onStart) onStart();
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (onResult) {
      onResult({
        final: finalTranscript.trim(),
        interim: interimTranscript.trim(),
        text: (finalTranscript || interimTranscript).trim()
      });
    }
  };

  recognition.onerror = (event) => {
    console.warn('Speech recognition error:', event.error);
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  return recognition;
};

// Compare user speech transcript with expected target Chinese sentence
export const evaluatePronunciation = (userSpeech, targetText) => {
  // Strip punctuation and spaces
  const cleanTarget = targetText.replace(/[，。！？,.!?、\s]/g, '');
  const cleanUser = userSpeech.replace(/[，。！？,.!?、\s]/g, '');

  if (!cleanUser) {
    return {
      score: 0,
      accuracy: 0,
      charDetails: cleanTarget.split('').map(c => ({ char: c, matched: false })),
      feedback: 'Chưa nhận diện được giọng nói. Bạn hãy nói to và rõ ràng hơn nhé!'
    };
  }

  const targetChars = cleanTarget.split('');
  const userChars = cleanUser.split('');
  
  let matchCount = 0;
  const charDetails = targetChars.map((char, index) => {
    // Check direct match or nearby match
    const matched = userChars.includes(char);
    if (matched) matchCount++;
    return {
      char,
      matched
    };
  });

  const accuracy = Math.min(100, Math.round((matchCount / targetChars.length) * 100));

  let score = accuracy;
  let feedback = '';

  if (score >= 90) {
    feedback = 'Phát âm chuẩn người bản xứ! Thanh điệu và âm tiết rất rõ ràng! 🎉';
  } else if (score >= 70) {
    feedback = 'Khá tốt! Người Trung Quốc hoàn toàn hiểu được bạn, chú ý thêm thanh điệu các từ màu đỏ nhé.';
  } else if (score >= 50) {
    feedback = 'Tạm được! Bạn cần nghe lại mẫu và nói chậm từng chữ để chuẩn khẩu hình.';
  } else {
    feedback = 'Cần luyện thêm! Hãy bấm nút loa nghe lại và bắt chước nhịp điệu của người bản xứ.';
  }

  return {
    score,
    accuracy,
    charDetails,
    cleanUser,
    cleanTarget,
    feedback
  };
};
