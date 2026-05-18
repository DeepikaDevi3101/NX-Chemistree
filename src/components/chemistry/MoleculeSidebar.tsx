import React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, Scan, History, X, ChevronRight, 
  Database, FlaskRound, Sparkles
} from 'lucide-react'
import type { Molecule } from '../../data/moleculeLibrary'

interface MoleculeSidebarProps {
  isOpen: boolean
  onClose: () => void
  library: Molecule[]
  recent: Molecule[]
  selectedId: string
  onSelect: (m: Molecule) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  onOpenScanner: () => void
}

export const MoleculeSidebar: React.FC<MoleculeSidebarProps> = ({
  isOpen, onClose, library, recent, selectedId, onSelect, searchQuery, onSearchChange, onOpenScanner
}) => {
  return (
    <motion.aside 
      initial={false}
      animate={{ 
        width: isOpen ? 320 : 0,
        x: isOpen ? 0 : -320
      }}
      className="fixed lg:relative z-50 h-full bg-white/90 dark:bg-slate-950/80 backdrop-blur-2xl border-r border-slate-200 dark:border-white/5 flex flex-col overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300"
    >
      <div className="w-[320px] flex flex-col h-full text-slate-800 dark:text-white">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                 <Database size={20} />
              </div>
              <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Library</h2>
           </div>
           <button onClick={onClose} className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-500 dark:text-white">
             <X size={20} />
           </button>
        </div>

        {/* Search & Actions */}
        <div className="p-6 space-y-4">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search compounds..." 
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-medium outline-none text-slate-850 dark:text-white focus:border-primary/50 dark:focus:border-primary/50 focus:bg-white dark:focus:bg-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-white/20 shadow-sm dark:shadow-none"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
           </div>

           <button 
            onClick={onOpenScanner}
            className="w-full py-3 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-slate-700 dark:text-white transition-all hover:border-primary/30 dark:hover:border-primary/30 shadow-sm dark:shadow-none group"
           >
              <Scan size={18} className="text-primary group-hover:scale-110 transition-transform" />
              <span>Analyze via Scanner</span>
           </button>
        </div>

        {/* Recent Section */}
        {recent.length > 0 && (
          <div className="px-6 py-4 space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
              <History size={12} /> Recently Viewed
            </h3>
            <div className="space-y-2">
              {recent.map(m => (
                <button 
                  key={`recent-${m.id}`}
                  onClick={() => onSelect(m)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all text-left ${selectedId === m.id ? 'bg-primary/10 border border-primary/20 text-slate-900 dark:text-white font-bold shadow-sm' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-white/80 border border-transparent'}`}
                >
                  <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-500 dark:text-white/40 border border-slate-300 dark:border-white/5">
                    {m.formula}
                  </div>
                  <span className="text-sm font-bold line-clamp-1">{m.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categories / Full Library */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar">
           <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                <FlaskRound size={12} /> All Molecules
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {library.map(m => (
                  <button 
                    key={m.id}
                    onClick={() => onSelect(m)}
                    className={`group w-full p-4 rounded-2xl flex items-center justify-between transition-all text-left ${selectedId === m.id ? 'bg-gradient-to-r from-primary/20 to-indigo-500/10 border border-primary/20 text-slate-900 dark:text-white' : 'hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-white/80'}`}
                  >
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${selectedId === m.id ? 'bg-primary animate-pulse' : 'bg-slate-300 dark:bg-white/20'}`}></div>
                       <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-white">{m.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">{m.formula}</p>
                       </div>
                    </div>
                    <ChevronRight size={16} className={`transition-transform duration-300 ${selectedId === m.id ? 'translate-x-1 text-primary' : 'text-slate-400 dark:text-white/10 group-hover:text-slate-650 dark:group-hover:text-white/40'}`} />
                  </button>
                ))}
              </div>
           </div>
        </div>

        {/* Footer info */}
        <div className="p-6 mt-auto border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                 <Sparkles size={20} />
              </div>
              <div>
                 <p className="text-xs font-bold text-slate-750 dark:text-white/80">Premium Access</p>
                 <p className="text-[10px] font-medium text-slate-400 dark:text-white/40">Full Molecular DB Unlocked</p>
              </div>
           </div>
        </div>
      </div>
    </motion.aside>
  )
}
