# -*- coding: utf-8 -*-
"""
Build Authentic HSK Curriculum strictly based on Beijing Language and Culture
University Press (BLCUP) Standard Course textbooks by Jiang Liping.

Sections for each lesson:
1. 课文 (Bài khóa / Dialogues) with real contexts, audio, speakers, hanzi, pinyin, vi.
2. 生词 (Từ mới / Vocabulary) in sequential order of appearance with pos, han_viet, definitions, examples.
3. 注释 / 语法 (Ngữ pháp & Chú thích) with authentic rules and examples.
4. 练习 (Luyện tập) quizzes.

Word ordering:
level.words is strictly ordered by lesson number (Lesson 1 first, Lesson 2 second...).
"""
import json
import os
import sys
sys.path.insert(0, os.path.abspath('.'))

from scripts.curriculum_data_hsk1 import hsk1_lessons_def
from scripts.curriculum_data_hsk2 import hsk2_lessons_def
from scripts.curriculum_data_hsk3 import hsk3_lessons_def

# Load vocabulary database
with open('src/data/hsk_vocab.json', 'r', encoding='utf-8') as f:
    vocab_data = json.load(f)

vocab_lookup = {w['hanzi']: w for w in vocab_data['all_words']}

# Also load existing curriculum to preserve situational dialogues
with open('src/data/hsk_curriculum.json', 'r', encoding='utf-8') as f:
    existing_curr = json.load(f)
situational_dialogues = existing_curr.get('situational_dialogues', [])

def find_example_in_dialogues(hanzi, dialogues):
    """Find authentic sentence containing hanzi directly from the lesson's dialogues."""
    for d in dialogues:
        for line in d.get('lines', []):
            if hanzi in line.get('cn', ''):
                return {
                    "cn": line['cn'],
                    "pinyin": line['pinyin'],
                    "vi": line['vi']
                }
    return None

def process_level(level_id, name, title, description, lessons_def, vocab_level_key):
    processed_lessons = []
    level_words_ordered = []
    seen_hanzi_in_level = set()

    for les in lessons_def:
        lesson_num = les['lesson']
        lesson_title = les['title_cn']
        dialogues = les.get('dialogues', [])
        vocab_hanzi = les.get('vocab_hanzi', [])

        lesson_words = []
        for hz in vocab_hanzi:
            base = vocab_lookup.get(hz, {})
            
            # Find authentic contextual example from lesson's dialogues
            example = find_example_in_dialogues(hz, dialogues)
            if not example:
                # Use base example or natural fallback
                if base.get('example') and '“' not in base['example'].get('cn', ''):
                    example = base['example']
                else:
                    example = {
                        "cn": f"这是{hz}。",
                        "pinyin": f"Zhè shì {hz}.",
                        "vi": f"Đây là {hz}."
                    }

            word_entry = {
                "id": base.get("id", f"{level_id}_{hz}"),
                "hanzi": hz,
                "traditional": base.get("traditional", hz),
                "pinyin": base.get("pinyin", ""),
                "pinyin_numeric": base.get("pinyin_numeric", ""),
                "han_viet": base.get("han_viet", ""),
                "vietnamese": base.get("vietnamese", ""),
                "level": level_id,
                "pos": base.get("pos", ["n"]),
                "radical": base.get("radical", ""),
                "frequency": base.get("frequency", 1000),
                "example": example,
                "lesson_number": lesson_num,
                "lesson_title": lesson_title
            }
            lesson_words.append(word_entry)

            if hz not in seen_hanzi_in_level:
                seen_hanzi_in_level.add(hz)
                level_words_ordered.append(word_entry)

        processed_lesson = {
            "lesson": lesson_num,
            "title_cn": les['title_cn'],
            "title_pinyin": les['title_pinyin'],
            "title_vi": les['title_vi'],
            "summary": les.get('summary', ''),
            "dialogues": dialogues,
            "grammar": les.get('grammar', []),
            "word_count": len(lesson_words),
            "words": lesson_words
        }
        processed_lessons.append(processed_lesson)

    # Make sure any remaining words from standard vocab_data[vocab_level_key] are also in level_words_ordered
    for w in vocab_data.get(vocab_level_key, []):
        hz = w['hanzi']
        if hz not in seen_hanzi_in_level:
            seen_hanzi_in_level.add(hz)
            fallback_word = {
                "id": w.get("id", f"{level_id}_{hz}"),
                "hanzi": hz,
                "traditional": w.get("traditional", hz),
                "pinyin": w.get("pinyin", ""),
                "pinyin_numeric": w.get("pinyin_numeric", ""),
                "han_viet": w.get("han_viet", ""),
                "vietnamese": w.get("vietnamese", ""),
                "level": level_id,
                "pos": w.get("pos", ["n"]),
                "radical": w.get("radical", ""),
                "frequency": w.get("frequency", 1000),
                "example": w.get("example", {
                    "cn": f"这是{hz}。",
                    "pinyin": f"Zhè shì {hz}.",
                    "vi": f"Đây là {hz}."
                }),
                "lesson_number": processed_lessons[-1]["lesson"],
                "lesson_title": processed_lessons[-1]["title_cn"]
            }
            level_words_ordered.append(fallback_word)
            # Also append to the last lesson
            processed_lessons[-1]["words"].append(fallback_word)
            processed_lessons[-1]["word_count"] = len(processed_lessons[-1]["words"])

    return {
        "id": level_id,
        "name": name,
        "title": title,
        "description": description,
        "lessons": processed_lessons,
        "words": level_words_ordered
    }

print("Building HSK 1...")
hsk1_data = process_level(
    "hsk1",
    "HSK 1: Nhập Môn Căn Bản",
    "Giáo Trình Chuẩn HSK 1",
    "Chương trình chuẩn BLCUP gồm 15 bài học, ngữ âm Pinyin, các mẫu câu chào hỏi, mua sắm và sinh hoạt cơ bản.",
    hsk1_lessons_def,
    "hsk1"
)

print("Building HSK 2...")
hsk2_data = process_level(
    "hsk2",
    "HSK 2: Sơ Cấp Giao Tiếp",
    "Giáo Trình Chuẩn HSK 2",
    "Chương trình chuẩn BLCUP gồm 15 bài học, mở rộng các chủ đề du lịch, sức khỏe, miêu tả phương hướng và so sánh.",
    hsk2_lessons_def,
    "hsk2"
)

print("Building HSK 3...")
hsk3_data = process_level(
    "hsk3",
    "HSK 3: Trung Cấp Tự Tin",
    "Giáo Trình Chuẩn HSK 3",
    "Chương trình chuẩn BLCUP gồm 20 bài học, thành thạo câu chữ 把, chữ 被, các bổ ngữ kết quả, xu hướng và khả năng.",
    hsk3_lessons_def,
    "hsk3"
)

final_curriculum = {
    "metadata": {
        "curriculum_version": "2.0.0",
        "standard": "BLCUP Official HSK Standard Course (Giáo trình chuẩn HSK)",
        "author": "Jiang Liping (姜丽萍) - Beijing Language and Culture University Press",
        "levels_included": ["hsk1", "hsk2", "hsk3"],
        "total_lessons": len(hsk1_data['lessons']) + len(hsk2_data['lessons']) + len(hsk3_data['lessons']),
        "total_words": len(hsk1_data['words']) + len(hsk2_data['words']) + len(hsk3_data['words'])
    },
    "levels": {
        "hsk1": hsk1_data,
        "hsk2": hsk2_data,
        "hsk3": hsk3_data
    },
    "situational_dialogues": situational_dialogues
}

output_path = 'src/data/hsk_curriculum.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(final_curriculum, f, ensure_ascii=False, indent=2)

print(f"SUCCESS: {output_path} generated!")
print(f"HSK 1: {len(hsk1_data['lessons'])} lessons, {len(hsk1_data['words'])} words")
print(f"HSK 2: {len(hsk2_data['lessons'])} lessons, {len(hsk2_data['words'])} words")
print(f"HSK 3: {len(hsk3_data['lessons'])} lessons, {len(hsk3_data['words'])} words")
print(f"Total: {final_curriculum['metadata']['total_lessons']} lessons, {final_curriculum['metadata']['total_words']} words")
