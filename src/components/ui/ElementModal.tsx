import React from 'react'
import { X, Info, Beaker, Layers } from 'lucide-react'
import type { ChemistryElement } from '../../data/elements'
import { useTranslation } from '../../i18n'

interface ElementModalProps {
  element: ChemistryElement
  onClose: () => void
}

const CATEGORY_COLORS = {
  metal: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
  'non-metal': 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30',
  metalloid: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/30',
}

const CATEGORY_ACCENT = {
  metal: 'text-blue-500',
  'non-metal': 'text-green-500',
  metalloid: 'text-orange-500',
}

export const ElementModal: React.FC<ElementModalProps> = ({ element, onClose }) => {
  const { t } = useTranslation()
  const mainCat = element.mainCategory
  const colorScheme = CATEGORY_COLORS[mainCat]
  const accentColor = CATEGORY_ACCENT[mainCat]

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-white dark:bg-gray-900/90 sm:rounded-2xl rounded-t-[2.5rem] overflow-hidden shadow-2xl relative border-t sm:border border-slate-200 dark:border-white/10 animate-in slide-in-from-bottom duration-500 max-h-[90vh] flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className={`p-8 pb-6 flex justify-between items-start relative overflow-hidden`}>
          {/* Background Accent */}
          <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] -mr-20 -mt-20 opacity-30 ${mainCat === 'metal' ? 'bg-blue-500' : mainCat === 'non-metal' ? 'bg-green-500' : 'bg-orange-500'}`} />
          
          <div className="flex items-center gap-6 relative z-10">
            <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center bg-white dark:bg-white/5 border border-slate-200 dark:border-white/20 shadow-xl relative`}>
              <span className="text-sm font-black text-slate-400 dark:text-white/50 absolute top-1.5 left-2.5">{element.atomicNumber}</span>
              <span className="text-5xl font-black text-slate-900 dark:text-white drop-shadow-2xl">{element.symbol}</span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-white/60 absolute bottom-1.5 px-2 truncate w-full text-center">{element.atomicMass}</span>
            </div>
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-none mb-1">{element.name}</h2>
              <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colorScheme}`}>
                {element.category.replace(/-/g, ' ')}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 pt-0 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] text-slate-400 dark:text-white/40 uppercase tracking-widest mb-1">{t('periodicTablePage.group')}</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">{element.group || 'N/A'}</span>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] text-slate-400 dark:text-white/40 uppercase tracking-widest mb-1">{t('periodicTablePage.period')}</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">{element.period}</span>
            </div>
            <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] text-slate-400 dark:text-white/40 uppercase tracking-widest mb-1">{t('periodicTablePage.physicalState')}</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white capitalize">{element.physicalState}</span>
            </div>
          </div>

          {/* Details Sections */}
          <div className="space-y-6">
            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-white/5 ${accentColor}`}>
                  <Layers size={18} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{t('periodicTablePage.electronConfig')}</h3>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-inner">
                <code className="text-slate-700 dark:text-white font-mono text-xl tracking-wider">{element.electronConfig}</code>
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-white/5 ${accentColor}`}>
                  <Beaker size={18} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{t('periodicTablePage.commonUses')}</h3>
              </div>
              <div className="space-y-2">
                {element.uses.split(',').map((use, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 group-hover:scale-125 transition-transform ${mainCat === 'metal' ? 'bg-blue-500' : mainCat === 'non-metal' ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">{use.trim()}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-white/5 ${accentColor}`}>
                  <Info size={18} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{t('periodicTablePage.interestingFact')}</h3>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-white/[0.02] rounded-xl border-l-4 border-l-current" style={{ borderLeftColor: mainCat === 'metal' ? '#3b82f6' : mainCat === 'non-metal' ? '#22c55e' : '#f97316' }}>
                <p className="text-slate-600 dark:text-gray-200 leading-relaxed italic text-base">"{element.funFact}"</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
