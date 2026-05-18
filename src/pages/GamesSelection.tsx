import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Puzzle, FileText, Map, Sparkles, 
  Trophy, ChevronRight, Layers 
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { useTranslation } from '../i18n'

export const GamesSelection: React.FC = () => {
  const navigate = useNavigate()
  const { totalXP, gameScores, badges } = useStore()
  const { t } = useTranslation()

  const GAMES = [
    { id: 'word-search', name: t('games.wordSearch'), desc: t('games.wordSearchDesc'), icon: Puzzle, color: 'from-blue-500 to-cyan-500', path: '/games/word-search' },
    { id: 'fill-blanks', name: t('games.fillBlanks'), desc: t('games.fillBlanksDesc'), icon: FileText, color: 'from-emerald-500 to-teal-500', path: '/games/fill-blanks' },
    { id: 'adventure', name: t('games.adventure'), desc: t('games.adventureDesc'), icon: Map, color: 'from-purple-500 to-indigo-500', path: '/games/adventure' },
  ]

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-12 pb-32">
      
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
            {t('games.title')} <span className="text-secondary">{t('games.titleHighlight')}</span>
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-lg">{t('games.subtitle')}</p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 min-w-[140px] shadow-sm">
            <span className="block text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold">{t('games.totalXP')}</span>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{totalXP}</p>
          </div>
          <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 min-w-[140px] shadow-sm">
            <span className="block text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold">{t('games.badges')}</span>
            <p className="text-2xl font-black text-secondary">{badges.length}</p>
          </div>
        </div>
      </div>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Flashcards Card */}
        <div 
          onClick={() => navigate('/games/flashcards')}
          className="group relative bg-white dark:bg-white/5 p-8 rounded-[40px] border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t('games.activeRecall')}</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm">{t('games.activeRecallDesc')}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">{t('games.learningSystem')}</span>
              <ChevronRight size={20} className="text-slate-400 dark:text-gray-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Word Search Card */}
        {GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => navigate(game.path)}
            className="group relative text-left h-full"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl`}></div>
            <div className="glass h-full p-8 rounded-3xl border-white/10 group-hover:border-white/30 transition-all flex flex-col justify-between space-y-6">
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${game.color} text-white shadow-xl`}>
                  <game.icon size={32} />
                </div>
                <ChevronRight className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{game.name}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{game.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-500" />
                  <span className="text-xs font-bold text-slate-700 dark:text-white">{t('games.best')}: {gameScores[game.id] || 0}</span>
                </div>
                {game.id === 'adventure' && (
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-secondary uppercase tracking-widest">{t('games.campaign')}</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Achievements Preview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="text-secondary" size={24} />
          {t('games.yourAchievements')}
        </h2>
        
        {badges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
             {badges.map((badge, i) => (
               <div key={i} className="glass p-4 rounded-2xl border-white/10 flex flex-col items-center text-center space-y-2">
                 <div className="w-12 h-12 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center text-secondary">
                   <Trophy size={24} />
                 </div>
                 <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase">{badge}</span>
               </div>
             ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-white/5 p-12 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 text-center">
             <p className="text-slate-400 dark:text-gray-500 italic">{t('games.playToUnlock')}</p>
          </div>
        )}
      </section>

    </div>
  )
}
