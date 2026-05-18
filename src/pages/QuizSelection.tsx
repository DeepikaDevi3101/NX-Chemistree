import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Zap, Trophy, Target, Brain, 
  ShieldCheck, BarChart3, ChevronRight, ArrowLeft
} from 'lucide-react'
import { useTranslation } from '../i18n'

export const QuizSelection: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const MODES = [
    { id: 'easy', name: t('quiz.easy'), desc: t('quiz.easyDesc'), icon: ShieldCheck, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { id: 'medium', name: t('quiz.medium'), desc: t('quiz.mediumDesc'), icon: BarChart3, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'hard', name: t('quiz.hard'), desc: t('quiz.hardDesc'), icon: Target, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { id: 'competitive', name: t('quiz.competitive'), desc: t('quiz.competitiveDesc'), icon: Trophy, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    { id: 'rapid-fire', name: t('quiz.rapidFire'), desc: t('quiz.rapidFireDesc'), icon: Zap, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { id: 'mastery', name: t('quiz.conceptMastery'), desc: t('quiz.conceptMasteryDesc'), icon: Brain, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  ]

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 pb-32">
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm shrink-0"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
            {t('quiz.title')} <span className="text-brand">{t('quiz.titleHighlight')}</span>
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm md:text-base">{t('quiz.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => navigate(`/quiz/active?mode=${mode.id}`)}
            className={`
              group relative text-left p-6 rounded-2xl border ${mode.border} ${mode.bg}
              transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30
              flex flex-col justify-between min-h-[200px] bg-white dark:bg-white/5 shadow-sm
            `}
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${mode.bg} ${mode.color} border ${mode.border}`}>
                <mode.icon size={28} />
              </div>
              <ChevronRight className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{mode.name}</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{mode.desc}</p>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
          </button>
        ))}
      </div>
    </div>
  )
}
