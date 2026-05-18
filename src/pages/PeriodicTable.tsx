import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon, X, Beaker, ArrowLeft } from 'lucide-react'
import { ELEMENTS } from '../data/elements'
import type { ChemistryElement } from '../data/elements'
import { ElementModal } from '../components/ui/ElementModal'
import { useTranslation } from '../i18n'

const CATEGORY_BG: Record<string, string> = {
  'alkali-metal': '#f87171', // Reddish
  'alkaline-earth-metal': '#fb923c', // Orange
  'transition-metal': '#3b82f6', // Blue
  'post-transition-metal': '#22d3ee', // Cyan
  'metalloid': '#14b8a6', // Teal
  'polyatomic-nonmetal': '#22c55e', // Green
  'diatomic-nonmetal': '#16a34a', // Dark Green
  'nonmetal': '#22c55e', // Green
  'halogen': '#facc15', // Yellow
  'noble-gas': '#6366f1', // Indigo
  'lanthanide': '#a855f7', // Purple
  'actinide': '#ec4899', // Pink
}

const LEGEND_KEYS = [
  { key: 'periodicTablePage.alkaliMetal', category: 'alkali-metal' },
  { key: 'periodicTablePage.alkalineEarth', category: 'alkaline-earth-metal' },
  { key: 'periodicTablePage.transitionMetal', category: 'transition-metal' },
  { key: 'periodicTablePage.postTransition', category: 'post-transition-metal' },
  { key: 'periodicTablePage.metalloid', category: 'metalloid' },
  { key: 'periodicTablePage.nonmetal', category: 'nonmetal' },
  { key: 'periodicTablePage.halogen', category: 'halogen' },
  { key: 'periodicTablePage.nobleGas', category: 'noble-gas' },
  { key: 'periodicTablePage.lanthanide', category: 'lanthanide' },
  { key: 'periodicTablePage.actinide', category: 'actinide' },
]

const TABLE_LAYOUT: (number | null)[][] = [
  [1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,2],
  [3,4,null,null,null,null,null,null,null,null,null,null,5,6,7,8,9,10],
  [11,12,null,null,null,null,null,null,null,null,null,null,13,14,15,16,17,18],
  [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
  [37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54],
  [55,56,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86],
  [87,88,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118],
]

const LANTHANIDES = [57,58,59,60,61,62,63,64,65,66,67,68,69,70]
const ACTINIDES = [89,90,91,92,93,94,95,96,97,98,99,100,101,102]

export const PeriodicTable: React.FC = () => {
  const navigate = useNavigate()
  const [selectedElement, setSelectedElement] = useState<ChemistryElement | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<ChemistryElement[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { t } = useTranslation()
  const searchRef = useRef<HTMLDivElement>(null)

  const elementMap = new Map<number, ChemistryElement>()
  ELEMENTS.forEach(el => elementMap.set(el.atomicNumber, el))

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = ELEMENTS.filter(el => 
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.atomicNumber.toString().includes(searchQuery)
      ).slice(0, 8)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectElement = (el: ChemistryElement) => {
    setSelectedElement(el)
    setSearchQuery('')
    setShowSuggestions(false)
  }

  const renderCell = (atomicNumber: number | null) => {
    if (atomicNumber === null) return <div key={Math.random()} className="aspect-square" />
    const el = elementMap.get(atomicNumber)
    if (!el) return <div key={`missing-${atomicNumber}`} className="aspect-square rounded bg-gray-800/20" />

    const bg = CATEGORY_BG[el.category] || '#6b7280'
    return (
      <button
        key={el.atomicNumber}
        onClick={() => setSelectedElement(el)}
        className="aspect-square rounded-md flex flex-col items-center justify-center p-0.5 transition-all duration-300 transform hover:scale-115 hover:z-20 hover:shadow-xl hover:shadow-black/50 focus:outline-none focus:ring-2 focus:ring-white/40 group relative cursor-pointer border border-white/5"
        style={{ backgroundColor: bg }}
        title={`${el.atomicNumber}. ${el.name}`}
      >
        <span className="absolute top-[2px] left-[3px] text-[7px] sm:text-[9px] font-black text-white/50 leading-none group-hover:text-white transition-colors">
          {el.atomicNumber}
        </span>
        <span className="text-sm sm:text-xl font-black text-white drop-shadow-md leading-none mb-0.5">
          {el.symbol}
        </span>
        <span className="hidden sm:block text-[6px] md:text-[7px] font-bold text-white/70 truncate w-full text-center leading-none mt-0.5 px-0.5">
          {el.name}
        </span>
      </button>
    )
  }

  return (
    <div className="min-h-full p-4 md:p-8 flex flex-col items-center max-w-7xl mx-auto">
      {/* Header & Search */}
      <div className="w-full mb-8 space-y-6">
        <div className="relative flex flex-col items-center justify-center">
          <button
            onClick={() => navigate('/')}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="text-center space-y-1">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-3">
              <Beaker className="text-blue-500" size={32} />
              {t('periodicTablePage.title')}
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">{t('periodicTablePage.subtitle')}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto w-full" ref={searchRef}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-12 py-3 bg-white dark:bg-gray-800/50 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white dark:focus:bg-gray-800 transition-all shadow-lg backdrop-blur-sm text-base"
              placeholder={t('periodicTablePage.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-[60] w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {suggestions.map((el) => (
                  <button
                    key={el.atomicNumber}
                    onClick={() => handleSelectElement(el)}
                    className="w-full px-5 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-white/5 last:border-0 group"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-white text-sm"
                        style={{ backgroundColor: CATEGORY_BG[el.category] || '#6b7280' }}
                      >
                        {el.symbol}
                      </div>
                      <div className="text-left">
                        <div className="text-slate-900 dark:text-white font-bold group-hover:text-brand transition-colors">{el.name}</div>
                        <div className="text-xs text-slate-500 dark:text-gray-500 capitalize">{el.category.replace(/-/g, ' ')}</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-slate-400 dark:text-gray-400">#{el.atomicNumber}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-4xl">
        {LEGEND_KEYS.map((item) => (
          <div key={item.category} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm shadow-sm dark:shadow-none">
            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: CATEGORY_BG[item.category] }} />
            <span className="text-[10px] font-bold text-slate-600 dark:text-gray-300">{t(item.key)}</span>
          </div>
        ))}
      </div>

      {/* Periodic Table Grid Container */}
      <div className="w-full overflow-x-auto custom-scrollbar pb-10">
        <div className="min-w-[1000px] px-4">
          {/* Main Grid */}
          <div className="grid gap-[4px]" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
            {TABLE_LAYOUT.map((row, ri) =>
              row.map((atomicNum, ci) => (
                <React.Fragment key={`${ri}-${ci}`}>
                  {renderCell(atomicNum)}
                </React.Fragment>
              ))
            )}
          </div>

          <div className="h-6" />

          {/* Lanthanides & Actinides */}
          <div className="space-y-[4px]">
            <div className="grid gap-[4px] ml-[calc((100%/18)*2+8px)]" style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))', maxWidth: 'calc((100%/18)*14)' }}>
              {LANTHANIDES.map(n => renderCell(n))}
            </div>
            <div className="grid gap-[4px] ml-[calc((100%/18)*2+8px)]" style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))', maxWidth: 'calc((100%/18)*14)' }}>
              {ACTINIDES.map(n => renderCell(n))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedElement && (
        <ElementModal
          element={selectedElement}
          onClose={() => setSelectedElement(null)}
        />
      )}
    </div>
  )
}
