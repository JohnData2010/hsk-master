// Spaced Repetition System (SRS) based on modified SM-2 / Anki algorithm

const STORAGE_KEY = 'hsk_master_srs_data_v1';
const USER_STATS_KEY = 'hsk_master_user_stats_v1';

export const getSRSData = () => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to parse SRS data:', e);
    return {};
  }
};

export const saveSRSData = (data) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save SRS data:', e);
  }
};

export const getUserStats = () => {
  if (typeof window === 'undefined') {
    return { xp: 0, streak: 1, lastStudyDate: null, coins: 50, level: 'hsk1' };
  }
  try {
    const raw = localStorage.getItem(USER_STATS_KEY);
    const defaults = { xp: 0, streak: 1, lastStudyDate: new Date().toISOString().slice(0, 10), coins: 50, level: 'hsk1' };
    if (!raw) return defaults;
    const stats = JSON.parse(raw);
    
    // Check daily streak
    const today = new Date().toISOString().slice(0, 10);
    if (stats.lastStudyDate) {
      const last = new Date(stats.lastStudyDate);
      const curr = new Date(today);
      const diffDays = Math.floor((curr - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        // Streak preserved
      } else if (diffDays > 1) {
        // Streak broken
        stats.streak = 1;
      }
    }
    return { ...defaults, ...stats };
  } catch (e) {
    return { xp: 0, streak: 1, lastStudyDate: null, coins: 50, level: 'hsk1' };
  }
};

export const updateUserStats = (incrementXp = 0, incrementCoins = 0) => {
  const stats = getUserStats();
  const today = new Date().toISOString().slice(0, 10);
  
  if (stats.lastStudyDate !== today) {
    stats.streak = (stats.streak || 0) + 1;
    stats.lastStudyDate = today;
  }
  
  stats.xp = (stats.xp || 0) + incrementXp;
  stats.coins = (stats.coins || 0) + incrementCoins;
  
  localStorage.setItem(USER_STATS_KEY, JSON.stringify(stats));
  return stats;
};

// Calculate next review interval based on SM-2
export const updateCardReview = (cardId, rating) => {
  // rating: 1 (again), 2 (hard), 3 (good), 4 (easy)
  const allData = getSRSData();
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;

  let card = allData[cardId] || {
    repetitions: 0,
    interval: 0, // days
    easeFactor: 2.5,
    dueDate: now,
    status: 'learning',
    history: []
  };

  let { repetitions, interval, easeFactor } = card;

  if (rating === 1) { // Again (Forgot)
    repetitions = 0;
    interval = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    card.status = 'learning';
  } else if (rating === 2) { // Hard
    repetitions += 1;
    interval = Math.max(1, Math.round((interval || 1) * 1.2));
    easeFactor = Math.max(1.3, easeFactor - 0.15);
    card.status = 'review';
  } else if (rating === 3) { // Good
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 3;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
    card.status = interval >= 14 ? 'mastered' : 'review';
  } else if (rating === 4) { // Easy
    if (repetitions === 0) {
      interval = 3;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor * 1.3);
    }
    repetitions += 1;
    easeFactor += 0.15;
    card.status = interval >= 14 ? 'mastered' : 'review';
  }

  const nextDueDate = now + interval * DAY_MS;

  card.repetitions = repetitions;
  card.interval = interval;
  card.easeFactor = Number(easeFactor.toFixed(2));
  card.dueDate = nextDueDate;
  card.lastReviewed = now;
  card.history.push({ date: now, rating, interval });

  allData[cardId] = card;
  saveSRSData(allData);

  // Award XP
  updateUserStats(rating * 5, 2);

  return card;
};
