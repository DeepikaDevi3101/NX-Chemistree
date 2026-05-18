import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { 
  CheckCircle2, XCircle, Brain, 
  ArrowRight, Award, BarChart, RotateCcw, Home, ArrowLeft
} from 'lucide-react'
import { useStore } from '../store/useStore'
import type { QuizAttempt } from '../store/useStore'
import { QUESTIONS } from '../data/questions'
import type { Question } from '../data/questions'

export const QuizActive: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addQuizAttempt, quizAttempts } = useStore()
  const mode = searchParams.get('mode') || 'easy'

  // Quiz State
  const [currentQuestions] = useState<Question[]>(() => {
    let filtered = [...QUESTIONS]
    
    if (mode === 'easy') filtered = QUESTIONS.filter(q => q.difficulty <= 2)
    else if (mode === 'medium') filtered = QUESTIONS.filter(q => q.difficulty >= 2 && q.difficulty <= 4)
    else if (mode === 'hard') filtered = QUESTIONS.filter(q => q.difficulty >= 4)
    else if (mode === 'mastery') {
       // Concept Mastery: find weakest topic from past attempts
       const topicAcc: Record<string, { c: number, t: number }> = {}
       quizAttempts.forEach(a => {
         Object.entries(a.topics).forEach(([topic, count]) => {
           if (!topicAcc[topic]) topicAcc[topic] = { c: 0, t: 0 }
           topicAcc[topic].c += count
           topicAcc[topic].t += (a.totalQuestions / Object.keys(a.topics).length)
         })
       })
       const weakestTopic = Object.entries(topicAcc).sort((a, b) => (a[1].c / a[1].t) - (b[1].c / b[1].t))[0]?.[0]
       if (weakestTopic) filtered = QUESTIONS.filter(q => q.topic === weakestTopic)
    }

    return filtered.sort(() => 0.5 - Math.random()).slice(0, 10)
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(mode === 'rapid-fire' ? 60 : 30)
  const [isFinished, setIsFinished] = useState(false)
  const [topicStats, setTopicStats] = useState<Record<string, number>>({})
  
  const timerRef = useRef<number | null>(null)

  const finishQuiz = useCallback(() => {
    setIsFinished(true)
    if (timerRef.current) clearInterval(timerRef.current)
    
    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      mode,
      score,
      totalQuestions: currentQuestions.length,
      correctAnswers: correctCount,
      accuracy: (correctCount / currentQuestions.length) * 100,
      topics: topicStats,
      timestamp: Date.now()
    }
    addQuizAttempt(attempt)
  }, [mode, score, currentQuestions.length, correctCount, topicStats, addQuizAttempt])

  const handleNext = useCallback(() => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
      if (mode !== 'rapid-fire') setTimeLeft(30)
    } else {
      finishQuiz()
    }
  }, [currentIndex, currentQuestions.length, mode, finishQuiz])

  // Timer Logic
  useEffect(() => {
    if (isFinished) return

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (mode === 'rapid-fire') {
            finishQuiz()
            return 0
          }
          handleNext()
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [currentIndex, isFinished, mode, finishQuiz, handleNext])

  const handleAnswer = (index: number) => {
    if (isAnswered) return
    setSelectedOption(index)
    setIsAnswered(true)

    const currentQ = currentQuestions[currentIndex]
    const isCorrect = index === currentQ.correctIndex

    if (isCorrect) {
      setCorrectCount(prev => prev + 1)
      const timeBonus = Math.floor(timeLeft / 2)
      setScore(prev => prev + (currentQ.difficulty * 10) + timeBonus)
      
      setTopicStats(prev => ({
        ...prev,
        [currentQ.topic]: (prev[currentQ.topic] || 0) + 1
      }))
    }
  }

  if (currentQuestions.length === 0) return <div className="p-12 text-center text-slate-900 dark:text-white">Loading questions...</div>

  if (isFinished) {
    return (
      <div className="p-4 md:p-8 lg:p-12 max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-slate-200 dark:border-white/10 text-center space-y-6 shadow-sm">
          <div className="inline-flex p-4 bg-brand/10 dark:bg-brand/20 rounded-full text-brand mb-4">
            <Award size={48} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Quiz Complete!</h1>
          <p className="text-slate-500 dark:text-gray-400 text-lg uppercase tracking-widest">Score: <span className="text-brand font-black">{score}</span></p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
              <span className="block text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold">Accuracy</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">{Math.round((correctCount / currentQuestions.length) * 100)}%</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
              <span className="block text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold">Correct</span>
              <p className="text-xl font-black text-green-600 dark:text-green-400">{correctCount}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
              <span className="block text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold">Total</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">{currentQuestions.length}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
              <span className="block text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold">Mode</span>
              <p className="text-sm font-black text-brand uppercase">{mode}</p>
            </div>
          </div>

          <div className="space-y-4 text-left">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart size={20} className="text-brand" />
                Topic Performance
             </h3>
             <div className="space-y-3">
               {Object.entries(topicStats).map(([topic, count]) => (
                 <div key={topic} className="space-y-1">
                   <div className="flex justify-between text-xs text-slate-500 dark:text-gray-400">
                     <span>{topic}</span>
                     <span>{count} Correct</span>
                   </div>
                   <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                     <div className="bg-brand h-full rounded-full" style={{ width: `${(count / 3) * 100}%` }}></div>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button 
              onClick={() => navigate('/')}
              className="flex-1 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm"
            >
              <Home size={20} />
              Home
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="flex-1 py-4 bg-brand rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:bg-brand/90 shadow-lg shadow-brand/20 active:scale-95 transition-all"
            >
              <RotateCcw size={20} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = currentQuestions[currentIndex]

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-4xl mx-auto space-y-8 pb-32">
      
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/quiz')}
            className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-brand uppercase tracking-tighter">Mode: {mode}</span>
            <h2 className="text-slate-900 dark:text-white font-bold text-xl">Question {currentIndex + 1} <span className="text-slate-500 dark:text-gray-500">/ {currentQuestions.length}</span></h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
             <span className="block text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold">Score</span>
             <p className="text-xl font-black text-slate-900 dark:text-white">{score}</p>
           </div>
           <div className={`w-14 h-14 rounded-full border-4 ${timeLeft < 10 ? 'border-red-500 animate-pulse' : 'border-brand'} flex items-center justify-center relative overflow-hidden transition-colors`}>
             <span className="text-lg font-black text-slate-900 dark:text-white z-10">{timeLeft}</span>
             <div className="absolute inset-0 bg-brand/10"></div>
           </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-white/5 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-white/10 space-y-8 min-h-[400px] flex flex-col justify-center shadow-sm">
        <div className="space-y-4">
          <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">{currentQ.topic}</span>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
            {currentQ.text}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ.options.map((option, idx) => {
            let stateClass = "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:border-brand/50 hover:bg-white dark:hover:bg-white/10"
            if (isAnswered) {
              if (idx === currentQ.correctIndex) stateClass = "bg-green-500/10 dark:bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-400"
              else if (idx === selectedOption) stateClass = "bg-red-500/10 dark:bg-red-500/20 border-red-500/50 text-red-700 dark:text-red-400"
              else stateClass = "bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-300 dark:text-gray-600"
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleAnswer(idx)}
                className={`
                  p-5 rounded-2xl border text-left font-medium transition-all duration-200
                  flex items-center justify-between group
                  ${stateClass}
                `}
              >
                <span>{option}</span>
                {isAnswered && idx === currentQ.correctIndex && <CheckCircle2 size={20} />}
                {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && <XCircle size={20} />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Action Footer */}
      {isAnswered && (
        <div className="animate-in slide-in-from-bottom-2 duration-300 flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-white/20 shadow-xl">
          <div className="flex items-center gap-4">
             <div className={`p-3 rounded-xl ${selectedOption === currentQ.correctIndex ? 'bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400'}`}>
               <Brain size={24} />
             </div>
             <div>
               <h4 className="text-slate-900 dark:text-white font-bold">{selectedOption === currentQ.correctIndex ? 'Brilliant!' : 'Not quite...'}</h4>
               <p className="text-slate-500 dark:text-gray-400 text-sm">{currentQ.explanation}</p>
             </div>
          </div>
          <button 
            onClick={handleNext}
            className="w-full md:w-auto px-10 py-4 bg-brand rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:bg-brand/80 active:scale-95 transition-all"
          >
            {currentIndex === currentQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
