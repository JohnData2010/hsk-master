import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import CurriculumView from './components/CurriculumView';
import FlashcardDeck from './components/FlashcardDeck';
import WritingStudioView from './components/WritingStudioView';
import PracticeHub from './components/PracticeHub';
import PinyinCourseView from './components/PinyinCourseView';
import LessonDetailModal from './components/LessonDetailModal';
import HanziWriterModal from './components/HanziWriterModal';
import SettingsModal from './components/SettingsModal';

import curriculumData from './data/hsk_curriculum.json';
import { getUserStats } from './utils/srs';

const SETTINGS_KEY = 'hsk_master_settings_v1';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState('hsk1');
  const [activeTab, setActiveTab] = useState('curriculum'); // Default to Curriculum / Sequential Roadmap
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
      {/* Top Navigation Bar */}
      <Navbar
        currentLevel={currentLevel}
        onSelectLevel={(lvl) => {
          setCurrentLevel(lvl);
          setSelectedLesson(null);
        }}
        userStats={userStats}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-xl mx-auto pt-3 px-2 sm:px-4">
        {/* 1. CURRICULUM ROADMAP (DEFAULT TAB) */}
        {activeTab === 'curriculum' && (
          <CurriculumView
            levelData={levelData}
            onSelectLesson={(les) => setSelectedLesson(les)}
            onOpenWriter={(w) => setWritingModalWord(w)}
            onOpenPinyin={() => {
              setActiveTab('pinyin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 2. PINYIN COURSE VIEW (TRIGGERED FROM BÀI 0 IN CURRICULUM) */}
        {activeTab === 'pinyin' && (
          <div>
            <div className="max-w-md mx-auto mb-3 px-2 sm:px-4 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveTab('curriculum');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D5C9B5] text-xs font-bold text-ink-700 hover:text-cinnabar-600 shadow-xs transition-colors flex items-center gap-1.5"
              >
                ← Quay lại Lộ trình bài học
              </button>
            </div>
            <PinyinCourseView />
          </div>
        )}

        {/* 3. FLASHCARDS SRS TAB */}
        {activeTab === 'flashcards' && (
          <FlashcardDeck
            words={currentWords}
            settings={settings}
            onOpenWriter={(w) => setWritingModalWord(w)}
          />
        )}

        {/* 4. HANZI WRITING STUDIO TAB */}
        {activeTab === 'writing' && (
          <WritingStudioView
            words={currentWords}
            onOpenWriter={(w) => setWritingModalWord(w)}
          />
        )}

        {/* 5. PRACTICE HUB (MINIGAMES & TEACHER WANG AI) */}
        {activeTab === 'practice' && (
          <PracticeHub
            words={currentWords}
            currentLevel={currentLevel}
            situationalDialogues={curriculumData.situational_dialogues || []}
          />
        )}
      </main>

      {/* Simplified Bottom Navigation with 4 Primary Tabs */}
      <BottomNav
        activeTab={activeTab === 'pinyin' ? 'curriculum' : activeTab}
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
