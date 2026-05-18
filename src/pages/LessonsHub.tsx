import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, ChevronRight, BookOpen, 
  CheckCircle2, Clock, Flame,
  Trophy, Target, Bookmark, Sparkles
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { LESSONS_SYLLABUS } from '../data/lessons'
import type { Branch, Difficulty } from '../data/lessons'
import { CustomSelect } from '../components/ui/CustomSelect'
import { useTranslation } from '../i18n'

export const LessonsHub: React.FC = () => {
  const navigate = useNavigate()
  const { lessonProgress, bookmarks, recentLessons } = useStore()
  const { t } = useTranslation()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBranch, setSelectedBranch] = useState<Branch | 'All'>('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All')

  const branches: (Branch | 'All')[] = ['All', 'Organic', 'Inorganic', 'Physical']
  const difficulties: (Difficulty | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filteredLessons = useMemo(() => {
    return LESSONS_SYLLABUS.filter(lesson => {
      const branchMatch = selectedBranch === 'All' || lesson.branch === selectedBranch
      const diffMatch = selectedDifficulty === 'All' || lesson.difficulty === selectedDifficulty
      const searchMatch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
      return branchMatch && diffMatch && searchMatch
    })
  }, [selectedBranch, selectedDifficulty, searchQuery])

  const lastLesson = useMemo(() => {
    const lastId = recentLessons[0]
    return LESSONS_SYLLABUS.find(l => l.id === lastId) || LESSONS_SYLLABUS[0]
  }, [recentLessons])

  const totalMastered = useMemo(() => {
    return Object.values(lessonProgress).filter(p => p === 100).length
  }, [lessonProgress])

  const branchColors: Record<Branch, string> = {
    'Organic': 'green',
    'Inorganic': 'blue',
    'Physical': 'purple'
  }

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12 pb-32">
      {/* 1. Header & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
           <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white">
             {t('lessonsHub.title')} <span className="text-primary">{t('lessonsHub.titleHighlight')}</span>
           </h1>
           <p className="text-slate-500 dark:text-gray-400 text-lg">{t('lessonsHub.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
           <StatCard label={t('lessonsHub.mastered')} value={totalMastered} icon={<Trophy className="text-yellow-500" />} />
           <StatCard label={t('lessonsHub.progress')} value={`${Math.round((totalMastered / LESSONS_SYLLABUS.length) * 100)}%`} icon={<Target className="text-primary" />} />
           <StatCard label={t('lessonsHub.bookmarks')} value={bookmarks.length} icon={<Bookmark className="text-secondary" />} />
        </div>
      </div>

      {/* 2. Continue Learning Section */}
      <div className="relative group overflow-hidden rounded-[40px] p-8 md:p-12 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 shadow-sm">
         <div className="absolute top-0 right-0 p-12 opacity-5 dark:opacity-10 group-hover:scale-110 transition-all duration-700 text-slate-900 dark:text-white">
            <BookOpen size={200} />
         </div>
         
         <div className="relative z-10 space-y-6 max-w-2xl">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{t('lessonsHub.continueHeader')}</span>
            </div>
            <div className="space-y-2">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">{t('lessonsHub.continueTitle')}: {lastLesson.title}</h2>
               <p className="text-slate-600 dark:text-gray-400 text-lg">{lastLesson.description}</p>
            </div>
            <button 
              onClick={() => navigate(`/lessons/${lastLesson.id}`)}
              className="px-8 py-4 bg-primary text-bg-dark font-black rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
               {t('lessonsHub.jumpBack')} <ChevronRight size={20} />
            </button>
         </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
         <div className="lg:col-span-2 relative group">
            <div className="absolute inset-y-0 left-5 flex items-center text-gray-500"><Search size={20} /></div>
            <input 
              type="text" 
              placeholder={t('lessonsHub.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl py-5 pl-14 pr-6 text-slate-900 dark:text-white focus:border-primary/50 outline-none transition-all shadow-sm dark:shadow-none"
            />
         </div>
         <CustomSelect 
           value={selectedBranch}
           onChange={(val) => setSelectedBranch(val as Branch | 'All')}
           options={branches.map(b => ({ value: b, label: b === 'All' ? t('lessonsHub.allBranches') : `${b} ${t('lessonsHub.branchChemistry')}` }))}
         />
         <CustomSelect 
           value={selectedDifficulty}
           onChange={(val) => setSelectedDifficulty(val as Difficulty | 'All')}
           options={difficulties.map(d => ({ value: d, label: d === 'All' ? t('lessonsHub.allDifficulties') : `${d} ${t('lessonsHub.level')}` }))}
         />
      </div>

      {/* 4. Syllabus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {filteredLessons.map(lesson => {
            const color = branchColors[lesson.branch]
            const progress = lessonProgress[lesson.id] || 0
            
            return (
              <div 
                key={lesson.id}
                onClick={() => navigate(`/lessons/${lesson.id}`)}
                className={`group relative bg-white dark:bg-white/5 rounded-[40px] p-8 border border-slate-200 dark:border-white/5 hover:border-${color}-500/30 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col shadow-sm hover:shadow-md`}
              >
                 {/* Progress Bar Background */}
                 <div className="absolute bottom-0 left-0 h-1.5 bg-white/5 w-full">
                    <div 
                      className={`h-full bg-${color}-500 transition-all duration-700`} 
                      style={{ width: `${progress}%` }}
                    />
                 </div>

                 <div className="space-y-6 relative z-10 flex-1">
                    <div className="flex justify-between items-start">
                       <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-${color}-500/10 text-${color}-400`}>
                         {lesson.branch}
                       </span>
                       {progress === 100 && <CheckCircle2 size={20} className="text-green-500" />}
                    </div>

                    <div className="space-y-3">
                       <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{lesson.title}</h3>
                       <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">{lesson.description}</p>
                    </div>

                    <div className="flex items-center gap-6 pt-4">
                       <div className="flex items-center gap-2">
                          <Flame size={14} className="text-orange-500" />
                          <span className="text-[10px] font-black text-slate-600 dark:text-gray-500 uppercase tracking-widest">{lesson.difficulty}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Clock size={14} className="text-blue-500" />
                          <span className="text-[10px] font-black text-slate-600 dark:text-gray-500 uppercase tracking-widest">45 {t('lessonsHub.min')}</span>
                       </div>
                    </div>
                 </div>

                 {/* Hover Icon */}
                 <div className={`absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-all -translate-y-4 group-hover:translate-y-0 text-${color}-400`}>
                    <Sparkles size={48} />
                 </div>
              </div>
            )
         })}
      </div>

    </div>
  )
}

const StatCard: React.FC<{ label: string, value: string | number, icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex items-center gap-4 min-w-[140px] shadow-sm">
     <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5">{icon}</div>
     <div>
        <p className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest">{label}</p>
        <p className="text-xl font-black text-slate-900 dark:text-white">{value}</p>
     </div>
  </div>
)
