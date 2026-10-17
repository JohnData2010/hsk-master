# -*- coding: utf-8 -*-
"""
HSK 1 Standard Course (BLCUP - Giáo trình chuẩn HSK 1)
15 Lessons with authentic dialogues, sequential vocabulary, and grammar notes.
"""

hsk1_lessons_def = [
    {
        "lesson": 1,
        "title_cn": "你好",
        "title_pinyin": "Nǐ hǎo",
        "title_vi": "Xin chào",
        "summary": "Chào hỏi thông dụng, kính ngữ và cách đáp lại lời xin lỗi.",
        "dialogues": [
            {
                "id": 1,
                "location": "在教室 (Trong lớp học)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你好！",
                        "pinyin": "Nǐ hǎo!",
                        "vi": "Xin chào!"
                    },
                    {
                        "speaker": "B",
                        "cn": "你好！",
                        "pinyin": "Nǐ hǎo!",
                        "vi": "Xin chào!"
                    }
                ]
            },
            {
                "id": 2,
                "location": "在教室 (Trong lớp học)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "您好！",
                        "pinyin": "Nín hǎo!",
                        "vi": "Chào ngài / Chào thầy ạ!"
                    },
                    {
                        "speaker": "B",
                        "cn": "你们好！",
                        "pinyin": "Nǐmen hǎo!",
                        "vi": "Chào các em / Chào các bạn!"
                    }
                ]
            },
            {
                "id": 3,
                "location": "在教室 (Trong lớp học)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "对不起！",
                        "pinyin": "Duìbuqǐ!",
                        "vi": "Xin lỗi!"
                    },
                    {
                        "speaker": "B",
                        "cn": "没关系！",
                        "pinyin": "Méi guānxi!",
                        "vi": "Không sao / Không có gì đâu!"
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "你",
            "好",
            "您",
            "你们",
            "对不起",
            "没关系",
            "一",
            "二",
            "三",
            "四",
            "没"
        ],
        "grammar": [
            {
                "point": "Đại từ nhân xưng kính trọng 您 (nín)",
                "explanation": "您 là hình thức tôn kính của 你, dùng để chào người lớn tuổi hơn, cấp trên hoặc khách hàng trang trọng.",
                "example": "您好，李老师！(Em chào thầy Lý ạ!)"
            },
            {
                "point": "Hậu tố số nhiều 们 (men)",
                "explanation": "Thêm 们 sau đại từ nhân xưng để tạo đại từ số nhiều: 你们 (các bạn), 我们 (chúng tôi), 他们 (họ).",
                "example": "你们好！(Chào các bạn!)"
            }
        ]
    },
    {
        "lesson": 2,
        "title_cn": "谢谢你",
        "title_pinyin": "Xièxie nǐ",
        "title_vi": "Cảm ơn bạn",
        "summary": "Cách bày tỏ lòng biết ơn, lịch sự đáp từ và lời chào tạm biệt.",
        "dialogues": [
            {
                "id": 1,
                "location": "在路上 (Trên đường)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "谢谢你！",
                        "pinyin": "Xièxie nǐ!",
                        "vi": "Cảm ơn bạn nhé!"
                    },
                    {
                        "speaker": "B",
                        "cn": "不客气！",
                        "pinyin": "Bú kèqi!",
                        "vi": "Đừng khách sáo / Không có gì đâu!"
                    }
                ]
            },
            {
                "id": 2,
                "location": "在学校 (Ở trường)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "谢谢！",
                        "pinyin": "Xièxie!",
                        "vi": "Cảm ơn nhé!"
                    },
                    {
                        "speaker": "B",
                        "cn": "不谢！",
                        "pinyin": "Bú xiè!",
                        "vi": "Không có chi!"
                    }
                ]
            },
            {
                "id": 3,
                "location": "告别 (Tạm biệt)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "再见！",
                        "pinyin": "Zàijiàn!",
                        "vi": "Tạm biệt bạn!"
                    },
                    {
                        "speaker": "B",
                        "cn": "再见！",
                        "pinyin": "Zàijiàn!",
                        "vi": "Hẹn gặp lại!"
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "谢谢",
            "不",
            "不客气",
            "再见",
            "五",
            "六",
            "七",
            "八",
            "九",
            "十"
        ],
        "grammar": [
            {
                "point": "Phó từ phủ định 不 (bù)",
                "explanation": "Đứng trước động từ hoặc tính từ để biểu thị ý nghĩa phủ định hiện tại hoặc tương lai.",
                "example": "我不客气 (Tôi không khách sáo), 他不好 (Anh ấy không khỏe)."
            },
            {
                "point": "Biến điệu của chữ 不 (bù -> bú)",
                "explanation": "Khi 不 đứng trước từ mang thanh 4, 不 sẽ đọc biến điệu thành thanh 2 (bú).",
                "example": "不客气 (bú kèqi), 不是 (bú shì)."
            }
        ]
    },
    {
        "lesson": 3,
        "title_cn": "你叫什么名字",
        "title_pinyin": "Nǐ jiào shénme míngzi",
        "title_vi": "Bạn tên là gì",
        "summary": "Hỏi tên tuổi, nghề nghiệp giáo viên / học sinh và giới thiệu quốc tịch.",
        "dialogues": [
            {
                "id": 1,
                "location": "在学校 (Ở trường học)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你叫什么名字？",
                        "pinyin": "Nǐ jiào shénme míngzi?",
                        "vi": "Bạn tên là gì?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我叫李月。",
                        "pinyin": "Wǒ jiào Lǐ Yuè.",
                        "vi": "Tôi tên là Lý Nguyệt."
                    }
                ]
            },
            {
                "id": 2,
                "location": "在教室 (Trong phòng học)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你是老师吗？",
                        "pinyin": "Nǐ shì lǎoshī ma?",
                        "vi": "Bạn có phải là giáo viên không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我不是老师，我是学生。",
                        "pinyin": "Wǒ bú shì lǎoshī, wǒ shì xuésheng.",
                        "vi": "Tôi không phải giáo viên, tôi là học sinh."
                    }
                ]
            },
            {
                "id": 3,
                "location": "在校园 (Trong khuôn viên)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你是中国人吗？",
                        "pinyin": "Nǐ shì Zhōngguó rén ma?",
                        "vi": "Bạn là người Trung Quốc phải không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我不是中国人，我是美国人。",
                        "pinyin": "Wǒ bú shì Zhōngguó rén, wǒ shì Měiguó rén.",
                        "vi": "Tôi không phải người Trung Quốc, tôi là người Mỹ."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "叫",
            "什么",
            "名字",
            "我",
            "是",
            "老师",
            "吗",
            "学生",
            "人",
            "中国",
            "美国"
        ],
        "grammar": [
            {
                "point": "Đại từ nghi vấn 什么 (shénme)",
                "explanation": "Dùng để hỏi về đồ vật hoặc thông tin: Động từ + 什么 (+ Danh từ).",
                "example": "你叫什么名字？(Bạn tên là gì?)"
            },
            {
                "point": "Câu phán đoán với 是 (shì)",
                "explanation": "Cấu trúc: A + 是 + B (A là B). Dạng phủ định là A + 不是 + B.",
                "example": "我是学生。(Tôi là học sinh.)"
            },
            {
                "point": "Trợ từ nghi vấn 吗 (ma)",
                "explanation": "Đặt ở cuối câu trần thuật để biến câu đó thành câu hỏi Có/Không.",
                "example": "你是老师吗？(Bạn là giáo viên phải không?)"
            }
        ]
    },
    {
        "lesson": 4,
        "title_cn": "她是我的汉语老师",
        "title_pinyin": "Tā shì wǒ de Hànyǔ lǎoshī",
        "title_vi": "Cô ấy là giáo viên tiếng Trung của tôi",
        "summary": "Hỏi han về danh tính một người, quốc tịch và mối quan hệ bạn bè.",
        "dialogues": [
            {
                "id": 1,
                "location": "在教室 (Trong lớp học)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "她是谁？",
                        "pinyin": "Tā shì shéi?",
                        "vi": "Cô ấy là ai thế?"
                    },
                    {
                        "speaker": "B",
                        "cn": "她是我的汉语老师，她叫李月。",
                        "pinyin": "Tā shì wǒ de Hànyǔ lǎoshī, tā jiào Lǐ Yuè.",
                        "vi": "Cô ấy là cô giáo tiếng Trung của tôi, cô ấy tên là Lý Nguyệt."
                    }
                ]
            },
            {
                "id": 2,
                "location": "在图书馆 (Trong thư viện)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你是哪国人？",
                        "pinyin": "Nǐ shì nǎ guó rén?",
                        "vi": "Bạn là người nước nào?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我是美国人。你呢？",
                        "pinyin": "Wǒ shì Měiguó rén. Nǐ ne?",
                        "vi": "Tôi là người Mỹ. Còn bạn thì sao?"
                    },
                    {
                        "speaker": "A",
                        "cn": "我是中国人。",
                        "pinyin": "Wǒ shì Zhōngguó rén.",
                        "vi": "Tôi là người Trung Quốc."
                    }
                ]
            },
            {
                "id": 3,
                "location": "看照片 (Xem ảnh kỷ niệm)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "他是谁？",
                        "pinyin": "Tā shì shéi?",
                        "vi": "Cậu ấy là ai?"
                    },
                    {
                        "speaker": "B",
                        "cn": "他是我同学。",
                        "pinyin": "Tā shì wǒ tóngxué.",
                        "vi": "Cậu ấy là bạn cùng lớp của tôi."
                    },
                    {
                        "speaker": "A",
                        "cn": "她呢？她是你同学吗？",
                        "pinyin": "Tā ne? Tā shì nǐ tóngxué ma?",
                        "vi": "Còn bạn nữ kia? Bạn ấy cũng học cùng lớp bạn à?"
                    },
                    {
                        "speaker": "B",
                        "cn": "她不是我同学，她是我朋友。",
                        "pinyin": "Tā bú shì wǒ tóngxué, tā shì wǒ péngyou.",
                        "vi": "Bạn ấy không học cùng lớp, bạn ấy là bạn thân của tôi."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "她",
            "谁",
            "的",
            "汉语",
            "哪",
            "国",
            "呢",
            "他",
            "同学",
            "朋友"
        ],
        "grammar": [
            {
                "point": "Đại từ nghi vấn 谁 (shéi) và 哪 (nǎ)",
                "explanation": "谁 dùng để hỏi 'ai'; 哪 dùng để hỏi 'nào' (nǎ + lượng từ/danh từ: 哪国人).",
                "example": "她是谁？(Cô ấy là ai?)"
            },
            {
                "point": "Trợ từ kết cấu 的 (de) chỉ sở hữu",
                "explanation": "Cấu trúc: Người sở hữu + 的 + Vật sở hữu. Có thể lược bỏ 的 khi chỉ quan hệ thân nhân.",
                "example": "我的汉语老师 (Giáo viên tiếng Trung của tôi)."
            },
            {
                "point": "Trợ từ ngữ khí 呢 (ne) tỉnh lược",
                "explanation": "Dùng sau danh từ hoặc đại từ để hỏi ngược lại với cùng ngữ cảnh: A... 你呢？",
                "example": "我是美国人。你呢？(Tôi là người Mỹ. Còn bạn?)"
            }
        ]
    },
    {
        "lesson": 5,
        "title_cn": "她女儿今年二十岁",
        "title_pinyin": "Tā nǚ'ér jīnnián èrshí suì",
        "title_vi": "Con gái cô ấy năm nay 20 tuổi",
        "summary": "Hỏi số thành viên trong gia đình và hỏi tuổi của trẻ em lẫn người lớn.",
        "dialogues": [
            {
                "id": 1,
                "location": "聊天 (Trò chuyện)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你家有几口人？",
                        "pinyin": "Nǐ jiā yǒu jǐ kǒu rén?",
                        "vi": "Nhà bạn có mấy người?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我家有三口人。",
                        "pinyin": "Wǒ jiā yǒu sān kǒu rén.",
                        "vi": "Nhà tôi có ba người."
                    }
                ]
            },
            {
                "id": 2,
                "location": "聊天 (Hỏi thăm con cái)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你女儿几岁了？",
                        "pinyin": "Nǐ nǚ'ér jǐ suì le?",
                        "vi": "Bé gái nhà bạn mấy tuổi rồi?"
                    },
                    {
                        "speaker": "B",
                        "cn": "她今年四岁了。",
                        "pinyin": "Tā jīnnián sì suì le.",
                        "vi": "Cháu năm nay 4 tuổi rồi."
                    }
                ]
            },
            {
                "id": 3,
                "location": "谈论李老师 (Nói về cô Lý)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "李老师多大了？",
                        "pinyin": "Lǐ lǎoshī duō dà le?",
                        "vi": "Cô Lý năm nay bao nhiêu tuổi rồi?"
                    },
                    {
                        "speaker": "B",
                        "cn": "她今年五十岁了。",
                        "pinyin": "Tā jīnnián wǔshí suì le.",
                        "vi": "Cô ấy năm nay 50 tuổi rồi."
                    },
                    {
                        "speaker": "A",
                        "cn": "她女儿呢？",
                        "pinyin": "Tā nǚ'ér ne?",
                        "vi": "Thế còn con gái cô ấy?"
                    },
                    {
                        "speaker": "B",
                        "cn": "她女儿今年二十岁。",
                        "pinyin": "Tā nǚ'ér jīnnián èrshí suì.",
                        "vi": "Con gái cô ấy năm nay 20 tuổi."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "家",
            "有",
            "口",
            "女儿",
            "几",
            "岁",
            "了",
            "今年",
            "多",
            "大"
        ],
        "grammar": [
            {
                "point": "Hỏi số lượng dưới 10 với 几 (jǐ)",
                "explanation": "几 dùng để hỏi số lượng nhỏ dưới 10: 几 + Lượng từ + Danh từ.",
                "example": "你家有几口人？(Nhà bạn có mấy người?)"
            },
            {
                "point": "Hỏi tuổi: 几岁 vs 多大",
                "explanation": "几岁 dùng hỏi trẻ em dưới 10 tuổi; 多大 dùng hỏi người trưởng thành.",
                "example": "你女儿几岁了？ / 李老师多大了？"
            }
        ]
    },
    {
        "lesson": 6,
        "title_cn": "我会说汉语",
        "title_pinyin": "Wǒ huì shuō Hànyǔ",
        "title_vi": "Tôi biết nói tiếng Trung",
        "summary": "Kỹ năng ngôn ngữ, nấu nướng và đọc viết chữ Hán cơ bản.",
        "dialogues": [
            {
                "id": 1,
                "location": "在学校 (Ở trường)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你会说汉语吗？",
                        "pinyin": "Nǐ huì shuō Hànyǔ ma?",
                        "vi": "Bạn biết nói tiếng Trung không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我会说汉语。",
                        "pinyin": "Wǒ huì shuō Hànyǔ.",
                        "vi": "Tôi biết nói tiếng Trung."
                    },
                    {
                        "speaker": "A",
                        "cn": "你妈妈会说汉语吗？",
                        "pinyin": "Nǐ māma huì shuō Hànyǔ ma?",
                        "vi": "Mẹ bạn biết nói tiếng Trung không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "她不会说。",
                        "pinyin": "Tā bú huì shuō.",
                        "vi": "Mẹ tôi không biết nói."
                    }
                ]
            },
            {
                "id": 2,
                "location": "在厨房 (Trong bếp)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "中国菜好吃吗？",
                        "pinyin": "Zhōngguó cài hǎochī ma?",
                        "vi": "Món ăn Trung Quốc có ngon không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "中国菜很好吃。",
                        "pinyin": "Zhōngguó cài hěn hǎochī.",
                        "vi": "Món ăn Trung Quốc rất là ngon."
                    },
                    {
                        "speaker": "A",
                        "cn": "你会做中国菜吗？",
                        "pinyin": "Nǐ huì zuò Zhōngguó cài ma?",
                        "vi": "Bạn biết nấu món ăn Trung Quốc không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我不会做。",
                        "pinyin": "Wǒ bú huì zuò.",
                        "vi": "Tôi không biết nấu."
                    }
                ]
            },
            {
                "id": 3,
                "location": "在图书馆 (Trong thư viện)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你会写汉字吗？",
                        "pinyin": "Nǐ huì xiě hànzì ma?",
                        "vi": "Bạn biết viết chữ Hán không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我会写。",
                        "pinyin": "Wǒ huì xiě.",
                        "vi": "Tôi biết viết."
                    },
                    {
                        "speaker": "A",
                        "cn": "这个字怎么写？",
                        "pinyin": "Zhè ge zì zěnme xiě?",
                        "vi": "Chữ này viết như thế nào?"
                    },
                    {
                        "speaker": "B",
                        "cn": "对不起，这个字我会读，不会写。",
                        "pinyin": "Duìbuqǐ, zhè ge zì wǒ huì dú, bú huì xiě.",
                        "vi": "Xin lỗi, chữ này tôi biết đọc nhưng không biết viết."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "会",
            "说",
            "妈妈",
            "菜",
            "很",
            "好吃",
            "做",
            "写",
            "汉字",
            "字",
            "怎么",
            "读",
            "说话"
        ],
        "grammar": [
            {
                "point": "Động từ năng nguyện 会 (huì)",
                "explanation": "Biểu thị khả năng, kỹ năng đạt được thông qua quá trình học tập rèn luyện.",
                "example": "我会说汉语。(Tôi biết nói tiếng Trung.)"
            },
            {
                "point": "Câu vị ngữ tính từ (Chủ ngữ + 很 + Tính từ)",
                "explanation": "Tính từ làm vị ngữ trực tiếp, thường đi kèm phó từ 很 mà không cần động từ 是.",
                "example": "中国菜很好吃。(Món ăn Trung Quốc rất ngon.)"
            },
            {
                "point": "Đại từ nghi vấn 怎么 (zěnme)",
                "explanation": "Đứng trước động từ để hỏi về phương thức thực hiện hành động: 怎么 + Động từ.",
                "example": "这个字怎么读？(Chữ này đọc như thế nào?)"
            }
        ]
    },
    {
        "lesson": 7,
        "title_cn": "今天几号",
        "title_pinyin": "Jīntiān jǐ hào",
        "title_vi": "Hôm nay ngày mấy",
        "summary": "Cách nói ngày, tháng, thứ trong tuần và địa điểm dự định đến.",
        "dialogues": [
            {
                "id": 1,
                "location": "看日历 (Xem lịch bàn)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "请问，今天几号？",
                        "pinyin": "Qǐngwèn, jīntiān jǐ hào?",
                        "vi": "Xin hỏi, hôm nay ngày mùng mấy?"
                    },
                    {
                        "speaker": "B",
                        "cn": "今天九月一号。",
                        "pinyin": "Jīntiān jiǔ yuè yī hào.",
                        "vi": "Hôm nay là ngày 1 tháng 9."
                    },
                    {
                        "speaker": "A",
                        "cn": "今天星期几？",
                        "pinyin": "Jīntiān xīngqī jǐ?",
                        "vi": "Hôm nay là thứ mấy?"
                    },
                    {
                        "speaker": "B",
                        "cn": "星期三。",
                        "pinyin": "Xīngqīsān.",
                        "vi": "Thứ tư."
                    }
                ]
            },
            {
                "id": 2,
                "location": "看日历 (Xem ngày hôm qua / ngày mai)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "昨天是几月几号？",
                        "pinyin": "Zuótiān shì jǐ yuè jǐ hào?",
                        "vi": "Hôm qua là ngày mấy tháng mấy?"
                    },
                    {
                        "speaker": "B",
                        "cn": "昨天是八月三十一号，星期二。",
                        "pinyin": "Zuótiān shì bā yuè sānshíyī hào, xīngqī'èr.",
                        "vi": "Hôm qua là ngày 31 tháng 8, thứ ba."
                    },
                    {
                        "speaker": "A",
                        "cn": "明天呢？",
                        "pinyin": "Míngtiān ne?",
                        "vi": "Còn ngày mai?"
                    },
                    {
                        "speaker": "B",
                        "cn": "明天是九月二号，星期四。",
                        "pinyin": "Míngtiān shì jiǔ yuè èr hào, xīngqīsì.",
                        "vi": "Ngày mai là ngày 2 tháng 9, thứ năm."
                    }
                ]
            },
            {
                "id": 3,
                "location": "在学校 (Ở trường)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "明天星期六，你去学校吗？",
                        "pinyin": "Míngtiān xīngqīliù, nǐ qù xuéxiào ma?",
                        "vi": "Ngày mai thứ bảy, bạn có đến trường không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我去学校。",
                        "pinyin": "Wǒ qù xuéxiào.",
                        "vi": "Tôi có đến trường."
                    },
                    {
                        "speaker": "A",
                        "cn": "你去学校做什么？",
                        "pinyin": "Nǐ qù xuéxiào zuò shénme?",
                        "vi": "Bạn đến trường làm gì thế?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我去学校看书。",
                        "pinyin": "Wǒ qù xuéxiào kàn shū.",
                        "vi": "Tôi đến trường đọc sách."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "请",
            "问",
            "今天",
            "号",
            "月",
            "星期",
            "昨天",
            "明天",
            "去",
            "学校",
            "看",
            "书",
            "日"
        ],
        "grammar": [
            {
                "point": "Quy tắc nói ngày tháng tiếng Trung",
                "explanation": "Đi từ đơn vị lớn đến đơn vị nhỏ: Năm -> Tháng (月) -> Ngày (号/日) -> Thứ (星期...).",
                "example": "九月一号，星期三 (Thứ tư, ngày 1 tháng 9)."
            },
            {
                "point": "Câu liên động biểu thị mục đích (去 + Nơi chốn + Động từ)",
                "explanation": "Diễn tả hành động đi đến địa điểm nào đó để thực hiện một mục đích cụ thể.",
                "example": "我去学校看书。(Tôi đến trường đọc sách.)"
            }
        ]
    },
    {
        "lesson": 8,
        "title_cn": "我想喝茶",
        "title_pinyin": "Wǒ xiǎng hē chá",
        "title_vi": "Tôi muốn uống trà",
        "summary": "Nói về sở thích ăn uống, đi mua sắm và hỏi giá tiền đồ vật.",
        "dialogues": [
            {
                "id": 1,
                "location": "在饭馆 (Trong quán ăn)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你想喝什么？",
                        "pinyin": "Nǐ xiǎng hē shénme?",
                        "vi": "Bạn muốn uống gì nào?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我想喝茶。",
                        "pinyin": "Wǒ xiǎng hē chá.",
                        "vi": "Tôi muốn uống trà."
                    },
                    {
                        "speaker": "A",
                        "cn": "你想吃什么？",
                        "pinyin": "Nǐ xiǎng chī shénme?",
                        "vi": "Bạn muốn ăn món gì?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我想吃米饭。",
                        "pinyin": "Wǒ xiǎng chī mǐfàn.",
                        "vi": "Tôi muốn ăn cơm."
                    }
                ]
            },
            {
                "id": 2,
                "location": "在客厅 (Trong phòng khách)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "下午你想做什么？",
                        "pinyin": "Xiàwǔ nǐ xiǎng zuò shénme?",
                        "vi": "Chiều nay bạn muốn làm gì?"
                    },
                    {
                        "speaker": "B",
                        "cn": "下午我想去商店。",
                        "pinyin": "Xiàwǔ wǒ xiǎng qù shāngdiàn.",
                        "vi": "Chiều nay tôi muốn đi cửa hàng."
                    },
                    {
                        "speaker": "A",
                        "cn": "你想买什么？",
                        "pinyin": "Nǐ xiǎng mǎi shénme?",
                        "vi": "Bạn muốn mua đồ gì?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我想买一个杯子。",
                        "pinyin": "Wǒ xiǎng mǎi yí ge bēizi.",
                        "vi": "Tôi muốn mua một chiếc cốc uống nước."
                    }
                ]
            },
            {
                "id": 3,
                "location": "在商店 (Tại cửa hàng)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你好！这个杯子多少钱？",
                        "pinyin": "Nǐ hǎo! Zhè ge bēizi duōshao qián?",
                        "vi": "Xin chào! Chiếc cốc này bao nhiêu tiền ạ?"
                    },
                    {
                        "speaker": "B",
                        "cn": "二十八块。",
                        "pinyin": "Èrshíbā kuài.",
                        "vi": "28 tệ."
                    },
                    {
                        "speaker": "A",
                        "cn": "那个杯子多少钱？",
                        "pinyin": "Nà ge bēizi duōshao qián?",
                        "vi": "Thế còn chiếc cốc kia bao nhiêu tiền?"
                    },
                    {
                        "speaker": "B",
                        "cn": "那个杯子十八块钱。",
                        "pinyin": "Nà ge bēizi shíbā kuài qián.",
                        "vi": "Chiếc cốc kia giá 18 tệ."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "想",
            "喝",
            "茶",
            "吃",
            "米饭",
            "下午",
            "商店",
            "买",
            "个",
            "杯子",
            "这",
            "多少",
            "钱",
            "块",
            "那",
            "饭馆"
        ],
        "grammar": [
            {
                "point": "Động từ năng nguyện 想 (xiǎng)",
                "explanation": "Đứng trước động từ khác biểu thị mong muốn, dự định thực hiện hành động.",
                "example": "我想去商店买一个杯子。(Tôi muốn đi cửa hàng mua một cái cốc.)"
            },
            {
                "point": "Hỏi giá tiền với 多少钱 (duōshao qián)",
                "explanation": "Cấu trúc: Đồ vật + 多少钱？Đơn vị tiền nói trong khẩu ngữ là 块 (kuài).",
                "example": "这个杯子多少钱？—— 二十八块。(Cái cốc này bao nhiêu tiền? - 28 tệ.)"
            }
        ]
    },
    {
        "lesson": 9,
        "title_cn": "你儿子在哪儿工作",
        "title_pinyin": "Nǐ érzi zài nǎr gōngzuò",
        "title_vi": "Con trai bạn làm việc ở đâu",
        "summary": "Hỏi vị trí của người và vật nuôi, hỏi nơi chốn làm việc và nghề nghiệp.",
        "dialogues": [
            {
                "id": 1,
                "location": "在客厅 (Trong phòng khách)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "小猫在哪儿？",
                        "pinyin": "Xiǎo māo zài nǎr?",
                        "vi": "Mèo con ở đâu rồi?"
                    },
                    {
                        "speaker": "B",
                        "cn": "小猫在那儿。",
                        "pinyin": "Xiǎo māo zài nàr.",
                        "vi": "Mèo con ở đằng kia kìa."
                    },
                    {
                        "speaker": "A",
                        "cn": "小狗在哪儿？",
                        "pinyin": "Xiǎo gǒu zài nǎr?",
                        "vi": "Thế cún con ở đâu?"
                    },
                    {
                        "speaker": "B",
                        "cn": "小狗在椅子下面。",
                        "pinyin": "Xiǎo gǒu zài yǐzi xiàmiàn.",
                        "vi": "Cún con đang nằm ở dưới gầm ghế."
                    }
                ]
            },
            {
                "id": 2,
                "location": "在办公室 (Trong phòng làm việc)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你在哪儿工作？",
                        "pinyin": "Nǐ zài nǎr gōngzuò?",
                        "vi": "Bạn làm việc ở đâu?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我在学校工作。",
                        "pinyin": "Wǒ zài xuéxiào gōngzuò.",
                        "vi": "Tôi làm việc ở trường học."
                    },
                    {
                        "speaker": "A",
                        "cn": "你儿子在哪儿工作？",
                        "pinyin": "Nǐ érzi zài nǎr gōngzuò?",
                        "vi": "Con trai bạn làm việc ở đâu?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我儿子在医院工作，他是医生。",
                        "pinyin": "Wǒ érzi zài yīyuàn gōngzuò, tā shì yīshēng.",
                        "vi": "Con trai tôi làm ở bệnh viện, cháu là bác sĩ."
                    }
                ]
            },
            {
                "id": 3,
                "location": "打电话 (Nói chuyện điện thoại)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你爸爸在家吗？",
                        "pinyin": "Nǐ bàba zài jiā ma?",
                        "vi": "Bố bạn có ở nhà không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "不在家。",
                        "pinyin": "Bú zài jiā.",
                        "vi": "Bố tôi không có ở nhà."
                    },
                    {
                        "speaker": "A",
                        "cn": "他在哪儿呢？",
                        "pinyin": "Tā zài nǎr ne?",
                        "vi": "Bác ấy đang ở đâu thế?"
                    },
                    {
                        "speaker": "B",
                        "cn": "他在医院。",
                        "pinyin": "Tā zài yīyuàn.",
                        "vi": "Bác ấy đang ở bệnh viện."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "小",
            "猫",
            "在",
            "那儿",
            "狗",
            "椅子",
            "下",
            "哪儿",
            "工作",
            "儿子",
            "医院",
            "医生",
            "爸爸",
            "火车站"
        ],
        "grammar": [
            {
                "point": "Động từ và giới từ 在 (zài)",
                "explanation": "Động từ: Chủ ngữ + 在 + Nơi chốn (ở đâu). Giới từ: 在 + Nơi chốn + Động từ (làm gì ở đâu).",
                "example": "我在学校工作。(Tôi làm việc ở trường học.)"
            },
            {
                "point": "Đại từ nghi vấn 哪儿 (nǎr)",
                "explanation": "Dùng để hỏi vị trí, địa điểm nơi chốn.",
                "example": "你儿子在哪儿工作？(Con trai bạn làm việc ở đâu?)"
            }
        ]
    },
    {
        "lesson": 10,
        "title_cn": "我能坐这儿吗",
        "title_pinyin": "Wǒ néng zuò zhèr ma",
        "title_vi": "Tôi có thể ngồi đây không",
        "summary": "Miêu tả đồ vật trên bàn, vị trí trước sau và xin phép lịch sự.",
        "dialogues": [
            {
                "id": 1,
                "location": "在办公室 (Trong phòng làm việc)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "桌子上有什么？",
                        "pinyin": "Zhuōzi shang yǒu shénme?",
                        "vi": "Trên bàn có những thứ gì?"
                    },
                    {
                        "speaker": "B",
                        "cn": "桌子上有一个电脑和一本书。",
                        "pinyin": "Zhuōzi shang yǒu yí ge diànnǎo hé yì běn shū.",
                        "vi": "Trên bàn có một chiếc máy vi tính và một quyển sách."
                    },
                    {
                        "speaker": "A",
                        "cn": "杯子在哪儿？",
                        "pinyin": "Bēizi zài nǎr?",
                        "vi": "Thế cốc nước ở đâu?"
                    },
                    {
                        "speaker": "B",
                        "cn": "杯子在桌子里。",
                        "pinyin": "Bēizi zài zhuōzi li.",
                        "vi": "Cốc nước ở trong hộc bàn."
                    }
                ]
            },
            {
                "id": 2,
                "location": "在健身房 (Trong phòng tập)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "前面那个人叫什么名字？",
                        "pinyin": "Qiánmiàn nà ge rén jiào shénme míngzi?",
                        "vi": "Người phía trước kia tên là gì thế?"
                    },
                    {
                        "speaker": "B",
                        "cn": "他叫王方，在医院工作。",
                        "pinyin": "Tā jiào Wáng Fāng, zài yīyuàn gōngzuò.",
                        "vi": "Anh ấy tên là Vương Phương, làm việc ở bệnh viện."
                    },
                    {
                        "speaker": "A",
                        "cn": "后面那个人呢？他叫什么名字？",
                        "pinyin": "Hòumiàn nà ge rén ne? Tā jiào shénme míngzi?",
                        "vi": "Còn người phía sau? Anh ấy tên là gì?"
                    },
                    {
                        "speaker": "B",
                        "cn": "他叫谢朋，在商店工作。",
                        "pinyin": "Tā jiào Xiè Péng, zài shāngdiàn gōngzuò.",
                        "vi": "Anh ấy tên là Tạ Bằng, làm việc ở cửa hàng."
                    }
                ]
            },
            {
                "id": 3,
                "location": "在图书馆 (Trong thư viện)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "这儿有人吗？",
                        "pinyin": "Zhèr yǒu rén ma?",
                        "vi": "Chỗ này có ai ngồi chưa ạ?"
                    },
                    {
                        "speaker": "B",
                        "cn": "没有。",
                        "pinyin": "Méiyǒu.",
                        "vi": "Chưa có ai cả."
                    },
                    {
                        "speaker": "A",
                        "cn": "我能坐这儿吗？",
                        "pinyin": "Wǒ néng zuò zhèr ma?",
                        "vi": "Tôi có thể ngồi ở đây được không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "请坐。",
                        "pinyin": "Qǐng zuò.",
                        "vi": "Xin mời ngồi."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "桌子",
            "上",
            "电脑",
            "和",
            "本",
            "里",
            "前面",
            "后面",
            "这儿",
            "没有",
            "能",
            "坐"
        ],
        "grammar": [
            {
                "point": "Câu tồn hiện chữ 有 (yǒu)",
                "explanation": "Biểu thị sự tồn tại của người hoặc vật ở một vị trí: Địa điểm/Phương vị + 有 + Danh từ.",
                "example": "桌子上有一个电脑。(Trên bàn có một chiếc máy vi tính.)"
            },
            {
                "point": "Động từ năng nguyện 能 (néng) xin phép",
                "explanation": "Dùng trong câu hỏi để xin phép lịch sự: 我能 + Động từ + 吗？",
                "example": "我能坐这儿吗？(Tôi có thể ngồi đây không?)"
            }
        ]
    },
    {
        "lesson": 11,
        "title_cn": "现在几点",
        "title_pinyin": "Xiànzài jǐ diǎn",
        "title_vi": "Bây giờ mấy giờ",
        "summary": "Cách nói giờ phút cụ thể, mốc thời gian làm việc và lịch trình sinh hoạt.",
        "dialogues": [
            {
                "id": 1,
                "location": "在教室 (Trong lớp học)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "现在几点？",
                        "pinyin": "Xiànzài jǐ diǎn?",
                        "vi": "Bây giờ là mấy giờ rồi?"
                    },
                    {
                        "speaker": "B",
                        "cn": "现在十点十分。",
                        "pinyin": "Xiànzài shí diǎn shí fēn.",
                        "vi": "Bây giờ là 10 giờ 10 phút."
                    },
                    {
                        "speaker": "A",
                        "cn": "中午几点吃饭？",
                        "pinyin": "Zhōngwǔ jǐ diǎn chī fàn?",
                        "vi": "Buổi trưa mấy giờ thì ăn cơm?"
                    },
                    {
                        "speaker": "B",
                        "cn": "十二点吃饭。",
                        "pinyin": "Shí'èr diǎn chī fàn.",
                        "vi": "12 giờ trưa ăn cơm."
                    }
                ]
            },
            {
                "id": 2,
                "location": "在宿舍 (Ở ký túc xá)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "爸爸什么时候回家？",
                        "pinyin": "Bàba shénme shíhou huí jiā?",
                        "vi": "Bố khi nào thì về nhà thế?"
                    },
                    {
                        "speaker": "B",
                        "cn": "下午五点。",
                        "pinyin": "Xiàwǔ wǔ diǎn.",
                        "vi": "5 giờ chiều."
                    },
                    {
                        "speaker": "A",
                        "cn": "我们什么时候去看电影？",
                        "pinyin": "Wǒmen shénme shíhou qù kàn diànyǐng?",
                        "vi": "Bao giờ chúng mình đi xem phim?"
                    },
                    {
                        "speaker": "B",
                        "cn": "六点三十分。",
                        "pinyin": "Liù diǎn sānshí fēn.",
                        "vi": "6 giờ 30 phút."
                    }
                ]
            },
            {
                "id": 3,
                "location": "在操场 (Trên sân vận động)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "我星期一去北京。",
                        "pinyin": "Wǒ xīngqīyī qù Běijīng.",
                        "vi": "Thứ hai tôi sẽ đi Bắc Kinh."
                    },
                    {
                        "speaker": "B",
                        "cn": "你想在北京住几天？",
                        "pinyin": "Nǐ xiǎng zài Běijīng zhù jǐ tiān?",
                        "vi": "Bạn muốn ở Bắc Kinh mấy ngày?"
                    },
                    {
                        "speaker": "A",
                        "cn": "住三天。",
                        "pinyin": "Zhù sān tiān.",
                        "vi": "Tôi ở lại 3 ngày."
                    },
                    {
                        "speaker": "B",
                        "cn": "星期五前能回家吗？",
                        "pinyin": "Xīngqīwǔ qián néng huí jiā ma?",
                        "vi": "Trước thứ sáu có thể về đến nhà không?"
                    },
                    {
                        "speaker": "A",
                        "cn": "能。",
                        "pinyin": "Néng.",
                        "vi": "Được chứ."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "现在",
            "点",
            "分",
            "中午",
            "吃饭",
            "时候",
            "回",
            "我们",
            "电影",
            "住",
            "前",
            "北京"
        ],
        "grammar": [
            {
                "point": "Cách diễn đạt thời gian trong ngày",
                "explanation": "Cấu trúc: Giờ (点) + Phút (分). Buổi trong ngày đặt trước số giờ.",
                "example": "下午五点 (5 giờ chiều), 十点十分 (10 giờ 10 phút)."
            },
            {
                "point": "Đại từ nghi vấn 什么时候 (shénme shíhou)",
                "explanation": "Dùng để hỏi về thời điểm xảy ra hành động (khi nào, bao giờ).",
                "example": "你什么时候回家？(Bao giờ bạn về nhà?)"
            }
        ]
    },
    {
        "lesson": 12,
        "title_cn": "明天天气怎么样",
        "title_pinyin": "Míngtiān tiānqì zěnmeyàng",
        "title_vi": "Ngày mai thời tiết thế nào",
        "summary": "Nói về thời tiết nóng lạnh mưa nắng, hỏi thăm sức khỏe và quan tâm nhau.",
        "dialogues": [
            {
                "id": 1,
                "location": "在教室 (Trong lớp học)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "昨天北京的天气怎么样？",
                        "pinyin": "Zuótiān Běijīng de tiānqì zěnmeyàng?",
                        "vi": "Hôm qua thời tiết ở Bắc Kinh thế nào?"
                    },
                    {
                        "speaker": "B",
                        "cn": "太热了。",
                        "pinyin": "Tài rè le.",
                        "vi": "Nóng quá chừng."
                    },
                    {
                        "speaker": "A",
                        "cn": "明天呢？明天天气怎么样？",
                        "pinyin": "Míngtiān ne? Míngtiān tiānqì zěnmeyàng?",
                        "vi": "Còn ngày mai? Ngày mai thời tiết thế nào?"
                    },
                    {
                        "speaker": "B",
                        "cn": "明天天气很好，不冷不热。",
                        "pinyin": "Míngtiān tiānqì hěn hǎo, bù lěng bú rè.",
                        "vi": "Ngày mai thời tiết rất đẹp, không lạnh cũng không nóng."
                    }
                ]
            },
            {
                "id": 2,
                "location": "在操场 (Trên sân vận động)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "今天会下雨吗？",
                        "pinyin": "Jīntiān huì xià yǔ ma?",
                        "vi": "Hôm nay trời có mưa không nhỉ?"
                    },
                    {
                        "speaker": "B",
                        "cn": "今天不会下雨。",
                        "pinyin": "Jīntiān bú huì xià yǔ.",
                        "vi": "Hôm nay trời sẽ không mưa đâu."
                    },
                    {
                        "speaker": "A",
                        "cn": "王小姐今天会来吗？",
                        "pinyin": "Wáng xiǎojiě jīntiān huì lái ma?",
                        "vi": "Cô Vương hôm nay có đến không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "不会来，天气太冷了。",
                        "pinyin": "Bú huì lái, tiānqì tài lěng le.",
                        "vi": "Cô ấy sẽ không đến đâu, thời tiết lạnh quá."
                    }
                ]
            },
            {
                "id": 3,
                "location": "在健身房 (Trong phòng gym)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你身体怎么样？",
                        "pinyin": "Nǐ shēntǐ zěnmeyàng?",
                        "vi": "Dạo này sức khỏe bạn thế nào?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我身体很好。天气太热了，多喝些水吧。",
                        "pinyin": "Wǒ shēntǐ hěn hǎo. Tiānqì tài rè le, duō hē xiē shuǐ ba.",
                        "vi": "Sức khỏe tôi rất tốt. Trời nóng quá, bạn uống nhiều nước vào nhé."
                    },
                    {
                        "speaker": "A",
                        "cn": "谢谢你，医生。",
                        "pinyin": "Xièxie nǐ, yīshēng.",
                        "vi": "Cảm ơn bác sĩ nhiều ạ."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "天气",
            "怎么样",
            "太",
            "热",
            "冷",
            "下雨",
            "雨",
            "小姐",
            "来",
            "身体",
            "爱",
            "水果",
            "水",
            "些"
        ],
        "grammar": [
            {
                "point": "Đại từ nghi vấn 怎么样 (zěnmeyàng)",
                "explanation": "Dùng để hỏi về tình hình, trạng thái hoặc tính chất của người hay sự vật.",
                "example": "明天天气怎么样？(Ngày mai thời tiết thế nào?)"
            },
            {
                "point": "Cấu trúc cảm thán 太...了 (tài...le)",
                "explanation": "Biểu thị mức độ cao: quá, lắm. Mang ý khen ngợi hoặc phàn nàn.",
                "example": "太热了！(Nóng quá rồi!) / 太漂亮了！(Đẹp quá!)"
            }
        ]
    },
    {
        "lesson": 13,
        "title_cn": "他在学做中国菜呢",
        "title_pinyin": "Tā zài xué zuò Zhōngguó cài ne",
        "title_vi": "Anh ấy đang học nấu món Trung Quốc",
        "summary": "Gọi điện thoại, diễn tả hành động đang diễn ra và sở thích cá nhân.",
        "dialogues": [
            {
                "id": 1,
                "location": "打电话 (Nói chuyện điện thoại)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "喂，你在做什么呢？",
                        "pinyin": "Wèi, nǐ zài zuò shénme ne?",
                        "vi": "Alo, bạn đang làm gì đấy?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我在看书呢。",
                        "pinyin": "Wǒ zài kàn shū ne.",
                        "vi": "Tôi đang đọc sách nè."
                    },
                    {
                        "speaker": "A",
                        "cn": "大卫也在看书吗？",
                        "pinyin": "Dàwèi yě zài kàn shū ma?",
                        "vi": "David cũng đang đọc sách à?"
                    },
                    {
                        "speaker": "B",
                        "cn": "他没看书，他在学做中国菜呢。",
                        "pinyin": "Tā méi kàn shū, tā zài xué zuò Zhōngguó cài ne.",
                        "vi": "Cậu ấy không đọc sách, cậu ấy đang học nấu món ăn Trung Quốc đấy."
                    }
                ]
            },
            {
                "id": 2,
                "location": "在咖啡馆 (Ở quán cà phê)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "昨天上午你在做什么呢？",
                        "pinyin": "Zuótiān shàngwǔ nǐ zài zuò shénme ne?",
                        "vi": "Sáng hôm qua bạn làm gì thế?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我在睡觉呢。你呢？",
                        "pinyin": "Wǒ zài shuìjiào ne. Nǐ ne?",
                        "vi": "Tôi ngủ nướng ở nhà. Còn bạn?"
                    },
                    {
                        "speaker": "A",
                        "cn": "我在家看电视呢。你喜欢看电视吗？",
                        "pinyin": "Wǒ zài jiā kàn diànshì ne. Nǐ xǐhuan kàn diànshì ma?",
                        "vi": "Tôi ở nhà xem tivi. Bạn có thích xem tivi không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我不喜欢看电视，我喜欢看电影。",
                        "pinyin": "Wǒ bù xǐhuan kàn diànshì, wǒ xǐhuan kàn diànyǐng.",
                        "vi": "Tôi không thích xem tivi, tôi thích đi xem phim chiếu rạp hơn."
                    }
                ]
            },
            {
                "id": 3,
                "location": "在操场 (Trên sân vận động)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "82304155，这是张老师的电话吗？",
                        "pinyin": "Bā èr sān líng sì yāo wǔ wǔ, zhè shì Zhāng lǎoshī de diànhuà ma?",
                        "vi": "82304155, đây có phải số điện thoại của cô Trương không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "不是，她的电话是82304156。",
                        "pinyin": "Bú shì, tā de diànhuà shì bā èr sān líng sì yāo wǔ liù.",
                        "vi": "Không phải, số của cô ấy là 82304156 cơ."
                    },
                    {
                        "speaker": "A",
                        "cn": "好，我现在给她打电话。",
                        "pinyin": "Hǎo, wǒ xiànzài gěi tā dǎ diànhuà.",
                        "vi": "Được, bây giờ tôi sẽ gọi điện thoại cho cô ấy."
                    },
                    {
                        "speaker": "B",
                        "cn": "她在工作呢，下午打吧。",
                        "pinyin": "Tā zài gōngzuò ne, xiàwǔ dǎ ba.",
                        "vi": "Cô ấy đang làm việc đấy, để chiều hãy gọi nhé."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "喂",
            "也",
            "学习",
            "上午",
            "睡觉",
            "电视",
            "喜欢",
            "给",
            "打电话",
            "吧"
        ],
        "grammar": [
            {
                "point": "Hành động đang tiếp diễn với 在...呢 (zài...ne)",
                "explanation": "Cấu trúc: Chủ ngữ + 在 + Động từ (+ Tân ngữ) + 呢. Dạng phủ định là 没在.",
                "example": "他在学做中国菜呢。(Anh ấy đang học nấu món ăn Trung Quốc đấy.)"
            },
            {
                "point": "Giới từ 给 (gěi) chỉ đối tượng tiếp nhận",
                "explanation": "Cấu trúc: A + 给 + B + Động từ (A làm gì cho B / tới B).",
                "example": "我给她打电话。(Tôi gọi điện thoại cho cô ấy.)"
            }
        ]
    },
    {
        "lesson": 14,
        "title_cn": "她买了不少衣服",
        "title_pinyin": "Tā mǎi le bù shǎo yīfu",
        "title_vi": "Cô ấy mua không ít quần áo",
        "summary": "Kể lại chuyến đi mua sắm và hành động đã hoàn thành trong quá khứ.",
        "dialogues": [
            {
                "id": 1,
                "location": "在宿舍 (Ở ký túc xá)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "昨天上午你去哪儿了？",
                        "pinyin": "Zuótiān shàngwǔ nǐ qù nǎr le?",
                        "vi": "Sáng hôm qua bạn đã đi đâu thế?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我去商店买东西了。",
                        "pinyin": "Wǒ qù shāngdiàn mǎi dōngxi le.",
                        "vi": "Tôi đi cửa hàng mua sắm đồ đạc."
                    },
                    {
                        "speaker": "A",
                        "cn": "你买什么了？",
                        "pinyin": "Nǐ mǎi shénme le?",
                        "vi": "Bạn đã mua những gì rồi?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我买了一点儿苹果。",
                        "pinyin": "Wǒ mǎi le yìdiǎnr píngguǒ.",
                        "vi": "Tôi mua được một ít táo tươi."
                    }
                ]
            },
            {
                "id": 2,
                "location": "在公司门前 (Trước cổng công ty)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你看见张先生了吗？",
                        "pinyin": "Nǐ kànjiàn Zhāng xiānsheng le ma?",
                        "vi": "Bạn có nhìn thấy ông Trương đâu không?"
                    },
                    {
                        "speaker": "B",
                        "cn": "看见了，他去学开车了。",
                        "pinyin": "Kànjiàn le, tā qù xué kāi chē le.",
                        "vi": "Thấy rồi, anh ấy đi học lái xe ô tô rồi."
                    },
                    {
                        "speaker": "A",
                        "cn": "他什么时候能回来？",
                        "pinyin": "Tā shénme shíhou néng huílái?",
                        "vi": "Khi nào anh ấy có thể về?"
                    },
                    {
                        "speaker": "B",
                        "cn": "四十分钟后回来。",
                        "pinyin": "Sìshí fēnzhōng hòu huílái.",
                        "vi": "40 phút nữa là anh ấy về rồi."
                    }
                ]
            },
            {
                "id": 3,
                "location": "在商场 (Trong trung tâm thương mại)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "李老师的衣服太漂亮了！",
                        "pinyin": "Lǐ lǎoshī de yīfu tài piàoliang le!",
                        "vi": "Quần áo của cô Lý đẹp xuất sắc luôn!"
                    },
                    {
                        "speaker": "B",
                        "cn": "是啊，她买了不少衣服。",
                        "pinyin": "Shì a, tā mǎi le bù shǎo yīfu.",
                        "vi": "Đúng thế đấy, cô ấy đã mua không ít quần áo đâu."
                    },
                    {
                        "speaker": "A",
                        "cn": "你买什么了？",
                        "pinyin": "Nǐ mǎi shénme le?",
                        "vi": "Thế bạn đã mua được món gì chưa?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我没买，这些都是李老师的东西。",
                        "pinyin": "Wǒ méi mǎi, zhèxiē dōu shì Lǐ lǎoshī de dōngxi.",
                        "vi": "Tôi chưa mua gì cả, chỗ này toàn là đồ của cô Lý thôi."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "东西",
            "一点儿",
            "苹果",
            "看见",
            "先生",
            "开",
            "车",
            "回来",
            "分钟",
            "后",
            "衣服",
            "漂亮",
            "啊",
            "少",
            "不少",
            "这些",
            "都"
        ],
        "grammar": [
            {
                "point": "Trợ từ động thái 了 (le) biểu thị hoàn thành",
                "explanation": "Đứng ngay sau động từ để biểu thị hành động đã xảy ra hoặc đã hoàn tất: Động từ + 了 + Số/Lượng + Danh từ.",
                "example": "我买了一点儿苹果。(Tôi đã mua một ít táo.)"
            },
            {
                "point": "Danh từ biểu thị khoảng thời gian + 后 (hòu)",
                "explanation": "Dùng để diễn tả một sự việc sẽ xảy ra sau một khoảng thời gian nhất định.",
                "example": "四十分钟后回来。(40 phút sau sẽ quay lại.)"
            }
        ]
    },
    {
        "lesson": 15,
        "title_cn": "我是坐飞机来的",
        "title_pinyin": "Wǒ shì zuò fēijī lái de",
        "title_vi": "Tôi đi máy bay đến",
        "summary": "Nhấn mạnh thời gian, địa điểm, phương thức của hành động quá khứ.",
        "dialogues": [
            {
                "id": 1,
                "location": "在公司 (Ở văn phòng công ty)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你和李小姐是什么时候认识的？",
                        "pinyin": "Nǐ hé Lǐ xiǎojiě shì shénme shíhou rènshi de?",
                        "vi": "Bạn và cô Lý quen biết nhau từ khi nào thế?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我们是2011年9月认识的。",
                        "pinyin": "Wǒmen shì èr líng yī yī nián jiǔ yuè rènshi de.",
                        "vi": "Chúng tôi quen nhau vào tháng 9 năm 2011."
                    },
                    {
                        "speaker": "A",
                        "cn": "你们在哪儿认识的？",
                        "pinyin": "Nǐmen zài nǎr rènshi de?",
                        "vi": "Hai bạn quen nhau ở đâu?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我们是在大学认识的，她是我大学同学。",
                        "pinyin": "Wǒmen shì zài dàxué rènshi de, tā shì wǒ dàxué tóngxué.",
                        "vi": "Chúng tôi quen nhau ở trường đại học, cô ấy là bạn đại học của tôi."
                    }
                ]
            },
            {
                "id": 2,
                "location": "在饭店门前 (Trước cửa nhà hàng)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "你们是怎么来饭店的？",
                        "pinyin": "Nǐmen shì zěnme lái fàndiàn de?",
                        "vi": "Các bạn đến nhà hàng bằng phương tiện gì vậy?"
                    },
                    {
                        "speaker": "B",
                        "cn": "我们是坐出租车来的。",
                        "pinyin": "Wǒmen shì zuò chūzūchē lái de.",
                        "vi": "Chúng tôi đi xe taxi đến đấy."
                    },
                    {
                        "speaker": "A",
                        "cn": "李先生呢？",
                        "pinyin": "Lǐ xiānsheng ne?",
                        "vi": "Còn anh Lý thì sao?"
                    },
                    {
                        "speaker": "B",
                        "cn": "他是和朋友一起开车来的。",
                        "pinyin": "Tā shì hé péngyou yìqǐ kāi chē lái de.",
                        "vi": "Anh ấy tự lái xe cùng bạn đến."
                    }
                ]
            },
            {
                "id": 3,
                "location": "在机场 (Tại sân bay)",
                "lines": [
                    {
                        "speaker": "A",
                        "cn": "很高兴认识您！李小姐。",
                        "pinyin": "Hěn gāoxìng rènshi nín! Lǐ xiǎojiě.",
                        "vi": "Rất vui được làm quen với cô! Cô Lý."
                    },
                    {
                        "speaker": "B",
                        "cn": "认识你我也很高兴！",
                        "pinyin": "Rènshi nǐ wǒ yě hěn gāoxìng!",
                        "vi": "Gặp bạn tôi cũng rất vui!"
                    },
                    {
                        "speaker": "A",
                        "cn": "听张先生说，您是坐飞机来北京的？",
                        "pinyin": "Tīng Zhāng xiānsheng shuō, nín shì zuò fēijī lái Běijīng de?",
                        "vi": "Nghe ông Trương kể, cô đi máy bay đến Bắc Kinh phải không ạ?"
                    },
                    {
                        "speaker": "B",
                        "cn": "是的。",
                        "pinyin": "Shì de.",
                        "vi": "Vâng, đúng vậy."
                    }
                ]
            }
        ],
        "vocab_hanzi": [
            "认识",
            "年",
            "大学",
            "饭店",
            "出租车",
            "一起",
            "高兴",
            "听",
            "飞机",
            "零"
        ],
        "grammar": [
            {
                "point": "Cấu trúc nhấn mạnh 是...的 (shì...de)",
                "explanation": "Dùng để nhấn mạnh thời gian, địa điểm, cách thức của hành động đã biết là đã xảy ra trong quá khứ.",
                "example": "我们是在大学认识的。(Chúng tôi là quen nhau ở trường đại học đấy.)"
            },
            {
                "point": "Nhấn mạnh phương thức đi lại",
                "explanation": "我是坐飞机来的 (Tôi là đi máy bay đến) / 我们是坐出租车来的 (Chúng tôi là đi taxi đến).",
                "example": "他是开车来的。(Anh ấy là lái xe đến.)"
            }
        ]
    }
]
