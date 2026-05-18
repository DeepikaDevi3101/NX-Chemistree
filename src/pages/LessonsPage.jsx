import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CHEMISTRY_LESSONS from '../data/chemistryLessons'
import { useLessonProgress } from '../hooks/useLessonProgress'
import { useGemmaChat } from '../hooks/useGemmaChat'
import { generateQuiz } from '../services/gemmaService'
import {
  BookOpen, Lightbulb, CheckCircle, Zap, FlaskConical,
  MessageCircle, Search, X, Menu, ChevronLeft,
  ChevronRight, ArrowUp, Trash2, Clock, BarChart2,
  Send, Loader2, RefreshCcw, Sparkles
} from 'lucide-react'

const LessonsPage = () => {
  const navigate = useNavigate()
  const { 
    completedLessons, markComplete, markIncomplete, 
    isCompleted, getProgressByClass, getTotalProgress 
  } = useLessonProgress()

  // STATE
  const [selectedClass, setSelectedClass] = useState('class-10')
  const [selectedChapterId, setSelectedChapterId] = useState(CHEMISTRY_LESSONS['class-10'][0].id)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [quizData, setQuizData] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [isQuizLoading, setIsQuizLoading] = useState(false)

  // DERIVED STATE
  const currentClassData = useMemo(() => CHEMISTRY_LESSONS[selectedClass], [selectedClass])
  
  const currentChapter = useMemo(() => {
    // Search across all classes to find the chapter if searching, or just in current class
    const all = Object.values(CHEMISTRY_LESSONS).flat()
    return all.find(c => c.id === selectedChapterId) || currentClassData[0]
  }, [selectedChapterId, currentClassData])

  const allChapters = useMemo(() => Object.values(CHEMISTRY_LESSONS).flat(), [])

  const searchResults = useMemo(() => {
    if (!searchQuery) return []
    const q = searchQuery.toLowerCase()
    return allChapters.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.content.keyPoints.some(p => p.toLowerCase().includes(q))
    )
  }, [searchQuery, allChapters])

  const filteredChapters = useMemo(() => {
    return searchQuery ? searchResults : currentClassData
  }, [searchQuery, searchResults, currentClassData])

  const currentIndex = useMemo(() => {
    return currentClassData.findIndex(c => c.id === selectedChapterId)
  }, [currentClassData, selectedChapterId])

  const prevChapter = currentClassData[currentIndex - 1]
  const nextChapter = currentClassData[currentIndex + 1]

  const {
    messages, input, setInput,
    isLoading: isChatLoading, isOpen: isChatOpen, setIsOpen: setIsChatOpen,
    sendMessage, clearChat, messagesEndRef
  } = useGemmaChat(currentChapter)

  // EFFECTS
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedChapterId])

  useEffect(() => {
    setSelectedChapterId(CHEMISTRY_LESSONS[selectedClass][0].id)
  }, [selectedClass])

  // HANDLERS
  const handleClassChange = (classKey) => {
    setSelectedClass(classKey)
    setSelectedChapterId(CHEMISTRY_LESSONS[classKey][0].id)
    setSearchQuery('')
  }

  const handleChapterSelect = (chapterId) => {
    setSelectedChapterId(chapterId)
    setSearchQuery('')
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }

  const handleGenerateQuiz = async () => {
    setIsQuizLoading(true)
    setShowQuiz(false)
    setQuizAnswers({})
    setQuizSubmitted(false)
    
    const result = await generateQuiz(
      currentChapter.title,
      currentChapter.content.keyPoints
    )
    
    if (result.success) {
      setQuizData(result.quiz)
      setShowQuiz(true)
    }
    setIsQuizLoading(false)
  }

  const handleQuizAnswer = (questionIndex, answer) => {
    if (quizSubmitted) return
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answer }))
  }

  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length < (quizData?.questions?.length || 0)) {
      alert("Please answer all questions before submitting!")
      return
    }
    setQuizSubmitted(true)
  }

  const handleQuizReset = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizData(null)
    setShowQuiz(false)
  }

  const toggleLessonStatus = () => {
    if (isCompleted(currentChapter.id)) {
      markIncomplete(currentChapter.id)
    } else {
      markComplete(currentChapter.id)
    }
  }

  const classProgress = getProgressByClass(selectedClass, currentClassData)
  const totalProgress = getTotalProgress(allChapters)

  const classColors = {
    'class-10': 'cyan',
    'class-11': 'purple',
    'class-12': 'emerald',
    'university-cy3151': 'amber'
  }
  const themeColor = classColors[selectedClass] || 'primary'

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-[#0a0f1e] text-slate-800 dark:text-white font-sans overflow-hidden">
      
      {/* TOP NAV */}
      <nav className="h-16 border-b border-slate-200 dark:border-white/10 px-4 flex items-center justify-between sticky top-0 z-50 bg-white/80 dark:bg-[#0a0f1e]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-600 dark:text-white transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg md:text-xl font-black tracking-tighter italic text-slate-800 dark:text-white">
            Chemistry <span className={`text-${themeColor}-500 dark:text-${themeColor}-400 uppercase not-italic`}>Lessons</span> 📚
          </h1>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search topics, key points..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-full py-2 pl-12 pr-10 outline-none focus:border-primary/50 transition-all shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm text-slate-600 dark:text-white">
            <BarChart2 size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest">{totalProgress.done}/{totalProgress.total} Done</span>
          </div>
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-600 dark:text-white">
            <X size={20} />
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">

        {/* SIDEBAR */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 bg-white dark:bg-[#0c1226] flex flex-col transition-all duration-300 ease-in-out lg:relative overflow-hidden min-w-0
          ${isSidebarOpen 
            ? 'w-72 translate-x-0 opacity-100 border-r border-slate-200 dark:border-white/10' 
            : 'w-0 -translate-x-full opacity-0 pointer-events-none border-r border-transparent lg:w-0 lg:-translate-x-full lg:opacity-0'}
        `}>
          {/* Mobile overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden -z-10"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Class Tabs */}
          <div className="p-4 grid grid-cols-2 gap-2 border-b border-slate-200 dark:border-white/10">
            {[
              { id: 'class-10', label: '10th', color: 'cyan' },
              { id: 'class-11', label: '11th', color: 'purple' },
              { id: 'class-12', label: '12th', color: 'emerald' },
              { id: 'university-cy3151', label: 'AU', color: 'amber' }
            ].map(cls => (
              <button
                key={cls.id}
                onClick={() => handleClassChange(cls.id)}
                className={`
                  p-3 rounded-2xl border transition-all flex flex-col items-center gap-1
                  ${selectedClass === cls.id 
                    ? `bg-${cls.color}-500/10 border-${cls.color}-500/50 text-${cls.color}-600 dark:text-${cls.color}-400` 
                    : 'bg-slate-100 dark:bg-white/5 border-transparent text-slate-400 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10'}
                `}
              >
                <span className="text-xs font-black uppercase tracking-widest">{cls.label}</span>
                <span className="text-[8px] opacity-60">
                  {getProgressByClass(cls.id, CHEMISTRY_LESSONS[cls.id]).done}/{CHEMISTRY_LESSONS[cls.id].length}
                </span>
              </button>
            ))}
          </div>

          {/* Progress Section */}
          <div className="p-6 space-y-3 bg-slate-50 dark:bg-white/5">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/60">
              <span>Class Progress</span>
              <span className={`text-${themeColor}-500 dark:text-${themeColor}-400`}>{classProgress.percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-${themeColor}-500 transition-all duration-1000 shadow-[0_0_10px_rgba(34,211,238,0.5)]`}
                style={{ width: `${classProgress.percent}%` }}
              />
            </div>
          </div>

          {/* Chapter List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
            {filteredChapters.length > 0 ? (
              filteredChapters.map((chapter, index) => {
                const active = selectedChapterId === chapter.id
                const done = isCompleted(chapter.id)
                return (
                  <button
                    key={chapter.id}
                    onClick={() => handleChapterSelect(chapter.id)}
                    className={`
                      w-full p-4 rounded-[20px] text-left transition-all group flex items-center gap-4 border
                      ${active 
                        ? `bg-${themeColor}-500/10 border-${themeColor}-500/30 text-slate-850 dark:text-white` 
                        : 'bg-transparent border-transparent text-slate-650 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/5'}
                    `}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-black
                      ${active ? `bg-${themeColor}-500 text-bg-dark` : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/40'}
                    `}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${active ? 'text-slate-850 dark:text-white font-extrabold' : 'text-slate-700 dark:text-white/80'}`}>{chapter.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] font-black uppercase text-slate-400 dark:text-white/40">{chapter.duration}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/20" />
                        <span className={`text-[8px] font-black uppercase text-${themeColor}-650 dark:text-${themeColor}-400/60`}>{chapter.difficulty}</span>
                      </div>
                    </div>
                    {done && <CheckCircle size={16} className="text-emerald-500 shrink-0" />}
                  </button>
                )
              })
            ) : (
              <div className="py-12 text-center text-slate-400 dark:text-white/40">
                <Search size={32} className="mx-auto mb-4 opacity-20" />
                <p className="text-xs">No results for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 scroll-smooth">
          
          {/* 1. CHAPTER HEADER CARD */}
          <div className="relative overflow-hidden rounded-[40px] p-8 md:p-12 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm backdrop-blur-xl group">
             <div className={`absolute top-0 right-0 p-12 opacity-5 dark:opacity-10 group-hover:scale-110 transition-all duration-700 text-${themeColor}-500 dark:text-${themeColor}-400`}>
                <BookOpen size={200} />
             </div>
             
             <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap gap-3">
                   <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-${themeColor}-500/20 text-${themeColor}-600 dark:text-${themeColor}-400 border border-${themeColor}-500/30`}>
                     {selectedClass.toUpperCase().replace('-', ' ')}
                   </span>
                   <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/60 border border-slate-200 dark:border-white/10">
                     {currentChapter.difficulty}
                   </span>
                   <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/60 border border-slate-200 dark:border-white/10 flex items-center gap-2">
                     <Clock size={12} /> {currentChapter.duration}
                   </span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-black leading-tight text-slate-900 dark:text-white">
                    {currentChapter.title}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-slate-400 dark:text-white/40 text-sm font-bold tracking-widest uppercase">
                      Lesson {currentIndex + 1} of {currentClassData.length} in this module
                    </p>
                    <button 
                      onClick={toggleLessonStatus}
                      className={`
                        px-8 py-3 rounded-2xl font-black text-sm transition-all flex items-center gap-2
                        ${isCompleted(currentChapter.id)
                          ? 'bg-emerald-500 text-bg-dark hover:bg-emerald-400 hover:scale-105 active:scale-95'
                          : 'bg-primary text-bg-dark hover:scale-105 active:scale-95 shadow-xl shadow-primary/20'}
                      `}
                    >
                      {isCompleted(currentChapter.id) ? (
                        <><CheckCircle size={18} /> Completed</>
                      ) : (
                        'Mark as Complete'
                      )}
                    </button>
                  </div>
                </div>
             </div>
          </div>

          {/* 2. OVERVIEW CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 border-l-4 dark:border-l-4 border-l-cyan-500 dark:border-l-cyan-500 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 text-cyan-500 dark:text-cyan-400">
                  <BookOpen size={24} />
                  <h2 className="text-xl font-black uppercase tracking-tight">Overview</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-white/70 leading-relaxed italic">
                  "{currentChapter.content.overview}"
                </p>
              </section>

              {/* 3. KEY POINTS CARD */}
              <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 border-l-4 dark:border-l-4 border-l-yellow-500 dark:border-l-yellow-500 rounded-3xl p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-3 text-yellow-600 dark:text-yellow-400">
                  <Lightbulb size={24} />
                  <h2 className="text-xl font-black uppercase tracking-tight">Key Learning Points</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentChapter.content.keyPoints.map((point, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-100 dark:border-transparent transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center text-[10px] font-black shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-white/80">{point}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* QUICK FACTS (moved here for desktop layout) */}
            <section className="space-y-6">
              <div className="bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent border border-slate-200 dark:border-white/10 rounded-[32px] p-8 space-y-6 h-full shadow-sm">
                <div className="flex items-center gap-3 text-primary">
                  <Zap size={24} />
                  <h2 className="text-xl font-black uppercase tracking-tight">Quick Facts ⚡</h2>
                </div>
                <div className="space-y-4">
                  {currentChapter.content.quickFacts.map((fact, i) => (
                    <div key={i} className="bg-slate-100/50 dark:bg-black/20 p-4 rounded-2xl border border-slate-200/50 dark:border-white/5 animate-pulse-slow">
                      <p className="text-sm text-slate-600 dark:text-white/70 leading-snug">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* 4. CONTENT SECTIONS */}
          <div className="space-y-8">
            {currentChapter.content.sections.map((section, i) => (
              <section 
                key={section.id} 
                className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-8 md:p-12 space-y-8 hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-500 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className={`w-12 h-12 rounded-2xl bg-${themeColor}-500/20 text-${themeColor}-650 dark:text-${themeColor}-400 flex items-center justify-center text-xl font-black`}>
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white uppercase">{section.title}</h3>
                </div>
                
                <div className="space-y-6">
                  <p className="text-lg text-slate-600 dark:text-white/70 leading-relaxed whitespace-pre-wrap">
                    {section.body}
                  </p>

                  {section.formula && (
                    <div className="bg-slate-100 dark:bg-black/40 p-6 rounded-2xl border border-slate-200 dark:border-primary/20 flex flex-col items-center justify-center group overflow-x-auto shadow-sm">
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Chemical Formula / Logic</p>
                      <code className="text-2xl md:text-4xl font-mono text-slate-800 dark:text-white tracking-widest group-hover:scale-110 transition-transform">
                        {section.formula}
                      </code>
                    </div>
                  )}

                  {section.note && (
                    <div className="flex gap-4 p-6 bg-orange-50/50 dark:bg-orange-500/5 border border-orange-200 dark:border-orange-500/20 rounded-2xl italic text-orange-800 dark:text-orange-200/80 shadow-sm">
                      <Lightbulb size={24} className="shrink-0 text-orange-400" />
                      <p className="text-sm">{section.note}</p>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* 5. EXAMPLES CARD */}
          <section className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-8 md:p-12 space-y-8 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-500 dark:text-emerald-400">
              <FlaskConical size={32} />
              <h2 className="text-3xl font-black uppercase tracking-tight">Real World Applications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentChapter.content.examples.map((ex, i) => (
                <div key={i} className="flex gap-6 p-6 bg-slate-50 dark:bg-black/20 rounded-3xl border border-slate-100 dark:border-white/5 group hover:border-emerald-500/30 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center font-black shrink-0 group-hover:bg-emerald-500 group-hover:text-bg-dark transition-all">
                    {i + 1}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white">{ex.title}</h4>
                    <p className="text-sm text-slate-550 dark:text-white/50 leading-relaxed">{ex.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. SUMMARY CARD */}
          <section className="bg-gradient-to-br from-slate-100 to-transparent dark:from-[#1a2340] dark:to-transparent border border-slate-200 dark:border-white/10 rounded-[40px] p-8 md:p-12 text-center space-y-8 shadow-sm">
             <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/10">
                <CheckCircle size={40} />
             </div>
             <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tighter italic text-slate-800 dark:text-white">Chapter <span className="text-emerald-500 dark:text-emerald-400">Summary</span></h2>
                <p className="text-lg text-slate-650 dark:text-white/60 leading-relaxed italic">"{currentChapter.content.summary}"</p>
             </div>
             <button 
                onClick={toggleLessonStatus}
                className={`
                  px-10 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95
                  ${isCompleted(currentChapter.id) 
                    ? 'bg-emerald-500 text-bg-dark' 
                    : 'bg-primary text-bg-dark shadow-xl shadow-primary/20'}
                `}
             >
                {isCompleted(currentChapter.id) ? 'Mastery Achieved! 🏆' : 'Mark as Mastered'}
             </button>
          </section>

          {/* 8. AI QUIZ SECTION */}
          <section className="relative overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-8 md:p-12 space-y-8 shadow-sm">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.2),transparent_70%)]" />
            </div>

            <div className="relative z-10 space-y-4 text-center">
              <h2 className="text-3xl font-black uppercase tracking-tight flex items-center justify-center gap-3 text-slate-800 dark:text-white">
                <Sparkles size={32} className="text-primary" /> Test Your Knowledge 🧠
              </h2>
              <p className="text-slate-500 dark:text-white/60 max-w-lg mx-auto">
                Generate a custom AI quiz based on this chapter's core concepts. Let's see what you've learned!
              </p>
              
              {!showQuiz && (
                <button 
                  onClick={handleGenerateQuiz}
                  disabled={isQuizLoading}
                  className="px-12 py-4 bg-primary text-bg-dark font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:scale-100 flex items-center gap-3 mx-auto"
                >
                  {isQuizLoading ? (
                    <><Loader2 className="animate-spin" /> Generating...</>
                  ) : (
                    <><Zap size={18} /> Generate Quiz ✨</>
                  )}
                </button>
              )}
            </div>

            {showQuiz && quizData && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                <div className="grid grid-cols-1 gap-6 text-slate-800 dark:text-white">
                  {quizData.questions.map((q, qi) => {
                    const selected = quizAnswers[qi]
                    const isCorrect = selected === q.correct
                    return (
                      <div key={qi} className="bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-3xl p-6 space-y-6 shadow-sm">
                        <div className="flex gap-4">
                          <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-xs font-black shrink-0 text-slate-600 dark:text-white">{qi + 1}</span>
                          <p className="text-lg font-bold text-slate-800 dark:text-white">{q.question}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-12">
                          {q.options.map((opt) => {
                            const optKey = opt[0] // Assuming options are "A) Text"
                            const isSelected = selected === optKey
                            
                            let btnStyle = "bg-white dark:bg-white/5 border-slate-250 dark:border-white/10 text-slate-700 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10"
                            if (quizSubmitted) {
                              if (optKey === q.correct) btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-500 dark:text-emerald-400 font-bold"
                              else if (isSelected && !isCorrect) btnStyle = "bg-red-500/20 border-red-500 text-red-500 dark:text-red-400 font-bold"
                              else btnStyle = "opacity-40"
                            } else if (isSelected) {
                              btnStyle = "bg-primary/20 border-primary text-slate-850 dark:text-primary font-bold"
                            }

                            return (
                              <button
                                key={optKey}
                                onClick={() => handleQuizAnswer(qi, optKey)}
                                className={`p-4 rounded-xl text-left text-sm font-medium border transition-all ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            )
                          })}
                        </div>
                        {quizSubmitted && (
                          <div className={`ml-12 p-4 rounded-2xl text-xs italic ${isCorrect ? 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-400/80' : 'bg-red-500/5 text-red-600 dark:text-red-400/80'}`}>
                            <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-col items-center gap-4 border-t border-slate-200 dark:border-white/10 pt-8">
                  {!quizSubmitted ? (
                    <button 
                      onClick={handleQuizSubmit}
                      className="px-12 py-4 bg-primary text-bg-dark font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
                    >
                      Submit Answers
                    </button>
                  ) : (
                    <div className="flex flex-col items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm uppercase font-black tracking-widest text-slate-400 dark:text-white/40 mb-2">Your Score</p>
                        <p className="text-6xl font-black text-primary">
                          {Object.entries(quizAnswers).filter(([i, a]) => a === quizData.questions[i].correct).length}/3
                        </p>
                      </div>
                      <button 
                        onClick={handleQuizReset}
                        className="px-8 py-3 bg-white dark:bg-white/5 border border-slate-250 dark:border-white/10 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white transition-all flex items-center gap-2"
                      >
                        <RefreshCcw size={16} /> Try Again
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* 9. CHAPTER NAVIGATION */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between pt-8">
            <button
              onClick={() => handleChapterSelect(prevChapter.id)}
              disabled={!prevChapter}
              className={`
                group p-6 rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-left transition-all hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm
                ${!prevChapter ? 'opacity-20 grayscale pointer-events-none' : ''}
              `}
            >
              <div className="flex items-center gap-2 text-slate-400 dark:text-white/40 mb-2 font-black uppercase text-[10px] tracking-widest">
                <ChevronLeft size={16} /> Previous Lesson
              </div>
              <p className="font-bold text-lg text-slate-800 dark:text-white">{prevChapter?.title || 'No Previous'}</p>
            </button>

            <button
              onClick={() => handleChapterSelect(nextChapter.id)}
              disabled={!nextChapter}
              className={`
                group p-6 rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-right transition-all hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm
                ${!nextChapter ? 'opacity-20 grayscale pointer-events-none' : ''}
              `}
            >
              <div className="flex items-center justify-end gap-2 text-slate-400 dark:text-white/40 mb-2 font-black uppercase text-[10px] tracking-widest">
                Next Lesson <ChevronRight size={16} />
              </div>
              <p className="font-bold text-lg text-slate-800 dark:text-white">{nextChapter?.title || 'No Next'}</p>
            </button>
          </div>

          <div className="h-20" /> {/* Spacer */}
        </main>
      </div>

      {/* GEMMA CHAT TRIGGER BUTTON */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`
          fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-500 text-bg-dark flex items-center justify-center shadow-2xl z-[60] transition-all hover:scale-110 active:scale-95
          ${!isChatOpen ? 'animate-bounce shadow-primary/40' : 'rotate-90'}
        `}
      >
        {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {messages.length > 1 && !isChatOpen && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-[10px] font-black flex items-center justify-center border-2 border-bg-dark">
            {messages.length - 1}
          </span>
        )}
      </button>

      {/* GEMMA CHAT POPUP */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-32px)] h-[520px] max-h-[70vh] bg-white/95 dark:bg-[#0c1226]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[32px] flex flex-col shadow-2xl z-[60] animate-in slide-in-from-bottom-5 duration-300 overflow-hidden text-slate-800 dark:text-white">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest italic text-slate-800 dark:text-white">Gemma <span className="text-primary not-italic">AI Tutor</span></p>
                <p className="text-[10px] text-slate-400 dark:text-white/40">Powered by Gemini 2.0</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearChat} className="p-2 hover:bg-slate-200/50 dark:hover:bg-white/5 rounded-lg text-slate-400 dark:text-white/40 hover:text-red-500 transition-colors" title="Clear Chat">
                <Trash2 size={16} />
              </button>
              <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-slate-200/50 dark:hover:bg-white/5 rounded-lg text-slate-400 dark:text-white/40 hover:text-slate-800 dark:hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[85%] p-4 rounded-[24px] text-sm leading-relaxed shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-primary text-bg-dark rounded-br-none font-bold' 
                    : `bg-slate-50 dark:bg-white/5 text-slate-850 dark:text-white/90 rounded-bl-none border border-slate-100 dark:border-white/10 ${msg.isError ? 'border-red-500/30 text-red-650 dark:text-red-200' : ''}`}
                `}>
                  {msg.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                  <span className={`block mt-2 text-[8px] opacity-40 ${msg.role === 'user' ? 'text-bg-dark/60' : 'text-slate-400 dark:text-white/40'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-[24px] rounded-bl-none border border-slate-100 dark:border-white/10 flex gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10">
            <div className="relative group">
              <input 
                type="text"
                placeholder="Ask about this chapter..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm outline-none focus:border-primary/50 text-slate-800 dark:text-white transition-all placeholder:text-slate-400 dark:placeholder:text-white/20"
              />
              <button 
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isChatLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-bg-dark rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[8px] text-center mt-3 text-slate-400 dark:text-white/20 uppercase tracking-widest">
              AI can make mistakes. Verify important facts.
            </p>
          </div>
        </div>
      )}

      {/* SCROLL TO TOP (OPTIONAL BUT GOOD) */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-all shadow-sm"
      >
        <ArrowUp size={20} className="text-slate-400 dark:text-white/40" />
      </button>

    </div>
  )
}

export default LessonsPage;
