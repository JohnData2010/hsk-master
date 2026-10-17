import urllib.request
import json
import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')
print("=== BUILDING COMPREHENSIVE HSK 1 - 3 CURRICULUM ===")

# 1. Fetch Hanviet data
url_hv = 'https://raw.githubusercontent.com/ph0ngp/hanviet-pinyin-words/main/src/hanvietData.js'
with urllib.request.urlopen(url_hv) as r:
    raw_hv = r.read().decode('utf-8').replace('export const hanvietData = ', '').rstrip(';\n')
    hv_data = json.loads(raw_hv)
print(f"Loaded Hanviet data: {len(hv_data)} characters")

# 2. Fetch CVDICT
url_cv = 'https://raw.githubusercontent.com/phucbm/xue-hanzi/main/src/data/cvdict.json'
with urllib.request.urlopen(url_cv) as r:
    cvdict = json.loads(r.read().decode('utf-8'))
print(f"Loaded CVDICT: {len(cvdict)} entries")

# Comprehensive dictionary of standard pedagogical definitions for HSK 1, 2, 3
PEDAGOGICAL_DICT = {
    # HSK 2 overrides
    "吧": "Đi, nhé, thôi (trợ từ ngữ khí gợi ý, cầu khiến, suy đoán)",
    "白": "Trắng, màu trắng; rõ ràng; (làm gì) công cốc",
    "百": "Trăm, một trăm (100)",
    "帮助": "Giúp đỡ, sự giúp đỡ, hỗ trợ",
    "报纸": "Báo, tờ báo",
    "比": "So với, hơn (giới từ so sánh hơn)",
    "别": "Đừng (phó từ khuyên ngăn, cấm đoán); khác",
    "长": "Dài (cháng) / Lớn lên, trưởng thành (zhǎng)",
    "唱歌": "Hát, ca hát",
    "出": "Ra, đi ra, xuất",
    "穿": "Mặc (quần áo), đi (giày dép)",
    "次": "Lần, lượt (lượng từ số lần)",
    "从": "Từ, từ nơi nào/lúc nào (từ... đến...: 从...到...)",
    "错": "Sai, sai sót, nhầm lẫn; tồi",
    "打篮球": "Chơi bóng rổ",
    "大家": "Mọi người, tất cả mọi người",
    "到": "Đến, tới, đạt đến",
    "得": "Được, đạt được (dé) / Trợ từ kết cấu biểu thị trình độ, kết quả (de)",
    "等": "Đợi, chờ đợi; v.v. (vân vân)",
    "弟弟": "Em trai",
    "第一": "Thứ nhất, đầu tiên, số một",
    "懂": "Hiểu, hiểu rõ",
    "对": "Đúng, chính xác; đối với (giới từ); đôi, cặp",
    "房间": "Căn phòng, phòng",
    "非常": "Vô cùng, hết sức, cực kỳ",
    "服务员": "Nhân viên phục vụ (nhà hàng, khách sạn)",
    "高": "Cao, trình độ cao",
    "告诉": "Nói với, bảo cho biết",
    "哥哥": "Anh trai",
    "给": "Cho, tặng, đưa cho; cho (ai đó)",
    "公共汽车": "Xe buýt, xe công cộng",
    "公斤": "Kilôgam, cân tây (kg)",
    "公司": "Công ty",
    "贵": "Đắt, quý báu, quý giá",
    "过": "Từng (trợ từ trải nghiệm quá khứ); qua, đón (sinh nhật, lễ)",
    "还": "Vẫn, còn, còn nữa (hái) / Trả lại (huán)",
    "孩子": "Đứa trẻ, con cái, trẻ em",
    "好吃": "Ngon (đồ ăn ngon)",
    "黑": "Đen, màu đen; tối",
    "红": "Đỏ, màu đỏ; nổi tiếng",
    "火车站": "Ga xe lửa, ga tàu hỏa",
    "机场": "Sân bay, phi trường",
    "鸡蛋": "Trứng gà",
    "件": "Chiếc, cái, kiện (lượng từ quần áo, sự việc)",
    "早上": "Buổi sáng sớm",
    "身体": "Cơ thể, sức khỏe",
    "生病": "Bị ốm, mắc bệnh",
    "踢足球": "Đá bóng, đá bóng đá",
    "跑步": "Chạy bộ",
    "游泳": "Bơi lội",
    "起床": "Thức dậy, ngủ dậy",
    "睡觉": "Đi ngủ",
    "洗手间": "Nhà vệ sinh, phòng vệ sinh",
    "旁边": "Bên cạnh, kế bên",
    "远": "Xa",
    "近": "Gần",
    "快": "Nhanh; sắp sửa (快...了)",
    "慢": "Chậm, từ từ",
    "玩": "Chơi, đi chơi",
    "笑": "Cười",
    "哭": "Khóc",
    "送": "Tặng, tiễn, đưa tiễn",
    "可能": "Có thể, có lẽ, khả năng",
    "希望": "Hy vọng, mong muốn",
    "欢迎": "Hoan nghênh, chào đón",
    "问": "Hỏi",
    "问题": "Câu hỏi, vấn đề",
    "走": "Đi, bước đi, rời đi",
    "进": "Vào, tiến vào",
    "路": "Đường, con đường, tuyến đường",
    "左边": "Bên trái",
    "右边": "Bên phải",
    "便宜": "Rẻ (giá rẻ)",
    "贵": "Đắt, quý",
    "男": "Nam, phái nam, đàn ông",
    "女": "Nữ, phái nữ, phụ nữ",
    "妻子": "Vợ, bà xã",
    "丈夫": "Chồng, ông xã",
    "事情": "Sự việc, việc, chuyện",
    "手表": "Đồng hồ đeo tay",
    "手机": "Điện thoại di động",
    "眼睛": "Đôi mắt, mắt",
    "西瓜": "Dưa hấu",
    "牛奶": "Sữa bò, sữa tươi",
    "羊肉": "Thịt cừu",
    "铅笔": "Bút chì",
    "颜色": "Màu sắc",
    "票": "Vé (vé xe, vé xem phim...)",
    "咖啡": "Cà phê",
    "日": "Ngày, mặt trời",
    "晴": "Trời nắng, tạnh ráo",
    "阴": "Trời râm, u ám",
    "雪": "Tuyết, có tuyết rơi",
    "因为": "Bởi vì, do",
    "所以": "Cho nên, vì thế",
    "虽然": "Tuy rằng, mặc dù",
    "但是": "Nhưng, nhưng mà",
    "虽然...但是...": "Tuy... nhưng...",
    "因为...所以...": "Bởi vì... cho nên...",
    "就": "Liền, ngay, thì; chỉ",
    "也": "Cũng",
    "再": "Lại, nữa (hành động lặp lại trong tương lai)",
    "真": "Thật, quả thật, rất",
    "正在": "Đang, đang trong quá trình (làm gì)",
    "已经": "Đã, rồi (đã hoàn thành)",

    # HSK 3 overrides
    "打算": "Dự định, kế hoạch; tính toán",
    "跟": "Cùng với, theo, đi cùng (giới từ/liên từ)",
    "一直": "Luôn luôn, thẳng một mạch, liên tục",
    "复习": "Ôn tập, ôn bài",
    "着急": "Lo lắng, sốt ruột, cuống quýt",
    "带": "Mang theo, dẫn theo, đem theo",
    "搬": "Chuyển, dời, khiêng (nhà, đồ đạc)",
    "放": "Để, đặt, buông, thả",
    "饮料": "Đồ uống, nước giải khát",
    "总是": "Luôn luôn, lúc nào cũng",
    "回答": "Trả lời, giải đáp",
    "越来越": "Càng ngày càng (cấu trúc biểu thị mức độ tăng dần)",
    "照顾": "Chăm sóc, trông nom, săn sóc",
    "突然": "Đột nhiên, bất ngờ",
    "清楚": "Rõ ràng, hiểu rõ",
    "明白": "Hiểu, rõ ràng, sáng tỏ",
    "刚才": "Vừa nãy, vừa mới",
    "帮忙": "Giúp đỡ, đỡ đần",
    "特别": "Đặc biệt, vô cùng",
    "容易": "Dễ dàng, đơn giản",
    "简单": "Đơn giản, không phức tạp",
    "难": "Khó, nan giải",
    "环境": "Môi trường, hoàn cảnh xung quanh",
    "热情": "Nhiệt tình, niềm nở",
    "遇到": "Gặp phải, bắt gặp",
    "重要": "Quan trọng, trọng yếu",
    "影响": "Ảnh hưởng, sự ảnh hưởng, tác động",
    "解决": "Giải quyết (vấn đề)",
    "方便": "Thuận tiện, tiện lợi",
    "举行": "Tổ chức, cử hành",
    "关系": "Mối quan hệ, quan hệ",
    "其实": "Kỳ thực, thực ra",
    "不但...而且...": "Không những... mà còn...",
    "如果...就...": "Nếu như... thì...",
    "把": "Đem, lấy, làm cho (câu chữ 把)",
    "被": "Bị, được (câu chữ 被)",
    "检查": "Kiểm tra, khám (bệnh)",
    "发烧": "Sốt, phát sốt",
    "感冒": "Cảm cúm, bị cảm",
    "放心": "Yên tâm, an lòng",
    "相信": "Tin tưởng, tin cậy",
    "变化": "Thay đổi, biến đổi",
    "努力": "Nỗ lực, cố gắng, chăm chỉ",
    "决定": "Quyết định",
    "选择": "Lựa chọn, tuyển chọn",
    "满意": "Hài lòng, vừa ý",
    "极了": "Cực kỳ, vô cùng (...+ 极了)",
    "马上": "Ngay lập tức, lập tức",
    "终于": "Cuối cùng (sau nhiều nỗ lực/chờ đợi)",
    "必须": "Phải, nhất thiết phải",
    "愿意": "Bằng lòng, sẵn lòng, muốn",
    "习惯": "Thói quen; quen với",
    "健康": "Khỏe mạnh, sức khỏe",
    "声音": "Âm thanh, tiếng",
    "故事": "Câu chuyện",
    "历史": "Lịch sử",
    "数学": "Môn Toán",
    "世界": "Thế giới",
    "音乐": "Âm nhạc",
    "经常": "Thường xuyên, hay",
    "一般": "Bình thường, thông thường",
    "水平": "Trình độ, mức độ",
    "提高": "Nâng cao, cải thiện",
    "完成": "Hoàn thành",
    "了解": "Hiểu rõ, tìm hiểu kỹ",
    "认为": "Cho rằng, nghĩ rằng",
    "觉得": "Cảm thấy, thấy rằng"
}

def get_vietnamese(hanzi, cv_info):
    if hanzi in PEDAGOGICAL_DICT:
        return PEDAGOGICAL_DICT[hanzi]
    if cv_info and 'vi' in cv_info:
        raw = cv_info['vi']
        # Clean up
        parts = [p.strip() for p in raw.split('/') if 'Lượng từ' not in p and 'LT:' not in p and 'Đài Loan' not in p]
        if parts:
            c = re.sub(r'\[.*?\]', '', parts[0]).strip()
            # Clean leading/trailing parentheses if redundant
            c = re.sub(r'^\(.*?\)\s*', '', c).strip()
            if c:
                return c
    return "Ý nghĩa từ vựng"

def get_hanviet(trad_word, numeric_pinyin):
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

# Download wordlists
raw_levels = {}
for lvl in [1, 2, 3]:
    url = f'https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/main/wordlists/exclusive/old/{lvl}.json'
    with urllib.request.urlopen(url) as r:
        raw_levels[lvl] = json.loads(r.read().decode('utf-8'))
    print(f"Loaded raw HSK {lvl}: {len(raw_levels[lvl])} words")

# Build enriched vocabularies
enriched_by_level = {}
for lvl in [1, 2, 3]:
    items = []
    for raw in raw_levels[lvl]:
        simp = raw['simplified']
        form0 = raw['forms'][0] if raw.get('forms') else {}
        trad = form0.get('traditional', simp)
        trans = form0.get('transcriptions', {})
        pinyin = trans.get('pinyin', '')
        num_py = trans.get('numeric', '')
        pos = raw.get('pos', [])
        
        cv_info = cvdict.get(simp)
        vi = get_vietnamese(simp, cv_info)
        hv = get_hanviet(trad, num_py)
        
        # Example sentence generator / lookup
        example = {
            "cn": f"我在学“{simp}”。",
            "pinyin": f"Wǒ zài xué \"{simp}\".",
            "vi": f"Tôi đang học từ \"{simp}\"."
        }
        
        items.append({
            "id": f"hsk{lvl}_{simp}",
            "hanzi": simp,
            "traditional": trad,
            "pinyin": pinyin,
            "pinyin_numeric": num_py,
            "han_viet": hv,
            "vietnamese": vi,
            "level": f"hsk{lvl}",
            "pos": pos,
            "radical": raw.get('radical', ''),
            "frequency": raw.get('frequency', 9999),
            "example": example
        })
    enriched_by_level[f"hsk{lvl}"] = items

# Define standard Textbook lessons metadata
LESSONS_METADATA = {
    "hsk1": [
        {"lesson": 1, "title_cn": "你好", "title_pinyin": "Nǐ hǎo", "title_vi": "Xin chào", 
         "summary": "Chào hỏi, cảm ơn, thanh mẫu, vận mẫu và 4 thanh điệu cơ bản",
         "grammar": [
             {"point": "Đại từ nhân xưng cơ bản (你, 我, 他, 她)", "explanation": "Trong tiếng Trung, đại từ nhân xưng không chia theo thì hay giống ngữ pháp như tiếng Pháp/Đức, chỉ cần ghép đại từ vào trước động từ.", "example": "你好 (Xin chào bạn), 我是学生 (Tôi là học sinh)."},
             {"point": "Hậu tố số nhiều 们 (men)", "explanation": "Thêm 们 sau đại từ nhân xưng để tạo thành số nhiều: 你们 (các bạn), 我们 (chúng tôi), 他们 (họ).", "example": "我们是朋友 (Chúng tôi là bạn bè)."}
         ]},
        {"lesson": 2, "title_cn": "谢谢你", "title_pinyin": "Xièxie nǐ", "title_vi": "Cảm ơn bạn",
         "summary": "Cách nói lời cảm ơn, đáp lại lời cảm ơn và xin lỗi trong đời sống",
         "grammar": [
             {"point": "Phó từ phủ định 不 (bù)", "explanation": "Dùng để phủ định hành động ở hiện tại hoặc tương lai, hoặc phủ định tính từ. Đứng trước động từ hoặc tính từ.", "example": "我不去 (Tôi không đi), 他不好 (Anh ấy không tốt)."},
             {"point": "Quy tắc biến điệu của 不", "explanation": "Khi 不 đi trước từ mang thanh 4 thì 不 đổi thành thanh 2 (bú). Ví dụ: 不是 (bú shì), 不客气 (bú kèqi).", "example": "这不是我的书 (Đây không phải sách của tôi)."}
         ]},
        {"lesson": 3, "title_cn": "你叫什么名字", "title_pinyin": "Nǐ jiào shénme míngzi", "title_vi": "Bạn tên là gì?",
         "summary": "Hỏi và giới thiệu tên tuổi, quốc tịch, quê quán",
         "grammar": [
             {"point": "Đại từ nghi vấn 什么 (shénme - Cái gì)", "explanation": "Dùng để hỏi về người, sự vật hoặc tên gọi. Đặt ở vị trí tân ngữ hoặc làm định ngữ.", "example": "你叫什么名字？ (Bạn tên là gì?), 这是什么？ (Đây là cái gì?)."},
             {"point": "Động từ 是 (shì - Là)", "explanation": "Câu chữ 是 có cấu trúc: Chủ ngữ + 是 + Tân ngữ, dùng để khẳng định danh tính, nghề nghiệp, quốc tịch.", "example": "我是越南人 (Tôi là người Việt Nam)."}
         ]},
        {"lesson": 4, "title_cn": "她是我的汉语老师", "title_pinyin": "Tā shì wǒ de hànyǔ lǎoshī", "title_vi": "Cô ấy là giáo viên tiếng Trung của tôi",
         "summary": "Mô tả nghề nghiệp, quan hệ xã hội, đại từ nghi vấn 谁",
         "grammar": [
             {"point": "Trợ từ kết cấu 的 (de - Của)", "explanation": "Đứng giữa định ngữ và trung tâm ngữ biểu thị quan hệ sở hữu hoặc tính chất: Định ngữ + 的 + Trung tâm ngữ.", "example": "我的老师 (Thầy giáo của tôi), 他的书 (Sách của anh ấy)."},
             {"point": "Đại từ nghi vấn 谁 (shéi - Ai)", "explanation": "Dùng để hỏi người, có thể làm chủ ngữ hoặc tân ngữ trong câu.", "example": "他是谁？ (Anh ấy là ai?)."}
         ]},
        {"lesson": 5, "title_cn": "她女儿今年二十岁", "title_pinyin": "Tā nǚ'ér jīnnián èrshí suì", "title_vi": "Con gái cô ấy năm nay 20 tuổi",
         "summary": "Hỏi tuổi tác, các thành viên trong gia đình, lượng từ gia đình 口",
         "grammar": [
             {"point": "Hỏi số lượng với 几 (jǐ) và 多少 (duōshao)", "explanation": "几 dùng để hỏi số lượng nhỏ (thường dưới 10, bắt buộc có lượng từ đi kèm: 几口人, 几个). 多少 hỏi số lượng lớn hơn 10 (không nhất thiết có lượng từ).", "example": "你几岁？ (Cháu mấy tuổi?), 你们班有多少学生？ (Lớp các bạn có bao nhiêu học sinh?)."},
             {"point": "Trợ từ ngữ khí 了 (le) biểu thị sự thay đổi trạng thái", "explanation": "Đặt ở cuối câu diễn tả tình huống mới phát sinh hoặc tuổi tác đã đạt đến mốc mới.", "example": "我二十岁了 (Tôi 20 tuổi rồi)."}
         ]},
        {"lesson": 6, "title_cn": "我会说汉语", "title_pinyin": "Wǒ huì shuō hànyǔ", "title_vi": "Tôi biết nói tiếng Trung",
         "summary": "Học về kỹ năng, khả năng đạt được qua rèn luyện (会), hỏi cách thức (怎么)",
         "grammar": [
             {"point": "Động từ năng nguyện 会 (huì - Biết qua học tập)", "explanation": "Biểu thị khả năng làm được một việc gì đó thông qua học tập, rèn luyện: Chủ ngữ + 会 + Động từ.", "example": "我会说汉语 (Tôi biết nói tiếng Trung), 我会做中国菜 (Tôi biết nấu món Trung Quốc)."},
             {"point": "Đại từ nghi vấn 怎么 (zěnme - Làm sao/Thế nào)", "explanation": "Đặt trước động từ để hỏi về phương thức thực hiện hành động: 怎么 + Động từ.", "example": "这个字怎么读？ (Chữ này đọc thế nào?), 这个怎么写？ (Cái này viết làm sao?)."}
         ]},
        {"lesson": 7, "title_cn": "今天几号", "title_pinyin": "Jīntiān jǐ hào", "title_vi": "Hôm nay ngày mấy?",
         "summary": "Hỏi ngày tháng năm, các ngày trong tuần, thứ tự thời gian lớn đến bé",
         "grammar": [
             {"point": "Trật tự thời gian trong tiếng Trung (Từ lớn đến nhỏ)", "explanation": "Người Trung Quốc luôn nói đơn vị thời gian lớn trước, nhỏ sau: Năm (年) -> Tháng (月) -> Ngày (日/号) -> Thứ (星期) -> Buổi -> Giờ (点) -> Phút (分).", "example": "2026年10月16日 星期五 下午三点 (3 giờ chiều Thứ 6 ngày 16 tháng 10 năm 2026)."},
             {"point": "Câu vị ngữ danh từ biểu thị thời gian, ngày tháng", "explanation": "Trong câu diễn đạt thời gian, ngày tháng, thời tiết có thể lược bỏ động từ 是.", "example": "今天星期天 (Hôm nay là Chủ Nhật)."}
         ]},
        {"lesson": 8, "title_cn": "我想喝茶", "title_pinyin": "Wǒ xiǎng hē chá", "title_vi": "Tôi muốn uống trà",
         "summary": "Bày tỏ mong muốn (想), mua sắm và hỏi giá tiền (多少钱)",
         "grammar": [
             {"point": "Động từ năng nguyện 想 (xiǎng - Muốn / Nhớ)", "explanation": "Biểu thị nguyện vọng, ý muốn chủ quan của người nói: Chủ ngữ + 想 + Động từ.", "example": "我想去中国 (Tôi muốn đi Trung Quốc), 我想喝咖啡 (Tôi muốn uống cà phê)."},
             {"point": "Hỏi giá tiền với 多少钱 (duōshao qián)", "explanation": "Cấu trúc hỏi giá tiền: Tên đồ vật + 多少钱？ Đơn vị tiền tệ thường dùng là 块 (kuài - đồng/tệ), 毛 (máo - hào).", "example": "这个杯子多少钱？ (Cái cốc này bao nhiêu tiền?)."}
         ]},
        {"lesson": 9, "title_cn": "你儿子在哪儿工作", "title_pinyin": "Nǐ érzi zài nǎr gōngzuò", "title_vi": "Con trai bạn làm việc ở đâu?",
         "summary": "Hỏi và nói về địa điểm, nơi chốn, công việc và nghề nghiệp",
         "grammar": [
             {"point": "Giới từ 在 (zài - Ở/Tại) chỉ địa điểm hành động", "explanation": "Cấu trúc: Chủ ngữ + 在 + Địa điểm + Động từ (Lưu ý: trong tiếng Trung địa điểm ĐỨNG TRƯỚC động từ, ngược với tiếng Việt).", "example": "我在医院工作 (Tôi làm việc ở bệnh viện), 他在学校看书 (Anh ấy đọc sách ở trường)."},
             {"point": "Đại từ nghi vấn 哪儿 / 哪里 (nǎr / nǎlǐ - Ở đâu)", "explanation": "Dùng để hỏi vị trí, nơi chốn xảy ra hành động.", "example": "你在哪儿？ (Bạn ở đâu?), 你去哪儿？ (Bạn đi đâu?)."}
         ]},
        {"lesson": 10, "title_cn": "我能坐这儿吗", "title_pinyin": "Wǒ néng zuò zhèrmǎ", "title_vi": "Tôi có thể ngồi ở đây không?",
         "summary": "Xin phép lịch sự, phương vị từ (trên, dưới, trong, ngoài, trước, sau)",
         "grammar": [
             {"point": "Động từ năng nguyện 能 (néng - Có thể)", "explanation": "Biểu thị điều kiện khách quan cho phép hoặc xin phép làm việc gì đó một cách lịch sự.", "example": "我能喝水吗？ (Tôi có thể uống nước không?), 我能坐这儿吗？ (Tôi có thể ngồi ở đây được không?)."},
             {"point": "Phương vị từ (方位词): 上, 下, 前, 后, 里", "explanation": "Danh từ + Phương vị từ tạo thành từ chỉ nơi chốn: 桌子上 (trên bàn), 椅子下 (dưới ghế), 商店里 (trong cửa hàng).", "example": "书在桌子上 (Sách ở trên bàn)."}
         ]},
        {"lesson": 11, "title_cn": "现在几点", "title_pinyin": "Xiànzài jǐ diǎn", "title_vi": "Bây giờ mấy giờ?",
         "summary": "Cách nói giờ giấc, lịch trình hàng ngày, trước và sau một mốc thời gian",
         "grammar": [
             {"point": "Cách nói giờ trong tiếng Trung (点, 分, 半, 刻)", "explanation": "Giờ: 点 (diǎn), Phút: 分 (fēn), Rưỡi: 半 (bàn - 30 phút), Kém/Khắc: 刻 (kè - 15 phút), 差 (chà - kém).", "example": "八点十分 (8 giờ 10 phút), 九点半 (9 giờ rưỡi), 差五分十点 (10 giờ kém 5)."},
             {"point": "Trạng ngữ chỉ thời gian đứng trước động từ hoặc đầu câu", "explanation": "Thời gian xảy ra hành động luôn đứng trước động từ, KHÔNG để ở cuối câu như tiếng Việt.", "example": "我上午八点去学校 (Tôi đi học lúc 8 giờ sáng - Đúng)."}
         ]},
        {"lesson": 12, "title_cn": "明天天气怎么样", "title_pinyin": "Míngtiān tiānqì zěnmeyàng", "title_vi": "Thời tiết ngày mai thế nào?",
         "summary": "Hỏi han và miêu tả thời tiết, nhiệt độ, cảm thán 太...了",
         "grammar": [
             {"point": "Đại từ nghi vấn 怎么样 (zěnmeyàng - Như thế nào/Ra sao)", "explanation": "Dùng để hỏi về tình trạng, tính chất hoặc hỏi ý kiến của đối phương.", "example": "天气怎么样？ (Thời tiết thế nào?), 这件衣服怎么样？ (Chiếc áo này ra sao?)."},
             {"point": "Cấu trúc cảm thán 太...了 (tài... le - Quá... rồi / Lắm)", "explanation": "Dùng để biểu thị mức độ cực kỳ cao hoặc khen ngợi, cảm thán: 太 + Tính từ + 了.", "example": "太好了！ (Tốt quá rồi!), 今天太热了 (Hôm nay nóng quá)."}
         ]},
        {"lesson": 13, "title_cn": "他在学做中国菜", "title_pinyin": "Tā zài xué zuò zhōngguó cài", "title_vi": "Anh ấy đang học nấu món ăn Trung Quốc",
         "summary": "Thì hiện tại tiếp diễn, đang làm gì (在 / 正在), gọi điện thoại",
         "grammar": [
             {"point": "Phó từ biểu thị hành động đang diễn ra (在 / 正在 / 正)", "explanation": "Cấu trúc: Chủ ngữ + 在 / 正在 + Động từ (+ 呢) diễn tả hành động đang tiếp diễn tại thời điểm nói.", "example": "他在看书 (Anh ấy đang đọc sách), 我正在吃苹果呢 (Tôi đang ăn táo nè)."},
             {"point": "Trợ từ ngữ khí 呢 (ne) ở cuối câu tiếp diễn", "explanation": "Tăng cường ngữ khí khẳng định hành động đang tiếp tục tiếp diễn.", "example": "他在睡觉呢 (Anh ấy đang ngủ đấy)."}
         ]},
        {"lesson": 14, "title_cn": "她买了不少衣服", "title_pinyin": "Tā mǎi le bù shǎo yīfu", "title_vi": "Cô ấy đã mua không ít quần áo",
         "summary": "Hành động đã hoàn thành trong quá khứ với 了, số lượng 不少",
         "grammar": [
             {"point": "Trợ từ động thái 了 (le) biểu thị động tác đã hoàn thành", "explanation": "Đứng ngay sau động từ để biểu thị hành động đã hoàn tất: Động từ + 了 + Tân ngữ.", "example": "我买了一本书 (Tôi đã mua một cuốn sách), 他喝了三杯茶 (Anh ấy đã uống 3 tách trà)."},
             {"point": "Phủ định của hành động đã hoàn thành: 没 / 没有", "explanation": "Khi phủ định hành động trong quá khứ, dùng 没 / 没有 đứng trước động từ và BỎ chữ 了.", "example": "我没买衣服 (Tôi không mua quần áo - KHÔNG nói 我没买了衣服)."}
         ]},
        {"lesson": 15, "title_cn": "我们是坐飞机来的", "title_pinyin": "Wǒmen shì zuò fēijī lái de", "title_vi": "Chúng tôi đi máy bay đến",
         "summary": "Nhấn mạnh thời gian, địa điểm, phương thức với cấu trúc 是...的",
         "grammar": [
             {"point": "Cấu trúc nhấn mạnh 是...的 (shì... de)", "explanation": "Khi hành động ĐÃ XẢY RA, dùng cấu trúc 是...的 để nhấn mạnh: thời gian, địa điểm, cách thức hoặc người thực hiện hành động.", "example": "我是坐飞机来的 (Tôi đến bằng máy bay - nhấn mạnh phương tiện), 我们是昨天认识的 (Chúng tôi quen nhau hôm qua - nhấn mạnh thời gian)."},
             {"point": "Dạng phủ định của câu 是...的", "explanation": "Đặt 不是 trước thành phần cần nhấn mạnh: 不是...的.", "example": "我不是一个人来的 (Tôi không phải đến một mình)."}
         ]}
    ],
    "hsk2": [
        {"lesson": 1, "title_cn": "九月去北京旅游最好", "title_pinyin": "Jiǔyuè qù Běijīng lǚyóu zuì hǎo", "title_vi": "Tháng 9 đi Bắc Kinh du lịch là tốt nhất",
         "summary": "So sánh nhất với 最, mùa màng và sở thích du lịch",
         "grammar": [{"point": "Phó từ chỉ mức độ cao nhất 最 (zuì - Nhất)", "explanation": "Đứng trước tính từ hoặc động từ tâm lý: 最 + Tính từ/Động từ.", "example": "最好 (Tốt nhất), 最喜欢 (Thích nhất)."}]},
        {"lesson": 2, "title_cn": "我每天六点起床", "title_pinyin": "Wǒ měitiān liù diǎn qǐchuáng", "title_vi": "Tôi thức dậy lúc 6 giờ mỗi ngày",
         "summary": "Thời gian biểu, thói quen sinh hoạt và tập thể dục thể thao",
         "grammar": [{"point": "Đại từ chỉ sự bao hàm 每 (měi - Mỗi/Mọi)", "explanation": "每 + Lượng từ + Danh từ ... 都 + Động từ: diễn tả tính quy luật, lặp lại.", "example": "每个人都喜欢他 (Mọi người đều thích anh ấy)."}]},
        {"lesson": 3, "title_cn": "左边那个红色的是我的", "title_pinyin": "Zuǒbian nà gè hóngsè de shì wǒ de", "title_vi": "Cái màu đỏ ở bên trái là của tôi",
         "summary": "Màu sắc, đồ vật sở hữu, cụm từ chữ 的 làm đại từ",
         "grammar": [{"point": "Cụm danh từ chữ 的 lược bỏ trung tâm ngữ", "explanation": "Khi trung tâm ngữ đã rõ ràng, có thể lược bỏ: 红色的 (cái màu đỏ), 卖书的 (người bán sách).", "example": "这个杯子是我的 (Chiếc cốc này là của tôi)."}]},
        {"lesson": 4, "title_cn": "这个工作是他帮我介绍的", "title_pinyin": "Zhège gōngzuò shì tā bāng wǒ jièshào de", "title_vi": "Công việc này là do anh ấy giới thiệu giúp tôi",
         "summary": "Cấu trúc 是...的 nhấn mạnh người thực hiện, nhờ vả giúp đỡ",
         "grammar": [{"point": "Nhấn mạnh người thực hiện với 是...的", "explanation": "Cấu trúc: Chủ ngữ + 是 + Ai đó + Động từ + 的.", "example": "这本书是他买的 (Cuốn sách này là do anh ấy mua)."}]},
        {"lesson": 5, "title_cn": "就买这件吧", "title_pinyin": "Jiù mǎi zhè jiàn ba", "title_vi": "Mua chiếc này đi",
         "summary": "Mua sắm quần áo, đưa ra quyết định với 就 và 吧",
         "grammar": [{"point": "Phó từ 就 (jiù) biểu thị sự quyết định dứt khoát", "explanation": "Dùng để biểu thị sự lựa chọn nhanh chóng hoặc kết luận.", "example": "我们就去那里吧 (Chúng ta chọn đi chỗ đó đi)."}]},
        {"lesson": 6, "title_cn": "你怎么不吃了", "title_pinyin": "Nǐ zěnme bù chī le", "title_vi": "Sao bạn không ăn nữa?",
         "summary": "Hỏi nguyên nhân với 怎么, sự biến đổi trạng thái với 了",
         "grammar": [{"point": "怎么 hỏi nguyên nhân mang sắc thái ngạc nhiên", "explanation": "Khác với 为什么 (hỏi lý do thông thường), 怎么 mang sắc thái thắc mắc hoặc quan tâm.", "example": "你怎么没来？ (Sao hôm nay bạn lại không đến?)."}]},
        {"lesson": 7, "title_cn": "你家离公司远吗", "title_pinyin": "Nǐ jiā lí gōngsī yuǎn ma", "title_vi": "Nhà bạn cách công ty có xa không?",
         "summary": "Đo khoảng cách vị trí với giới từ 离 (lí - Cách)",
         "grammar": [{"point": "Giới từ 离 (lí - Cách)", "explanation": "Cấu trúc: Địa điểm A + 离 + Địa điểm B + (很) 远 / 近.", "example": "我家离学校很近 (Nhà tôi cách trường rất gần)."}]},
        {"lesson": 8, "title_cn": "让我想想再告诉你", "title_pinyin": "Ràng wǒ xiǎng xiǎng zài gàosù nǐ", "title_vi": "Để tôi suy nghĩ rồi nói cho bạn sau",
         "summary": "Câu kiêm ngữ với 让 (bảo, để, cho phép), lặp lại động từ",
         "grammar": [{"point": "Câu kiêm ngữ với 让 / 叫 / 请", "explanation": "Cấu trúc: Chủ ngữ + 让/叫/请 + Tân ngữ 1 + Động từ.", "example": "老师让我回答问题 (Thầy giáo bảo tôi trả lời câu hỏi)."}]},
        {"lesson": 9, "title_cn": "题太多，我没做完", "title_pinyin": "Tí tài duō, wǒ méi zuò wán", "title_vi": "Đề thi nhiều quá, tôi chưa làm xong",
         "summary": "Bổ ngữ kết quả (完, 好, 懂, 见, 到)",
         "grammar": [{"point": "Bổ ngữ kết quả (Kết quả của hành động)", "explanation": "Cấu trúc: Động từ + Bổ ngữ (完 - xong, 好 - tốt/xong, 懂 - hiểu, 见 - thấy). Phủ định dùng 没 + Động từ + Bổ ngữ.", "example": "我做完了 (Tôi làm xong rồi), 我没听懂 (Tôi nghe không hiểu)."}]},
        {"lesson": 10, "title_cn": "别找了，手机在桌子上呢", "title_pinyin": "Bié zhǎo le, shǒujī zài zhuōzi shàng ne", "title_vi": "Đừng tìm nữa, điện thoại ở trên bàn kìa",
         "summary": "Câu cầu khiến phủ định với 别...了, tìm kiếm đồ vật",
         "grammar": [{"point": "Cấu trúc khuyên ngăn 别...了 (bié... le - Đừng... nữa)", "explanation": "Dùng để yêu cầu ai đó dừng một hành động đang làm.", "example": "别看了 (Đừng xem nữa), 别哭了 (Đừng khóc nữa)."}]},
        {"lesson": 11, "title_cn": "他比我大三岁", "title_pinyin": "Tā bǐ wǒ dà sān suì", "title_vi": "Anh ấy lớn hơn tôi ba tuổi",
         "summary": "Câu so sánh hơn với chữ 比 (bǐ)",
         "grammar": [{"point": "Câu so sánh chữ 比 (bǐ - Hơn)", "explanation": "Cấu trúc: A + 比 + B + Tính từ (+ Số lượng chênh lệch).", "example": "他比我高 (Anh ấy cao hơn tôi), 苹果比西瓜便宜 (Táo rẻ hơn dưa hấu)."}]},
        {"lesson": 12, "title_cn": "你穿得太少了", "title_pinyin": "Nǐ chuān de tài shǎo le", "title_vi": "Bạn mặc ít áo quá rồi",
         "summary": "Bổ ngữ trạng thái với trợ từ 得 (đánh giá mức độ, cách thức)",
         "grammar": [{"point": "Bổ ngữ trạng thái với 得 (de)", "explanation": "Cấu trúc: Động từ + 得 + Tính từ/Cụm miêu tả.", "example": "他说得很好 (Anh ấy nói rất tốt), 她跑得很快 (Cô ấy chạy rất nhanh)."}]},
        {"lesson": 13, "title_cn": "门开着呢", "title_pinyin": "Mén kāi zhe ne", "title_vi": "Cửa đang mở",
         "summary": "Trợ từ động thái 着 (zhe) biểu thị trạng thái đang duy trì",
         "grammar": [{"point": "Trợ từ động thái 着 (zhe) biểu thị sự tiếp diễn của trạng thái", "explanation": "Cấu trúc: Động từ + 着 (+ 呢).", "example": "穿着用 (Mặc), 门开着 (Cửa đang mở), 老师站着上课 (Thầy giáo đứng dạy học)."}]},
        {"lesson": 14, "title_cn": "你看过那个电影吗", "title_pinyin": "Nǐ kàn guò nà gè diànyǐng ma", "title_vi": "Bạn đã từng xem bộ phim đó chưa?",
         "summary": "Trợ từ trải nghiệm 过 (guò) biểu thị từng trải qua",
         "grammar": [{"point": "Trợ từ động thái 过 (guò - Từng)", "explanation": "Cấu trúc khẳng định: Động từ + 过. Phủ định: 没 + Động từ + 过.", "example": "我去过北京 (Tôi từng đi Bắc Kinh), 我没吃过这个菜 (Tôi chưa từng ăn món này)."}]},
        {"lesson": 15, "title_cn": "新年就要到了", "title_pinyin": "Xīnnián jiù yào dào le", "title_vi": "Năm mới sắp đến rồi",
         "summary": "Diễn tả hành động sắp xảy ra với 快要...了 / 就要...了",
         "grammar": [{"point": "Cấu trúc biểu thị hành động sắp xảy ra", "explanation": "Cấu trúc: 快要 / 就要 / 要 + Động từ + 了.", "example": "火车快要开了 (Tàu hỏa sắp chạy rồi), 飞机就要起飞了 (Máy bay sắp cất cánh rồi)."}]}
    ],
    "hsk3": [
        {"lesson": 1, "title_cn": "周末你有什么打算？", "title_pinyin": "Zhōumò nǐ yǒu shénme dǎsuan?", "title_vi": "Cuối tuần bạn có dự định gì?",
         "summary": "Dự định cuối tuần, cấu trúc 一直, 跟...一样",
         "grammar": [{"point": "Phó từ 一直 (yīzhí - Suốt, liên tục)", "explanation": "Biểu thị hành động hoặc trạng thái duy trì liên tục không đứt quãng.", "example": "他一直在睡觉 (Anh ấy ngủ suốt)."}]},
        {"lesson": 2, "title_cn": "他什么时候回来？", "title_pinyin": "Tā shénme shíhou huílái?", "title_vi": "Khi nào anh ấy quay về?",
         "summary": "Bổ ngữ xu hướng đơn với 来 (hướng về phía người nói) và 去 (xa người nói)",
         "grammar": [{"point": "Bổ ngữ xu hướng đơn (来 / 去)", "explanation": "Động từ + 来 (lại gần người nói) / 去 (ra xa người nói).", "example": "进来 (Vào đây), 出去 (Đi ra ngoài)."}]},
        {"lesson": 3, "title_cn": "桌子上放着很多饮料。", "title_pinyin": "Zhuōzi shàng fàngzhe hěnduō yǐnliào.", "title_vi": "Trên bàn có rất nhiều đồ uống.",
         "summary": "Câu tồn hiện (nơi chốn tồn tại đồ vật) với chữ 着",
         "grammar": [{"point": "Câu tồn hiện: Nơi chốn + Động từ + 着 + Danh từ", "explanation": "Miêu tả trạng thái tĩnh của đồ vật ở một địa điểm.", "example": "墙上挂着一张照片 (Trên tường treo một bức ảnh)."}]},
        {"lesson": 4, "title_cn": "她总是笑着跟客人说话。", "title_pinyin": "Tā zǒngshì xiàozhe gēn kèrén shuōhuà.", "title_vi": "Cô ấy luôn cười khi nói chuyện với khách hàng.",
         "summary": "Hai động tác diễn ra đồng thời: Động tác 1 + 着 + Động tác 2",
         "grammar": [{"point": "Cấu trúc Động từ 1 + 着 + Động từ 2", "explanation": "Động từ 1 diễn tả phương thức thực hiện của động từ 2.", "example": "他站着吃面包 (Anh ấy đứng ăn bánh mì)."}]},
        {"lesson": 5, "title_cn": "我最近越来越胖了。", "title_pinyin": "Wǒ zuìjìn yuè lái yuè pàng le.", "title_vi": "Dạo này tôi càng ngày càng béo.",
         "summary": "Cấu trúc tăng tiến 越来越... (Càng ngày càng...)",
         "grammar": [{"point": "Cấu trúc 越来越 + Tính từ/Động từ tâm lý", "explanation": "Biểu thị mức độ biến đổi theo thời gian.", "example": "雨越来越大了 (Mưa càng lúc càng to)."}]},
        {"lesson": 6, "title_cn": "怎么突然找不到了？", "title_pinyin": "Zěnme tūrán zhǎo bú dào le?", "title_vi": "Sao bỗng dưng lại không tìm thấy?",
         "summary": "Bổ ngữ khả năng (V + 得 / 不 + Bổ ngữ)",
         "grammar": [{"point": "Bổ ngữ khả năng (得 / 不)", "explanation": "Động từ + 得 + Bổ ngữ (có thể làm được) / Động từ + 不 + Bổ ngữ (không thể làm được).", "example": "找得到 (Tìm được), 找不到 (Không tìm thấy), 听得懂 (Nghe hiểu)."}]},
        {"lesson": 7, "title_cn": "我跟她都认识五年了。", "title_pinyin": "Wǒ gēn tā dōu rènshi wǔ nián le.", "title_vi": "Tôi và cô ấy quen nhau 5 năm rồi.",
         "summary": "Bổ ngữ thời lượng (khoảng thời gian duy trì hành động)",
         "grammar": [{"point": "Bổ ngữ thời lượng", "explanation": "Chủ ngữ + Động từ + Khoảng thời gian (+ 了).", "example": "我学了三年汉语了 (Tôi đã học tiếng Trung được 3 năm rồi)."}]},
        {"lesson": 8, "title_cn": "你去哪儿我就去哪儿。", "title_pinyin": "Nǐ qù nǎr wǒ jiù qù nǎr.", "title_vi": "Bạn đi đến đâu tôi đi đến đó.",
         "summary": "Cặp đại từ nghi vấn hô ứng diễn tả điều kiện và kết quả",
         "grammar": [{"point": "Đại từ nghi vấn hô ứng với 就", "explanation": "Mệnh đề 1 dùng đại từ nghi vấn, mệnh đề 2 lặp lại đại từ đó cùng chữ 就.", "example": "你想吃什么就吃什么 (Bạn muốn ăn gì thì ăn cái đó)."}]},
        {"lesson": 9, "title_cn": "她的汉语说得跟中国人一样好。", "title_pinyin": "Tā de hànyǔ shuō de gēn zhōngguó rén yīyàng hǎo.", "title_vi": "Cô ấy nói tiếng Trung hay như người Trung Quốc.",
         "summary": "Cấu trúc so sánh bằng: A 跟 B 一样 (+ Tính từ)",
         "grammar": [{"point": "Cấu trúc so sánh bằng A 跟/和 B 一样", "explanation": "Khẳng định: A 跟 B 一样 + Adj. Phủ định: A 跟 B 不一样.", "example": "这本书跟那本书一样贵 (Cuốn này đắt bằng cuốn kia)."}]},
        {"lesson": 10, "title_cn": "数学比历史难多了。", "title_pinyin": "Shùxué bǐ lìshǐ nán duō le.", "title_vi": "Môn Toán khó hơn môn Lịch sử nhiều.",
         "summary": "So sánh mức độ chênh lệch nhiều: A 比 B + Adj + 多了 / 得多",
         "grammar": [{"point": "Chênh lệch lớn trong câu so sánh chữ 比", "explanation": "A 比 B + Tính từ + 多了 / 得多 (hơn nhiều) / 一点儿 (hơn một chút).", "example": "今天比昨天冷多了 (Hôm nay lạnh hơn hôm qua nhiều)."}]},
        {"lesson": 11, "title_cn": "别忘了把空调关了！", "title_pinyin": "Bié wàng le bǎ kōngtiáo guān le!", "title_vi": "Đừng quên tắt điều hòa nhé!",
         "summary": "Câu chữ 把 (bǎ) căn bản - làm cho vật thể dịch chuyển hoặc thay đổi",
         "grammar": [{"point": "Câu chữ 把 (câu xử trí cơ bản)", "explanation": "Cấu trúc: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác (thường là 了 hoặc bổ ngữ).", "example": "请把门关上 (Xin hãy đóng cửa lại), 我把作业做完了 (Tôi làm xong bài tập rồi)."}]},
        {"lesson": 12, "title_cn": "把重要的东西放在我这儿吧。", "title_pinyin": "Bǎ zhòngyào de dōngxi fàng zài wǒ zhèr ba.", "title_vi": "Hãy để những đồ vật quan trọng ở chỗ tôi đi.",
         "summary": "Câu chữ 把 kết hợp nơi chốn: 把 + O + Động từ + 在 / 到 + Địa điểm",
         "grammar": [{"point": "Câu chữ 把 với bổ ngữ kết quả chỉ nơi chốn", "explanation": "Cấu trúc: Chủ ngữ + 把 + Tân ngữ + Động từ + 在/到 + Địa điểm.", "example": "请把手机放在桌子上 (Xin hãy để điện thoại trên bàn)."}]},
        {"lesson": 13, "title_cn": "我是走回来的。", "title_pinyin": "Wǒ shì zǒu huílái de.", "title_vi": "Tôi là đi bộ về đấy.",
         "summary": "Bổ ngữ xu hướng kép (Động từ + 回来 / 回去 / 出来 / 过去...)",
         "grammar": [{"point": "Bổ ngữ xu hướng kép", "explanation": "Động từ chỉ hành động + Động từ xu hướng (上/下/进/出/回/过/起) + 来/去.", "example": "跑过去 (Chạy qua bên kia), 走回来 (Đi bộ quay về)."}]},
        {"lesson": 14, "title_cn": "你把水果拿过来！", "title_pinyin": "Nǐ bǎ shuǐguǒ ná guòlái!", "title_vi": "Bạn mang hoa quả qua đây!",
         "summary": "Câu chữ 把 kết hợp bổ ngữ xu hướng",
         "grammar": [{"point": "Cấu trúc: 把 + Tân ngữ + Động từ + Bổ ngữ xu hướng", "explanation": "Diễn tả việc tác động khiến đồ vật di chuyển theo một hướng cụ thể.", "example": "把书拿过来 (Đem sách lại đây), 把垃圾拿出去 (Đem rác ra ngoài)."}]},
        {"lesson": 15, "title_cn": "其他都没什么问题。", "title_pinyin": "Qítā dōu méi shénme wèntí.", "title_vi": "Những cái khác đều không có vấn đề gì.",
         "summary": "Đại từ chỉ sự bao quát (除了...以外, 都/还...)",
         "grammar": [{"point": "Cấu trúc 除了...以外 (Ngoài... ra)", "explanation": "Cấu trúc: 除了 A 以外，(Chủ ngữ) 都 B (loại trừ A) hoặc 还 B (bổ sung thêm ngoài A).", "example": "除了星期天以外，我都工作 (Trừ chủ nhật ra, tôi đều làm việc)."}]},
        {"lesson": 16, "title_cn": "我现在累得下了班就想睡觉。", "title_pinyin": "Wǒ xiànzài lèi de xià le bān jiù xiǎng shuìjiào.", "title_vi": "Bây giờ tôi mệt đến nỗi cứ tan làm là chỉ muốn đi ngủ.",
         "summary": "Bổ ngữ trạng thái biểu thị mức độ cực hạn (Động từ/Tính từ + 得...)",
         "grammar": [{"point": "Cấu trúc Tính từ + 得 + Mệnh đề biểu thị mức độ cao", "explanation": "Dùng để nhấn mạnh mức độ ảnh hưởng của trạng thái tới hành vi.", "example": "高兴得跳了起来 (Vui đến mức nhảy cẫng lên), 累得不想说话 (Mệt đến nỗi không muốn nói năng gì)."}]},
        {"lesson": 17, "title_cn": "谁都有办法看好你的“病”。", "title_pinyin": "Shéi dōu yǒu bànfǎ kànhǎo nǐ de \"bìng\".", "title_vi": "Ai cũng có cách chữa khỏi bệnh cho em.",
         "summary": "Đại từ nghi vấn biểu thị bất định/toàn chỉ (Ai cũng, cái gì cũng, ở đâu cũng)",
         "grammar": [{"point": "Đại từ nghi vấn toàn chỉ (谁都, 什么都, 哪儿都)", "explanation": "Cấu trúc: Đại từ nghi vấn + 都 / 也 + Động từ/Tính từ: biểu thị tất cả hoặc phủ định hoàn toàn.", "example": "谁都知道 (Ai cũng biết), 我什么都不想吃 (Tôi chẳng muốn ăn cái gì cả)."}]},
        {"lesson": 18, "title_cn": "我相信他们会同意的。", "title_pinyin": "Wǒ xiāngxìn tāmen huì tóngyì de.", "title_vi": "Tôi tin họ sẽ đồng ý.",
         "summary": "Bày tỏ niềm tin, quan điểm và cấu trúc 一...就... (Hễ... là...)",
         "grammar": [{"point": "Cấu trúc liên từ 一...就... (Vừa... liền... / Hễ... là...)", "explanation": "Diễn tả hai hành động nối tiếp nhau xảy ra ngay lập tức hoặc quan hệ điều kiện chặt chẽ.", "example": "我一下班就回家 (Tôi vừa tan làm là về nhà ngay)."}]},
        {"lesson": 19, "title_cn": "你没看出来吗？", "title_pinyin": "Nǐ méi kàn chūlái ma?", "title_vi": "Anh không nhìn ra à?",
         "summary": "Ý nghĩa mở rộng của bổ ngữ xu hướng (出来, 起来, 下去)",
         "grammar": [{"point": "Nghĩa chuyển của 出来 (nhận biết, phát hiện ra)", "explanation": "Động từ giác quan + 出来: 看出来 (nhìn ra), 听出来 (nghe nhận ra ai).", "example": "我听出来了，是他的声音 (Tôi nhận ra rồi, là giọng của anh ấy)."}]},
        {"lesson": 20, "title_cn": "我被他影响了。", "title_pinyin": "Wǒ bèi tā yǐngxiǎng le.", "title_vi": "Tôi chịu ảnh hưởng từ anh ấy.",
         "summary": "Câu bị động với chữ 被 (bèi), 让, 叫",
         "grammar": [{"point": "Câu bị động chữ 被 (bèi - Bị / Được)", "explanation": "Cấu trúc: Chủ ngữ (kẻ chịu tác động) + 被 (+ Kẻ gây ra) + Động từ + Thành phần khác.", "example": "苹果被他吃了 (Quả táo bị anh ấy ăn mất rồi), 我的手机被偷了 (Điện thoại của tôi bị trộm mất rồi)."}]}
    ]
}

# Assign words to lessons evenly / contextually
for lvl_key, lessons in LESSONS_METADATA.items():
    words = enriched_by_level[lvl_key]
    num_lessons = len(lessons)
    chunk_size = len(words) // num_lessons
    remainder = len(words) % num_lessons
    
    start_idx = 0
    for i, les in enumerate(lessons):
        # determine count
        count = chunk_size + (1 if i < remainder else 0)
        les_words = words[start_idx:start_idx + count]
        start_idx += count
        
        les["word_count"] = len(les_words)
        les["words"] = les_words
        
        # also update each word with lesson info
        for w in les_words:
            w["lesson_number"] = les["lesson"]
            w["lesson_title"] = les["title_cn"]

# 3. Real-world Practical Dialogues (Hội thoại thực tế đời sống)
SITUATIONAL_DIALOGUES = [
    {
        "id": "milktea",
        "title": "Gọi trà sữa & Cà phê ở quán",
        "category": "Ăn uống & Mua sắm",
        "level": "hsk1-2",
        "scenario": "Bạn bước vào quán trà sữa Mixue hoặc Chagee ở Trung Quốc và gọi đồ uống ưa thích.",
        "dialogue": [
            {"speaker": "店员 (Nhân viên)", "cn": "你好，欢迎光临！你想喝点儿什么？", "pinyin": "Nǐ hǎo, huānyíng guānglín! Nǐ xiǎng hē diǎnr shénme?", "vi": "Xin chào, hoan nghênh quý khách! Bạn muốn uống gì ạ?"},
            {"speaker": "你 (Bạn)", "cn": "你好，我想买一杯珍珠奶茶。", "pinyin": "Nǐ hǎo, wǒ xiǎng mǎi yì bēi zhēnzhū nǎichá.", "vi": "Chào bạn, tôi muốn mua một cốc trà sữa trân châu."},
            {"speaker": "店员 (Nhân viên)", "cn": "好的，大杯还是中杯？要热的还是冰的？", "pinyin": "Hǎo de, dà bēi háishì zhōng bēi? Yào rè de háishì bīng de?", "vi": "Dạ được, ly lớn hay ly vừa ạ? Lấy nóng hay lấy đá?"},
            {"speaker": "你 (Bạn)", "cn": "中杯，少冰，微糖（三分糖）。", "pinyin": "Zhōng bēi, shǎo bīng, wēi táng (sān fēn táng).", "vi": "Ly vừa, ít đá, ít đường (30% đường)."},
            {"speaker": "店员 (Nhân viên)", "cn": "一共十五块。请问微信还是支付宝？", "pinyin": "Yígòng shíwǔ kuài. Qǐngwèn Wēixìn háishì Zhīfùbǎo?", "vi": "Tổng cộng 15 tệ. Xin hỏi bạn quét WeChat hay Alipay ạ?"},
            {"speaker": "你 (Bạn)", "cn": "我扫你，微信支付。", "pinyin": "Wǒ sǎo nǐ, Wēixìn zhīfù.", "vi": "Tôi quét bạn nhé, thanh toán qua WeChat."}
        ],
        "native_tips": "Ở Trung Quốc hiện nay gần như 100% thanh toán qua mã QR (微信 - WeChat hoặc 支付宝 - Alipay). Cụm từ cực kỳ bản xứ: '我扫你' (Tôi quét mã của bạn) hoặc '你扫我' (Bạn quét mã của tôi)."
    },
    {
        "id": "directions",
        "title": "Hỏi đường & Đi tàu điện ngầm",
        "category": "Du lịch & Đi lại",
        "level": "hsk1-2",
        "scenario": "Bạn đang ở ga tàu điện ngầm và muốn tìm đường đến Quảng trường Thiên An Môn.",
        "dialogue": [
            {"speaker": "你 (Bạn)", "cn": "你好，请问去地铁站怎么走？", "pinyin": "Nǐ hǎo, qǐngwèn qù dìtiězhàn zěnme zǒu?", "vi": "Chào bạn, làm ơn cho hỏi đi đến ga tàu điện ngầm đi đường nào?"},
            {"speaker": "路人 (Người qua đường)", "cn": "一直往前走，到了红绿灯往右拐就到了。", "pinyin": "Yìzhí wǎng qián zǒu, dào le hónglǜdēng wǎng yòu guǎi jiù dào le.", "vi": "Cứ đi thẳng về phía trước, đến cột đèn giao thông thì rẽ phải là tới."},
            {"speaker": "你 (Bạn)", "cn": "离这儿远不远？需要走多长时间？", "pinyin": "Lí zhèr yuǎn bù yuǎn? Xūyào zǒu duō cháng shíjiān?", "vi": "Có cách đây xa không? Cần đi bộ bao lâu ạ?"},
            {"speaker": "路人 (Người qua đường)", "cn": "不远，大概走五分钟。", "pinyin": "Bù yuǎn, dàgài zǒu wǔ fēnzhōng.", "vi": "Không xa, tầm đi bộ 5 phút thôi."},
            {"speaker": "你 (Bạn)", "cn": "太感谢您了！", "pinyin": "Tài gǎnxiè nín le!", "vi": "Vô cùng cảm ơn bác ạ!"}
        ],
        "native_tips": "Người Trung Quốc dùng từ '拐' (guǎi - rẽ) phổ biến ở miền Bắc, còn miền Nam hay dùng '转' (zhuǎn). Cụm từ '往前走' (đi về phía trước) là mẫu câu kinh điển khi chỉ đường."
    },
    {
        "id": "shopping",
        "title": "Mặc cả mua sắm ở chợ đêm",
        "category": "Mua sắm đời sống",
        "level": "hsk2-3",
        "scenario": "Bạn mua quần áo quà lưu niệm và thương lượng giá cả với chủ quán.",
        "dialogue": [
            {"speaker": "你 (Bạn)", "cn": "老板，这件衣服怎么卖？", "pinyin": "Lǎobǎn, zhè jiàn yīfu zěnme mài?", "vi": "Ông chủ ơi, chiếc áo này bán thế nào?"},
            {"speaker": "老板 (Chủ quán)", "cn": "帅哥好眼光！这件纯棉的，一百八十块。", "pinyin": "Shuàigē hǎo yǎnguāng! Zhè jiàn chúnmián de, yìbǎi bāshí kuài.", "vi": "Soái ca mắt tinh thế! Chiếc này cotton xịn, 180 tệ nha."},
            {"speaker": "你 (Bạn)", "cn": "太贵了吧，便宜一点儿行不行？一百块怎么样？", "pinyin": "Tài guì le ba, piányi yìdiǎnr xíng bù xíng? Yìbǎi kuài zěnmeyàng?", "vi": "Đắt quá rồi ạ, bớt một chút được không? 100 tệ được không chú?"},
            {"speaker": "老板 (Chủ quán)", "cn": "一百不行，亏本了！最低一百二，不能再少了。", "pinyin": "Yìbǎi bù xíng, kuīběn le! Zuìdī yìbǎi èr, bù néng zài shǎo le.", "vi": "100 không được, lỗ vốn rồi! Thấp nhất 120, không bớt thêm được nữa đâu."},
            {"speaker": "你 (Bạn)", "cn": "成交！帮我打包一件黑色的。", "pinyin": "Chéngjiāo! Bāng wǒ dǎbāo yí jiàn hēisè de.", "vi": "Chốt deal! Gói cho cháu 1 chiếc màu đen nhé."}
        ],
        "native_tips": "Chủ quán rất thích gọi khách nam là '帅哥' (Soái ca) và khách nữ là '美女' (Mỹ nữ) để tạo sự thân thiện. Từ '成交' (Chốt deal/Thỏa thuận thành công) là cách nói rất hiện đại."
    },
    {
        "id": "restaurant",
        "title": "Gọi món ăn nhà hàng & Yêu cầu gia vị",
        "category": "Ăn uống",
        "level": "hsk2-3",
        "scenario": "Đi ăn nhà hàng Trung Hoa, dặn dò nhà bếp khẩu vị cay và không ăn hành tây/ngò.",
        "dialogue": [
            {"speaker": "服务员 (Phục vụ)", "cn": "您好，几位？请这边坐。", "pinyin": "Nín hǎo, jǐ wèi? Qǐng zhè biān zuò.", "vi": "Chào anh chị, đi mấy người ạ? Xin mời ngồi bên này."},
            {"speaker": "你 (Bạn)", "cn": "两位。请给我们菜单。", "pinyin": "Liǎng wèi. Qǐng gěi wǒmen càidān.", "vi": "Hai người ạ. Cho chúng tôi xem thực đơn với."},
            {"speaker": "服务员 (Phục vụ)", "cn": "我们店的招牌菜是宫保鸡丁和水煮牛肉。", "pinyin": "Wǒmen diàn de zhāopáicài shì gōngbǎo jīdīng hé shuǐzhǔ niúròu.", "vi": "Món đặc sản trứ danh của quán là gà xào Cung Bảo và thịt bò cay Tứ Xuyên."},
            {"speaker": "你 (Bạn)", "cn": "好，各来一份！微辣，请不要放香菜。", "pinyin": "Hǎo, gè lái yí fèn! Wēi là, qǐng bú yào fàng xiāngcài.", "vi": "Được, cho mỗi món một phần! Cay nhẹ thôi nhé, và làm ơn đừng cho rau mùi/ngò."},
            {"speaker": "服务员 (Phục vụ)", "cn": "好的，记下了，请稍等。", "pinyin": "Hǎo de, jì xià le, qǐng shāo děng.", "vi": "Vâng, em ghi lại rồi, anh chị chờ một chút nhé."}
        ],
        "native_tips": "Cụm từ '不要放香菜' (Đừng bỏ rau ngò/ngò rí) là câu cứu sinh cho rất nhiều người Việt Nam và khách nước ngoài khi du lịch Trung Quốc!"
    }
]

# Write final merged JSON
output_data = {
    "metadata": {
        "version": "2.0.0",
        "title": "HSK Standard Course 1-3 Master Curriculum",
        "total_words": len(enriched_by_level["hsk1"]) + len(enriched_by_level["hsk2"]) + len(enriched_by_level["hsk3"]),
        "levels": ["hsk1", "hsk2", "hsk3"]
    },
    "levels": {
        "hsk1": {
            "id": "hsk1",
            "name": "HSK 1",
            "title": "HSK 1 - Nhập Môn Phát Âm & Căn Bản",
            "description": "Nắm vững phát âm Pinyin, 150 từ vựng cốt lõi, mẫu câu chào hỏi và sinh hoạt cơ bản.",
            "lessons": LESSONS_METADATA["hsk1"],
            "words": enriched_by_level["hsk1"]
        },
        "hsk2": {
            "id": "hsk2",
            "name": "HSK 2",
            "title": "HSK 2 - Sơ Cấp & Giao Tiếp Đời Sống",
            "description": "Tích lũy thêm 150 từ vựng (tổng 300 từ), sử dụng câu so sánh, câu chữ 是...的 và bổ ngữ kết quả.",
            "lessons": LESSONS_METADATA["hsk2"],
            "words": enriched_by_level["hsk2"]
        },
        "hsk3": {
            "id": "hsk3",
            "name": "HSK 3",
            "title": "HSK 3 - Trung Cấp Sơ Bộ & Tự Tin Diễn Đạt",
            "description": "Tích lũy thêm 300 từ vựng (tổng 600 từ), làm chủ câu chữ 把, câu chữ 被, bổ ngữ xu hướng và kết cấu ngữ pháp phức tạp.",
            "lessons": LESSONS_METADATA["hsk3"],
            "words": enriched_by_level["hsk3"]
        }
    },
    "situational_dialogues": SITUATIONAL_DIALOGUES
}

with open("src/data/hsk_curriculum.json", "w", encoding="utf-8") as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

print(f"SUCCESS! Built comprehensive curriculum saved to src/data/hsk_curriculum.json")
print(f"- HSK 1: {len(enriched_by_level['hsk1'])} words, 15 lessons")
print(f"- HSK 2: {len(enriched_by_level['hsk2'])} words, 15 lessons")
print(f"- HSK 3: {len(enriched_by_level['hsk3'])} words, 20 lessons")
print(f"- Situational Dialogues: {len(SITUATIONAL_DIALOGUES)} real-world scenarios")
