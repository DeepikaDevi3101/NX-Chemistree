import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Timer, RotateCcw, CheckCircle2, HelpCircle, Trophy, ArrowLeft } from 'lucide-react'
import { useStore } from '../../store/useStore'

const WORD_LISTS = {
  easy: ['ATOM', 'BOND', 'BASE', 'ACID', 'SALT'],
  medium: ['HELIUM', 'OXYGEN', 'SODIUM', 'POTASH', 'METALS'],
  hard: ['CATALYST', 'REACTION', 'MOLECULE', 'POLYMER', 'ELECTRON']
}

type Difficulty = 'easy' | 'medium' | 'hard'

export const WordSearch: React.FC = () => {
  const navigate = useNavigate()
  const { updateGameScore, addBadge } = useStore()
  
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [grid, setGrid] = useState<string[][]>([])
  const [wordsToFind, setWordsToFind] = useState<string[]>([])
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [selection, setSelection] = useState<{r: number, c: number}[]>([])
  const [timeLeft, setTimeLeft] = useState(120)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)

  // Initialize Game
  const initGame = useCallback((diff: Difficulty) => {
    const words = WORD_LISTS[diff]
    const size = diff === 'easy' ? 8 : diff === 'medium' ? 10 : 12
    
    // Create empty grid
    const newGrid = Array(size).fill(0).map(() => Array(size).fill(''))
    
    // Place words (simplified: horizontal only for now)
    words.forEach((word) => {
      let placed = false
      while (!placed) {
        const r = Math.floor(Math.random() * size)
        const c = Math.floor(Math.random() * (size - word.length))
        
        let canPlace = true
        for (let i = 0; i < word.length; i++) {
          if (newGrid[r][c+i] !== '' && newGrid[r][c+i] !== word[i]) {
            canPlace = false
            break
          }
        }

        if (canPlace) {
          for (let i = 0; i < word.length; i++) newGrid[r][c+i] = word[i]
          placed = true
        }
      }
    })

    // Fill remaining with random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (newGrid[r][c] === '') newGrid[r][c] = letters[Math.floor(Math.random() * 26)]
      }
    }

    setGrid(newGrid)
    setWordsToFind(words)
    setFoundWords([])
    setSelection([])
    setTimeLeft(diff === 'easy' ? 120 : diff === 'medium' ? 180 : 240)
    setIsGameOver(false)
    setScore(0)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      initGame(difficulty)
    }, 0)
    return () => clearTimeout(timer)
  }, [difficulty, initGame])

  useEffect(() => {
    if (isGameOver || timeLeft <= 0) return
    const timer = window.setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsGameOver(true)
          updateGameScore('word-search', score)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [isGameOver, timeLeft, score, updateGameScore])

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver) return
    
    const newSelection = [...selection, { r, c }]
    setSelection(newSelection)

    // Check if selection matches any word
    const selectedText = newSelection.map(s => grid[s.r][s.c]).join('')
    if (wordsToFind.includes(selectedText) && !foundWords.includes(selectedText)) {
      setFoundWords([...foundWords, selectedText])
      setSelection([])
      setScore(s => s + (selectedText.length * 10))
      
      if (foundWords.length + 1 === wordsToFind.length) {
        setIsGameOver(true)
        updateGameScore('word-search', score + (selectedText.length * 10) + timeLeft)
        if (difficulty === 'hard') addBadge('Word Search Master')
      }
    } else if (newSelection.length > 10) { // Reset if too long
      setSelection([])
    }
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto space-y-8 pb-32">
      
      {/* Game Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/games')}
            className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Word Search</h1>
            <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Find all the chemistry keywords!</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
             <Timer size={18} className={timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-primary'} />
             <span className="text-gray-800 dark:text-white font-black">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
           </div>
           <div className="glass px-4 py-2 rounded-xl">
             <span className="text-gray-500 text-[10px] font-bold uppercase block">Score</span>
             <span className="text-gray-800 dark:text-white font-black">{score}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Words to Find */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Words to Find</h2>
          <div className="glass p-4 rounded-2xl border-black/10 dark:border-white/10 space-y-2">
            {wordsToFind.map((word) => (
              <div 
                key={word} 
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${foundWords.includes(word) ? 'bg-green-500/20 text-green-500 dark:text-green-400 line-through opacity-50' : 'bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300'}`}
              >
                {foundWords.includes(word) ? <CheckCircle2 size={18} /> : <HelpCircle size={18} className="text-gray-600" />}
                <span className="font-bold tracking-widest">{word}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase px-2">Difficulty</span>
            <div className="flex gap-2">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${difficulty === d ? 'bg-primary/20 border-primary text-primary' : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-500'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The Grid */}
        <div className="lg:col-span-2">
          <div className="glass p-4 rounded-3xl border-black/10 dark:border-white/10 aspect-square flex flex-col gap-1">
            {grid.map((row, r) => (
              <div key={r} className="flex gap-1 flex-1">
                {row.map((cell, c) => {
                  const isSelected = selection.some(s => s.r === r && s.c === c)
                  return (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`
                        flex-1 flex items-center justify-center font-black text-xs md:text-base rounded
                        transition-all duration-150
                        ${isSelected ? 'bg-primary text-bg-dark scale-95' : 'bg-black/5 dark:bg-white/5 text-gray-800 dark:text-white hover:bg-black/10 dark:hover:bg-white/10'}
                      `}
                    >
                      {cell}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center">
             <p className="text-gray-500 text-xs italic">Tip: Click letters in order to select a word.</p>
             <button 
               onClick={() => initGame(difficulty)}
               className="p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl text-gray-800 dark:text-white transition-all"
             >
               <RotateCcw size={20} />
             </button>
          </div>
        </div>

      </div>

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-dark/80 backdrop-blur-md">
          <div className="glass max-w-sm w-full p-8 rounded-3xl border-black/20 dark:border-white/20 text-center space-y-6">
            <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center text-secondary mx-auto">
              <Trophy size={40} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800 dark:text-white">
                {foundWords.length === wordsToFind.length ? 'Well Done!' : 'Time Up!'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">You found {foundWords.length} out of {wordsToFind.length} words.</p>
            </div>
            <div className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10">
              <span className="text-[10px] text-gray-500 uppercase font-bold">Total Score</span>
              <p className="text-3xl font-black text-gray-800 dark:text-white">{score}</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/games')}
                className="flex-1 py-4 glass border-black/10 dark:border-white/10 rounded-2xl text-gray-800 dark:text-white font-bold"
              >
                Exit
              </button>
              <button 
                onClick={() => initGame(difficulty)}
                className="flex-1 py-4 bg-secondary rounded-2xl text-white font-bold"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
