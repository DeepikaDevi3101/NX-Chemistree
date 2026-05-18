import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { 
  ChevronLeft, ChevronRight, RotateCcw, 
  CheckCircle2, AlertCircle, Search,
  Star, Shuffle, Trophy,
  Flame, ShieldCheck, FlaskConical, Atom, Leaf,
  Beaker, Sparkles
} from 'lucide-react'
import { useStore } from '../../store/useStore'
import { FLASHCARDS_DATA } from '../../data/flashcards'
import type { Category, Difficulty } from '../../data/flashcards'
import { CustomSelect } from '../ui/CustomSelect'

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  'Elements': <Atom size={24} />,
  'Chemical Reactions': <Flame size={24} />,
  'Acids & Bases': <FlaskConical size={24} />,
  'Organic Chemistry': <Leaf size={24} />,
  'Periodic Table': <GridIcon />,
  'Lab Safety': <ShieldCheck size={24} />
}

function GridIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  )
}

// Stable particles for background
const BACKGROUND_PARTICLES = [...Array(12)].map((_, i) => ({
  id: i,
  x: [Math.random() * 1000, Math.random() * 1000],
  y: [Math.random() * 800, Math.random() * 800],
  duration: 10 + Math.random() * 20
}))

export const Flashcards: React.FC = () => {
  const { 
    flashcardBookmarks, toggleFlashcardBookmark, 
    flashcardKnown, toggleFlashcardKnown,
    flashcardNeedsPractice, toggleFlashcardNeedsPractice
  } = useStore()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Known' | 'Need Practice'>('All')
  const [isShuffle, setIsShuffle] = useState(false)

  // Motion Values for Swipe
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0])

  // Filter Logic
  const filteredCards = useMemo(() => {
    return FLASHCARDS_DATA.filter(card => {
      const catMatch = selectedCategory === 'All' || card.category === selectedCategory
      const diffMatch = selectedDifficulty === 'All' || card.difficulty === selectedDifficulty
      const searchMatch = card.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         card.answer.toLowerCase().includes(searchQuery.toLowerCase())
      
      let statusMatch = true
      if (statusFilter === 'Known') statusMatch = flashcardKnown.includes(card.id)
      if (statusFilter === 'Need Practice') statusMatch = flashcardNeedsPractice.includes(card.id)
      
      return catMatch && diffMatch && searchMatch && statusMatch
    })
  }, [selectedCategory, selectedDifficulty, searchQuery, statusFilter, flashcardKnown, flashcardNeedsPractice])

  const [displayCards, setDisplayCards] = useState(filteredCards)
  const [prevFiltered, setPrevFiltered] = useState(filteredCards)
  const [prevShuffle, setPrevShuffle] = useState(isShuffle)

  if (filteredCards !== prevFiltered || isShuffle !== prevShuffle) {
    setPrevFiltered(filteredCards)
    setPrevShuffle(isShuffle)
    
    const result = [...filteredCards]
    if (isShuffle) {
      // eslint-disable-next-line react-hooks/purity
      result.sort(() => Math.random() - 0.5)
    }
    setDisplayCards(result)
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  // Navigation
  const paginate = useCallback((newDirection: number) => {
    if (displayCards.length === 0) return
    setIsFlipped(false)
    const nextIdx = (currentIndex + newDirection + displayCards.length) % displayCards.length
    setCurrentIndex(nextIdx)
  }, [currentIndex, displayCards.length])

  const currentCard = displayCards[currentIndex]

  if (displayCards.length === 0) {
    return (
      <div className="p-20 text-center space-y-8 animate-in fade-in duration-700">
         <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-primary/20 border border-primary/10">
            <Beaker size={48} />
         </div>
         <div className="space-y-2">
            <h2 className="text-3xl font-black text-white">No Molecules Found</h2>
            <p className="text-gray-500 max-w-sm mx-auto">The AI couldn't find cards matching your filters. Try resetting to explore more.</p>
         </div>
         <button 
           onClick={() => {setSelectedCategory('All'); setSelectedDifficulty('All'); setSearchQuery(''); setStatusFilter('All')}}
           className="px-10 py-4 bg-primary text-bg-dark font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
         >
           Reset All Systems
         </button>
      </div>
    )
  }

  return (
    <div className="relative p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-12 pb-32 overflow-hidden min-h-screen">
      
      {/* Background Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
         {BACKGROUND_PARTICLES.map((p) => (
           <motion.div
             key={p.id}
             className="absolute w-2 h-2 rounded-full bg-primary/10 blur-[1px]"
             animate={{
               x: p.x,
               y: p.y,
               opacity: [0.2, 0.5, 0.2]
             }}
             transition={{
               duration: p.duration,
               repeat: Infinity,
               ease: "linear"
             }}
           />
         ))}
      </div>

      {/* 1. AI Header & Dashboard Stats */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00e5ff]"></div>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">AI LEARNING CORE ACTIVE</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-white">
             Chemistry <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Flashcards</span>
           </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
           <StatBox label="MASTERY" value={`${flashcardKnown.length}`} icon={<Trophy size={16} />} color="text-primary" />
           <StatBox label="PRACTICE" value={`${flashcardNeedsPractice.length}`} icon={<AlertCircle size={16} />} color="text-magenta" />
           <StatBox label="STREAK" value="5" icon={<Flame size={16} />} color="text-orange-500" />
        </div>
      </div>

      {/* 2. Control Hub (Search & Filters) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <div className="lg:col-span-2 relative group">
            <div className="absolute inset-y-0 left-5 flex items-center text-primary/40"><Search size={20} /></div>
            <input 
              type="text" 
              placeholder="Search chemical name, formula, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all glass placeholder:text-gray-600 font-bold"
            />
         </div>
         
         <div className="flex gap-2">
            <CustomSelect 
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val as Category | 'All')}
              options={[
                { value: 'All', label: 'All Categories' },
                ...FLASHCARDS_DATA.map(c => c.category)
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .map(c => ({ value: c, label: c }))
              ]}
              className="flex-1"
            />
            <CustomSelect 
              value={selectedDifficulty}
              onChange={(val) => setSelectedDifficulty(val as Difficulty | 'All')}
              options={[
                { value: 'All', label: 'All Levels' },
                { value: 'Basic', label: 'Basic' },
                { value: 'Moderate', label: 'Moderate' },
                { value: 'Advanced', label: 'Advanced' }
              ]}
              className="flex-1"
            />
         </div>

         <div className="bg-black/40 border border-white/10 rounded-2xl p-1 flex glass">
            {(['All', 'Known', 'Need Practice'] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${statusFilter === s ? 'bg-primary text-bg-dark' : 'text-gray-500 hover:text-white'}`}
              >
                {s}
              </button>
            ))}
         </div>
      </div>

      {/* 3. Main Flashcard Experience */}
      <div className="relative z-10 flex flex-col items-center space-y-12">
         
         {/* Swipe & Flip Card Container */}
         <div className="relative w-full max-w-2xl h-[450px] md:h-[500px]">
            <AnimatePresence mode="wait">
               <motion.div
                 key={currentCard.id}
                 style={{ x, rotate, opacity }}
                 drag="x"
                 dragConstraints={{ left: 0, right: 0 }}
                 onDragEnd={(_, info) => {
                   if (info.offset.x > 100) paginate(-1)
                   else if (info.offset.x < -100) paginate(1)
                 }}
                 className="absolute inset-0 cursor-grab active:cursor-grabbing"
               >
                  <div 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="w-full h-full perspective-1000"
                  >
                     <motion.div
                       animate={{ rotateY: isFlipped ? 180 : 0 }}
                       transition={{ type: "spring", stiffness: 260, damping: 20 }}
                       className="w-full h-full relative preserve-3d"
                     >
                        {/* FRONT SIDE */}
                        <div className="absolute inset-0 backface-hidden glass rounded-[48px] border border-white/10 flex flex-col items-center justify-center p-12 text-center space-y-8 bg-charcoal/80">
                           {/* Glow Border Effect */}
                           <div className="absolute inset-0 rounded-[48px] border-2 border-primary/20 blur-sm pointer-events-none"></div>
                           
                           <div className="absolute top-10 left-10 flex items-center gap-3">
                              <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                                 {CATEGORY_ICONS[currentCard.category]}
                              </div>
                              <div className="text-left">
                                 <p className="text-[10px] font-black text-primary uppercase tracking-widest">{currentCard.category}</p>
                                 <p className={`text-[10px] font-black uppercase ${currentCard.difficulty === 'Basic' ? 'text-green-400' : currentCard.difficulty === 'Moderate' ? 'text-yellow-400' : 'text-red-400'}`}>{currentCard.difficulty}</p>
                              </div>
                           </div>

                           <div className="absolute top-10 right-10 flex gap-2">
                              <button 
                                onClick={(e) => {e.stopPropagation(); toggleFlashcardBookmark(currentCard.id)}}
                                className={`p-3 rounded-2xl transition-all ${flashcardBookmarks.includes(currentCard.id) ? 'bg-yellow-500/20 text-yellow-500' : 'text-gray-600 hover:text-white'}`}
                              >
                                 <Star size={24} fill={flashcardBookmarks.includes(currentCard.id) ? 'currentColor' : 'none'} />
                              </button>
                           </div>

                           <div className="space-y-4">
                              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                 {currentCard.question}
                              </h2>
                              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
                           </div>

                           <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
                              <RotateCcw size={14} /> TAP TO REVEAL
                           </div>
                        </div>

                        {/* BACK SIDE */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 glass rounded-[48px] border border-primary/40 flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-6 bg-primary/5">
                           <div className="absolute inset-0 rounded-[48px] border-2 border-primary/40 blur-md pointer-events-none"></div>

                           <div className="w-full space-y-6 overflow-y-auto no-scrollbar py-4">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-primary uppercase tracking-widest">CHEMICAL FORMULA</p>
                                 <h2 className="text-4xl font-black text-white">{currentCard.formula}</h2>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                 <InfoCard label="CLASSIFICATION" value={currentCard.classification} />
                                 <InfoCard label="REAL-WORLD USE" value={currentCard.realWorldUse} />
                              </div>

                              <div className="glass p-4 rounded-2xl border-white/5 bg-black/40 text-left">
                                 <p className="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-2 mb-2">
                                    <Sparkles size={12} /> FUN FACT
                                 </p>
                                 <p className="text-xs text-gray-300 leading-relaxed italic">"{currentCard.funFact}"</p>
                              </div>

                              {currentCard.safetyWarning && (
                                 <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-left flex items-start gap-3">
                                    <ShieldCheck className="text-red-400 shrink-0" size={16} />
                                    <div className="space-y-1">
                                       <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">SAFETY ALERT</p>
                                       <p className="text-[10px] text-red-300/80 leading-tight">{currentCard.safetyWarning}</p>
                                    </div>
                                 </div>
                              )}
                           </div>

                           <div className="flex gap-4 pt-4 border-t border-white/10 w-full justify-center">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation(); 
                                  toggleFlashcardKnown(currentCard.id);
                                  paginate(1);
                                }}
                                className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${flashcardKnown.includes(currentCard.id) ? 'bg-primary text-bg-dark shadow-[0_0_20px_#00e5ff]' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20'}`}
                              >
                                 <CheckCircle2 size={14} /> MASTERED
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation(); 
                                  toggleFlashcardNeedsPractice(currentCard.id);
                                  paginate(1);
                                }}
                                className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${flashcardNeedsPractice.includes(currentCard.id) ? 'bg-magenta text-white shadow-[0_0_20px_#ff00ff]' : 'bg-magenta/10 text-magenta border border-magenta/20 hover:bg-magenta/20'}`}
                              >
                                 <AlertCircle size={14} /> PRACTICE
                              </button>
                           </div>
                        </div>
                     </motion.div>
                  </div>
               </motion.div>
            </AnimatePresence>
         </div>

         {/* 4. Interactive Navigation & Progress Bar */}
         <div className="relative z-10 w-full max-w-2xl space-y-8">
            <div className="flex items-center gap-10 justify-between">
               <button 
                 onClick={() => paginate(-1)}
                 className="p-6 glass rounded-3xl text-primary border-primary/20 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
               >
                  <ChevronLeft size={32} />
               </button>

               <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-end px-2">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">MODULE PROGRESS</p>
                        <p className="text-2xl font-black text-white">{currentIndex + 1} <span className="text-gray-700 text-lg">/ {displayCards.length}</span></p>
                     </div>
                     <div className="text-right flex flex-col items-end gap-1">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">SYNCED TO AI CORE</span>
                        <div className="flex gap-1">
                           {[...Array(5)].map((_, i) => (
                             <motion.div 
                              key={i} 
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                              className={`w-1.5 h-1.5 rounded-full ${i < Math.floor((currentIndex+1)/displayCards.length * 5) ? 'bg-primary' : 'bg-gray-800'}`} 
                             />
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5 relative">
                     <motion.div 
                       className="h-full bg-primary rounded-full shadow-[0_0_15px_#00e5ff]" 
                       initial={{ width: 0 }}
                       animate={{ width: `${((currentIndex + 1) / displayCards.length) * 100}%` }}
                       transition={{ type: "spring", stiffness: 50, damping: 20 }}
                     />
                  </div>
               </div>

               <button 
                 onClick={() => paginate(1)}
                 className="p-6 glass rounded-3xl text-primary border-primary/20 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
               >
                  <ChevronRight size={32} />
               </button>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
               <button 
                 onClick={() => setIsShuffle(!isShuffle)}
                 className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${isShuffle ? 'bg-primary text-bg-dark shadow-[0_0_20px_#00e5ff]' : 'glass border-white/10 text-gray-500'}`}
               >
                  <Shuffle size={16} /> SHUFFLE MODE
               </button>
               <button 
                 onClick={() => {setCurrentIndex(0); setIsShuffle(false); setIsFlipped(false)}}
                 className="flex items-center gap-3 px-8 py-4 glass border-white/10 text-gray-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:text-white transition-all"
               >
                  <RotateCcw size={16} /> RESET DECK
               </button>
            </div>
         </div>

      </div>

    </div>
  )
}

const StatBox: React.FC<{ label: string, value: string, icon: React.ReactNode, color: string }> = ({ label, value, icon, color }) => (
  <div className="glass px-4 py-3 rounded-2xl border-white/10 flex items-center gap-3 min-w-[100px]">
     <div className={`p-2 rounded-lg bg-white/5 ${color}`}>{icon}</div>
     <div>
        <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{label}</p>
        <p className="text-lg font-black text-white leading-none">{value}</p>
     </div>
  </div>
)

const InfoCard: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="glass p-3 rounded-xl border-white/5 bg-white/5 text-left">
     <p className="text-[8px] font-black text-primary uppercase tracking-widest mb-1">{label}</p>
     <p className="text-[10px] text-white font-bold line-clamp-2">{value}</p>
  </div>
)
