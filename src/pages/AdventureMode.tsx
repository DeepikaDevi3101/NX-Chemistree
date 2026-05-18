import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MapPin, Lock, Play, 
  Sparkles, Sword, Shield, BookOpen, Trophy, ArrowLeft
} from 'lucide-react'
import { useStore } from '../store/useStore'

const CAMPAIGN_LEVELS = [
  {
    id: 1,
    title: "The Lost Catalyst",
    location: "The Abandoned Lab",
    desc: "A mysterious formula has been stolen. Begin your journey by identifying the thief's elemental signature.",
    difficulty: "Easy",
    xpReward: 100,
    icon: MapPin,
    story: "As you enter the dimly lit laboratory, the smell of sulfur hangs heavy in the air. On the bench lies a single crystal, glowing with a faint blue light. 'You're late,' a voice whispers from the shadows...",
    challenge: "Identify the element with Atomic Number 11.",
    answer: "sodium",
    image: "/lost_catalyst.png"
  },
  {
    id: 2,
    title: "The Acidic Moat",
    location: "Crystal Fortress",
    desc: "The path to the fortress is blocked by a lake of corrosive liquid. Neutralize it to cross safely.",
    difficulty: "Medium",
    xpReward: 250,
    icon: Sword,
    story: "The ground shakes as you approach the fortress. The moat is bubbling with high-concentration HCl. To neutralize the acid, you'll need a strong base from your inventory.",
    challenge: "Which compound is a strong base: HCl, NaOH, or H2O?",
    answer: "naoh",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    title: "The Alchemist's Riddle",
    location: "Secret Library",
    desc: "An ancient tome holds the key to the final reaction, but it's written in chemical code.",
    difficulty: "Hard",
    xpReward: 500,
    icon: BookOpen,
    story: "In the heart of the library, you find the Alchemist. He offers you a choice: 'Balance this equation, or remain here forever as a statue of salt.'",
    challenge: "What is the coefficient of H2 in: N2 + ?H2 -> 2NH3",
    answer: "3",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=400"
  }
]

export const AdventureMode: React.FC = () => {
  const navigate = useNavigate()
  const { unlockedLevels, unlockNextLevel, totalXP, addBadge } = useStore()
  
  const [activeLevel, setActiveLevel] = useState<typeof CAMPAIGN_LEVELS[0] | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none')

  const handleStartLevel = (level: typeof CAMPAIGN_LEVELS[0]) => {
    if (level.id > unlockedLevels) return
    setActiveLevel(level)
    setUserAnswer('')
    setFeedback('none')
  }

  const handleSolve = () => {
    if (!activeLevel) return
    if (userAnswer.toLowerCase().trim() === activeLevel.answer.toLowerCase()) {
      setFeedback('correct')
      if (activeLevel.id === unlockedLevels) {
        unlockNextLevel()
        if (activeLevel.id === 3) addBadge('Alchemist Supreme')
      }
    } else {
      setFeedback('wrong')
    }
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 pb-32">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/games')}
            className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Chemistry <span className="text-indigo-600 dark:text-indigo-400">Adventure</span></h1>
            <p className="text-slate-500 dark:text-gray-500 text-sm">Campaign Mode: The Lost Catalyst</p>
          </div>
        </div>

        <div className="hidden md:flex gap-4">
          <div className="bg-white dark:bg-white/5 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3 shadow-sm">
             <Trophy size={20} className="text-yellow-500" />
             <div>
                <span className="block text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold">XP Level</span>
                <p className="text-slate-900 dark:text-white font-black">{totalXP}</p>
             </div>
          </div>
          <div className="bg-white dark:bg-white/5 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-3 shadow-sm">
             <Shield size={20} className="text-indigo-600 dark:text-indigo-400" />
             <div>
                <span className="block text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold">Progress</span>
                <p className="text-slate-900 dark:text-white font-black">{Math.round(((unlockedLevels - 1) / CAMPAIGN_LEVELS.length) * 100)}%</p>
             </div>
          </div>
        </div>
      </div>

      {!activeLevel ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {CAMPAIGN_LEVELS.map((level) => {
            const isLocked = level.id > unlockedLevels
            const isCompleted = level.id < unlockedLevels

            return (
              <div 
                key={level.id}
                className={`
                  relative group bg-white dark:bg-white/5 rounded-[32px] border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-300 shadow-sm
                  ${isLocked ? 'opacity-60 grayscale' : 'hover:border-indigo-500/50 hover:shadow-xl'}
                `}
              >
                {/* Background Image with Overlay */}
                <div className="h-48 w-full relative overflow-hidden">
                  <img src={level.image} alt={level.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className={`absolute bottom-4 left-6 p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg`}>
                    <level.icon size={24} />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{level.location}</span>
                      {isCompleted && <span className="px-2 py-0.5 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded text-[10px] font-bold">Completed</span>}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{level.title}</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-xs mt-2 leading-relaxed line-clamp-2">{level.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-yellow-500" />
                      <span className="text-xs font-bold text-slate-700 dark:text-white">{level.xpReward} XP</span>
                    </div>
                    <button
                      onClick={() => handleStartLevel(level)}
                      disabled={isLocked}
                      className={`
                        px-6 py-2 rounded-xl font-bold text-sm transition-all
                        ${isLocked ? 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-600' : 'bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 active:scale-95 shadow-md shadow-indigo-500/20'}
                      `}
                    >
                      {isLocked ? <Lock size={16} /> : isCompleted ? 'Replay' : 'Launch'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-white/10 overflow-hidden animate-in zoom-in-95 duration-500 shadow-2xl">
           <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto relative">
                <img src={activeLevel.image} alt={activeLevel.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay"></div>
              </div>
              
              <div className="p-8 md:p-12 space-y-8 bg-white dark:bg-slate-900">
                 <div className="space-y-4">
                   <h2 className="text-3xl font-black text-slate-900 dark:text-white">{activeLevel.title}</h2>
                   <p className="text-slate-600 dark:text-gray-300 leading-relaxed italic text-lg">"{activeLevel.story}"</p>
                 </div>

                 <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4 shadow-inner">
                    <h4 className="text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest">Active Challenge</h4>
                    <p className="text-slate-900 dark:text-white font-bold text-xl">{activeLevel.challenge}</p>
                    
                    <div className="relative pt-2">
                       <input 
                         type="text"
                         value={userAnswer}
                         onChange={(e) => setUserAnswer(e.target.value)}
                         disabled={feedback === 'correct'}
                         placeholder="Enter solution..."
                         className={`
                           w-full bg-slate-100 dark:bg-black/20 border-2 rounded-2xl p-4 text-slate-900 dark:text-white font-bold outline-none transition-all shadow-sm
                           ${feedback === 'correct' ? 'border-green-500/50 text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-500/10' : feedback === 'wrong' ? 'border-red-500/50 bg-red-50/50 dark:bg-red-500/10' : 'border-slate-200 dark:border-white/10 focus:border-indigo-500/50'}
                         `}
                       />
                       {feedback === 'correct' && (
                         <div className="mt-4 p-4 bg-green-500/20 rounded-2xl border border-green-500/30 text-green-400 text-sm font-medium animate-in slide-in-from-top-2">
                           Success! The path forward is clear. XP and rewards granted.
                         </div>
                       )}
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                      onClick={() => setActiveLevel(null)}
                      className="flex-1 py-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-600 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors shadow-sm"
                    >
                      Retreat
                    </button>
                    {feedback === 'correct' ? (
                      <button 
                        onClick={() => setActiveLevel(null)}
                        className="flex-1 py-4 bg-green-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
                      >
                        Continue Journey
                        <Play size={18} />
                      </button>
                    ) : (
                      <button 
                        onClick={handleSolve}
                        className="flex-1 py-4 bg-indigo-500 rounded-2xl text-white font-bold"
                      >
                        Solve Mystery
                      </button>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  )
}
