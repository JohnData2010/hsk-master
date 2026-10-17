// Complete Chinese Beginner Foundation: Pinyin, Tones, and Hanzi Strokes

export const TONES_GUIDE = [
  {
    tone: 1,
    name: "Thanh 1 (Thanh ngang)",
    mark: "ˉ (mā)",
    pitch: "5 - 5 (Cao & Bằng)",
    diagram: "━━━━━",
    howToSay: "Đọc cao và đều giọng như đang ngân một nốt nhạc cao. Giữ âm lượng và cao độ ổn định từ đầu đến cuối, không lên không xuống.",
    comparisonVi: "Tương tự như đọc từ không dấu của tiếng Việt nhưng ngân cao và dài hơi hơn.",
    examples: [
      { char: "妈", pinyin: "mā", vi: "Mẹ", sound: "mā" },
      { char: "八", pinyin: "bā", vi: "Số 8", sound: "bā" },
      { char: "吃", pinyin: "chī", vi: "Ăn", sound: "chī" },
      { char: "书", pinyin: "shū", vi: "Sách", sound: "shū" }
    ]
  },
  {
    tone: 2,
    name: "Thanh 2 (Thanh sắc đi lên)",
    mark: "ˊ (má)",
    pitch: "3 - 5 (Vút lên)",
    diagram: "  ／ ",
    howToSay: "Bắt đầu ở âm vực trung bình rồi vút nhanh lên cao độ cao nhất. Dứt khoát và đi lên.",
    comparisonVi: "Giống hệt dấu sắc tiếng Việt khi bạn ngạc nhiên hỏi: 'Hả? / Cái gì cơ?'",
    examples: [
      { char: "麻", pinyin: "má", vi: "Cây gai", sound: "má" },
      { char: "来", pinyin: "lái", vi: "Đến", sound: "lái" },
      { char: "白", pinyin: "bái", vi: "Trắng", sound: "bái" },
      { char: "学", pinyin: "xué", vi: "Học", sound: "xué" }
    ]
  },
  {
    tone: 3,
    name: "Thanh 3 (Thanh hỏi uốn lượn)",
    mark: "ˇ (mǎ)",
    pitch: "2 - 1 - 4 (Hạ sâu rồi nhấc lên)",
    diagram: "＼／",
    howToSay: "Hạ giọng xuống thật trầm ở cổ họng, sau đó hơi nhấc nhẹ âm lên.",
    comparisonVi: "Gần giống dấu hỏi tiếng Việt nhưng tông trầm hơn nhiều. Trong giao tiếp nhanh, người ta thường chỉ đọc nửa đầu (hạ trầm xuống).",
    examples: [
      { char: "马", pinyin: "mǎ", vi: "Con ngựa", sound: "mǎ" },
      { char: "好", pinyin: "hǎo", vi: "Tốt / Đẹp", sound: "hǎo" },
      { char: "你", pinyin: "nǐ", vi: "Bạn", sound: "nǐ" },
      { char: "水", pinyin: "shuǐ", vi: "Nước", sound: "shuǐ" }
    ]
  },
  {
    tone: 4,
    name: "Thanh 4 (Thanh rơi dứt khoát)",
    mark: "ˋ (mà)",
    pitch: "5 - 1 (Rơi từ đỉnh xuống đáy)",
    diagram: "＼  ",
    howToSay: "Bắt đầu ở đỉnh cao nhất rồi dằn giọng rơi thẳng xuống đáy, cực kỳ dứt khoát, không kéo dài.",
    comparisonVi: "⚠️ ĐỪNG đọc thành dấu huyền tiếng Việt! Hãy đọc dứt khoát như khi bạn ra lệnh: 'Đi! / Được!'",
    examples: [
      { char: "骂", pinyin: "mà", vi: "Mắng chửi", sound: "mà" },
      { char: "爸", pinyin: "bà", vi: "Bố", sound: "bà" },
      { char: "去", pinyin: "qù", vi: "Đi", sound: "qù" },
      { char: "不", pinyin: "bù", vi: "Không", sound: "bù" }
    ]
  },
  {
    tone: 5,
    name: "Khinh thanh (Âm nhẹ)",
    mark: "Không dấu (ma)",
    pitch: "Nhẹ & Ngắn",
    diagram: " · ",
    howToSay: "Đọc thật nhẹ, ngắn và tự nhiên, thường là âm thứ hai trong từ lặp lại hoặc trợ từ ngữ pháp.",
    comparisonVi: "Như một âm lướt nhẹ, không nhấn trọng âm.",
    examples: [
      { char: "妈妈", pinyin: "māma", vi: "Mẹ ơi", sound: "māma" },
      { char: "爸爸", pinyin: "bàba", vi: "Bố ơi", sound: "bàba" },
      { char: "的", pinyin: "de", vi: "Của", sound: "de" },
      { char: "吗", pinyin: "ma", vi: "Không?", sound: "ma" }
    ]
  }
];

export const TONE_RULES = [
  {
    title: "Quy tắc 1: Hai thanh 3 đi liền nhau (3 + 3 ➔ 2 + 3)",
    rule: "Khi hai âm mang thanh 3 đứng cạnh nhau, âm thứ nhất bắt buộc phải biến điệu đọc thành thanh 2.",
    exampleVi: "Ví dụ: '你好' (Bạn khỏe không) có Pinyin gốc là 'Nǐ hǎo', nhưng khi đọc BẮT BUỘC phải đọc là 'Ní hǎo'.",
    sampleAudio: "你好"
  },
  {
    title: "Quy tắc 2: Biến điệu của chữ 不 (bù)",
    rule: "Chữ '不' mang thanh 4 (bù). Nhưng khi đứng trước một từ MANG THANH 4 khác, '不' phải biến thành thanh 2 (bú).",
    exampleVi: "Ví dụ: '不是' (không phải) đọc là 'bú shì' (thay vì bù shì); '不客气' đọc là 'bú kèqi'.",
    sampleAudio: "不是"
  },
  {
    title: "Quy tắc 3: Biến điệu của chữ 一 (yī)",
    rule: "Chữ '一' mang thanh 1 (yī khi đếm số). Đứng trước thanh 4 nó đổi thành thanh 2 (yí gè). Đứng trước thanh 1, 2, 3 nó đổi thành thanh 4 (yì tiān, yì qǐ).",
    exampleVi: "Ví dụ: '一个' đọc là 'yí gè'; '一天' đọc là 'yì tiān'.",
    sampleAudio: "一个"
  }
];

export const INITIALS_DATA = [
  { pinyin: "b", ipa: "[p]", desc: "Âm hai môi: phát âm gần giống chữ 'p' trong tiếng Việt, KHÔNG bật hơi.", example: "爸爸 (bàba)" },
  { pinyin: "p", ipa: "[pʰ]", desc: "Âm hai môi BẬT HƠI: mím chặt môi rồi bật luồng hơi mạnh ra ngoài (như 'p' bật hơi).", example: "苹果 (píngguǒ)" },
  { pinyin: "m", ipa: "[m]", desc: "Âm hai môi: phát âm như chữ 'm' tiếng Việt.", example: "妈妈 (māma)" },
  { pinyin: "f", ipa: "[f]", desc: "Âm răng môi: phát âm như chữ 'ph' tiếng Việt.", example: "飞机 (fēijī)" },
  { pinyin: "d", ipa: "[t]", desc: "Âm đầu lưỡi: phát âm gần như chữ 't' tiếng Việt, không bật hơi.", example: "大 (dà)" },
  { pinyin: "t", ipa: "[tʰ]", desc: "Âm đầu lưỡi BẬT HƠI: phát âm gần như chữ 'th' tiếng Việt, đẩy hơi mạnh.", example: "天气 (tiānqì)" },
  { pinyin: "n", ipa: "[n]", desc: "Âm đầu lưỡi: phát âm như chữ 'n' tiếng Việt.", example: "你 (nǐ)" },
  { pinyin: "l", ipa: "[l]", desc: "Âm đầu lưỡi: phát âm như chữ 'l' tiếng Việt.", example: "老师 (lǎoshī)" },
  { pinyin: "g", ipa: "[k]", desc: "Âm cuống lưỡi: phát âm gần như chữ 'c/k' tiếng Việt, không bật hơi.", example: "高兴 (gāoxìng)" },
  { pinyin: "k", ipa: "[kʰ]", desc: "Âm cuống lưỡi BẬT HƠI: phát âm như 'kh' nhưng có luồng hơi tống mạnh từ cuống họng.", example: "看 (kàn)" },
  { pinyin: "h", ipa: "[x]", desc: "Âm cuống lưỡi: đọc nhẹ giữa chữ 'h' và 'kh' tiếng Việt.", example: "喝 (hē)" },
  { pinyin: "j", ipa: "[tɕ]", desc: "Âm mặt lưỡi: mặt lưỡi áp sát ngạc cứng, đọc như chữ 'ch' nhẹ tiếng Việt.", example: "几 (jǐ)" },
  { pinyin: "q", ipa: "[tɕʰ]", desc: "Âm mặt lưỡi BẬT HƠI: khẩu hình như 'j' nhưng bật luồng hơi cực mạnh ra.", example: "请 (qǐng)" },
  { pinyin: "x", ipa: "[ɕ]", desc: "Âm mặt lưỡi: phát âm như chữ 'x' nhẹ tiếng Việt.", example: "谢谢 (xièxie)" },
  { pinyin: "zh", ipa: "[ʈʂ]", desc: "Âm uốn lưỡi: đầu lưỡi cong lên chạm ngạc cứng, đọc như 'tr' nặng, không bật hơi.", example: "中国 (zhōngguó)" },
  { pinyin: "ch", ipa: "[ʈʂʰ]", desc: "Âm uốn lưỡi BẬT HƠI: cong lưỡi như 'zh' nhưng bật luồng hơi mạnh ra.", example: "茶 (chá)" },
  { pinyin: "sh", ipa: "[ʂ]", desc: "Âm uốn lưỡi: cong lưỡi phát âm như chữ 's' nặng miền Nam tiếng Việt.", example: "是 (shì)" },
  { pinyin: "r", ipa: "[ʐ]", desc: "Âm uốn lưỡi: phát âm như 'r' tiếng Việt nhưng rung nhẹ đầu lưỡi.", example: "热 (rè)" },
  { pinyin: "z", ipa: "[ts]", desc: "Âm đầu lưỡi trước: đầu lưỡi thẳng chạm mặt sau răng trên, đọc như 'ch' bẹt.", example: "字 (zì)" },
  { pinyin: "c", ipa: "[tsʰ]", desc: "Âm đầu lưỡi trước BẬT HƠI: khẩu hình như 'z' nhưng bật mạnh luồng hơi.", example: "菜 (cài)" },
  { pinyin: "s", ipa: "[s]", desc: "Âm đầu lưỡi trước: đầu lưỡi thẳng, đọc như chữ 'x' xì hơi răng.", example: "四 (sì)" }
];

export const BASIC_STROKES = [
  { name: "Ngang", cn: "横 (héng)", shape: "一", desc: "Vẽ từ trái sang phải, hơi chếch nhẹ lên trên ở đuôi nét.", example: "一, 二, 三, 十" },
  { name: "Sổ", cn: "竖 (shù)", shape: "丨", desc: "Vẽ thẳng đứng từ trên xuống dưới, thẳng và vững chãi.", example: "十, 中, 上" },
  { name: "Phẩy", cn: "撇 (piě)", shape: "丿", desc: "Vẽ cong từ trên sang trái dưới, nhọn dần ở phần đuôi.", example: "人, 八, 大" },
  { name: "Mác", cn: "捺 (nà)", shape: "乀", desc: "Vẽ nghiêng từ trên sang phải dưới, đuôi nét đè nặng rồi hất nhẹ.", example: "人, 大, 天" },
  { name: "Điểm (Chấm)", cn: "点 (diǎn)", shape: "丶", desc: "Chấm gọn gàng từ trên xuống hơi chếch sang phải.", example: "下, 太, 六" },
  { name: "Hất", cn: "提 (tí)", shape: "㇀", desc: "Vẽ từ dưới hất chéo chếch lên trên về phía bên phải.", example: "我, 地" },
  { name: "Gập", cn: "折 (zhé)", shape: "𠃍", desc: "Đổi hướng bút gấp khúc (ngang gập hoặc sổ gập).", example: "口, 日, 四" },
  { name: "Móc", cn: "钩 (gōu)", shape: "亅", desc: "Cuối nét sổ hoặc nét cong thì móc ngược nhọn lên.", example: "小, 你, 了" }
];

export const STROKE_RULES = [
  { title: "1. Ngang trước, Sổ sau", desc: "Viết nét ngang trước, nét sổ cắt qua viết sau.", example: "十 (ngang 一 trước, sổ 丨 sau)" },
  { title: "2. Phẩy trước, Mác sau", desc: "Nét phẩy bên trái viết trước, nét mác bên phải viết sau.", example: "人, 八, 大" },
  { title: "3. Trên trước, Dưới sau", desc: "Viết các nét hoặc bộ phận ở trên trước, dưới sau.", example: "二, 三, 旦" },
  { title: "4. Trái trước, Phải sau", desc: "Phần bên trái viết trước, phần bên phải viết sau.", example: "你, 他, 好" },
  { title: "5. Ngoài trước, Trong sau", desc: "Khung bao bên ngoài viết trước, nội dung bên trong viết sau.", example: "同, 月, 风" },
  { title: "6. Vào trước, Đóng sau", desc: "Vào phòng trước rồi mới đóng cửa (viết khung ngoài ➔ viết ruột ➔ nét ngang đáy đóng lại).", example: "日, 四, 国" },
  { title: "7. Giữa trước, Hai bên sau", desc: "Nét chính ở giữa viết trước, hai bên tả hữu viết sau.", example: "小, 水, 永" }
];
