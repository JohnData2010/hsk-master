# -*- coding: utf-8 -*-
"""
HSK 2 Standard Course (BLCUP - Giáo trình chuẩn HSK 2)
15 Lessons with authentic dialogues, sequential vocabulary, and grammar notes.
"""

hsk2_lessons_def = [
    {
        "lesson": 1,
        "title_cn": "九月去北京旅游最好",
        "title_pinyin": "Jiǔyuè qù Běijīng lǚyóu zuì hǎo",
        "title_vi": "Tháng chín đi du lịch Bắc Kinh là tốt nhất",
        "summary": "Nói về sở thích du lịch, thời tiết và các hoạt động thể thao yêu thích.",
        "dialogues": [
            {
                "id": 1,
                "location": "在学校 (Ở trường học)",
                "lines": [
                    {"speaker": "A", "cn": "我要去北京旅游，你觉得什么时候去最好？", "pinyin": "Wǒ yào qù Běijīng lǚyóu, nǐ juéde shénme shíhou qù zuì hǎo?", "vi": "Tôi muốn đi du lịch Bắc Kinh, bạn thấy đi khi nào là đẹp nhất?"},
                    {"speaker": "B", "cn": "九月去北京旅游最好。", "pinyin": "Jiǔyuè qù Běijīng lǚyóu zuì hǎo.", "vi": "Đi du lịch Bắc Kinh vào tháng 9 là thích hợp nhất."},
                    {"speaker": "A", "cn": "为什么？", "pinyin": "Wèishénme?", "vi": "Tại sao vậy?"},
                    {"speaker": "B", "cn": "九月的北京天气不冷也不热。", "pinyin": "Jiǔyuè de Běijīng tiānqì bù lěng yě bú rè.", "vi": "Bắc Kinh tháng 9 thời tiết không lạnh cũng không nóng."}
                ]
            },
            {
                "id": 2,
                "location": "在运动场 (Ở sân vận động)",
                "lines": [
                    {"speaker": "A", "cn": "你喜欢什么运动？", "pinyin": "Nǐ xǐhuan shénme yùndòng?", "vi": "Bạn thích môn thể thao nào?"},
                    {"speaker": "B", "cn": "我最喜欢踢足球。", "pinyin": "Wǒ zuì xǐhuan tī zúqiú.", "vi": "Tôi thích nhất là đá bóng."},
                    {"speaker": "A", "cn": "下午我们一起去踢足球吧。", "pinyin": "Xiàwǔ wǒmen yìqǐ qù tī zúqiú ba.", "vi": "Chiều nay chúng mình cùng đi đá bóng nhé."},
                    {"speaker": "B", "cn": "好啊！", "pinyin": "Hǎo a!", "vi": "Được thôi!"}
                ]
            },
            {
                "id": 3,
                "location": "在家里 (Ở nhà)",
                "lines": [
                    {"speaker": "A", "cn": "我们要不要买几个新的椅子？", "pinyin": "Wǒmen yào bu yào mǎi jǐ ge xīn de yǐzi?", "vi": "Chúng ta có cần mua vài cái ghế mới không?"},
                    {"speaker": "B", "cn": "好啊，明天下午怎么样？你几点能回来？", "pinyin": "Hǎo a, míngtiān xiàwǔ zěnmeyàng? Nǐ jǐ diǎn néng huílái?", "vi": "Được chứ, chiều mai thế nào? Mấy giờ bạn về được?"},
                    {"speaker": "A", "cn": "三点多。", "pinyin": "Sān diǎn duō.", "vi": "Hơn ba giờ một chút."}
                ]
            },
            {
                "id": 4,
                "location": "在客厅 (Ở phòng khách)",
                "lines": [
                    {"speaker": "A", "cn": "桌子下面有个猫。", "pinyin": "Zhuōzi xiàmiàn yǒu ge māo.", "vi": "Dưới bàn có một con mèo kìa."},
                    {"speaker": "B", "cn": "那是王老师的猫，它叫花花。", "pinyin": "Nà shì Wáng lǎoshī de māo, tā jiào Huāhua.", "vi": "Đó là mèo của thầy Vương, nó tên là Hoa Hoa."},
                    {"speaker": "A", "cn": "它很漂亮，眼睛最漂亮。", "pinyin": "Tā hěn piàoliang, yǎnjing zuì piàoliang.", "vi": "Nó đẹp quá, đôi mắt là đẹp nhất."},
                    {"speaker": "B", "cn": "是啊，我觉得它的眼睛真好看。", "pinyin": "Shì a, wǒ juéde tā de yǎnjing zhēn hǎokàn.", "vi": "Đúng vậy, tôi thấy đôi mắt của nó thật xinh."}
                ]
            }
        ],
        "vocab_hanzi": ["旅游", "觉得", "最", "为什么", "运动", "踢", "足球", "身体", "眼睛", "新", "要", "它", "也", "一起", "吧"],
        "grammar": [
            {
                "point": "Phó từ chỉ mức độ cao nhất 最 (zuì)",
                "explanation": "Đứng trước tính từ hoặc động từ tâm lý để chỉ mức độ cao nhất: 最 + Adj / Verb.",
                "example": "九月去北京旅游最好。(Tháng 9 đi du lịch Bắc Kinh là tốt nhất.)"
            },
            {
                "point": "Đại từ nghi vấn hỏi lý do 为什么 (wèishénme)",
                "explanation": "Dùng để hỏi nguyên nhân, lý do. Câu trả lời thường dùng 因为... (Bởi vì...).",
                "example": "你为什么不喝水？(Tại sao bạn không uống nước?)"
            },
            {
                "point": "Động từ năng nguyện 要 (yào) biểu thị nguyện vọng",
                "explanation": "Biểu thị mong muốn, dự định làm một việc gì đó: S + 要 + V.",
                "example": "我要去北京旅游。(Tôi muốn đi du lịch Bắc Kinh.)"
            }
        ]
    },
    {
        "lesson": 2,
        "title_cn": "我每天六点起床",
        "title_pinyin": "Wǒ měitiān liù diǎn qǐchuáng",
        "title_vi": "Tôi thức dậy lúc sáu giờ mỗi ngày",
        "summary": "Thói quen sinh hoạt hằng ngày, thời gian biểu và giữ gìn sức khỏe.",
        "dialogues": [
            {
                "id": 1,
                "location": "在运动场 (Ở sân tập)",
                "lines": [
                    {"speaker": "A", "cn": "你很少生病，是不是喜欢运动？", "pinyin": "Nǐ hěn shǎo shēngbìng, shì bu shì xǐhuan yùndòng?", "vi": "Bạn rất ít khi bị ốm, có phải vì thích thể thao không?"},
                    {"speaker": "B", "cn": "是啊，我每天早上都要出去跑步。", "pinyin": "Shì a, wǒ měitiān zǎoshang dōu yào chūqu pǎobù.", "vi": "Đúng vậy, sáng nào tôi cũng phải ra ngoài chạy bộ."},
                    {"speaker": "A", "cn": "你每天几点起床？", "pinyin": "Nǐ měitiān jǐ diǎn qǐchuáng?", "vi": "Mỗi ngày bạn dậy lúc mấy giờ?"},
                    {"speaker": "B", "cn": "我每天六点起床。", "pinyin": "Wǒ měitiān liù diǎn qǐchuáng.", "vi": "Tôi thức dậy lúc 6 giờ mỗi ngày."}
                ]
            },
            {
                "id": 2,
                "location": "在医院 (Ở bệnh viện)",
                "lines": [
                    {"speaker": "A", "cn": "吃药了吗？现在身体怎么样？", "pinyin": "Chī yào le ma? Xiànzài shēntǐ zěnmeyàng?", "vi": "Bạn đã uống thuốc chưa? Hiện tại cơ thể thế nào rồi?"},
                    {"speaker": "B", "cn": "吃了，现在好多了。", "pinyin": "Chī le, xiànzài hǎo duō le.", "vi": "Uống rồi, bây giờ thấy đỡ hơn nhiều rồi."},
                    {"speaker": "A", "cn": "什么时候能出院？", "pinyin": "Shénme shíhou néng chūyuàn?", "vi": "Khi nào thì có thể xuất viện?"},
                    {"speaker": "B", "cn": "医生说下个星期。", "pinyin": "Yīshēng shuō xià ge xīngqī.", "vi": "Bác sĩ bảo tuần sau."}
                ]
            },
            {
                "id": 3,
                "location": "在操场 (Ở sân thể dục)",
                "lines": [
                    {"speaker": "A", "cn": "二十多个学员，那个最高的是大卫。", "pinyin": "Èrshí duō ge xuéyuán, nàge zuì gāo de shì Dàwèi.", "vi": "Hơn hai mươi học viên, người cao nhất kia là David đấy."},
                    {"speaker": "B", "cn": "他多高？", "pinyin": "Tā duō gāo?", "vi": "Cậu ấy cao bao nhiêu?"},
                    {"speaker": "A", "cn": "一米八几。", "pinyin": "Yì mǐ bā jǐ.", "vi": "Một mét tám mươi mấy phân."},
                    {"speaker": "B", "cn": "你怎么知道这么多？", "pinyin": "Nǐ zěnme zhīdào zhème duō?", "vi": "Sao bạn biết rõ nhiều thế?"},
                    {"speaker": "A", "cn": "他是我同学。", "pinyin": "Tā shì wǒ tóngxué.", "vi": "Cậu ấy là bạn cùng lớp với tôi mà."}
                ]
            },
            {
                "id": 4,
                "location": "在房间 (Trong phòng)",
                "lines": [
                    {"speaker": "A", "cn": "张老师星期六也不休息啊？", "pinyin": "Zhāng lǎoshī xīngqīliù yě bù xiūxi a?", "vi": "Thầy Trương thứ Bảy cũng không nghỉ ngơi sao?"},
                    {"speaker": "B", "cn": "是啊，他最近很忙，没有时间休息。", "pinyin": "Shì a, tā zuìjìn hěn máng, méiyǒu shíjiān xiūxi.", "vi": "Đúng thế, gần đây thầy bận lắm, chẳng có thời gian nghỉ."},
                    {"speaker": "A", "cn": "那会很累吧？", "pinyin": "Nà huì hěn lèi ba?", "vi": "Thế thì chắc mệt lắm nhỉ?"},
                    {"speaker": "B", "cn": "他每天一早到晚都在工作。", "pinyin": "Tā měitiān yì zǎo dào wǎn dōu zài gōngzuò.", "vi": "Thầy ấy từ sáng đến tối mỗi ngày đều làm việc."}
                ]
            }
        ],
        "vocab_hanzi": ["生病", "每", "早上", "跑步", "起床", "药", "出院", "出", "高", "米", "知道", "休息", "忙", "时间", "累"],
        "grammar": [
            {
                "point": "Lượng từ 每 (měi) biểu thị 'mỗi / từng'",
                "explanation": "Đứng trước danh từ hoặc lượng từ: 每 + Lượng từ + Danh từ + 都...",
                "example": "我每天早上都去跑步。(Mỗi buổi sáng tôi đều đi chạy bộ.)"
            },
            {
                "point": "Cách hỏi về mức độ: 多 + Tính từ (duō + Adj)",
                "explanation": "Dùng 多 trước tính từ để hỏi số đo (chiều cao, tuổi tác, khoảng cách): 多高 (cao bao nhiêu), 多大 (bao nhiêu tuổi).",
                "example": "他多高？一米八几。(Cậu ấy cao bao nhiêu? Hơn 1m8.)"
            }
        ]
    },
    {
        "lesson": 3,
        "title_cn": "左边那个红色的是我的",
        "title_pinyin": "Zuǒbian nàge hóngsè de shì wǒ de",
        "title_vi": "Cái màu đỏ ở bên trái là của tôi",
        "summary": "Miêu tả vị trí phương hướng, màu sắc và sở hữu đồ vật.",
        "dialogues": [
            {
                "id": 1,
                "location": "在房间 (Trong phòng)",
                "lines": [
                    {"speaker": "A", "cn": "这块手表是你的吗？", "pinyin": "Zhè kuài shǒubiǎo shì nǐ de ma?", "vi": "Chiếc đồng hồ đeo tay này là của bạn à?"},
                    {"speaker": "B", "cn": "不是我的。是我爸爸的。", "pinyin": "Bú shì wǒ de. Shì wǒ bàba de.", "vi": "Không phải của tôi. Là của bố tôi đấy."},
                    {"speaker": "A", "cn": "多少钱买的？", "pinyin": "Duōshao qián mǎi de?", "vi": "Mua bao nhiêu tiền thế?"},
                    {"speaker": "B", "cn": "三千多块。", "pinyin": "Sānqiān duō kuài.", "vi": "Hơn ba ngàn tệ."}
                ]
            },
            {
                "id": 2,
                "location": "在客厅 (Ở phòng khách)",
                "lines": [
                    {"speaker": "A", "cn": "这是今天早上的报纸吗？", "pinyin": "Zhè shì jīntiān zǎoshang de bàozhǐ ma?", "vi": "Đây có phải tờ báo sáng nay không?"},
                    {"speaker": "B", "cn": "不是，是昨天的。", "pinyin": "Bú shì, shì zuótiān de.", "vi": "Không phải, báo hôm qua đấy."},
                    {"speaker": "A", "cn": "你听，是不是送牛奶的来了？", "pinyin": "Nǐ tīng, shì bu shì sòng niúnǎi de lái le?", "vi": "Bạn nghe xem, có phải người giao sữa tươi đến rồi không?"},
                    {"speaker": "B", "cn": "我看一下。不是，是送报纸的。", "pinyin": "Wǒ kàn yíxià. Bú shì, shì sòng bàozhǐ de.", "vi": "Để tôi xem một chút. Không phải, là người giao báo."}
                ]
            },
            {
                "id": 3,
                "location": "在办公室 (Tại văn phòng)",
                "lines": [
                    {"speaker": "A", "cn": "这是谁的房间？", "pinyin": "Zhè shì shéi de fángjiān?", "vi": "Đây là phòng của ai vậy?"},
                    {"speaker": "B", "cn": "这是我和我丈夫的，旁边那个小的是我女儿的。", "pinyin": "Zhè shì wǒ hé wǒ zhàngfu de, pángbiān nàge xiǎo de shì wǒ nǚ'ér de.", "vi": "Đây là phòng của tôi và chồng tôi, phòng nhỏ bên cạnh là của con gái tôi."},
                    {"speaker": "A", "cn": "你女儿的房间真漂亮！都是粉色的。", "pinyin": "Nǐ nǚ'ér de fángjiān zhēn piàoliang! Dōu shì fěnsè de.", "vi": "Phòng của con gái bạn xinh thật! Toàn là màu hồng."},
                    {"speaker": "B", "cn": "是啊，粉色是我女儿最喜欢的颜色。", "pinyin": "Shì a, fěnsè shì wǒ nǚ'ér zuì xǐhuan de yánsè.", "vi": "Đúng rồi, màu hồng là màu con bé thích nhất mà."}
                ]
            },
            {
                "id": 4,
                "location": "在商店 (Ở cửa hàng)",
                "lines": [
                    {"speaker": "A", "cn": "你看，左边那个红色的是我的。", "pinyin": "Nǐ kàn, zuǒbian nàge hóngsè de shì wǒ de.", "vi": "Bạn xem, cái màu đỏ bên trái kia là của tôi."},
                    {"speaker": "B", "cn": "真好看！右边那个黑色的呢？", "pinyin": "Zhēn hǎokàn! Yòubian nàge hēisè de ne?", "vi": "Đẹp thật đấy! Còn cái màu đen bên phải thì sao?"},
                    {"speaker": "A", "cn": "那是我弟弟买的。", "pinyin": "Nà shì wǒ dìdi mǎi de.", "vi": "Cái đó là em trai tôi mua đấy."}
                ]
            }
        ],
        "vocab_hanzi": ["手表", "千", "报纸", "送", "一下", "牛奶", "房间", "丈夫", "旁边", "真", "颜色", "红", "左边", "右边", "黑", "弟弟", "张"],
        "grammar": [
            {
                "point": "Cụm danh từ lược bỏ trung tâm ngữ mang chữ 的 (de)",
                "explanation": "Khi danh từ đã rõ trong ngữ cảnh, có thể tỉnh lược và chỉ giữ lại cụm có chữ 的: Tính từ / Đại từ + 的.",
                "example": "左边那个红色的是我的。(Cái màu đỏ bên trái là của tôi.)"
            },
            {
                "point": "Động từ + 一下 (yíxià) biểu thị hành động ngắn",
                "explanation": "Dùng sau động từ diễn tả hành động diễn ra trong thời gian ngắn hoặc mang sắc thái nhẹ nhàng, lịch sự.",
                "example": "我看一下。(Để tôi xem qua một chút.)"
            },
            {
                "point": "Phó từ chỉ cảm thán 真 (zhēn)",
                "explanation": "Đứng trước tính từ để biểu thị sự tán thưởng chân thành: 真 + Adj!",
                "example": "你女儿的房间真漂亮！(Phòng con gái bạn thật là đẹp!)"
            }
        ]
    },
    {
        "lesson": 4,
        "title_cn": "这个工作是他帮我介绍的",
        "title_pinyin": "Zhè ge gōngzuò shì tā bāng wǒ jièshào de",
        "title_vi": "Công việc này là anh ấy giới thiệu cho tôi",
        "summary": "Chúc mừng sinh nhật, giới thiệu người quen và nhấn mạnh nguồn gốc.",
        "dialogues": [
            {
                "id": 1,
                "location": "在教室 (Ở phòng học)",
                "lines": [
                    {"speaker": "A", "cn": "生日快乐！这是送给你的！", "pinyin": "Shēngrì kuàilè! Zhè shì sòng gěi nǐ de!", "vi": "Sinh nhật vui vẻ! Đây là quà tặng bạn!"},
                    {"speaker": "B", "cn": "是什么？是一本书吗？", "pinyin": "Shì shénme? Shì yì běn shū ma?", "vi": "Gì thế này? Có phải một quyển sách không?"},
                    {"speaker": "A", "cn": "对，这本书是我写的。", "pinyin": "Duì, zhè běn shū shì wǒ xiě de.", "vi": "Đúng rồi, cuốn sách này do chính tôi viết đấy."},
                    {"speaker": "B", "cn": "太谢谢你了！", "pinyin": "Tài xièxie nǐ le!", "vi": "Cảm ơn bạn nhiều lắm nhé!"}
                ]
            },
            {
                "id": 2,
                "location": "在家里 (Ở nhà)",
                "lines": [
                    {"speaker": "A", "cn": "早上有你一个电话。", "pinyin": "Zǎoshang yǒu nǐ yí ge diànhuà.", "vi": "Sáng nay có một cuộc điện thoại gọi cho bạn đấy."},
                    {"speaker": "B", "cn": "电话是谁打的？", "pinyin": "Diànhuà shì shéi dǎ de?", "vi": "Ai gọi thế nhỉ?"},
                    {"speaker": "A", "cn": "不知道，是儿子接的。", "pinyin": "Bù zhīdào, shì érzi jiē de.", "vi": "Không biết, con trai nghe máy."},
                    {"speaker": "B", "cn": "好，晚上我问问他。", "pinyin": "Hǎo, wǎnshang wǒ wènwen tā.", "vi": "Được rồi, tối nay tôi hỏi con bé xem sao."}
                ]
            },
            {
                "id": 3,
                "location": "在公司 (Ở công ty)",
                "lines": [
                    {"speaker": "A", "cn": "你喜欢踢足球吗？", "pinyin": "Nǐ xǐhuan tī zúqiú ma?", "vi": "Bạn thích đá bóng không?"},
                    {"speaker": "B", "cn": "非常喜欢。我十一岁的时候开始踢足球，已经踢了十年了。", "pinyin": "Fēicháng xǐhuan. Wǒ shíyī suì de shíhou kāishǐ tī zúqiú, yǐjīng tī le shí nián le.", "vi": "Vô cùng thích. Tôi bắt đầu đá bóng từ năm 11 tuổi, đã đá được mười năm rồi."},
                    {"speaker": "A", "cn": "你在哪儿踢？", "pinyin": "Nǐ zài nǎr tī?", "vi": "Bạn thường đá ở đâu?"},
                    {"speaker": "B", "cn": "在学校踢。", "pinyin": "Zài xuéxiào tī.", "vi": "Đá ở trường học."}
                ]
            },
            {
                "id": 4,
                "location": "在朋友家 (Ở nhà bạn)",
                "lines": [
                    {"speaker": "A", "cn": "你在这儿工作多长时间了？", "pinyin": "Nǐ zài zhèr gōngzuò duō cháng shíjiān le?", "vi": "Bạn làm việc ở đây bao lâu rồi?"},
                    {"speaker": "B", "cn": "已经两年多了，我是2011年来的。", "pinyin": "Yǐjīng liǎng nián duō le, wǒ shì èr líng yī yī nián lái de.", "vi": "Đã hơn hai năm rồi, tôi đến từ năm 2011."},
                    {"speaker": "A", "cn": "你认识谢先生吗？", "pinyin": "Nǐ rènshi Xiè xiānsheng ma?", "vi": "Bạn có quen anh Tạ không?"},
                    {"speaker": "B", "cn": "认识，这个工作就是他帮我介绍的。", "pinyin": "Rènshi, zhè ge gōngzuò jiù shì tā bāng wǒ jièshào de.", "vi": "Quen chứ, chính công việc này là do anh ấy giới thiệu cho tôi mà."}
                ]
            }
        ],
        "vocab_hanzi": ["生日", "快乐", "给", "接", "晚上", "问", "非常", "开始", "已经", "长", "两", "帮", "帮助", "介绍"],
        "grammar": [
            {
                "point": "Cấu trúc 是...的 nhấn mạnh người thực hiện hành động",
                "explanation": "Dùng để nhấn mạnh ai là người đã thực hiện hành động trong quá khứ: Chủ ngữ + 是 + Người + Động từ + 的.",
                "example": "这本书是我写的。(Cuốn sách này là do chính tôi viết đấy.)"
            },
            {
                "point": "Phó từ thời gian 已经...了 (yǐjīng...le)",
                "explanation": "Biểu thị hành động đã hoàn tất hoặc trạng thái đã đạt tới một mức độ nào đó: 已经 + Động từ/Tính từ + 了.",
                "example": "我已经踢了十年了。(Tôi đã đá bóng được 10 năm rồi.)"
            }
        ]
    },
    {
        "lesson": 5,
        "title_cn": "就买这件吧",
        "title_pinyin": "Jiù mǎi zhè jiàn ba",
        "title_vi": "Thế thì mua chiếc áo này đi",
        "summary": "Mua sắm quần áo, chọn món ăn và đưa ra quyết định nhanh chóng.",
        "dialogues": [
            {
                "id": 1,
                "location": "在家里 (Ở nhà)",
                "lines": [
                    {"speaker": "A", "cn": "晚上我们去饭馆吃，怎么样？", "pinyin": "Wǎnshang wǒmen qù fànguǎn chī, zěnmeyàng?", "vi": "Tối nay chúng mình ra quán ăn nhé, thấy sao?"},
                    {"speaker": "B", "cn": "我不想去外面吃，我想在家里吃。", "pinyin": "Wǒ bù xiǎng qù wàimiàn chī, wǒ xiǎng zài jiālǐ chī.", "vi": "Tôi không muốn ra ngoài ăn đâu, tôi muốn ăn cơm ở nhà."},
                    {"speaker": "A", "cn": "那你准备做点儿什么？", "pinyin": "Nà nǐ zhǔnbèi zuò diǎnr shénme?", "vi": "Thế bạn định nấu món gì nào?"},
                    {"speaker": "B", "cn": "就做你爱吃的鱼吧。", "pinyin": "Jiù zuò nǐ ài chī de yú ba.", "vi": "Thì làm món cá bạn thích ăn nhất nhé."}
                ]
            },
            {
                "id": 2,
                "location": "在商店 (Ở cửa hàng quần áo)",
                "lines": [
                    {"speaker": "A", "cn": "帮我看一下这件衣服怎么样？", "pinyin": "Bāng wǒ kàn yíxià zhè jiàn yīfu zěnmeyàng?", "vi": "Xem giúp tôi chiếc áo này trông thế nào?"},
                    {"speaker": "B", "cn": "颜色还可以，就是有点儿大。", "pinyin": "Yánsè hái kěyǐ, jiù shì yǒudiǎnr dà.", "vi": "Màu sắc cũng tạm được, chỉ là hơi rộng một chút."},
                    {"speaker": "A", "cn": "这件小的怎么样？", "pinyin": "Zhè jiàn xiǎo de zěnmeyàng?", "vi": "Thế chiếc cỡ nhỏ này thì sao?"},
                    {"speaker": "B", "cn": "这件不错，就买这件吧。", "pinyin": "Zhè jiàn búcuò, jiù mǎi zhè jiàn ba.", "vi": "Chiếc này đẹp đấy, mua chiếc này đi."}
                ]
            },
            {
                "id": 3,
                "location": "在咖啡馆 (Ở quán cà phê)",
                "lines": [
                    {"speaker": "A", "cn": "今天喝咖啡还是喝茶？", "pinyin": "Jīntiān hē kāfēi háishi hē chá?", "vi": "Hôm nay uống cà phê hay uống trà?"},
                    {"speaker": "B", "cn": "喝茶吧。今天天气真好，喝茶很舒服。", "pinyin": "Hē chá ba. Jīntiān tiānqì zhēn hǎo, hē chá hěn shūfu.", "vi": "Uống trà đi. Hôm nay trời đẹp thế, uống trà dễ chịu lắm."},
                    {"speaker": "A", "cn": "明天的考试你准备好了吗？", "pinyin": "Míngtiān de kǎoshì nǐ zhǔnbèi hǎo le ma?", "vi": "Kỳ thi ngày mai bạn đã chuẩn bị kỹ chưa?"},
                    {"speaker": "B", "cn": "准备好了，没问题。", "pinyin": "Zhǔnbèi hǎo le, méi wèntí.", "vi": "Chuẩn bị xong hết rồi, không vấn đề gì cả."}
                ]
            },
            {
                "id": 4,
                "location": "在路上 (Trên đường)",
                "lines": [
                    {"speaker": "A", "cn": "你觉得汉语难不难？", "pinyin": "Nǐ juéde Hànyǔ nán bu nán?", "vi": "Bạn thấy tiếng Trung có khó không?"},
                    {"speaker": "B", "cn": "汉字很有意思，但是写起来有点儿难。", "pinyin": "Hànzì hěn yǒu yìsi, dànshì xiě qǐlái yǒudiǎnr nán.", "vi": "Chữ Hán rất thú vị, nhưng viết thì hơi khó một chút."},
                    {"speaker": "A", "cn": "下课以后我们一起去复习吧。", "pinyin": "Xiàkè yǐhòu wǒmen yìqǐ qù fùxí ba.", "vi": "Sau khi tan học chúng mình cùng đi ôn bài nhé."}
                ]
            }
        ],
        "vocab_hanzi": ["外", "准备", "就", "鱼", "件", "还", "可以", "不错", "咖啡", "考试", "意思", "以后", "课"],
        "grammar": [
            {
                "point": "Phó từ 就 (jiù) đưa ra quyết định dựa trên điều kiện",
                "explanation": "Dùng để biểu thị một kết luận hay sự lựa chọn hiển nhiên, dứt khoát: 就 + Động từ + ...",
                "example": "就买这件吧。(Thế thì mua cái này đi.)"
            },
            {
                "point": "Phó từ 还 (hái) biểu thị mức độ chấp nhận được",
                "explanation": "Dùng trước tính từ biểu thị 'cũng tạm được, cũng tàm tạm': 还可以, 还好.",
                "example": "颜色还可以。(Màu sắc cũng tàm tạm.)"
            },
            {
                "point": "Mốc thời gian + 以后 (yǐhòu)",
                "explanation": "Diễn tả khoảng thời gian sau một sự việc hoặc thời điểm nào đó.",
                "example": "下课以后我们去吃饭。(Sau khi tan học chúng mình đi ăn cơm.)"
            }
        ]
    },
    {
        "lesson": 6,
        "title_cn": "你怎么不吃了",
        "title_pinyin": "Nǐ zěnme bù chī le",
        "title_vi": "Sao bạn không ăn nữa thế",
        "summary": "Hỏi lý do đột ngột thay đổi thói quen, ăn uống và thể thao.",
        "dialogues": [
            {
                "id": 1,
                "location": "在学校门前 (Trước cổng trường)",
                "lines": [
                    {"speaker": "A", "cn": "学校门外有一辆自行车，是你的吗？", "pinyin": "Xuéxiào mén wài yǒu yí liàng zìxíngchē, shì nǐ de ma?", "vi": "Ngoài cổng trường có một chiếc xe đạp, có phải của bạn không?"},
                    {"speaker": "B", "cn": "不是，我的自行车在门里面呢。", "pinyin": "Bú shì, wǒ de zìxíngchē zài mén lǐmiàn ne.", "vi": "Không phải, xe đạp của tôi ở bên trong cổng cơ."},
                    {"speaker": "A", "cn": "那辆车真漂亮。", "pinyin": "Nà liàng chē zhēn piàoliang.", "vi": "Chiếc xe đó đẹp thật đấy."}
                ]
            },
            {
                "id": 2,
                "location": "在饭馆 (Tại nhà hàng)",
                "lines": [
                    {"speaker": "A", "cn": "你怎么不吃了？这个羊肉很好吃。", "pinyin": "Nǐ zěnme bù chī le? Zhè ge yángròu hěn hǎochī.", "vi": "Sao bạn không ăn nữa thế? Món thịt cừu này ngon lắm mà."},
                    {"speaker": "B", "cn": "我吃饱了。我最近在减重，不能吃太多面条。", "pinyin": "Wǒ chī bǎo le. Wǒ zuìjìn zài jiǎnzhòng, bù néng chī tài duō miàntiáo.", "vi": "Tôi no rồi. Gần đây tôi đang giảm cân, không thể ăn quá nhiều mì sợi được."},
                    {"speaker": "A", "cn": "多吃一点儿吧，没关系。", "pinyin": "Duō chī yìdiǎnr ba, méi guānxi.", "vi": "Ăn thêm chút nữa đi, không sao đâu."}
                ]
            },
            {
                "id": 3,
                "location": "在运动场 (Ở sân bóng rổ)",
                "lines": [
                    {"speaker": "A", "cn": "你今天怎么没去打篮球？", "pinyin": "Nǐ jīntiān zěnme méi qù dǎ lánqiú?", "vi": "Hôm nay sao bạn không đi chơi bóng rổ?"},
                    {"speaker": "B", "cn": "因为今天下雨，所以我们没去。", "pinyin": "Yīnwèi jīntiān xiàyǔ, suǒyǐ wǒmen méi qù.", "vi": "Bởi vì hôm nay trời mưa, cho nên chúng tôi không đi."},
                    {"speaker": "A", "cn": "那你想去游泳吗？", "pinyin": "Nà nǐ xiǎng qù yóuyǒng ma?", "vi": "Thế bạn có muốn đi bơi không?"},
                    {"speaker": "B", "cn": "好啊，我经常去游泳。", "pinyin": "Hǎo a, wǒ jīngcháng qù yóuyǒng.", "vi": "Được chứ, tôi rất thường xuyên đi bơi."}
                ]
            },
            {
                "id": 4,
                "location": "在家里 (Ở nhà)",
                "lines": [
                    {"speaker": "A", "cn": "这箱苹果有几公斤？", "pinyin": "Zhè xiāng píngguǒ yǒu jǐ gōngjīn?", "vi": "Thùng táo này nặng mấy kilôgam thế?"},
                    {"speaker": "B", "cn": "有五公斤。", "pinyin": "Yǒu wǔ gōngjīn.", "vi": "Có 5 cân (kg) đấy."},
                    {"speaker": "A", "cn": "这么多啊！", "pinyin": "Zhème duō a!", "vi": "Nhiều thế cơ à!"}
                ]
            }
        ],
        "vocab_hanzi": ["门", "自行车", "羊肉", "好吃", "面条", "打篮球", "因为", "所以", "游泳", "经常", "公斤"],
        "grammar": [
            {
                "point": "Đại từ nghi vấn 怎么 (zěnme) hỏi nguyên nhân",
                "explanation": "Dùng để hỏi tại sao, thường mang sắc thái ngạc nhiên hoặc trách móc nhẹ: 怎么 + Động từ?",
                "example": "你怎么不吃了？(Sao bạn lại không ăn nữa?)"
            },
            {
                "point": "Liên từ cặp 因为...所以... (yīnwèi...suǒyǐ...)",
                "explanation": "Dùng để liên kết nguyên nhân và kết quả: Bởi vì... cho nên...",
                "example": "因为今天下雨，所以我们没去。(Bởi vì trời mưa nên chúng tôi không đi.)"
            },
            {
                "point": "Trợ từ 了 (le) biểu thị sự biến chuyển trạng thái",
                "explanation": "Đặt ở cuối câu để chỉ sự thay đổi trạng thái: trước kia ăn, bây giờ 'không ăn nữa' (不吃了).",
                "example": "我不吃了。(Tôi không ăn nữa đâu.)"
            }
        ]
    },
    {
        "lesson": 7,
        "title_cn": "你家离公司远吗",
        "title_pinyin": "Nǐ jiā lí gōngsī yuǎn ma",
        "title_vi": "Nhà bạn cách công ty có xa không",
        "summary": "Khoảng cách, phương tiện giao thông và thời gian di chuyển.",
        "dialogues": [
            {
                "id": 1,
                "location": "在教室 (Ở phòng học)",
                "lines": [
                    {"speaker": "A", "cn": "大卫回来了吗？", "pinyin": "Dàwèi huílái le ma?", "vi": "David đã về chưa?"},
                    {"speaker": "B", "cn": "没有，他还在教室学习呢。", "pinyin": "Méiyǒu, tā hái zài jiàoshì xuéxí ne.", "vi": "Chưa, cậu ấy vẫn đang ở lớp học bài cơ."},
                    {"speaker": "A", "cn": "已经九点多了，他怎么还不休息？", "pinyin": "Yǐjīng jiǔ diǎn duō le, tā zěnme hái bù xiūxi?", "vi": "Đã hơn 9 giờ rồi, sao cậu ấy vẫn chưa nghỉ ngơi nhỉ?"},
                    {"speaker": "B", "cn": "他明天有考试。", "pinyin": "Tā míngtiān yǒu kǎoshì.", "vi": "Ngày mai cậu ấy có bài thi mà."}
                ]
            },
            {
                "id": 2,
                "location": "在路上 (Trên đường đi)",
                "lines": [
                    {"speaker": "A", "cn": "你家离公司远吗？", "pinyin": "Nǐ jiā lí gōngsī yuǎn ma?", "vi": "Nhà bạn cách công ty có xa không?"},
                    {"speaker": "B", "cn": "很远，坐公共汽车要一个多小时呢。", "pinyin": "Hěn yuǎn, zuò gōnggòng qìchē yào yí ge duō xiǎoshí ne.", "vi": "Xa lắm, đi xe buýt mất hơn một tiếng đồng hồ cơ."},
                    {"speaker": "A", "cn": "坐公共汽车太慢了，你怎么不开车？", "pinyin": "Zuò gōnggòng qìchē tài màn le, nǐ zěnme bù kāi chē?", "vi": "Đi xe buýt chậm quá, sao bạn không lái xe hơi?"},
                    {"speaker": "B", "cn": "开车也不快，路上车太多了。", "pinyin": "Kāi chē yě bú kuài, lùshang chē tài duō le.", "vi": "Lái xe cũng chẳng nhanh hơn, trên đường nhiều xe lắm."}
                ]
            },
            {
                "id": 3,
                "location": "在车站 (Ở bến xe)",
                "lines": [
                    {"speaker": "A", "cn": "快点儿吧，公共汽车就要来了。", "pinyin": "Kuài diǎnr ba, gōnggòng qìchē jiù yào lái le.", "vi": "Nhanh chân lên nào, xe buýt sắp tới rồi kìa."},
                    {"speaker": "B", "cn": "没关系，下一辆车也很快就到。", "pinyin": "Méi guānxi, xià yí liàng chē yě hěn kuài jiù dào.", "vi": "Không sao đâu, chuyến sau cũng nhanh tới thôi."},
                    {"speaker": "A", "cn": "今天去机场的路真远。", "pinyin": "Jīntiān qù jīchǎng de lù zhēn yuǎn.", "vi": "Hôm nay đường ra sân bay xa thật đấy."}
                ]
            },
            {
                "id": 4,
                "location": "在朋友家门口 (Trước cửa nhà bạn)",
                "lines": [
                    {"speaker": "A", "cn": "今天是你生日？", "pinyin": "Jīntiān shì nǐ shēngrì?", "vi": "Hôm nay là sinh nhật bạn à?"},
                    {"speaker": "B", "cn": "是啊，过生日，大家一起吃个饭。", "pinyin": "Shì a, guò shēngrì, dàjiā yìqǐ chī ge fàn.", "vi": "Đúng rồi, đón sinh nhật, mọi người cùng ăn bữa cơm."},
                    {"speaker": "A", "cn": "祝你生日快乐！这是走之前买的礼物。", "pinyin": "Zhù nǐ shēngrì kuàilè! Zhè shì zǒu zhīqián mǎi de lǐwù.", "vi": "Chúc bạn sinh nhật vui vẻ! Đây là món quà tôi mua trước khi đi."},
                    {"speaker": "B", "cn": "谢谢你，快请进！", "pinyin": "Xièxie nǐ, kuài qǐng jìn!", "vi": "Cảm ơn bạn, mau mời vào!"}
                ]
            }
        ],
        "vocab_hanzi": ["教室", "机场", "路", "离", "公司", "远", "公共汽车", "小时", "慢", "快", "过", "走", "到", "近"],
        "grammar": [
            {
                "point": "Giới từ 离 (lí) biểu thị khoảng cách",
                "explanation": "Dùng để biểu thị cự ly không gian hoặc thời gian: A + 离 + B + (不)远 / (不)近 / Cụm từ đo lường.",
                "example": "我家离公司很远。(Nhà tôi cách công ty rất xa.)"
            },
            {
                "point": "Từ ngữ chỉ khoảng thời gian 小时 (xiǎoshí)",
                "explanation": "Dùng để chỉ thời lượng hành động kéo dài: Số đếm + 个 + 小时.",
                "example": "坐公共汽车要一个多小时。(Đi xe buýt mất hơn một tiếng.)"
            },
            {
                "point": "Kết cấu sắp xảy ra 快要...了 / 就要...了",
                "explanation": "Dùng để diễn tả một hành động hoặc sự việc sắp sửa xảy ra trong tương lai rất gần.",
                "example": "公共汽车就要来了。(Xe buýt sắp tới rồi kìa.)"
            }
        ]
    },
    {
        "lesson": 8,
        "title_cn": "让我想想再说",
        "title_pinyin": "Ràng wǒ xiǎngxiang zài shuō",
        "title_vi": "Để tôi nghĩ đã rồi hãy nói",
        "summary": "Ra quyết định sau khi suy nghĩ, mua sắm đồ dùng và nhờ vả.",
        "dialogues": [
            {
                "id": 1,
                "location": "在教室 (Ở lớp học)",
                "lines": [
                    {"speaker": "A", "cn": "我们下午去看电影，好吗？", "pinyin": "Wǒmen xiàwǔ qù kàn diànyǐng, hǎo ma?", "vi": "Chiều nay chúng mình đi xem phim nhé, được không?"},
                    {"speaker": "B", "cn": "今天下午我有点儿事情，让我想想再说。", "pinyin": "Jīntiān xiàwǔ wǒ yǒudiǎnr shìqing, ràng wǒ xiǎngxiang zài shuō.", "vi": "Chiều nay tôi có chút việc bận, để tôi nghĩ xem đã rồi tính nhé."},
                    {"speaker": "A", "cn": "好，你想好了告诉我。", "pinyin": "Hǎo, nǐ xiǎng hǎo le gàosu wǒ.", "vi": "Được, nghĩ xong thì báo cho tôi biết nhé."}
                ]
            },
            {
                "id": 2,
                "location": "在咖啡厅 (Ở tiệm cà phê)",
                "lines": [
                    {"speaker": "A", "cn": "你在等谁呢？", "pinyin": "Nǐ zài děng shéi ne?", "vi": "Bạn đang đợi ai thế?"},
                    {"speaker": "B", "cn": "我在等张老师，找他问点儿事情。", "pinyin": "Wǒ zài děng Zhāng lǎoshī, zhǎo tā wèn diǎnr shìqing.", "vi": "Tôi đang đợi thầy Trương, tìm thầy để hỏi chút việc."},
                    {"speaker": "A", "cn": "张老师刚才还在办公室呢。", "pinyin": "Zhāng lǎoshī gāngcái hái zài bàngōngshì ne.", "vi": "Thầy Trương lúc nãy vẫn còn ở văn phòng mà."}
                ]
            },
            {
                "id": 3,
                "location": "在商店 (Ở quầy hàng)",
                "lines": [
                    {"speaker": "A", "cn": "服务员，这件衣服有白色的吗？", "pinyin": "Fúwùyuán, zhè jiàn yīfu yǒu báisè de ma?", "vi": "Nhân viên ơi, chiếc áo này có màu trắng không?"},
                    {"speaker": "B", "cn": "有，您看这件怎么样？还有黑色的。", "pinyin": "Yǒu, nín kàn zhè jiàn zěnmeyàng? Hái yǒu hēisè de.", "vi": "Có ạ, chị xem chiếc này thế nào? Còn có cả màu đen nữa ạ."},
                    {"speaker": "A", "cn": "我喜欢白色的，但这件太贵了。", "pinyin": "Wǒ xǐhuan báisè de, dàn zhè jiàn tài guì le.", "vi": "Tôi thích màu trắng, nhưng cái này đắt quá."},
                    {"speaker": "B", "cn": "那件便宜一点儿，也很不错。", "pinyin": "Nà jiàn piányi yìdiǎnr, yě hěn búcuò.", "vi": "Chiếc kia rẻ hơn một chút, cũng rất đẹp đấy ạ."}
                ]
            },
            {
                "id": 4,
                "location": "在公司 (Ở công ty)",
                "lines": [
                    {"speaker": "A", "cn": "经理让我告诉你，明天早上八点开会。", "pinyin": "Jīnglǐ ràng wǒ gàosu nǐ, míngtiān zǎoshang bā diǎn kāihuì.", "vi": "Giám đốc bảo tôi nói với bạn, 8 giờ sáng mai họp đấy."},
                    {"speaker": "B", "cn": "好的，我知道了，谢谢你！", "pinyin": "Hǎo de, wǒ zhīdào le, xièxie nǐ!", "vi": "Vâng, tôi biết rồi, cảm ơn bạn nhiều nhé!"}
                ]
            }
        ],
        "vocab_hanzi": ["再", "让", "告诉", "等", "找", "事情", "服务员", "白", "黑", "贵", "便宜", "您"],
        "grammar": [
            {
                "point": "Câu kiêm ngữ với động từ 让 (ràng) / 叫 (jiào)",
                "explanation": "Diễn tả sự sai khiến, cho phép hoặc yêu cầu ai làm việc gì: Chủ ngữ 1 + 让/叫 + Tân ngữ (Chủ ngữ 2) + Động từ 2.",
                "example": "让我想想再说。(Để tôi suy nghĩ đã rồi hãy tính.)"
            },
            {
                "point": "Phó từ 再 (zài) chỉ hành động làm sau",
                "explanation": "Biểu thị làm một việc gì đó sau khi một điều kiện khác hoàn thành: ... rồi hãy...",
                "example": "你想好了再说。(Bạn nghĩ kỹ rồi hãy nói.)"
            },
            {
                "point": "Trùng điệp động từ (Reduplication of verbs)",
                "explanation": "Động từ lặp lại để biểu thị hành động diễn ra nhẹ nhàng, thử nghiệm hoặc thời gian ngắn: 想想, 看听, 问问.",
                "example": "让我想想。(Để tôi ngẫm nghĩ xem sao.)"
            }
        ]
    },
    {
        "lesson": 9,
        "title_cn": "题太多，我没做完",
        "title_pinyin": "Tí tài duō, wǒ méi zuò wán",
        "title_vi": "Đề thi nhiều quá, em làm không hết",
        "summary": "Kể về kết quả bài thi, học tập và các hoạt động công việc.",
        "dialogues": [
            {
                "id": 1,
                "location": "在教室 (Ở phòng thi)",
                "lines": [
                    {"speaker": "A", "cn": "今天的考试怎么样？题难不难？", "pinyin": "Jīntiān de kǎoshì zěnmeyàng? Tí nán bu nán?", "vi": "Kỳ thi hôm nay thế nào? Đề có khó không?"},
                    {"speaker": "B", "cn": "题太多，我没做完。", "pinyin": "Tí tài duō, wǒ méi zuò wán.", "vi": "Đề thi nhiều quá, em làm không kịp hết."},
                    {"speaker": "A", "cn": "你都听懂了吗？", "pinyin": "Nǐ dōu tīng dǒng le ma?", "vi": "Phần nghe bạn có hiểu hết không?"},
                    {"speaker": "B", "cn": "听懂了，但是写得太慢了。", "pinyin": "Tīng dǒng le, dànshì xiě de tài màn le.", "vi": "Nghe thì hiểu hết, nhưng viết chậm quá."}
                ]
            },
            {
                "id": 2,
                "location": "在宿舍 (Ở ký túc xá)",
                "lines": [
                    {"speaker": "A", "cn": "你看第一道题，做错了没有？", "pinyin": "Nǐ kàn dì-yī dào tí, zuò cuò le méiyǒu?", "vi": "Bạn xem câu hỏi số một, có làm sai không?"},
                    {"speaker": "B", "cn": "我看看... 哎呀，我做错了！", "pinyin": "Wǒ kànkan... Āiyā, wǒ zuò cuò le!", "vi": "Để tôi xem nào... Ái chà, tôi làm sai mất rồi!"},
                    {"speaker": "A", "cn": "没关系，希望下次能考好。", "pinyin": "Méi guānxi, xīwàng xià cì néng kǎo hǎo.", "vi": "Không sao đâu, hy vọng lần tới bạn sẽ thi tốt."}
                ]
            },
            {
                "id": 3,
                "location": "在办公室 (Tại nơi làm việc)",
                "lines": [
                    {"speaker": "A", "cn": "欢迎你来我们公司上班！", "pinyin": "Huānyíng nǐ lái wǒmen gōngsī shàngbān!", "vi": "Nhiệt liệt chào mừng bạn đến công ty chúng tôi làm việc!"},
                    {"speaker": "B", "cn": "谢谢！如果有问题，我可以问您吗？", "pinyin": "Xièxie! Rúguǒ yǒu wèntí, wǒ kěyǐ wèn nín ma?", "vi": "Cảm ơn ạ! Nếu có thắc mắc gì, em có thể hỏi anh không ạ?"},
                    {"speaker": "A", "cn": "当然可以，随时问我。", "pinyin": "Dāngrán kěyǐ, suíshí wèn wǒ.", "vi": "Tất nhiên là được chứ, cứ hỏi tôi bất cứ lúc nào."}
                ]
            },
            {
                "id": 4,
                "location": "在舞蹈室 (Ở phòng khiêu vũ)",
                "lines": [
                    {"speaker": "A", "cn": "你从几岁开始学跳舞？", "pinyin": "Nǐ cóng jǐ suì kāishǐ xué tiàowǔ?", "vi": "Bạn bắt đầu học khiêu vũ từ năm mấy tuổi?"},
                    {"speaker": "B", "cn": "我从七岁开始跳舞。", "pinyin": "Wǒ cóng qī suì kāishǐ tiàowǔ.", "vi": "Tôi bắt đầu nhảy múa từ năm lên bảy tuổi."}
                ]
            }
        ],
        "vocab_hanzi": ["错", "从", "跳舞", "第一", "希望", "问题", "欢迎", "上班", "懂", "完", "题", "回答"],
        "grammar": [
            {
                "point": "Bổ ngữ kết quả (Complement of Result) 完 (wán), 懂 (dǒng), 错 (cuò)",
                "explanation": "Đứng sau động từ chính để biểu thị kết quả của hành động: V + 完 (xong), V + 懂 (hiểu), V + 错 (sai). Phủ định dùng 没 + V + Bổ ngữ kết quả.",
                "example": "题太多，我没做完。(Đề nhiều quá, em làm không hết.)"
            },
            {
                "point": "Số thứ tự với tiền tố 第 (dì)",
                "explanation": "Thêm 第 trước số từ để tạo số thứ tự: 第一 (thứ nhất), 第二 (thứ nhì).",
                "example": "第一道题 (câu hỏi số 1)."
            },
            {
                "point": "Giới từ 从 (cóng) chỉ điểm xuất phát thời gian / không gian",
                "explanation": "Dùng để biểu thị khởi điểm: 从 + Mốc thời gian / Địa điểm...",
                "example": "我从七岁开始跳舞。(Tôi bắt đầu học nhảy từ năm 7 tuổi.)"
            }
        ]
    },
    {
        "lesson": 10,
        "title_cn": "别找了，手机在桌子上呢",
        "title_pinyin": "Bié zhǎo le, shǒujī zài zhuōzi shang ne",
        "title_vi": "Đừng tìm nữa, điện thoại ở trên bàn kìa",
        "summary": "Mệnh lệnh ngăn cấm, tìm kiếm đồ vật và hành động đang diễn ra.",
        "dialogues": [
            {
                "id": 1,
                "location": "在客厅 (Ở phòng khách)",
                "lines": [
                    {"speaker": "A", "cn": "别找了，手机在桌子上呢！", "pinyin": "Bié zhǎo le, shǒujī zài zhuōzi shang ne!", "vi": "Đừng tìm nữa, điện thoại ở ngay trên bàn kìa!"},
                    {"speaker": "B", "cn": "看见了，谢谢！我正要打电话呢。", "pinyin": "Kànjiàn le, xièxie! Wǒ zhèng yào dǎ diànhuà ne.", "vi": "Thấy rồi, cảm ơn nhé! Tôi đang định gọi điện thoại đây."}
                ]
            },
            {
                "id": 2,
                "location": "在厨房 (Trong bếp)",
                "lines": [
                    {"speaker": "A", "cn": "哥哥，你在做什么呢？", "pinyin": "Gēge, nǐ zài zuò shénme ne?", "vi": "Anh trai, anh đang làm gì thế?"},
                    {"speaker": "B", "cn": "我正在洗衣服呢，等一下给你做鸡蛋面。", "pinyin": "Wǒ zhèngzài xǐ yīfu ne, děng yíxià gěi nǐ zuò jīdàn miàn.", "vi": "Anh đang giặt quần áo đây, lát nữa nấu mì trứng cho em nhé."},
                    {"speaker": "A", "cn": "好的，太好了！", "pinyin": "Hǎo de, tài hǎo le!", "vi": "Dạ vâng, tuyệt quá!"}
                ]
            },
            {
                "id": 3,
                "location": "在水果摊 (Ở quầy hoa quả)",
                "lines": [
                    {"speaker": "A", "cn": "这个西瓜真甜！", "pinyin": "Zhè ge xīguā zhēn tián!", "vi": "Quả dưa hấu này ngọt thật!"},
                    {"speaker": "B", "cn": "是啊，今天天气晴，吃西瓜最舒服。", "pinyin": "Shì a, jīntiān tiānqì qíng, chī xīguā zuì shūfu.", "vi": "Đúng thế, hôm nay trời nắng đẹp, ăn dưa hấu là thích nhất."},
                    {"speaker": "A", "cn": "明天好像是阴天呢。", "pinyin": "Míngtiān hǎoxiàng shì yīntiān ne.", "vi": "Ngày mai hình như trời lại âm u đấy."}
                ]
            },
            {
                "id": 4,
                "location": "在房间 (Trong phòng ngủ)",
                "lines": [
                    {"speaker": "A", "cn": "你在看书吗？", "pinyin": "Nǐ zài kàn shū ma?", "vi": "Bạn đang đọc sách à?"},
                    {"speaker": "B", "cn": "我正在看一本很有意思的小说呢。", "pinyin": "Wǒ zhèngzài kàn yì běn hěn yǒu yìsi de xiǎoshuō ne.", "vi": "Tôi đang đọc một cuốn tiểu thuyết rất hay đây."}
                ]
            }
        ],
        "vocab_hanzi": ["别", "手机", "正在", "洗", "哥哥", "鸡蛋", "西瓜", "晴", "阴"],
        "grammar": [
            {
                "point": "Phó từ mệnh lệnh 别 (bié) biểu thị ngăn cấm khuyên nhủ",
                "explanation": "Dùng để khuyên bảo hoặc cấm đoán: 别 + Động từ + (了). Đặt 了 ở cuối thường có nghĩa là 'đừng làm việc đó nữa'.",
                "example": "别找了，手机在桌子上呢。(Đừng tìm nữa, điện thoại ở trên bàn kìa.)"
            },
            {
                "point": "Phó từ 正在...呢 biểu thị hành động đang tiếp diễn",
                "explanation": "Dùng để biểu thị hành động đang diễn ra tại thời điểm nói: 主语 + (正/在/正在) + 动词 + (宾语) + (呢).",
                "example": "我正在洗衣服呢。(Tôi đang giặt quần áo đây này.)"
            }
        ]
    },
    {
        "lesson": 11,
        "title_cn": "他比我大三岁",
        "title_pinyin": "Tā bǐ wǒ dà sān suì",
        "title_vi": "Anh ấy lớn hơn tôi ba tuổi",
        "summary": "So sánh về tuổi tác, ngoại hình, giá cả và đặc điểm đồ vật.",
        "dialogues": [
            {
                "id": 1,
                "location": "在操场 (Ở sân trường)",
                "lines": [
                    {"speaker": "A", "cn": "那个唱歌的男孩子是谁？", "pinyin": "Nàge chànggē de nán háizi shì shéi?", "vi": "Cậu bé đang hát kia là ai thế?"},
                    {"speaker": "B", "cn": "是我哥哥。他比我大三岁。", "pinyin": "Shì wǒ gēge. Tā bǐ wǒ dà sān suì.", "vi": "Là anh trai tôi đấy. Anh ấy lớn hơn tôi 3 tuổi."},
                    {"speaker": "A", "cn": "他唱歌唱得真好听！", "pinyin": "Tā chànggē chàng de zhēn hǎotīng!", "vi": "Anh ấy hát hay thật đấy!"}
                ]
            },
            {
                "id": 2,
                "location": "在学校 (Ở trường)",
                "lines": [
                    {"speaker": "A", "cn": "右边那个女孩子姓什么？", "pinyin": "Yòubian nàge nǚ háizi xìng shénme?", "vi": "Bạn nữ bên phải kia họ gì vậy?"},
                    {"speaker": "B", "cn": "她姓王，是去年来的学生。", "pinyin": "Tā xìng Wáng, shì qùnián lái de xuésheng.", "vi": "Bạn ấy họ Vương, là học sinh đến từ năm ngoái."},
                    {"speaker": "A", "cn": "她比你高吗？", "pinyin": "Tā bǐ nǐ gāo ma?", "vi": "Bạn ấy có cao hơn bạn không?"},
                    {"speaker": "B", "cn": "她可能比我高一点儿。", "pinyin": "Tā kěnéng bǐ wǒ gāo yìdiǎnr.", "vi": "Có lẽ bạn ấy cao hơn tôi một chút."}
                ]
            },
            {
                "id": 3,
                "location": "在商店 (Tại siêu thị)",
                "lines": [
                    {"speaker": "A", "cn": "这件衣服比那件便宜五十块。", "pinyin": "Zhè jiàn yīfu bǐ nà jiàn piányi wǔshí kuài.", "vi": "Chiếc áo này rẻ hơn chiếc kia 50 tệ."},
                    {"speaker": "B", "cn": "便宜很多呢，我们就买这件吧。", "pinyin": "Piányi hěn duō ne, wǒmen jiù mǎi zhè jiàn ba.", "vi": "Rẻ hơn nhiều đấy, chúng mình mua chiếc này đi."},
                    {"speaker": "A", "cn": "好，去付款吧。", "pinyin": "Hǎo, qù fùkuǎn ba.", "vi": "Được, đi thanh toán thôi."}
                ]
            },
            {
                "id": 4,
                "location": "在教室 (Trong phòng học)",
                "lines": [
                    {"speaker": "A", "cn": "老师在说话呢，别大声聊天。", "pinyin": "Lǎoshī zài shuōhuà ne, bié dàshēng liáotiān.", "vi": "Thầy giáo đang nói chuyện đấy, đừng nói to."},
                    {"speaker": "B", "cn": "对不起，我知道了。", "pinyin": "Duìbuqǐ, wǒ zhīdào le.", "vi": "Xin lỗi, tôi biết rồi."}
                ]
            }
        ],
        "vocab_hanzi": ["唱歌", "男", "男人", "女", "女人", "孩子", "比", "说话", "可能", "去年", "姓", "姐姐"],
        "grammar": [
            {
                "point": "Câu so sánh chữ 比 (bǐ)",
                "explanation": "Cấu trúc cơ bản: A + 比 + B + Tính từ. Biểu thị A hơn B về một mặt nào đó.",
                "example": "他比我大。(Anh ấy lớn tuổi hơn tôi.)"
            },
            {
                "point": "So sánh chữ 比 kèm số lượng chênh lệch cụ thể",
                "explanation": "Cấu trúc: A + 比 + B + Tính từ + Cụm từ số lượng (biểu thị độ chênh lệch chính xác).",
                "example": "他比我大三岁。(Anh ấy lớn hơn tôi 3 tuổi.)"
            },
            {
                "point": "Năng nguyện từ / Phó từ 可能 (kěnéng)",
                "explanation": "Dùng để biểu thị sự phỏng đoán, ước chừng: có thể, có lẽ.",
                "example": "她可能比我高一点儿。(Cô ấy có lẽ cao hơn tôi một chút.)"
            }
        ]
    },
    {
        "lesson": 12,
        "title_cn": "你穿得太少了",
        "title_pinyin": "Nǐ chuān de tài shǎo le",
        "title_vi": "Bạn mặc ít áo quá rồi đấy",
        "summary": "Thời tiết lạnh giá có tuyết rơi, sức khỏe và bổ ngữ trạng thái.",
        "dialogues": [
            {
                "id": 1,
                "location": "在家里 (Ở nhà)",
                "lines": [
                    {"speaker": "A", "cn": "外面下雪了，今天零下十度呢。", "pinyin": "Wàimiàn xiàxuě le, jīntiān língxià shí dù ne.", "vi": "Bên ngoài tuyết rơi rồi, hôm nay âm 10 độ cơ đấy."},
                    {"speaker": "B", "cn": "你怎么穿得这么少？快多穿一件衣服。", "pinyin": "Nǐ zěnme chuān de zhème shǎo? Kuài duō chuān yí jiàn yīfu.", "vi": "Sao bạn mặc ít thế này? Mau mặc thêm một chiếc áo ấm vào."},
                    {"speaker": "A", "cn": "我妻子也这么说。", "pinyin": "Wǒ qīzi yě zhème shuō.", "vi": "Vợ tôi cũng bảo thế."}
                ]
            },
            {
                "id": 2,
                "location": "在门前 (Trước cửa)",
                "lines": [
                    {"speaker": "A", "cn": "快请进！外边太冷了。", "pinyin": "Kuài qǐng jìn! Wàibian tài lěng le.", "vi": "Mau mời vào! Bên ngoài lạnh quá."},
                    {"speaker": "B", "cn": "谢谢！今天路上雪很大，车开得真慢。", "pinyin": "Xièxie! Jīntiān lùshang xuě hěn dà, chē kāi de zhēn màn.", "vi": "Cảm ơn! Hôm nay tuyết trên đường dày lắm, xe chạy chậm rì."}
                ]
            },
            {
                "id": 3,
                "location": "在运动场 (Ở đường chạy)",
                "lines": [
                    {"speaker": "A", "cn": "你跑得真快！", "pinyin": "Nǐ pǎo de zhēn kuài!", "vi": "Bạn chạy nhanh thật đấy!"},
                    {"speaker": "B", "cn": "我每天都跑步，所以跑得比弟弟快。", "pinyin": "Wǒ měitiān dōu pǎobù, suǒyǐ pǎo de bǐ dìdi kuài.", "vi": "Ngày nào tôi cũng chạy bộ, cho nên chạy nhanh hơn em trai."}
                ]
            }
        ],
        "vocab_hanzi": ["得", "妻子", "雪", "穿", "进", "慢"],
        "grammar": [
            {
                "point": "Bổ ngữ trạng thái với trợ từ 得 (de)",
                "explanation": "Đánh giá hoặc miêu tả mức độ, kết quả của một hành động: Động từ + 得 + (很/真/太) + Tính từ.",
                "example": "你穿得太少了。(Bạn mặc quá ít áo rồi đấy.) / 车开得真慢。(Xe chạy thật chậm.)"
            },
            {
                "point": "Bổ ngữ trạng thái mang tân ngữ",
                "explanation": "Khi động từ có tân ngữ, cần lặp lại động từ trước 得: Động từ + Tân ngữ + Động từ + 得 + Tính từ.",
                "example": "他跑得真快 / 他跑步跑得真快。(Anh ấy chạy thật là nhanh.)"
            }
        ]
    },
    {
        "lesson": 13,
        "title_cn": "门开着呢",
        "title_pinyin": "Mén kāi zhe ne",
        "title_vi": "Cửa đang mở kìa",
        "summary": "Trạng thái tiếp diễn duy trì, chỉ đường và đặc điểm bề ngoài.",
        "dialogues": [
            {
                "id": 1,
                "location": "在办公室 (Tại văn phòng)",
                "lines": [
                    {"speaker": "A", "cn": "门开着呢，请进吧。", "pinyin": "Mén kāi zhe ne, qǐng jìn ba.", "vi": "Cửa đang mở đấy, xin mời vào ạ."},
                    {"speaker": "B", "cn": "请问张老师在吗？", "pinyin": "Qǐngwèn Zhāng lǎoshī zài ma?", "vi": "Xin hỏi thầy Trương có ở đây không ạ?"},
                    {"speaker": "A", "cn": "他不在，他手里拿着铅笔出去了。", "pinyin": "Tā bú zài, tā shǒulǐ ná zhe qiānbǐ chūqu le.", "vi": "Thầy không có ở đây, thầy cầm cây bút chì trong tay đi ra ngoài rồi."}
                ]
            },
            {
                "id": 2,
                "location": "在教室 (Trong phòng học)",
                "lines": [
                    {"speaker": "A", "cn": "我们班那个爱笑的女孩子是谁？", "pinyin": "Wǒmen bān nàge ài xiào de nǚ háizi shì shéi?", "vi": "Bạn nữ hay cười ở lớp chúng mình là ai thế?"},
                    {"speaker": "B", "cn": "那是杨笑笑，她长着大眼睛，头发很长。", "pinyin": "Nà shì Yáng Xiàoxiao, tā zhǎng zhe dà yǎnjing, tóufa hěn cháng.", "vi": "Đó là Dương Tiếu Tiếu, bạn ấy có đôi mắt to, tóc rất dài."},
                    {"speaker": "A", "cn": "她笑起来真好看！", "pinyin": "Tā xiào qǐlai zhēn hǎokàn!", "vi": "Bạn ấy cười lên trông xinh thật!"}
                ]
            },
            {
                "id": 3,
                "location": "在路上问路 (Hỏi đường ngoài phố)",
                "lines": [
                    {"speaker": "A", "cn": "请问，去北京宾馆怎么走？", "pinyin": "Qǐngwèn, qù Běijīng bīnguǎn zěnme zǒu?", "vi": "Xin hỏi, đường đến khách sạn Bắc Kinh đi như thế nào ạ?"},
                    {"speaker": "B", "cn": "从这儿一直往前面走，到了路口往右拐。", "pinyin": "Cóng zhèr yìzhí wǎng qiánmiàn zǒu, dào le lùkǒu wǎng yòu guǎi.", "vi": "Từ đây cứ đi thẳng mãi về phía trước, đến ngã tư thì rẽ sang phải nhé."},
                    {"speaker": "A", "cn": "好的，谢谢您！", "pinyin": "Hǎo de, xièxie nín!", "vi": "Vâng, cảm ơn ngài nhiều ạ!"}
                ]
            }
        ],
        "vocab_hanzi": ["着", "手", "拿", "铅笔", "班", "长", "笑", "宾馆", "一直", "往", "向"],
        "grammar": [
            {
                "point": "Trợ từ động thái 着 (zhe) biểu thị trạng thái duy trì",
                "explanation": "Đứng sau động từ chỉ trạng thái của sự vật đang được duy trì liên tục: Động từ + 着 + (呢). Phủ định: 没 + Động từ + 着.",
                "example": "门开着呢。(Cửa đang mở kìa.) / 手里拿着铅笔。(Trong tay cầm bút chì.)"
            },
            {
                "point": "Giới từ 往 (wǎng) chỉ phương hướng",
                "explanation": "Dùng biểu thị phương hướng vận động: 往 + Phương vị từ / Địa điểm + Động từ.",
                "example": "一直往前面走。(Cứ đi thẳng về phía trước.) / 往右拐。(Rẽ sang phải.)"
            }
        ]
    },
    {
        "lesson": 14,
        "title_cn": "你看过那个电影吗",
        "title_pinyin": "Nǐ kàn guò nàge diànyǐng ma",
        "title_vi": "Bạn đã từng xem bộ phim đó chưa",
        "summary": "Kể lại trải nghiệm quá khứ, câu chuyển ngoặt mặc dù... nhưng...",
        "dialogues": [
            {
                "id": 1,
                "location": "在教室 (Tại lớp học)",
                "lines": [
                    {"speaker": "A", "cn": "你看过那个中国电影吗？", "pinyin": "Nǐ kàn guò nàge Zhōngguó diànyǐng ma?", "vi": "Bạn đã từng xem bộ phim Trung Quốc kia chưa?"},
                    {"speaker": "B", "cn": "没看过。听说很有意思。", "pinyin": "Méi kàn guò. Tīngshuō hěn yǒu yìsi.", "vi": "Chưa từng xem. Nghe nói là hay lắm đấy."},
                    {"speaker": "A", "cn": "我已经看过两次了，虽然时间很长，但是非常有意思。", "pinyin": "Wǒ yǐjīng kàn guò liǎng cì le, suīrán shíjiān hěn cháng, dànshì fēicháng yǒu yìsi.", "vi": "Tôi đã xem qua hai lần rồi, tuy thời lượng dài nhưng cực kỳ thú vị."},
                    {"speaker": "B", "cn": "那明天我们一起去看看吧。", "pinyin": "Nà míngtiān wǒmen yìqǐ qù kànkan ba.", "vi": "Thế ngày mai chúng mình cùng đi xem nhé."}
                ]
            },
            {
                "id": 2,
                "location": "在操场 (Ở sân trường)",
                "lines": [
                    {"speaker": "A", "cn": "你以前来过中国吗？", "pinyin": "Nǐ yǐqián lái guò Zhōngguó ma?", "vi": "Trước đây bạn đã từng đến Trung Quốc lần nào chưa?"},
                    {"speaker": "B", "cn": "来过一次，那是两百天以前的事了。", "pinyin": "Lái guò yí cì, nà shì liǎngbǎi tiān yǐqián de shì le.", "vi": "Đã từng đến một lần, đó là chuyện của 200 ngày trước rồi."},
                    {"speaker": "A", "cn": "你去过哪儿玩儿？", "pinyin": "Nǐ qù guò nǎr wánr?", "vi": "Bạn đã từng đến những đâu chơi rồi?"},
                    {"speaker": "B", "cn": "我去过北京和上海。", "pinyin": "Wǒ qù guò Běijīng hé Shànghǎi.", "vi": "Tôi đã từng đi Bắc Kinh và Thượng Hải."}
                ]
            },
            {
                "id": 3,
                "location": "在码头 (Ở bến sông)",
                "lines": [
                    {"speaker": "A", "cn": "你坐过大船吗？", "pinyin": "Nǐ zuò guò dà chuán ma?", "vi": "Bạn đã từng ngồi tàu thủy lớn chưa?"},
                    {"speaker": "B", "cn": "坐过，坐在船上看日落真美。", "pinyin": "Zuò guò, zuò zài chuán shang kàn rìluò zhēn měi.", "vi": "Từng ngồi rồi, ngồi trên thuyền ngắm hoàng hôn đẹp lắm."}
                ]
            }
        ],
        "vocab_hanzi": ["过", "次", "虽然", "但是", "百", "玩", "船", "为"],
        "grammar": [
            {
                "point": "Trợ từ động thái 过 (guo) biểu thị trải nghiệm trong quá khứ",
                "explanation": "Đứng sau động từ để chỉ đã từng trải qua một sự việc nào đó trong quá khứ: Động từ + 过. Thể phủ định dùng 没(有) + Động từ + 过.",
                "example": "你看过那个电影吗？(Bạn đã xem qua bộ phim đó chưa?) / 我没去过。(Tôi chưa từng đi qua.)"
            },
            {
                "point": "Động lượng từ 次 (cì)",
                "explanation": "Dùng để biểu thị số lần của một hành động diễn ra: Số từ + 次.",
                "example": "我看过两次了。(Tôi đã xem hai lần rồi.)"
            },
            {
                "point": "Liên từ chuyển ngoặt 虽然...但是... (suīrán...dànshì...)",
                "explanation": "Biểu thị mối quan hệ nhượng bộ và chuyển ngoặt: Tuy rằng... nhưng mà...",
                "example": "虽然时间很长，但是非常有意思。(Tuy thời gian dài nhưng rất thú vị.)"
            }
        ]
    },
    {
        "lesson": 15,
        "title_cn": "新年就要到了",
        "title_pinyin": "Xīnnián jiù yào dào le",
        "title_vi": "Năm mới sắp đến rồi",
        "summary": "Không khí đón năm mới, ga tàu hỏa và lời chúc mừng.",
        "dialogues": [
            {
                "id": 1,
                "location": "在朋友家 (Ở nhà bạn bè)",
                "lines": [
                    {"speaker": "A", "cn": "新年就要到了，你准备怎么过？", "pinyin": "Xīnnián jiù yào dào le, nǐ zhǔnbèi zěnme guò?", "vi": "Năm mới sắp tới rồi, bạn dự định đón thế nào?"},
                    {"speaker": "B", "cn": "我想回家看我爸爸妈妈和妹妹。", "pinyin": "Wǒ xiǎng huí jiā kàn wǒ bàba māma hé mèimei.", "vi": "Tôi muốn về quê thăm bố mẹ và em gái."},
                    {"speaker": "A", "cn": "你买到火车票了吗？", "pinyin": "Nǐ mǎi dào huǒchē piào le ma?", "vi": "Bạn đã mua được vé tàu hỏa chưa?"},
                    {"speaker": "B", "cn": "买到了，明天早上的票。", "pinyin": "Mǎi dào le, míngtiān zǎoshang de piào.", "vi": "Mua được rồi, vé sáng sớm mai đấy."}
                ]
            },
            {
                "id": 2,
                "location": "在火车站 (Ở nhà ga xe lửa)",
                "lines": [
                    {"speaker": "A", "cn": "火车站人真多啊！", "pinyin": "Huǒchēzhàn rén zhēn duō a!", "vi": "Ga tàu hỏa đông người quá đi thôi!"},
                    {"speaker": "B", "cn": "大家都要回家过年呢。", "pinyin": "Dàjiā dōu yào huí jiā guò nián ne.", "vi": "Mọi người ai nấy đều phải về nhà ăn Tết mà."},
                    {"speaker": "A", "cn": "快上车吧，车快要开了。", "pinyin": "Kuài shàng chē ba, chē kuài yào kāi le.", "vi": "Mau lên tàu đi thôi, xe sắp chạy rồi kìa."}
                ]
            },
            {
                "id": 3,
                "location": "在车站告别 (Chia tay ở bến xe)",
                "lines": [
                    {"speaker": "A", "cn": "祝大家新年快乐，身体更健康！", "pinyin": "Zhù dàjiā xīnnián kuàilè, shēntǐ gèng jiànkāng!", "vi": "Chúc mọi người năm mới vui vẻ, sức khỏe dồi dào hơn nữa!"},
                    {"speaker": "B", "cn": "也祝你新的一年学习更好！", "pinyin": "Yě zhù nǐ xīn de yì nián xuéxí gèng hǎo!", "vi": "Cũng chúc bạn một năm mới học tập tốt hơn nữa nhé!"}
                ]
            }
        ],
        "vocab_hanzi": ["票", "火车站", "大家", "更", "妹妹", "卖", "元", "号"],
        "grammar": [
            {
                "point": "Kết cấu thời gian tương lai gần 快要 / 就要...了",
                "explanation": "Nhấn mạnh sự việc sắp sửa xảy ra ngay trước mắt: 快要 / 就要 + Động từ + 了. Khi có trạng ngữ thời gian cụ thể (như 明天) thì chỉ dùng 就要...了.",
                "example": "新年就要到了。(Năm mới sắp đến rồi.)"
            },
            {
                "point": "Phó từ so sánh tăng tiến 更 (gèng)",
                "explanation": "Đứng trước tính từ hoặc động từ tâm lý để chỉ mức độ cao hơn: 更 + Tính từ.",
                "example": "身体更健康。(Sức khỏe dồi dào hơn nữa.)"
            }
        ]
    }
]
