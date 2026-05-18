import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CheckCircle2, XCircle, 
  ArrowRight, Trophy, RotateCcw, ArrowLeft 
} from 'lucide-react'
import { useStore } from '../../store/useStore'

interface BlankQuestion {
  id: string
  sentence: string // Use [blank] to denote where the blank is
  answer: string
  explanation: string
  difficulty: 'Easy' | 'Medium' | 'Formula' | 'Concept' | 'Advanced'
}

const BLANK_QUESTIONS: BlankQuestion[] = [
  {
    id: 'b1',
    sentence: "The atomic number of an element is determined by the number of [blank] in its nucleus.",
    answer: "protons",
    explanation: "Protons define the identity of an element and its atomic number.",
    difficulty: 'Easy'
  },
  {
    id: 'b2',
    sentence: "In a water molecule (H₂O), the bond between Hydrogen and Oxygen is a [blank] bond.",
    answer: "covalent",
    explanation: "Water molecules are formed by sharing electrons between H and O atoms.",
    difficulty: 'Medium'
  },
  {
    id: 'b3',
    sentence: "The balanced equation for photosynthesis is 6CO₂ + 6H₂O → [blank] + 6O₂.",
    answer: "C6H12O6",
    explanation: "Glucose (C₆H₁₂O₆) is the primary product of photosynthesis.",
    difficulty: 'Formula'
  },
  {
    id: 'b4',
    sentence: "According to [blank]'s Law, at constant temperature, the volume of a gas is inversely proportional to its pressure.",
    answer: "Boyle",
    explanation: "Boyle's Law (P₁V₁ = P₂V₂) describes the inverse relationship between pressure and volume.",
    difficulty: 'Concept'
  },
  {
    id: 'b5',
    sentence: "The [blank] effect explains why adding a non-volatile solute to a solvent lowers its freezing point.",
    answer: "colligative",
    explanation: "Colligative properties depend only on the number of solute particles, not their identity.",
    difficulty: 'Advanced'
  }
]

export const FillInBlanks: React.FC = () => {
  const navigate = useNavigate()
  const { updateGameScore, addBadge, totalXP } = useStore()

  const [currentQuestions] = useState<BlankQuestion[]>(() => 
    [...BLANK_QUESTIONS].sort(() => 0.5 - Math.random())
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isAnswered || !userInput.trim()) return

    const correct = userInput.toLowerCase().trim() === currentQuestions[currentIndex].answer.toLowerCase()
    setIsCorrect(correct)
    setIsAnswered(true)

    if (correct) {
      setScore(s => s + 50)
    }
  }

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setUserInput('')
      setIsAnswered(false)
    } else {
      setIsGameOver(true)
      updateGameScore('fill-blanks', score)
      if (score >= 200) addBadge('Formula Expert')
    }
  }

  if (currentQuestions.length === 0) return null

  const q = currentQuestions[currentIndex]
  const parts = q.sentence.split('[blank]')

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-4xl mx-auto space-y-8 pb-32">
      
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
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Fill in the Blanks</h1>
            <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Test your chemical knowledge!</p>
          </div>
        </div>

        <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4">
          <div className="text-right">
             <span className="block text-[10px] text-gray-500 uppercase font-bold">Progress</span>
             <p className="text-gray-800 dark:text-white font-black">{currentIndex + 1} / {currentQuestions.length}</p>
          </div>
          <div className="w-px h-8 bg-black/10 dark:bg-white/10"></div>
          <div className="text-right">
             <span className="block text-[10px] text-gray-500 uppercase font-bold">Score</span>
             <p className="text-gray-800 dark:text-white font-black">{score}</p>
          </div>
        </div>
      </div>

      {/* Game Area */}
      {!isGameOver ? (
        <div className="glass p-8 md:p-16 rounded-[40px] border-black/10 dark:border-white/10 space-y-12 min-h-[450px] flex flex-col justify-center relative overflow-hidden">
          {/* Difficulty Badge */}
          <div className="absolute top-8 left-8">
            <span className="px-4 py-1.5 bg-brand/20 border border-brand/30 rounded-full text-[10px] font-bold text-brand uppercase tracking-widest">
              {q.difficulty}
            </span>
          </div>

          <div className="space-y-8 text-center">
            <h2 className="text-2xl md:text-4xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
              {parts[0]}
              <span className="mx-2 inline-block min-w-[120px] border-b-4 border-primary/50 text-primary font-black px-4">
                {isAnswered ? q.answer : (userInput || '.......')}
              </span>
              {parts[1]}
            </h2>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
              <input 
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isAnswered}
                placeholder="Type your answer..."
                className={`
                  w-full bg-black/5 dark:bg-white/5 border-2 rounded-2xl p-4 text-center text-xl font-bold text-gray-800 dark:text-white outline-none transition-all
                  ${isAnswered ? (isCorrect ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10') : 'border-black/10 dark:border-white/10 focus:border-primary/50'}
                `}
                autoFocus
              />
              {!isAnswered && (
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-primary px-6 rounded-xl text-bg-dark font-black hover:scale-105 transition-transform"
                >
                  GO
                </button>
              )}
            </form>
          </div>

          {/* Feedback Overlay */}
          {isAnswered && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 glass p-6 rounded-3xl border-black/20 dark:border-white/20 bg-white/40 dark:bg-bg-dark/40">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${isCorrect ? 'bg-green-500/20 text-green-550 dark:text-green-400' : 'bg-red-500/20 text-red-550 dark:text-red-400'}`}>
                  {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-800 dark:text-white font-bold">{isCorrect ? 'Correct!' : 'Incorrect'}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{q.explanation}</p>
                </div>
                <button 
                  onClick={handleNext}
                  className="bg-gray-900 dark:bg-white text-white dark:text-bg-dark font-bold py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  {currentIndex === currentQuestions.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="glass p-12 rounded-[40px] border-black/10 dark:border-white/10 text-center space-y-8 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto border-4 border-emerald-500/30">
             <Trophy size={48} />
           </div>
           <div>
             <h2 className="text-4xl font-black text-gray-800 dark:text-white">Challenge Complete!</h2>
             <p className="text-gray-600 dark:text-gray-400">Your chemistry knowledge is growing stronger.</p>
           </div>
           <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
             <div className="glass p-6 rounded-2xl border-black/10 dark:border-white/10">
               <span className="block text-[10px] text-gray-500 uppercase font-bold">Total Score</span>
               <p className="text-3xl font-black text-gray-800 dark:text-white">{score}</p>
             </div>
             <div className="glass p-6 rounded-2xl border-black/10 dark:border-white/10">
               <span className="block text-[10px] text-gray-500 uppercase font-bold">New Rank</span>
               <p className="text-3xl font-black text-emerald-400">{totalXP > 1000 ? 'Expert' : 'Acolyte'}</p>
             </div>
           </div>
           <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-md mx-auto">
              <button 
                onClick={() => navigate('/games')}
                className="flex-1 py-4 glass border-black/10 dark:border-white/10 rounded-2xl text-gray-800 dark:text-white font-bold"
              >
                Back to Games
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="flex-1 py-4 bg-emerald-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Retry Challenge
              </button>
           </div>
        </div>
      )}

    </div>
  )
}
