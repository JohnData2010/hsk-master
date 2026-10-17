import urllib.request
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Starting HSK Data Builder...")

# 1. Download Hanviet Data
print("Fetching Hanviet Data...")
url_hv = 'https://raw.githubusercontent.com/ph0ngp/hanviet-pinyin-words/main/src/hanvietData.js'
with urllib.request.urlopen(url_hv) as r:
    raw_hv = r.read().decode('utf-8').replace('export const hanvietData = ', '').rstrip(';\n')
    hv_data = json.loads(raw_hv)
print(f"Loaded {len(hv_data)} Hanviet characters.")

# 2. Download CVDICT
print("Fetching CVDICT Vietnamese Dictionary...")
url_cv = 'https://raw.githubusercontent.com/phucbm/xue-hanzi/main/src/data/cvdict.json'
with urllib.request.urlopen(url_cv) as r:
    cvdict = json.loads(r.read().decode('utf-8'))
print(f"Loaded {len(cvdict)} CVDICT entries.")

# Custom Vietnamese overrides for common HSK words for ultra-clear meanings
VIETNAMESE_OVERRIDES = {
    "你好": "Xin chào",
    "谢谢": "Cảm ơn",
    "不客气": "Đừng khách sáo, không có chi",
    "再见": "Tạm biệt",
    "请": "Xin, mời; vui lòng",
    "对不起": "Xin lỗi",
    "没关系": "Không sao đâu, không có gì",
    "是": "Là, phải, đúng",
    "有": "Có",
    "看": "Nhìn, xem, đọc",
    "听": "Nghe",
    "说话": "Nói chuyện",
    "读": "Đọc",
    "写": "Viết",
    "看见": "Nhìn thấy",
    "叫": "Gọi là, tên là",
    "来": "Đến, tới",
    "回": "Về, quay lại",
    "去": "Đi",
    "吃": "Ăn",
    "喝": "Uống",
    "睡觉": "Ngủ",
    "打电话": "Gọi điện thoại",
    "做": "Làm",
    "买": "Mua",
    "开": "Mở, lái (xe), bật",
    "坐": "Ngồi, đi (tàu, xe, máy bay)",
    "住": "Ở, sinh sống",
    "学习": "Học tập",
    "工作": "Làm việc, công việc",
    "下雨": "Mưa, trời mưa",
    "爱": "Yêu, thích",
    "喜欢": "Thích",
    "想": "Muốn, nhớ, suy nghĩ",
    "认识": "Quen biết, nhận biết",
    "会": "Biết (qua học hỏi), có thể, sẽ",
    "能": "Có thể (có khả năng hoặc điều kiện)",
    "好": "Tốt, đẹp, khỏe, được",
    "多": "Nhiều",
    "少": "Ít",
    "冷": "Lạnh",
    "热": "Nóng",
    "高兴": "Vui vẻ, hân hoan",
    "漂亮": "Đẹp, xinh đẹp",
    "大": "To, lớn",
    "小": "Nhỏ, bé",
    "我": "Tôi, tao, mình",
    "你": "Bạn, anh, chị, cậu",
    "他": "Anh ấy, ông ấy, cậu ấy",
    "她": "Cô ấy, bà ấy, chị ấy",
    "我们": "Chúng tôi, chúng ta",
    "这": "Đây, này",
    "这儿": "Ở đây, chỗ này",
    "那": "Kia, đó",
    "那儿": "Ở kia, chỗ đó",
    "哪": "Nào",
    "哪儿": "Ở đâu, chỗ nào",
    "谁": "Ai",
    "什么": "Cái gì",
    "多少": "Bao nhiêu",
    "几": "Mấy (số lượng dưới 10)",
    "怎么": "Làm sao, thế nào",
    "怎么样": "Như thế nào, ra sao",
    "一": "Một (1)",
    "二": "Hai (2)",
    "三": "Ba (3)",
    "四": "Bốn (4)",
    "五": "Năm (5)",
    "六": "Sáu (6)",
    "七": "Bảy (7)",
    "八": "Tám (8)",
    "九": "Chín (9)",
    "十": "Mười (10)",
    "零": "Số 0",
    "个": "Cái, con, người (lượng từ chung)",
    "岁": "Tuổi",
    "本": "Cuốn, quyển (sách)",
    "些": "Một số, vài",
    "块": "Đồng, tệ, miếng, cục",
    "不": "Không (phủ định hiện tại, tương lai)",
    "没": "Không, chưa (phủ định quá khứ, sở hữu)",
    "很": "Rất",
    "太": "Quá, lắm",
    "都": "Đều, tất cả",
    "和": "Và, cùng",
    "在": "Ở, tại; đang",
    "的": "Của (trợ từ sở hữu, kết cấu)",
    "了": "Rồi (trợ từ ngữ khí/hoàn thành)",
    "吗": "Không? Có phải không? (trợ từ nghi vấn)",
    "呢": "Còn... thì sao? (trợ từ ngữ khí)",
    "喂": "Alo (khi nghe điện thoại)",
    "家": "Nhà, gia đình",
    "学校": "Trường học",
    "饭馆": "Nhà hàng, quán ăn",
    "商店": "Cửa hàng, tiệm",
    "医院": "Bệnh viện",
    "火车站": "Ga xe lửa, ga tàu",
    "中国": "Trung Quốc",
    "北京": "Bắc Kinh",
    "上": "Trên, lên",
    "下": "Dưới, xuống",
    "前面": "Phía trước",
    "后面": "Phía sau",
    "里": "Trong, bên trong",
    "今天": "Hôm nay",
    "明天": "Ngày mai",
    "昨天": "Hôm qua",
    "上午": "Buổi sáng",
    "中午": "Buổi trưa",
    "下午": "Buổi chiều",
    "年": "Năm",
    "月": "Tháng",
    "日": "Ngày",
    "星期": "Tuần, thứ",
    "点": "Giờ, điểm; chút ít",
    "分钟": "Phút",
    "现在": "Bây giờ, hiện tại",
    "时候": "Lúc, khi",
    "爸爸": "Bố, ba, cha",
    "妈妈": "Mẹ, má",
    "儿子": "Con trai",
    "女儿": "Con gái",
    "老师": "Thầy cô giáo",
    "学生": "Học sinh, sinh viên",
    "同学": "Bạn cùng học",
    "朋友": "Bạn bè",
    "医生": "Bác sĩ",
    "先生": "Ông, ngài, chồng",
    "小姐": "Cô gái, tiểu thư",
    "衣服": "Quần áo",
    "水": "Nước",
    "菜": "Món ăn, rau",
    "米饭": "Cơm",
    "水果": "Hoa quả, trái cây",
    "苹果": "Quả táo",
    "茶": "Trà, chè",
    "杯子": "Cái cốc, cái ly",
    "钱": "Tiền",
    "飞机": "Máy bay",
    "出租车": "Xe taxi",
    "电视": "Ti vi",
    "电脑": "Máy vi tính",
    "电影": "Phim điện ảnh",
    "天气": "Thời tiết",
    "猫": "Con mèo",
    "狗": "Con chó",
    "东西": "Đồ vật, đồ đạc",
    "人": "Người",
    "名字": "Tên, họ tên",
    "书": "Sách",
    "汉语": "Tiếng Trung, tiếng Hán",
    "字": "Chữ, từ",
    "桌子": "Cái bàn",
    "椅子": "Cái ghế"
}

def clean_vietnamese(hanzi, cv_entry):
    if hanzi in VIETNAMESE_OVERRIDES:
        return VIETNAMESE_OVERRIDES[hanzi]
    if cv_entry and 'vi' in cv_entry:
        vi_raw = cv_entry['vi']
        # Remove Lượng từ: [suo3] tags or / Lượng từ ...
        parts = [p.strip() for p in vi_raw.split('/') if 'Lượng từ:' not in p and 'LT:' not in p]
        if parts:
            first = parts[0]
            # remove brackets
            import re
            first = re.sub(r'\[.*?\]', '', first).strip()
            return first
    return "Ý nghĩa từ vựng"

def extract_hanviet(trad_word, numeric_pinyin):
    pinyins = numeric_pinyin.lower().split()
    res = []
    for idx, char in enumerate(trad_word):
        if char in hv_data:
            py = pinyins[idx] if idx < len(pinyins) else None
            m = hv_data[char].get(py, list(hv_data[char].values())[0]) if hv_data[char] else []
            res.append(m[0] if m else char)
        else:
            res.append(char)
    return ' '.join(res).capitalize()

# 3. Load HSK 1, 2, 3 words from drkameleon
levels_data = {}
all_words_list = []

for lvl in [1, 2, 3]:
    url = f'https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/main/wordlists/exclusive/old/{lvl}.json'
    print(f"Downloading HSK {lvl} list...")
    with urllib.request.urlopen(url) as r:
        raw_list = json.loads(r.read().decode('utf-8'))
    
    processed_words = []
    for item in raw_list:
        simp = item['simplified']
        form0 = item['forms'][0] if item.get('forms') else {}
        trad = form0.get('traditional', simp)
        trans = form0.get('transcriptions', {})
        pinyin = trans.get('pinyin', '')
        num_py = trans.get('numeric', '')
        pos = item.get('pos', [])
        
        cv_info = cvdict.get(simp)
        vietnamese = clean_vietnamese(simp, cv_info)
        han_viet = extract_hanviet(trad, num_py)
        
        # Word object
        word_obj = {
            "id": f"hsk{lvl}_{simp}",
            "hanzi": simp,
            "traditional": trad,
            "pinyin": pinyin,
            "pinyin_numeric": num_py,
            "han_viet": han_viet,
            "vietnamese": vietnamese,
            "level": f"hsk{lvl}",
            "pos": pos,
            "radical": item.get('radical', ''),
            "frequency": item.get('frequency', 9999),
        }
        processed_words.append(word_obj)
        all_words_list.append(word_obj)
        
    levels_data[f"hsk{lvl}"] = processed_words
    print(f"Processed HSK {lvl}: {len(processed_words)} words.")

# Ensure directory exists
os.makedirs("src/data", exist_ok=True)

# Save processed vocab
with open("src/data/hsk_vocab.json", "w", encoding="utf-8") as f:
    json.dump({
        "all_words": all_words_list,
        "hsk1": levels_data["hsk1"],
        "hsk2": levels_data["hsk2"],
        "hsk3": levels_data["hsk3"]
    }, f, ensure_ascii=False, indent=2)

print("Saved src/data/hsk_vocab.json successfully!")
