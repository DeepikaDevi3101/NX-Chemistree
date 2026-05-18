import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface UserProfile {
  name: string;
  email: string;
  avatar: string | null;
}

interface AppSettingsContextType {
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  notifications: boolean;
  setNotifications: (enabled: boolean) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  soundEffects: boolean;
  setSoundEffects: (enabled: boolean) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

const AppSettingsContext = createContext<AppSettingsContextType | null>(null);

export const AppSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState(() => localStorage.getItem('theme') || 'dark');
  const [language, setLanguageState] = useState(() => localStorage.getItem('language') || 'English');
  const [notifications, setNotificationsState] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [difficulty, setDifficultyState] = useState(() => localStorage.getItem('difficulty') || 'Beginner');
  const [soundEffects, setSoundEffectsState] = useState(() => {
    const saved = localStorage.getItem('soundEffects');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [userProfile, setUserProfileState] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : { name: 'Student', email: 'student@nxchemistree.com', avatar: null };
  });

  // Apply theme class to document.documentElement
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Persistent Setters
  const setTheme = (val: string) => {
    setThemeState(val);
    localStorage.setItem('theme', val);
  };

  const setLanguage = (val: string) => {
    setLanguageState(val);
    localStorage.setItem('language', val);
  };

  const setNotifications = (val: boolean) => {
    setNotificationsState(val);
    localStorage.setItem('notifications', JSON.stringify(val));
  };

  const setDifficulty = (val: string) => {
    setDifficultyState(val);
    localStorage.setItem('difficulty', val);
  };

  const setSoundEffects = (val: boolean) => {
    setSoundEffectsState(val);
    localStorage.setItem('soundEffects', JSON.stringify(val));
  };

  const setUserProfile = (val: UserProfile) => {
    setUserProfileState(val);
    localStorage.setItem('userProfile', JSON.stringify(val));
  };

  const value = {
    theme, setTheme,
    language, setLanguage,
    notifications, setNotifications,
    difficulty, setDifficulty,
    soundEffects, setSoundEffects,
    userProfile, setUserProfile
  };

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};

export default AppSettingsProvider;
