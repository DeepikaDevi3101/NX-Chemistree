import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, ChevronLeft, ChevronRight, 
  Flame, Target, Layers, Brain, HelpCircle, 
  Grid, Box, Scale, Zap, FlaskConical, Gamepad2, 
  Video,
  Atom, Droplet, TestTube, Activity, Hexagon, Trophy, BookOpen
} from 'lucide-react'
import { useTranslation } from '../i18n'

// --- MOCK DATA ---
const FEATURES = [
  { name: 'AI Tutor', desc: 'Ask any chemistry question', icon: Brain, color: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400', path: '/ai-tutor' },
  { name: 'Flashcards', desc: 'Spaced repetition decks', icon: Layers, color: 'bg-orange-100 dark:bg-orange-900/40 text-orange-500 dark:text-orange-400', path: '/games/flashcards' },
  { name: 'Quiz', desc: 'MCQs by topic & level', icon: HelpCircle, color: 'bg-green-100 dark:bg-green-900/40 text-green-500 dark:text-green-400', path: '/quiz' },
  { name: 'Periodic Table', desc: 'Interactive elements', icon: Grid, color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-500 dark:text-blue-400', path: '/periodic-table' },
  { name: '3D Molecule Viewer', desc: 'Rotate, zoom, explore molecules', icon: Hexagon, color: 'bg-pink-100 dark:bg-pink-900/40 text-pink-500 dark:text-pink-400', path: '/molecule-insight' },
  { name: 'Virtual Lab', desc: 'Run safe experiments', icon: FlaskConical, color: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400', path: '/virtual-lab' },
  { name: 'Games', desc: 'Learn while you play', icon: Gamepad2, color: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400', path: '/games' },
  { name: 'Tutorials', desc: 'Step-by-step guides', icon: Video, color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400', path: '/tutorial' },
]

const ORGANIC_MODULES = [
  { title: 'General Organic Chemistry', lessons: 3, quizzes: 12, icon: FlaskConical, color: 'text-purple-500' },
  { title: 'Hydrocarbons', lessons: 4, quizzes: 12, icon: Box, color: 'text-blue-500' },
  { title: 'Functional Groups', lessons: 4, quizzes: 12, icon: TestTube, color: 'text-teal-500' },
  { title: 'Reaction Mechanisms', lessons: 3, quizzes: 12, icon: Activity, color: 'text-orange-500' },
  { title: 'Isomerism', lessons: 3, quizzes: 12, icon: Hexagon, color: 'text-amber-600' },
  { title: 'Named Reactions', lessons: 2, quizzes: 12, icon: BookOpen, color: 'text-rose-500' },
  { title: 'Biomolecules & Polymers', lessons: 3, quizzes: 12, icon: Atom, color: 'text-indigo-500' },
]

const INORGANIC_MODULES = [
  { title: 'Periodic Table & Trends', lessons: 2, quizzes: 12, icon: Grid, color: 'text-rose-500' },
  { title: 'Chemical Bonding', lessons: 2, quizzes: 12, icon: Box, color: 'text-blue-400' },
  { title: 'Coordination Compounds', lessons: 2, quizzes: 12, icon: Hexagon, color: 'text-blue-500' },
  { title: 'Metallurgy', lessons: 2, quizzes: 12, icon: Zap, color: 'text-stone-500' },
  { title: 'p-Block Elements', lessons: 3, quizzes: 12, icon: Box, color: 'text-teal-400' },
  { title: 'd & f Block Elements', lessons: 2, quizzes: 12, icon: Atom, color: 'text-amber-500' },
  { title: 'Environmental Chemistry', lessons: 2, quizzes: 12, icon: Droplet, color: 'text-emerald-500' },
]

const PHYSICAL_MODULES = [
  { title: 'Mole Concept & Stoichiometry', lessons: 2, quizzes: 12, icon: FlaskConical, color: 'text-cyan-500' },
  { title: 'Thermodynamics', lessons: 2, quizzes: 12, icon: Flame, color: 'text-orange-500' },
  { title: 'Chemical Equilibrium', lessons: 2, quizzes: 12, icon: Scale, color: 'text-teal-500' },
  { title: 'Ionic Equilibrium', lessons: 2, quizzes: 12, icon: TestTube, color: 'text-blue-400' },
  { title: 'Chemical Kinetics', lessons: 2, quizzes: 12, icon: Activity, color: 'text-emerald-500' },
  { title: 'Electrochemistry', lessons: 2, quizzes: 12, icon: Zap, color: 'text-yellow-500' },
  { title: 'Solutions & Colligative...', lessons: 2, quizzes: 12, icon: Droplet, color: 'text-blue-500' },
]

const CAROUSEL_SLIDES = [
  { id: 1, title: 'Inorganic Chemistry', subtitle: 'Periodic trends, bonding, coordination compounds.', tag: 'WELCOME BACK TO YOUR LAB', icon: Atom, bg: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
  { id: 2, title: 'Organic Chemistry', subtitle: 'Carbon compounds, mechanisms, stereochemistry.', tag: 'CONTINUE LEARNING', icon: Hexagon, bg: 'bg-gradient-to-br from-emerald-400 to-teal-600' },
  { id: 3, title: 'Physical Chemistry', subtitle: 'Thermodynamics, kinetics, quantum chemistry.', tag: 'NEW MODULE UNLOCKED', icon: Activity, bg: 'bg-gradient-to-br from-purple-500 to-pink-600' },
  { id: 4, title: 'AI Chemistry Learning', subtitle: 'Interactive 3D models and AI tutor assistance.', tag: 'EXPLORE AI FEATURES', icon: Brain, bg: 'bg-gradient-to-br from-orange-400 to-red-500' },
]

// --- COMPONENTS ---

export const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const [greeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return t('dashboard.goodMorning')
    if (hour < 18) return t('dashboard.goodAfternoon')
    if (hour < 21) return t('dashboard.goodEvening')
    return t('dashboard.goodNight')
  })
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Real user name might come from auth context/store later
  const username = "Learner"

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1))

  return (
    <div className="relative min-h-full bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-gray-100 pb-20 md:pb-8 font-sans transition-colors overflow-hidden">
      
      {/* Background Floating Particles */}
      <div className="absolute top-10 left-10 w-3 h-3 bg-blue-400 rounded-full opacity-20 blur-[2px] animate-pulse"></div>
      <div className="absolute top-32 right-20 w-4 h-4 bg-purple-400 rounded-full opacity-20 blur-[2px] animate-pulse delay-150"></div>
      <div className="absolute top-60 left-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-30 blur-[1px] animate-bounce"></div>

      <div className="relative z-10 px-4 pt-6 md:p-8 max-w-5xl mx-auto space-y-8">
        
        {/* 1. GREETING SECTION */}
        <section className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-500 dark:text-gray-400 font-bold tracking-widest text-xs mb-1 uppercase">
              {greeting}
            </h2>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {t('dashboard.hello')} <span className="text-blue-600 dark:text-blue-400">{username}</span>!
            </h1>
          </div>
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 border-2 border-white dark:border-white/10">
            {username.charAt(0)}
          </div>
        </section>

        {/* 2. MINI ANNOUNCEMENT SLIDER */}
        <section>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-white/5 rounded-full py-3 px-4 flex items-center gap-3 shadow-sm">
            <Sparkles className="text-blue-500 shrink-0" size={18} />
            <p className="text-sm font-semibold text-slate-700 dark:text-gray-200 truncate">
              {t('dashboard.newAnnouncement')}
            </p>
          </div>
        </section>

        {/* 3. HERO SLIDER */}
        <section className="relative">
          <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-4 md:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-white/5 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-6">
              
              {/* Carousel Icon Block */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`w-28 h-28 md:w-36 md:h-36 rounded-3xl flex items-center justify-center shrink-0 ${CAROUSEL_SLIDES[currentSlide].bg}`}
                >
                  {React.createElement(CAROUSEL_SLIDES[currentSlide].icon, { size: 48, className: "text-white" })}
                </motion.div>
              </AnimatePresence>

              {/* Carousel Content */}
              <div className="flex-1 text-center md:text-left z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-blue-600 dark:text-blue-400 font-bold tracking-wider text-[10px] md:text-xs uppercase mb-2">
                      {CAROUSEL_SLIDES[currentSlide].tag}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">
                      {CAROUSEL_SLIDES[currentSlide].title}
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 text-sm">
                      {CAROUSEL_SLIDES[currentSlide].subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button onClick={prevSlide} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-slate-700 dark:text-white hover:scale-110 transition-transform z-20 border border-slate-100 dark:border-white/10">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/90 dark:bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-slate-700 dark:text-white hover:scale-110 transition-transform z-20 border border-slate-100 dark:border-white/10">
              <ChevronRight size={20} />
            </button>
            
            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-6">
              {CAROUSEL_SLIDES.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-blue-600' : 'w-1.5 bg-gray-300 dark:bg-gray-600'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. AI SEARCH BAR */}
        <section>
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <div className="relative bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 rounded-full flex items-center px-5 py-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] group-focus-within:border-blue-400 group-focus-within:ring-4 group-focus-within:ring-blue-500/10 dark:group-focus-within:ring-blue-900/30 transition-all">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-3 shrink-0">
                <Brain size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <input 
                type="text" 
                placeholder={t('dashboard.askAI')}
                className="bg-transparent border-none outline-none text-slate-900 dark:text-gray-200 w-full placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>
        </section>

        {/* 5. QUICK STATS */}
        <section className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm">
             <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center mb-2">
               <Flame className="text-orange-500" size={20} />
             </div>
             <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">0d</h3>
             <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-gray-400 tracking-wider uppercase">{t('dashboard.streak')}</p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm">
             <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center mb-2">
               <Target className="text-teal-500" size={20} />
             </div>
             <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">0%</h3>
             <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-gray-400 tracking-wider uppercase">{t('dashboard.accuracy')}</p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm">
             <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mb-2">
               <Layers className="text-purple-500" size={20} />
             </div>
             <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">0</h3>
             <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-gray-400 tracking-wider uppercase">{t('dashboard.cards')}</p>
          </div>
        </section>

        {/* 6. FEATURE GRID */}
        <section>
          <div className="flex items-end justify-between mb-4">
             <h2 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">{t('dashboard.exploreFeatures')}</h2>
             <span className="text-xs font-bold text-slate-500 dark:text-gray-400">{FEATURES.length} {t('dashboard.tools')}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {FEATURES.map((feature, idx) => (
              <Link 
                key={idx} 
                to={feature.path} 
                className="bg-white dark:bg-gray-800/50 p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col justify-between aspect-square"
              >
                <div className={`w-10 h-10 rounded-full ${feature.color} flex items-center justify-center mb-auto`}>
                  <feature.icon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-gray-100 mb-0.5 leading-tight">{feature.name}</h3>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-tight">{feature.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 7. CHEMISTRY MODULES */}
        
        {/* ORGANIC CHEMISTRY */}
        <section className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-white/20">
              <FlaskConical size={24} className="text-white" />
            </div>
            <div>
               <h2 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">{t('dashboard.organicChemistry')}</h2>
               <p className="text-xs font-bold text-slate-500 dark:text-gray-400">{ORGANIC_MODULES.length} {t('dashboard.modules')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {ORGANIC_MODULES.map((mod, i) => (
              <div key={i} className="bg-white dark:bg-gray-800/50 p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer">
                <mod.icon size={28} strokeWidth={1.5} className={`mb-4 ${mod.color}`} />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-gray-100 mb-3 leading-snug min-h-[40px]">{mod.title}</h3>
                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500 text-xs font-bold">
                  <div className="flex items-center gap-1"><BookOpen size={14}/> {mod.lessons}</div>
                  <div className="flex items-center gap-1"><Trophy size={14}/> {mod.quizzes}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INORGANIC CHEMISTRY */}
        <section className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 border border-white/20">
              <Atom size={24} className="text-white" />
            </div>
            <div>
               <h2 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">{t('dashboard.inorganicChemistry')}</h2>
               <p className="text-xs font-bold text-slate-500 dark:text-gray-400">{INORGANIC_MODULES.length} {t('dashboard.modules')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {INORGANIC_MODULES.map((mod, i) => (
              <div key={i} className="bg-white dark:bg-gray-800/50 p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer">
                <mod.icon size={28} strokeWidth={1.5} className={`mb-4 ${mod.color}`} />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-gray-100 mb-3 leading-snug min-h-[40px]">{mod.title}</h3>
                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500 text-xs font-bold">
                  <div className="flex items-center gap-1"><BookOpen size={14}/> {mod.lessons}</div>
                  <div className="flex items-center gap-1"><Trophy size={14}/> {mod.quizzes}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PHYSICAL CHEMISTRY */}
        <section className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30 border border-white/20">
              <Activity size={24} className="text-white" />
            </div>
            <div>
               <h2 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">{t('dashboard.physicalChemistry')}</h2>
               <p className="text-xs font-bold text-slate-500 dark:text-gray-400">{PHYSICAL_MODULES.length} {t('dashboard.modules')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {PHYSICAL_MODULES.map((mod, i) => (
              <div key={i} className="bg-white dark:bg-gray-800/50 p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer">
                <mod.icon size={28} strokeWidth={1.5} className={`mb-4 ${mod.color}`} />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-gray-100 mb-3 leading-snug min-h-[40px]">{mod.title}</h3>
                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500 text-xs font-bold">
                  <div className="flex items-center gap-1"><BookOpen size={14}/> {mod.lessons}</div>
                  <div className="flex items-center gap-1"><Trophy size={14}/> {mod.quizzes}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
