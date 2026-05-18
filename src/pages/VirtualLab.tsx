import React, { useState } from 'react'
import { FlaskConical, Play, AlertTriangle, ShieldAlert, Sparkles, BookOpen } from 'lucide-react'
import { simulateReaction } from '../lib/mockReactionApi'
import type { ReactionResult } from '../lib/mockReactionApi'
import { CHEMICAL_CATALOG } from '../data/reactions'
import { MoleculeVisualizer } from '../components/ui/MoleculeVisualizer'
import { useStore } from '../store/useStore'
import { CustomSelect } from '../components/ui/CustomSelect'
import { useTranslation } from '../i18n'

export const VirtualLab: React.FC = () => {
  const { addExperiment } = useStore()
  const { t } = useTranslation()
  const [chem1, setChem1] = useState('')
  const [chem2, setChem2] = useState('')
  const [isReacting, setIsReacting] = useState(false)
  const [result, setResult] = useState<ReactionResult | null>(null)

  const handleReact = async () => {
    if (!chem1 || !chem2) return
    setIsReacting(true)
    setResult(null)

    const reactionResult = await simulateReaction(chem1, chem2)
    setResult(reactionResult)
    setIsReacting(false)

    if (reactionResult.is_valid && reactionResult.equation) {
      addExperiment({
        id: Date.now().toString(),
        chem1,
        chem2,
        equation: reactionResult.equation,
        timestamp: Date.now(),
        xpGained: 50 // Standard XP for a valid reaction
      })
    }
  }

  // Determine animation classes based on state and effects
  let beakerClasses = "relative w-48 h-64 border-4 border-slate-200 dark:border-white/20 rounded-b-3xl border-t-0 mx-auto flex items-end justify-center overflow-hidden transition-all duration-1000 bg-white dark:bg-white/5 backdrop-blur-md shadow-inner"
  let fluidClasses = "w-full transition-all duration-[2000ms] ease-in-out absolute bottom-0 left-0"
  
  if (isReacting) {
    // Default mixing animation
    fluidClasses += " h-[80%] bg-brand/50"
    beakerClasses += " animate-shake"
  } else if (result?.is_valid) {
    // Post-reaction state
    fluidClasses += " h-[70%]"
    if (result.effects?.includes('color_change')) fluidClasses += " bg-purple-500/60"
    else fluidClasses += " bg-cyan-500/30"
  } else {
    // Idle state
    fluidClasses += " h-[40%] bg-blue-500/20"
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 pb-32">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <FlaskConical className="text-brand" size={32} />
          {t('virtualLab.title')} <span className="text-primary">{t('virtualLab.titleHighlight')}</span>
        </h1>
        <p className="text-slate-500 dark:text-gray-400">{t('virtualLab.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Workspace Zone */}
        <div className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center min-h-[400px] shadow-sm">
          {/* Beaker Graphic */}
          <div className={beakerClasses}>
            
            {/* Fluid */}
            <div className={fluidClasses}></div>

            {/* Effects */}
            {(isReacting || (result && result.effects?.includes('bubbling'))) && (
              <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
                <div className="w-4 h-4 bg-white/40 rounded-full absolute bottom-10 left-10 animate-bubble-1"></div>
                <div className="w-3 h-3 bg-white/40 rounded-full absolute bottom-10 left-20 animate-bubble-2"></div>
                <div className="w-5 h-5 bg-white/40 rounded-full absolute bottom-10 right-12 animate-bubble-3"></div>
              </div>
            )}

            {result?.effects?.includes('precipitate') && !isReacting && (
              <div className="absolute bottom-0 left-0 w-full h-8 bg-white/40 backdrop-blur-md rounded-b-2xl z-0 transition-opacity duration-1000"></div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none rounded-b-2xl"></div>
          </div>
        </div>

        {/* Controls & Results Zone */}
        <div className="space-y-6">
          
          {/* Control Panel */}
          <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('virtualLab.reactants')}</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 dark:text-gray-400 mb-1">{t('virtualLab.chemical1')}</label>
                <CustomSelect 
                  value={chem1}
                  onChange={(val) => setChem1(val)}
                  options={CHEMICAL_CATALOG.map(c => ({ value: c.id, label: `${c.name} (${c.formula})` }))}
                  placeholder={t('virtualLab.selectChemical')}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-400 dark:text-gray-400 mb-1">{t('virtualLab.chemical2')}</label>
                <CustomSelect 
                  value={chem2}
                  onChange={(val) => setChem2(val)}
                  options={CHEMICAL_CATALOG.map(c => ({ value: c.id, label: `${c.name} (${c.formula})` }))}
                  placeholder={t('virtualLab.selectChemical')}
                />
              </div>
            </div>

            <button 
              onClick={handleReact}
              disabled={!chem1 || !chem2 || isReacting}
              className={`
                w-full mt-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                ${(!chem1 || !chem2 || isReacting) 
                  ? 'bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-gray-500 cursor-not-allowed border border-slate-200 dark:border-white/5' 
                  : 'bg-brand text-white hover:bg-brand/90 hover:shadow-[0_0_20px_rgba(21,101,192,0.5)] shadow-md active:scale-95'
                }
              `}
            >
              <Play size={20} />
              {isReacting ? t('virtualLab.simulating') : t('virtualLab.react')}
            </button>
          </div>

          {/* Results Panel */}
          {result && (
            <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-primary" />
                {t('virtualLab.reactionResults')}
              </h2>

              {!result.is_valid ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-red-400">
                  <AlertTriangle className="shrink-0" />
                  <p>{result.explanation}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Warnings */}
                  {result.warnings && result.warnings.length > 0 && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-yellow-500 font-bold">
                        <ShieldAlert size={18} />
                        <h3>{t('virtualLab.safetyWarnings')}</h3>
                      </div>
                      <ul className="list-disc list-inside text-sm text-yellow-200/80">
                        {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
                      </ul>
                    </div>
                  )}

                  {/* Equation */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 dark:text-gray-400 uppercase tracking-wider mb-2">{t('virtualLab.balancedEquation')}</h3>
                    <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 text-center">
                      <code className="text-lg md:text-xl font-mono font-bold text-slate-900 dark:text-white tracking-wider">
                        {result.equation}
                      </code>
                    </div>
                  </div>

                  {/* Properties */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-none">
                      <span className="block text-[10px] text-slate-400 dark:text-gray-400 uppercase">{t('virtualLab.reactionType')}</span>
                      <span className="font-semibold text-primary">{result.type}</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-none">
                      <span className="block text-[10px] text-slate-400 dark:text-gray-400 uppercase">{t('virtualLab.thermodynamics')}</span>
                      <span className="font-semibold text-secondary capitalize">{result.heat}</span>
                    </div>
                  </div>

                  {/* Molecular Visualization */}
                  <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                    {result.products?.map((p, i) => {
                      const chem = CHEMICAL_CATALOG.find(c => c.name === p)
                      return chem ? (
                        <div key={i} className="flex flex-col items-center bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5 min-w-[120px] shadow-sm">
                          <MoleculeVisualizer formula={chem.formula} className="w-20 h-20 mb-2" />
                          <span className="text-[10px] text-slate-500 dark:text-gray-300 text-center font-medium">{chem.name}</span>
                        </div>
                      ) : null
                    })}
                  </div>

                  {/* Explanation */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 dark:text-gray-400 uppercase tracking-wider mb-2">{t('virtualLab.aiExplanation')}</h3>
                    <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm">
                      {result.explanation}
                    </p>
                  </div>

                  {/* Socratic Follow-up */}
                  {result.follow_up && result.follow_up.length > 0 && (
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <h3 className="text-xs font-bold text-brand uppercase tracking-wider flex items-center gap-2">
                        <BookOpen size={14} />
                        {t('virtualLab.furtherExploration')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.follow_up.map((q, i) => (
                          <button key={i} className="text-left text-xs text-slate-700 dark:text-white/80 bg-slate-100 dark:bg-brand/20 hover:bg-slate-200 dark:hover:bg-brand/40 border border-slate-200 dark:border-brand/30 px-3 py-2 rounded-lg transition-colors shadow-sm">
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
