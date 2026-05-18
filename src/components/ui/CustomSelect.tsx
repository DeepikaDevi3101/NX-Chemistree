import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  label?: string
  className?: string
  placeholder?: string
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ 
  options, 
  value, 
  onChange, 
  label, 
  className = '',
  placeholder = 'Select option...'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const selectedOption = options.find(opt => opt.value === value)

  // Update position when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      })
    }
  }, [isOpen])

  // Close on scroll to prevent floating away
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false)
    }
    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
          {label}
        </label>
      )}
      
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          w-full flex items-center justify-between 
          bg-white dark:bg-slate-900/50 
          border border-slate-200 dark:border-white/10 
          rounded-2xl px-5 py-3.5 
          text-slate-900 dark:text-white text-sm font-bold 
          shadow-sm transition-all outline-none
          hover:border-primary/50 focus:ring-2 focus:ring-primary/20
          backdrop-blur-md
          ${isOpen ? 'ring-2 ring-primary/20 border-primary/50' : ''}
        `}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown 
          className={`transition-transform duration-500 ease-out text-slate-400 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
          size={18} 
        />
      </button>

      {isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[999]" 
          onClick={() => setIsOpen(false)}
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ 
                position: 'absolute',
                top: coords.top + 8,
                left: coords.left,
                width: coords.width,
              }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden py-2 backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95 ring-1 ring-black/5 dark:ring-white/5 dark:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
              role="listbox"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                {options.map((option) => {
                  const isActive = value === option.value
                  return (
                    <button
                      key={option.value}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => {
                        onChange(option.value)
                        setIsOpen(false)
                      }}
                      className={`
                        w-full text-left px-5 py-3 text-sm transition-all flex items-center justify-between
                        ${isActive 
                          ? 'bg-primary/10 dark:bg-primary/20 text-primary font-black' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                        }
                      `}
                    >
                      <span>{option.label}</span>
                      {isActive && <Check size={16} className="text-primary animate-in zoom-in duration-300" />}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>,
        document.body
      )}
    </div>
  )
}
