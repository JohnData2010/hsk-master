// Native Chinese Grader & Feedback Engine ("Lão Sư Bản Địa Chấm Bài")

export const getStoredApiKey = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('hsk_master_gemini_api_key') || '';
};

export const setStoredApiKey = (key) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('hsk_master_gemini_api_key', key.trim());
};

// Call Gemini API if user has their own API key
export const evaluateWithGemini = async (apiKey, promptInfo, userInput) => {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = `
Bạn là "Vương Lão Sư" (王老师) - một giáo viên bản ngữ tiếng Trung tại Bắc Kinh có 15 năm kinh nghiệm dạy người Việt Nam học HSK từ cấp 1 đến cấp 3.
Nhiệm vụ của bạn là chấm điểm bài viết tiếng Trung của học viên, chỉ ra lỗi ngữ pháp, lỗi dùng từ "tiếng bồi", và đặc biệt là dạy họ cách diễn đạt CHUẨN BẢN ĐỊA (地道说法) của người Trung Quốc trong đời thực.
Hãy trả về DUY NHẤT một chuỗi JSON hợp lệ không bọc trong markdown code fence, với cấu trúc:
{
  "score": <số nguyên từ 0 đến 100>,
  "authenticityRating": "<A+ / A / B / C>",
  "grammarErrors": ["<mô tả lỗi 1 bằng tiếng Việt>", "<lỗi 2...>"],
  "nativeExpression": "<cách người Trung Quốc bản xứ sẽ nói câu này>",
  "nativePinyin": "<phiên âm Pinyin cho câu bản xứ>",
  "nativeExplanation": "<giải thích chi tiết tại sao người bản xứ nói như vậy, sắc thái văn hóa, từ lóng hoặc thói quen khẩu ngữ>",
  "teacherEncouragement": "<lời động viên ấm áp, hóm hỉnh của Vương Lão Sư bằng tiếng Việt>"
}
`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: systemInstruction },
          {
            text: `
Đề bài: ${promptInfo.prompt_vi}
Trình độ: ${promptInfo.level}
Đáp án mẫu chuẩn sách giáo khoa: ${promptInfo.target_cn}
Câu học viên viết: "${userInput}"
Hãy chấm bài cho học viên này thật chi tiết, công tâm và đậm chất bản xứ!`
          }
        ]
      }
    ]
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Lỗi kết nối Gemini API');
  }

  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  // Clean markdown fence and extract JSON object safely
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleaned);
};

// Built-in intelligent offline evaluator (works 100% without any API key!)
export const evaluateOffline = (promptInfo, userInput) => {
  const cleanInput = (userInput || '').trim();
  if (!cleanInput) {
    return {
      score: 0,
      authenticityRating: "C",
      grammarErrors: ["Bạn chưa nhập câu trả lời."],
      nativeExpression: promptInfo.native_variant || promptInfo.target_cn,
      nativePinyin: promptInfo.target_pinyin,
      nativeExplanation: "Hãy thử gõ câu tiếng Trung của bạn để nhận xét nhé!",
      teacherEncouragement: "Đừng ngại sai! Cứ mạnh dạn viết ra từng chữ Hán nhé bạn!"
    };
  }

  const keywords = promptInfo.keywords || [];
  let foundKeywords = 0;
  const missingKeywords = [];

  keywords.forEach(kw => {
    if (cleanInput.includes(kw)) {
      foundKeywords++;
    } else {
      missingKeywords.push(kw);
    }
  });

  const keywordRatio = keywords.length > 0 ? foundKeywords / keywords.length : 1;

  // Check common Chinese learners mistakes
  const grammarErrors = [];

  // 1. Time at the end of sentence (e.g., 我去北京明天)
  const timeWords = ["今天", "明天", "昨天", "现在", "最近", "上午", "下午", "晚上"];
  for (let t of timeWords) {
    if (cleanInput.endsWith(t) || cleanInput.endsWith(t + "。") || cleanInput.endsWith(t + "！")) {
      grammarErrors.push(`Lỗi trật tự thời gian: Bạn đặt '${t}' ở cuối câu theo thói quen tiếng Việt. Trong tiếng Trung, trạng ngữ chỉ thời gian phải đứng TRƯỚC động từ (hoặc đầu câu).`);
    }
  }

  // 2. Measure words check (e.g., 一书 instead of 一本书, 一水 instead of 一杯水)
  if (/一[书人杯车衣服]/.test(cleanInput)) {
    grammarErrors.push("Lỗi thiếu lượng từ: Sau số từ (như 一, 两, 三...) trong tiếng Trung bắt buộc phải có lượng từ thích hợp (ví dụ: 一本书, 一个人, 一件衣服).");
  }

  // 3. Negation in past with 不 instead of 没
  if (cleanInput.includes("不有") || cleanInput.includes("不去了") || cleanInput.includes("不买了")) {
    grammarErrors.push("Lỗi phủ định: Phủ định của '有' luôn là '没有' (không bao giờ dùng '不有'). Khi phủ định hành động trong quá khứ, dùng '没/没有' và bỏ trợ từ '了'.");
  }

  // 4. Missing required structure
  if (promptInfo.keywords?.includes("把") && !cleanInput.includes("把")) {
    grammarErrors.push("Đề bài yêu cầu câu chữ 把 (bǎ). Cấu trúc chuẩn: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác (bổ ngữ/了).");
  }
  if (promptInfo.keywords?.includes("被") && !cleanInput.includes("被") && !cleanInput.includes("叫") && !cleanInput.includes("让")) {
    grammarErrors.push("Đề bài yêu cầu câu bị động chữ 被 (bèi). Cấu trúc: Tân ngữ chịu tác động + 被 + Kẻ tác động + Động từ + 了.");
  }
  if (promptInfo.keywords?.includes("比") && !cleanInput.includes("比")) {
    grammarErrors.push("Đề bài yêu cầu câu so sánh hơn với chữ 比. Cấu trúc: A + 比 + B + Tính từ.");
  }

  // Calculate score
  let score = Math.round(keywordRatio * 75 + (cleanInput.length >= 4 ? 20 : 10));
  if (grammarErrors.length > 0) {
    score = Math.max(30, score - grammarErrors.length * 15);
  }

  // Direct exact match
  if (cleanInput.replace(/[，。！？,.!?\s]/g, '') === promptInfo.target_cn.replace(/[，。！？,.!?\s]/g, '')) {
    score = 98;
  }
  if (promptInfo.native_variant && cleanInput.replace(/[，。！？,.!?\s]/g, '') === promptInfo.native_variant.replace(/[，。！？,.!?\s]/g, '')) {
    score = 100;
  }

  let authenticityRating = "B";
  let teacherEncouragement = "";

  if (score >= 90) {
    authenticityRating = "A+";
    teacherEncouragement = "太棒了！(Tuyệt đỉnh!) Câu văn của bạn cực kỳ lưu loát, dùng từ chuẩn xác như một bạn trẻ sinh ra ở Bắc Kinh vậy. Hãy giữ vững phong độ này nhé!";
  } else if (score >= 75) {
    authenticityRating = "A";
    teacherEncouragement = "很好！(Rất tốt!) Người bản xứ hoàn toàn hiểu trọn vẹn ý của bạn. Hãy xem thêm phần 'Cách nói bản địa' bên dưới để nâng tầm khẩu ngữ thêm tự nhiên nhé.";
  } else if (score >= 55) {
    authenticityRating = "B";
    teacherEncouragement = "不错！(Khá lắm!) Bạn đã nắm được ý chính, nhưng câu còn hơi đậm chất 'dịch từng từ tiếng Việt'. Đọc kỹ phần sửa lỗi ngữ pháp của thầy để rút kinh nghiệm nhé.";
  } else {
    authenticityRating = "C";
    teacherEncouragement = "加油！(Cố lên!) Học ngoại ngữ thì ai cũng phải vấp váp những câu đầu tiên. Thầy đã để sẵn câu chuẩn bản địa bên dưới, bạn hãy bấm loa nghe rồi luyện đọc to lại 3 lần nhé!";
  }

  return {
    score,
    authenticityRating,
    grammarErrors,
    missingKeywords,
    nativeExpression: promptInfo.native_variant || promptInfo.target_cn,
    nativePinyin: promptInfo.target_pinyin,
    nativeExplanation: promptInfo.native_explanation || "Người bản xứ thường chú trọng sự tự nhiên, ngữ điệu mềm mại và tính văn cảnh trong khẩu ngữ đời thường.",
    grammarFocus: promptInfo.grammar_focus,
    teacherEncouragement
  };
};

export const evaluateNativeTask = async (promptInfo, userInput) => {
  const apiKey = getStoredApiKey();
  if (apiKey) {
    try {
      return await evaluateWithGemini(apiKey, promptInfo, userInput);
    } catch (err) {
      console.warn('Gemini evaluation failed, falling back to offline evaluator:', err);
      const fallback = evaluateOffline(promptInfo, userInput);
      fallback.apiWarning = `(Không thể kết nối Gemini API: ${err.message}. Đã chuyển sang chấm bằng bộ máy bản ngữ nội bộ)`;
      return fallback;
    }
  }
  // Otherwise use local offline evaluator
  return evaluateOffline(promptInfo, userInput);
};
