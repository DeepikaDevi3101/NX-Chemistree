import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  BookOpen, Lightbulb, 
  CheckCircle2, HelpCircle, FileText,
  Target, Bookmark, ChevronDown,
  ChevronUp, Zap, MessageSquare, Star, ArrowLeft
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { LESSONS_SYLLABUS } from '../data/lessons'
import type { Branch } from '../data/lessons'

export const LessonDetail: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { bookmarks, toggleBookmark, updateLessonProgress, lessonProgress } = useStore()
  
  const lesson = useMemo(() => LESSONS_SYLLABUS.find(l => l.id === id), [id])
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    concept: true,
    summary: true,
    visual: true,
    qa: false,
    practice: false,
    revision: false
  })

  if (!lesson) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl text-white">Lesson not found</h2>
        <button onClick={() => navigate('/lessons')} className="mt-4 text-primary">Back to Hub</button>
      </div>
    )
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const branchColors: Record<Branch, string> = {
    'Organic': 'green',
    'Inorganic': 'blue',
    'Physical': 'purple'
  }
  const color = branchColors[lesson.branch]

  const progress = lessonProgress[lesson.id] || 0

  const handleComplete = () => {
    updateLessonProgress(lesson.id, 100)
  }

  return (
    <div className={`min-h-screen pb-20 bg-bg-light dark:bg-bg-dark transition-colors duration-300 theme-${color}`}>
      {/* Header Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className={`absolute inset-0 bg-${color}-500/10 blur-3xl`}></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 space-y-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/lessons')}
              className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm shrink-0"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-xs font-bold text-slate-500 dark:text-gray-400">Back to Learning Hub</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-${color}-500/20 text-${color}-400`}>
                  {lesson.branch} Chemistry
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-500 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">{lesson.difficulty} Level</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white">{lesson.title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
               <button 
                onClick={() => toggleBookmark(lesson.id)}
                className={`p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 transition-all ${bookmarks.includes(lesson.id) ? `text-${color}-600 dark:text-${color}-400` : 'text-slate-400 dark:text-gray-500 shadow-sm'}`}
               >
                 <Bookmark size={24} fill={bookmarks.includes(lesson.id) ? 'currentColor' : 'none'} />
               </button>
               <div className="bg-white dark:bg-white/5 px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-4 shadow-sm">
                  <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`}><Target size={20} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest">Progress</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white">{progress}%</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-12 mt-12">
        {/* Main Content (3/4) */}
        <div className="lg:col-span-3 space-y-12">
          
          {/* 1. CONCEPT LESSON */}
          <section className="bg-white dark:bg-white/5 rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm">
            <button 
              onClick={() => toggleSection('concept')}
              className="w-full flex items-center justify-between p-8 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`}><BookOpen size={24} /></div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">1. Concept Lesson</h3>
              </div>
              {expandedSections.concept ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
            </button>
            {expandedSections.concept && (
              <div className="p-8 pt-0 prose prose-slate dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-gray-300 prose-headings:text-slate-900 dark:prose-headings:text-white prose-strong:text-slate-900 dark:prose-strong:text-white">
                <div dangerouslySetInnerHTML={{ __html: lesson.content.conceptLesson.replace(/\n/g, '<br/>') }} />
              </div>
            )}
          </section>

          {/* 2. SMART SUMMARY */}
          <section className="bg-white dark:bg-white/5 rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm">
            <button 
              onClick={() => toggleSection('summary')}
              className="w-full flex items-center justify-between p-8 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`}><Zap size={24} /></div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">2. Smart Summary</h3>
              </div>
              {expandedSections.summary ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
            </button>
            {expandedSections.summary && (
              <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.content.smartSummary.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <div className={`w-2 h-2 rounded-full bg-${color}-500 dark:bg-${color}-400 mt-2 shrink-0`}></div>
                    <p className="text-slate-600 dark:text-gray-300 text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 3. VISUAL SUPPORT */}
          <section className="bg-white dark:bg-white/5 rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm">
            <button 
              onClick={() => toggleSection('visual')}
              className="w-full flex items-center justify-between p-8 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`}><Lightbulb size={24} /></div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">3. Visual Learning Support</h3>
              </div>
              {expandedSections.visual ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
            </button>
            {expandedSections.visual && (
              <div className="p-8 pt-0">
                {lesson.content.visualSupport.map((v, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-black/20">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 dark:bg-white/5">
                        <tr>
                          {v.data.headers.map((h: string) => <th key={h} className="p-4 text-[10px] font-black uppercase text-slate-500 dark:text-gray-500">{h}</th>)}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                        {v.data.rows.map((row: string[], ri: number) => (
                          <tr key={ri}>
                            {row.map((cell, ci) => <td key={ci} className="p-4 text-sm text-slate-600 dark:text-gray-300 font-medium">{cell}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 4. Q&A SECTION */}
          <section className="bg-white dark:bg-white/5 rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm">
            <button 
              onClick={() => toggleSection('qa')}
              className="w-full flex items-center justify-between p-8 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`}><MessageSquare size={24} /></div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">4. Question & Answer Section</h3>
              </div>
              {expandedSections.qa ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
            </button>
            {expandedSections.qa && (
              <div className="p-8 pt-0 space-y-6">
                  {lesson.content.qa.map((item, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-4 shadow-sm">
                    <div className="flex justify-between items-start">
                       <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`}>
                         {item.level}
                       </span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">Q: {item.question}</p>
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-black/40 space-y-2">
                       <p className={`text-sm font-black text-${color}-600 dark:text-${color}-400 uppercase tracking-widest`}>Answer</p>
                       <p className="text-slate-700 dark:text-gray-300">{item.answer}</p>
                       <p className="text-xs text-slate-500 dark:text-gray-500 italic mt-2">{item.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 5. PRACTICE PROBLEMS */}
          <section className="bg-white dark:bg-white/5 rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm">
            <button 
              onClick={() => toggleSection('practice')}
              className="w-full flex items-center justify-between p-8 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`}><Target size={24} /></div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">5. Practice Problems</h3>
              </div>
              {expandedSections.practice ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
            </button>
            {expandedSections.practice && (
              <div className="p-8 pt-0 space-y-6">
                 {lesson.content.practiceProblems.map((p, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 space-y-4">
                       <p className="text-lg font-bold text-slate-900 dark:text-white">{p.problem}</p>
                       <details className="group">
                          <summary className={`cursor-pointer text-sm font-black text-${color}-600 dark:text-${color}-400 uppercase tracking-widest flex items-center gap-2`}>
                             Show Solution <ChevronDown className="group-open:rotate-180 transition-all" size={16} />
                          </summary>
                          <div className="mt-4 p-6 rounded-2xl bg-slate-100 dark:bg-black/40 text-slate-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                             {p.solution}
                          </div>
                       </details>
                    </div>
                 ))}
              </div>
            )}
          </section>

          {/* 6. REVISION CARDS */}
          <section className="bg-white dark:bg-white/5 rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm">
            <button 
              onClick={() => toggleSection('revision')}
              className="w-full flex items-center justify-between p-8 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`}><Star size={24} /></div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">6. Quick Revision Cards</h3>
              </div>
              {expandedSections.revision ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
            </button>
            {expandedSections.revision && (
              <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                 {lesson.content.revisionCards.map((card, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent border border-slate-100 dark:border-white/5 flex flex-col justify-center text-center">
                       <p className={`text-[10px] font-black text-${color}-600 dark:text-${color}-400 uppercase tracking-widest mb-2`}>{card.term}</p>
                       <p className="text-sm text-slate-600 dark:text-gray-300 font-medium">{card.definition}</p>
                    </div>
                 ))}
              </div>
            )}
          </section>

          <div className="flex justify-center pt-8">
             <button 
              onClick={handleComplete}
              className={`px-12 py-5 rounded-[24px] font-black text-lg transition-all ${progress === 100 ? 'bg-green-500 text-white' : `bg-${color}-500 text-white shadow-xl shadow-${color}-500/20 hover:scale-105`}`}
             >
               {progress === 100 ? '✓ Lesson Completed' : 'Mark as Completed'}
             </button>
          </div>

        </div>

        {/* Sidebar (1/4) - Sticky Key Points */}
        <div className="space-y-8">
          <div className="sticky top-24 space-y-6">
            <div className={`bg-white dark:bg-white/5 p-8 rounded-[32px] border border-slate-200 dark:border-${color}-500/20 shadow-sm space-y-6`}>
               <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-600 dark:text-${color}-400`}><HelpCircle size={20} /></div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">Key Points</h4>
               </div>
               <ul className="space-y-4">
                  {lesson.content.keyPoints.map((point, i) => (
                    <li key={i} className="flex gap-3">
                       <CheckCircle2 size={16} className={`text-${color}-600 dark:text-${color}-400 shrink-0 mt-1`} />
                       <span className="text-sm text-slate-600 dark:text-gray-300 font-medium">{point}</span>
                    </li>
                  ))}
               </ul>
            </div>
            
            <div className="bg-white dark:bg-white/5 p-8 rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
               <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Share Lesson</h4>
               <div className="flex gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                       <FileText size={18} className="text-slate-500 dark:text-gray-400" />
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
