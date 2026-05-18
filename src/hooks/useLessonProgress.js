import { useState } from 'react';

const STORAGE_KEY = 'nxchemistree_lesson_progress';

export const useLessonProgress = () => {
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch { return []; }
  });

  const markComplete = (lessonId) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev;
      const updated = [...prev, lessonId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const markIncomplete = (lessonId) => {
    setCompletedLessons(prev => {
      const updated = prev.filter(id => id !== lessonId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isCompleted = (lessonId) => completedLessons.includes(lessonId);

  const getProgressByClass = (classKey, chapters) => {
    const total = chapters.length;
    const done = chapters.filter(c => completedLessons.includes(c.id)).length;
    return { total, done, percent: Math.round((done / total) * 100) };
  };

  const getTotalProgress = (allChapters) => {
    const total = allChapters.length;
    const done = allChapters.filter(c => completedLessons.includes(c.id)).length;
    return { total, done, percent: Math.round((done / total) * 100) };
  };

  return {
    completedLessons,
    markComplete,
    markIncomplete,
    isCompleted,
    getProgressByClass,
    getTotalProgress
  };
};
