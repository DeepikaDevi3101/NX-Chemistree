import React from 'react'
import { motion } from 'framer-motion'
import { 
  Info, Scale, Zap, 
  MapPin, AlertTriangle, Hexagon, Beaker, Layers
} from 'lucide-react'
import type { Molecule } from '../../data/moleculeLibrary'

interface MoleculeInfoProps {
  molecule: Molecule
  isOpen: boolean
}

const ELEMENT_DATA: Record<string, { color: string, name: string }> = {
  C: { color: 'bg-[#2D2D2D]', name: 'Carbon' },
  H: { color: 'bg-[#FFFFFF]', name: 'Hydrogen' },
  O: { color: 'bg-[#FF0033]', name: 'Oxygen' },
  N: { color: 'bg-[#3366FF]', name: 'Nitrogen' },
  S: { color: 'bg-[#FFCC00]', name: 'Sulfur' },
  P: { color: 'bg-[#FF8800]', name: 'Phosphorus' },
  Cl: { color: 'bg-[#33FF33]', name: 'Chlorine' },
}

export const MoleculeInfo: React.FC<MoleculeInfoProps> = ({ molecule, isOpen }) => {
  const uniqueElements = Array.from(new Set(molecule.atoms.map(a => a.element)))

  return (
    <motion.aside 
      initial={false}
      animate={{ 
        width: isOpen ? 400 : 0,
        opacity: isOpen ? 1 : 0
      }}
      className="hidden lg:flex flex-col h-full bg-white/40 dark:bg-slate-950/40 backdrop-blur-md border-l border-slate-200 dark:border-white/5 overflow-y-auto custom-scrollbar transition-colors duration-300 text-slate-800 dark:text-white"
    >
      <div className="w-[400px] p-8 space-y-10">
        
        {/* Basic ID Card */}
        <div className="space-y-4">
           <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                {molecule.category}
              </span>
              <span className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.2em]">Compound ID: {molecule.id.toUpperCase()}</span>
           </div>
           <div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">{molecule.name}</h2>
              <p className="text-sm font-bold text-primary/70 dark:text-primary/60 italic">{molecule.iupacName}</p>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl space-y-1 shadow-sm dark:shadow-none">
                 <p className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-1.5"><Layers size={10} /> Formula</p>
                 <p className="text-lg font-bold text-slate-800 dark:text-white">{molecule.formula}</p>
              </div>
              <div className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl space-y-1 shadow-sm dark:shadow-none">
                 <p className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-1.5"><Scale size={10} /> Molar Mass</p>
                 <p className="text-lg font-bold text-slate-800 dark:text-white">{molecule.molarMass}</p>
              </div>
           </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
             <Info size={12} /> Scientific Abstract
           </h3>
           <p className="text-sm text-slate-650 dark:text-white/70 leading-relaxed italic">
             "{molecule.description}"
           </p>
        </div>

        {/* Functional Groups */}
        <div className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
             <Beaker size={12} /> Functional Groups
           </h3>
           <div className="flex flex-wrap gap-2">
              {molecule.functionalGroups.map(fg => (
                <span key={fg} className="px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-xs font-bold text-slate-600 dark:text-white/60 shadow-sm dark:shadow-none">
                  {fg}
                </span>
              ))}
           </div>
        </div>

        {/* Bond Analysis */}
        <div className="space-y-4 p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={64} className="text-primary" />
           </div>
           <h3 className="text-[10px] font-black text-indigo-500 dark:text-primary uppercase tracking-[0.2em] flex items-center gap-2 relative z-10">
             <Zap size={12} /> Molecular Geometry
           </h3>
           <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed relative z-10">
             {molecule.bondExplanation}
           </p>
        </div>

        {/* Atom Legend */}
        <div className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
             <Hexagon size={12} /> Atomic Legend
           </h3>
           <div className="grid grid-cols-2 gap-3">
              {uniqueElements.map(el => (
                <div key={el} className="flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors animate-fade-in">
                   <div className={`w-4 h-4 rounded-full ${ELEMENT_DATA[el]?.color || 'bg-gray-500'} shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10`}></div>
                   <span className="text-xs font-bold text-slate-700 dark:text-white/80">{ELEMENT_DATA[el]?.name || el}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Uses & Applications */}
        <div className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
             <MapPin size={12} /> Practical Applications
           </h3>
           <ul className="space-y-3">
              {molecule.uses.map((use, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-slate-650 dark:text-white/60">
                   <div className="w-1 h-1 bg-primary rounded-full mt-1.5 shrink-0"></div>
                   <span>{use}</span>
                </li>
              ))}
           </ul>
        </div>

        {/* Safety Data */}
        <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-3xl space-y-3">
           <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] flex items-center gap-2">
             <AlertTriangle size={12} /> Hazard Assessment
           </h3>
           <p className="text-xs text-red-700 dark:text-red-200/50 leading-relaxed">
             {molecule.safety}
           </p>
        </div>

      </div>
    </motion.aside>
  )
}
