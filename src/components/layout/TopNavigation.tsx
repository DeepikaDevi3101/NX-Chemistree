import React, { useState, useRef, useEffect } from 'react'
import { Menu, Bell, Sun, Moon, Globe, User, Check, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store/useStore'
import { LANGUAGE_OPTIONS } from '../../i18n/types'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Logo } from '../ui/Logo'

export const TopNavigation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { toggleSidebar, theme, setTheme, language, setLanguage, user } = useStore()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const showBackButton = location.pathname !== '/'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-[64px] w-full bg-white dark:bg-bg-dark border-b border-slate-100 dark:border-white/10 flex items-center justify-between px-4 z-[60] shrink-0 sticky top-0 transition-colors">
      
      {/* Left Region */}
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm shrink-0"
            aria-label="Go Back"
          >
            <ArrowLeft size={16} />
          </button>
        )}
        <Link to="/" className="flex items-center justify-center select-none active:scale-95 transition-transform">
           <Logo variant="icon" size={36} />
        </Link>
        <button 
          onClick={toggleSidebar}
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors active:scale-95 text-slate-700 dark:text-white"
          aria-label="Toggle Sidebar"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Right Region */}
      <div className="flex items-center gap-1 md:gap-3">
        <button className="relative w-10 h-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors text-slate-700 dark:text-white">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white dark:ring-bg-dark"></span>
        </button>

        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors text-slate-700 dark:text-white"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative" ref={langRef}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className={`flex items-center gap-1.5 px-3 h-10 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-all text-slate-700 dark:text-white ${isLangOpen ? 'bg-slate-100 dark:bg-white/10' : ''}`}
          >
            <Globe size={18} className={isLangOpen ? 'text-primary' : ''} />
            <span className="text-sm font-black uppercase tracking-wider">{language}</span>
          </button>
          
          <AnimatePresence>
            {isLangOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 min-w-[180px] z-[70] glass backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95"
              >
                <div className="px-4 py-2 mb-1 border-b border-slate-100 dark:border-white/5">
                   <p className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Select Language</p>
                </div>
                {LANGUAGE_OPTIONS.map((lang) => {
                  const isActive = language === lang.code
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsLangOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center justify-between ${isActive ? 'bg-primary/10 text-primary font-black' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                    >
                      <span>{lang.native}</span>
                      {isActive && <Check size={14} />}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link 
          to="/settings" 
          className="w-9 h-9 flex items-center justify-center bg-[#006064] rounded-full hover:ring-2 hover:ring-brand transition-all ml-1 overflow-hidden"
          title={user?.name || "Profile Settings"}
        >
          {user?.avatar ? (
            <img src={user.avatar} alt={user?.name || "Profile"} className="w-full h-full object-cover" />
          ) : (
            <User size={18} className="text-white" />
          )}
        </Link>
      </div>
      
    </header>
  )
}
