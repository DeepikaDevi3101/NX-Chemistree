import { create } from 'zustand'
import type { LanguageCode } from '../i18n/types'

export interface UserProfile {
  name: string
  email: string
  avatar: string
  xp: number
  level: number
  achievements: string[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  content: string
  status: 'sent' | 'pending' | 'error'
  timestamp: number
}

export interface Experiment {
  id: string
  chem1: string
  chem2: string
  equation: string
  timestamp: number
  xpGained: number
}

export interface QuizAttempt {
  id: string
  mode: string
  score: number
  totalQuestions: number
  correctAnswers: number
  accuracy: number
  topics: Record<string, number> // Topic -> correct count
  timestamp: number
}

export interface LeaderboardEntry {
  rank: number
  name: string
  score: number
  isUser?: boolean
}

export interface TutorialProgress {
  tutorialId: string
  progress: number // 0-100
  lastWatched: number
}

interface AppState {
  theme: 'light' | 'dark'
  language: LanguageCode
  sidebarExpanded: boolean
  user: UserProfile | null
  chatHistory: ChatMessage[]
  experiments: Experiment[]
  quizAttempts: QuizAttempt[]
  leaderboard: LeaderboardEntry[]
  watchHistory: TutorialProgress[]
  savedTutorials: string[]
  unlockedLevels: number
  badges: string[]
  gameScores: Record<string, number>
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  notificationsEnabled: boolean
  soundEffectsEnabled: boolean
  lessonProgress: Record<string, number>
  bookmarks: string[]
  flashcardBookmarks: string[]
  flashcardKnown: string[]
  flashcardNeedsPractice: string[]
  recentLessons: string[]
  streak: number
  lastActiveDate: string | null
  totalXP: number
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (lang: LanguageCode) => void
  toggleSidebar: () => void
  setUser: (user: UserProfile) => void
  setDifficulty: (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => void
  setNotificationsEnabled: (enabled: boolean) => void
  setSoundEffectsEnabled: (enabled: boolean) => void
  updateLessonProgress: (lessonId: string, progress: number) => void
  toggleBookmark: (lessonId: string) => void
  toggleFlashcardBookmark: (id: string) => void
  toggleFlashcardKnown: (id: string) => void
  toggleFlashcardNeedsPractice: (id: string) => void
  addRecentLesson: (lessonId: string) => void
  updateStreak: () => void
  addChatMessage: (msg: ChatMessage) => void
  updateChatMessage: (id: string, content?: string, status?: ChatMessage['status']) => void
  clearChat: () => void
  addExperiment: (exp: Experiment) => void
  addQuizAttempt: (attempt: QuizAttempt) => void
  updateTutorialProgress: (id: string, progress: number) => void
  toggleSaveTutorial: (id: string) => void
  unlockNextLevel: () => void
  addBadge: (badge: string) => void
  updateGameScore: (game: string, score: number) => void
}

export const useStore = create<AppState>((set) => ({
  theme: 'dark',
  language: 'en',
  sidebarExpanded: true,
  user: {
    name: 'Student Learner',
    email: 'student@nxchemistree.edu',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    xp: 0,
    level: 1,
    achievements: []
  },
  chatHistory: [
    {
      id: 'welcome-msg',
      role: 'ai',
      content: 'Hello! I am Chemi, your AI Chemistry Tutor powered by Gemma 4. How can I help you today?',
      status: 'sent',
      timestamp: Date.now()
    }
  ],
  experiments: [],
  quizAttempts: [],
  leaderboard: [
    { rank: 1, name: 'Alice', score: 12500 },
    { rank: 2, name: 'Bob', score: 11200 },
    { rank: 3, name: 'Charlie', score: 9800 },
    { rank: 4, name: 'Learner', score: 0, isUser: true },
  ],
  watchHistory: [],
  savedTutorials: [],
  unlockedLevels: 1,
  badges: [],
  gameScores: {},
  difficulty: 'Beginner',
  notificationsEnabled: true,
  soundEffectsEnabled: true,
  lessonProgress: {},
  bookmarks: [],
  flashcardBookmarks: [],
  flashcardKnown: [],
  flashcardNeedsPractice: [],
  recentLessons: [],
  streak: 0,
  lastActiveDate: null,
  totalXP: 0,
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
  setUser: (user) => set({ user }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
  setSoundEffectsEnabled: (soundEffectsEnabled) => set({ soundEffectsEnabled }),
  updateLessonProgress: (lessonId, progress) => set((state) => ({
    lessonProgress: { ...state.lessonProgress, [lessonId]: Math.max(state.lessonProgress[lessonId] || 0, progress) },
    totalXP: state.totalXP + (progress > (state.lessonProgress[lessonId] || 0) ? 10 : 0)
  })),
  toggleBookmark: (lessonId) => set((state) => ({
    bookmarks: state.bookmarks.includes(lessonId) 
      ? state.bookmarks.filter(id => id !== lessonId)
      : [...state.bookmarks, lessonId]
  })),
  toggleFlashcardBookmark: (id) => set((state) => ({
    flashcardBookmarks: state.flashcardBookmarks.includes(id)
      ? state.flashcardBookmarks.filter(fid => fid !== id)
      : [...state.flashcardBookmarks, id]
  })),
  toggleFlashcardKnown: (id) => set((state) => ({
    flashcardKnown: state.flashcardKnown.includes(id)
      ? state.flashcardKnown.filter(fid => fid !== id)
      : [...state.flashcardKnown, id],
    flashcardNeedsPractice: state.flashcardNeedsPractice.filter(fid => fid !== id)
  })),
  toggleFlashcardNeedsPractice: (id) => set((state) => ({
    flashcardNeedsPractice: state.flashcardNeedsPractice.includes(id)
      ? state.flashcardNeedsPractice.filter(fid => fid !== id)
      : [...state.flashcardNeedsPractice, id],
    flashcardKnown: state.flashcardKnown.filter(fid => fid !== id)
  })),
  addRecentLesson: (lessonId) => set((state) => ({
    recentLessons: [lessonId, ...state.recentLessons.filter(id => id !== lessonId)].slice(0, 5)
  })),
  updateStreak: () => set((state) => {
    const today = new Date().toDateString()
    if (state.lastActiveDate === today) return state
    
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const isYesterday = state.lastActiveDate === yesterday.toDateString()
    
    return {
      streak: isYesterday ? state.streak + 1 : 1,
      lastActiveDate: today,
      totalXP: state.totalXP + 50 // Streak bonus
    }
  }),
  addChatMessage: (msg) => set((state) => ({ chatHistory: [...state.chatHistory, msg] })),
  updateChatMessage: (id, content, status) => set((state) => ({
    chatHistory: state.chatHistory.map(msg => 
      msg.id === id ? { ...msg, content: content !== undefined ? content : msg.content, status: status || msg.status } : msg
    )
  })),
  clearChat: () => set({ chatHistory: [] }),
  addExperiment: (exp) => set((state) => ({ 
    experiments: [exp, ...state.experiments],
    totalXP: state.totalXP + exp.xpGained
  })),
  addQuizAttempt: (attempt) => set((state) => {
    const newLeaderboard = state.leaderboard.map(entry => 
      entry.isUser ? { ...entry, score: entry.score + attempt.score } : entry
    ).sort((a, b) => b.score - a.score)
     .map((entry, idx) => ({ ...entry, rank: idx + 1 }));

    return { 
      quizAttempts: [attempt, ...state.quizAttempts],
      totalXP: state.totalXP + attempt.score,
      leaderboard: newLeaderboard
    }
  }),
  updateTutorialProgress: (id, progress) => set((state) => {
    const existing = state.watchHistory.find(h => h.tutorialId === id)
    if (existing) {
      return {
        watchHistory: state.watchHistory.map(h => 
          h.tutorialId === id ? { ...h, progress: Math.max(h.progress, progress), lastWatched: Date.now() } : h
        )
      }
    }
    return {
      watchHistory: [...state.watchHistory, { tutorialId: id, progress, lastWatched: Date.now() }]
    }
  }),
  toggleSaveTutorial: (id) => set((state) => ({
    savedTutorials: state.savedTutorials.includes(id)
      ? state.savedTutorials.filter(sid => sid !== id)
      : [...state.savedTutorials, id]
  })),
  unlockNextLevel: () => set((state) => ({ unlockedLevels: state.unlockedLevels + 1 })),
  addBadge: (badge) => set((state) => ({ badges: Array.from(new Set([...state.badges, badge])) })),
  updateGameScore: (game, score) => set((state) => ({
    gameScores: { ...state.gameScores, [game]: Math.max(state.gameScores[game] || 0, score) }
  })),
}))
