import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import CurriculumView from './components/CurriculumView';
import FlashcardDeck from './components/FlashcardDeck';
import GamesHub from './components/GamesHub';
import SituationalDialogues from './components/SituationalDialogues';
import NativeAIEvaluator from './components/NativeAIEvaluator';
import LessonDetailModal from './components/LessonDetailModal';
import HanziWriterModal from './components/HanziWriterModal';
import SettingsModal from './components/SettingsModal';
import PinyinCourseView from './components/PinyinCourseView';
import WritingStudioView from './components/WritingStudioView';

import curriculumData from './data/hsk_curriculum.json';
import { getUserStats } from './utils/srs';

const SETTINGS_KEY = 'hsk_master_settings_v1';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState('hsk1');
  const [activeTab, setActiveTab] = useState('pinyin'); // 'pinyin' by default for beginner!
  const [mentorSubTab, setMentorSubTab] = useState('evaluator'); // 'evaluator', 'dialogues', 'games'
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [writingModalWord, setWritingModalWord] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userStats, setUserStats] = useState(getUserStats());

  // User Settings - Default rate 0.65 for clear slow beginner listening
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
    }
    return {
      speechRate: 0.65,
      showPinyin: true,
      showHanViet: true,
    };
  });

  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (e) {}
  };

  const handleResetProgress = () => {
    localStorage.removeItem('hsk_master_srs_data_v1');
    localStorage.removeItem('hsk_master_user_stats_v1');
    setUserStats(getUserStats());
    setIsSettingsOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setUserStats(getUserStats());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const levelData = curriculumData.levels[currentLevel] || curriculumData.levels.hsk1;
  const currentWords = levelData.words || [];

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#2A3029] font-sans pb-24 selection:bg-[#FCF3F2] selection:text-cinnabar-700">
      {/* Top Navigation */}
      <Navbar
        currentLevel={currentLevel}
        onSelectLevel={(lvl) => {
          setCurrentLevel(lvl);
          setSelectedLesson(null);
        }}
        userStats={userStats}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content View */}
      <main className="max-w-xl mx-auto pt-4 px-2 sm:px-4">
        {/* 1. PINYIN & TONES MASTERCLASS */}
        {activeTab === 'pinyin' && (
          <PinyinCourseView />
        )}

        {/* 2. HANZI WRITING STUDIO & STROKE VALIDATION */}
        {activeTab === 'writing' && (
          <WritingStudioView
            words={currentWords}
            onOpenWriter={(w) => setWritingModalWord(w)}
          />
        )}

        {/* 3. CURRICULUM LESSONS */}
        {activeTab === 'curriculum' && (
          <CurriculumView
            levelData={levelData}
            onSelectLesson={(les) => setSelectedLesson(les)}
            onOpenWriter={(w) => setWritingModalWord(w)}
          />
        )}

        {/* 4. FLASHCARDS SRS */}
        {activeTab === 'flashcards' && (
          <FlashcardDeck
            words={currentWords}
            settings={settings}
            onOpenWriter={(w) => setWritingModalWord(w)}
          />
        )}

        {/* 5. TEACHER WANG MENTORSHIP & REAL-WORLD / GAMES */}
        {activeTab === 'ai_grader' && (
          <div>
            {/* Sub-navigation inside Teacher Wang tab */}
            <div className="max-w-md mx-auto px-2 sm:px-4 mb-4">
              <div className="flex bg-[#F2ECE1] p-1 rounded-2xl text-xs font-bold border border-[#E0D7C7]">
                <button
                  onClick={() => setMentorSubTab('evaluator')}
                  className={`flex-1 py-2 px-1 rounded-xl transition-all ${
                    mentorSubTab === 'evaluator'
                      ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold'
                      : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  Sửa câu
                </button>
                <button
                  onClick={() => setMentorSubTab('dialogues')}
                  className={`flex-1 py-2 px-1 rounded-xl transition-all ${
                    mentorSubTab === 'dialogues'
                      ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold'
                      : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  Hội thoại
                </button>
                <button
                  onClick={() => setMentorSubTab('games')}
                  className={`flex-1 py-2 px-1 rounded-xl transition-all ${
                    mentorSubTab === 'games'
                      ? 'bg-[#FDFCF9] text-cinnabar-600 shadow-sm font-extrabold'
                      : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  Trò chơi
                </button>
              </div>
            </div>

            {mentorSubTab === 'evaluator' && (
              <NativeAIEvaluator currentLevel={currentLevel} />
            )}
            {mentorSubTab === 'dialogues' && (
              <SituationalDialogues dialogues={curriculumData.situational_dialogues || []} />
            )}
            {mentorSubTab === 'games' && (
              <GamesHub words={currentWords} currentLevel={currentLevel} />
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MODALS */}
      {selectedLesson && (
        <LessonDetailModal
          lesson={selectedLesson}
          level={currentLevel}
          onClose={() => setSelectedLesson(null)}
          onOpenWriter={(w) => setWritingModalWord(w)}
        />
      )}

      {writingModalWord && (
        <HanziWriterModal
          word={writingModalWord}
          onClose={() => setWritingModalWord(null)}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setIsSettingsOpen(false)}
          onResetProgress={handleResetProgress}
        />
      )}
    </div>
  );
}
