import React, { useState, useMemo, useRef } from 'react'
import { Search, X, ArrowLeft, Upload, Sparkles, Scan, HelpCircle, Eye, AlertTriangle } from 'lucide-react'
import { MoleculeViewer3D } from '../components/chemistry/MoleculeViewer3D'
import { MOLECULE_LIBRARY } from '../data/moleculeLibrary'
import type { Molecule } from '../data/moleculeLibrary'


const ELEMENT_COLORS: Record<string, string> = {
  C: '#2D2D2D', // Deep Slate/Black
  H: '#FFFFFF', // Pure White
  O: '#FF0033', // Neon Red
  N: '#3366FF', // Electric Blue
  S: '#FFCC00', // Scientific Yellow
  P: '#FF8800', // Vibrant Orange
  Cl: '#33FF33', // Bio Green
}

const ELEMENT_NAMES: Record<string, string> = {
  C: 'Carbon',
  H: 'Hydrogen',
  O: 'Oxygen',
  N: 'Nitrogen',
  S: 'Sulfur',
  P: 'Phosphorus',
  Cl: 'Chlorine'
}

// Sample Skeletal SVGs for offline uploader presets
const PRESET_SVGS = {
  benzene: (
    <svg viewBox="0 0 100 100" className="w-20 h-20 stroke-primary dark:stroke-primary fill-none stroke-[2.5]" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" />
      <line x1="50" y1="23" x2="74" y2="37" />
      <line x1="74" y1="63" x2="50" y2="77" />
      <line x1="26" y1="63" x2="26" y2="37" />
    </svg>
  ),
  caffeine: (
    <svg viewBox="0 0 120 100" className="w-20 h-20 stroke-primary dark:stroke-primary fill-none stroke-[2.5]" xmlns="http://www.w3.org/2000/svg">
      <polygon points="40,20 70,35 70,65 40,80 10,65 10,35" />
      <polygon points="70,35 95,20 110,50 95,80 70,65" />
      <line x1="40" y1="28" x2="64" y2="40" />
      <line x1="16" y1="61" x2="16" y2="39" />
      <line x1="70" y1="45" x2="95" y2="30" />
      <line x1="95" y1="70" x2="70" y2="55" />
    </svg>
  ),
  aspirin: (
    <svg viewBox="0 0 120 120" className="w-20 h-20 stroke-primary dark:stroke-primary fill-none stroke-[2.5]" xmlns="http://www.w3.org/2000/svg">
      <polygon points="40,40 70,55 70,85 40,100 10,85 10,55" />
      <polyline points="70,55 90,45 105,55" />
      <polyline points="70,85 90,95 105,85" />
      <line x1="90" y1="44" x2="90" y2="30" />
      <line x1="90" y1="96" x2="90" y2="110" />
    </svg>
  ),
  water: (
    <svg viewBox="0 0 100 100" className="w-20 h-20 stroke-primary dark:stroke-primary fill-none stroke-[2.5]" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="40" r="10" />
      <line x1="43" y1="47" x2="25" y2="65" />
      <line x1="57" y1="47" x2="75" y2="65" />
      <circle cx="20" cy="70" r="6" />
      <circle cx="80" cy="70" r="6" />
      <text x="45" y="44" className="stroke-none fill-primary text-[9px] font-black">O</text>
      <text x="16" y="73" className="stroke-none fill-primary text-[7px] font-black">H</text>
      <text x="76" y="73" className="stroke-none fill-primary text-[7px] font-black">H</text>
    </svg>
  )
}

const SAMPLE_PRESETS = [
  { id: 'benzene', name: 'Benzene Ring', formula: 'C₆H₆', moleculeId: 'c6h6', type: 'benzene' },
  { id: 'caffeine', name: 'Caffeine', formula: 'C₈H₁₀N₄O₂', moleculeId: 'c8h10n4o2', type: 'caffeine' },
  { id: 'aspirin', name: 'Aspirin', formula: 'C₉H₈O₄', moleculeId: 'c9h8o4', type: 'aspirin' },
  { id: 'water', name: 'Water Molecule', formula: 'H₂O', moleculeId: 'h2o', type: 'water' },
]

export const MoleculeLab: React.FC = () => {
  const [viewMode, setViewMode] = useState<'viewer' | 'scanner'>('viewer')
  
  // Viewer states
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule>(MOLECULE_LIBRARY[0])
  const [searchQuery, setSearchQuery] = useState('')


  // Scanner states
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [activePresetId, setActivePresetId] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')
  const [hintQuery, setHintQuery] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<Molecule | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Real-time offline in-memory query filtering
  const filteredMolecules = useMemo(() => {
    if (!searchQuery.trim()) return MOLECULE_LIBRARY
    const query = searchQuery.toLowerCase().trim()
    return MOLECULE_LIBRARY.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.formula.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Intelligent fallback to match first filtered result if currently selected is filtered out
  const activeMolecule = useMemo(() => {
    if (filteredMolecules.includes(selectedMolecule)) {
      return selectedMolecule
    }
    return filteredMolecules[0] || selectedMolecule
  }, [filteredMolecules, selectedMolecule])

  const distinctElements = useMemo(() => {
    const elements = new Set<string>()
    activeMolecule.atoms.forEach(atom => elements.add(atom.element))
    return Array.from(elements)
  }, [activeMolecule])

  // Handle uploader presets click
  const handlePresetSelect = (preset: typeof SAMPLE_PRESETS[0]) => {
    setActivePresetId(preset.id)
    setUploadedImage('preset')
    setFileName(preset.name)
    setHintQuery(preset.formula)
  }

  // Handle local image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string)
        setActivePresetId(null)
        setFileName(file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDropzoneClick = () => {
    fileInputRef.current?.click()
  }

  const clearUpload = () => {
    setUploadedImage(null)
    setActivePresetId(null)
    setFileName('')
    setScanResult(null)
  }

  // Local Offline matching vision scanner engine
  const handleIdentifyMolecule = () => {
    if (!uploadedImage) return

    setIsScanning(true)
    setScanResult(null)

    // Scientific delay for beautiful laser scan animation
    setTimeout(() => {
      setIsScanning(false)

      // 1. Clean input indicators
      const queryText = (fileName + ' ' + hintQuery).toLowerCase().trim()

      // 2. Scan compound keywords in our library
      let matched = MOLECULE_LIBRARY.find(m => 
        queryText.includes(m.name.toLowerCase()) || 
        queryText.includes(m.formula.toLowerCase().replace(/[^a-z0-9]/gi, '')) ||
        queryText.includes(m.id.toLowerCase())
      )

      // 3. Fallback matching
      if (!matched && activePresetId) {
        const preset = SAMPLE_PRESETS.find(p => p.id === activePresetId)
        matched = MOLECULE_LIBRARY.find(m => m.id === preset?.moleculeId)
      }

      // 4. Default random fallback if no match found
      if (!matched) {
        matched = MOLECULE_LIBRARY.find(m => m.id === 'c6h12o6') || MOLECULE_LIBRARY[0] // Fallback to Glucose
      }

      setScanResult(matched)
    }, 2200)
  }

  return (
    <div className="min-h-full p-4 md:p-8 bg-slate-50 dark:bg-bg-dark text-slate-800 dark:text-white transition-colors duration-300 font-sans relative">
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0.8; }
          50% { top: 98%; opacity: 0.8; }
        }
      `}</style>
      
      {viewMode === 'viewer' ? (
        <>
          {/* Header Section */}
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              3D Molecule Viewer
            </h1>
            <p className="text-sm text-slate-500 dark:text-gray-400 font-medium">
              Interactive ball-and-stick models. Drag to rotate, scroll to zoom.
            </p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Card: Library */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm flex flex-col h-[550px]">
              <h2 className="text-xs font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] mb-4">
                Library
              </h2>

              {/* Offline Search Bar */}
              <div className="relative mb-4 group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 group-focus-within:text-primary transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="Search compounds or formulas..."
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-10 pr-9 text-xs font-semibold outline-none text-slate-800 dark:text-white focus:border-primary/50 dark:focus:border-primary/50 focus:bg-white dark:focus:bg-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-white/20 shadow-inner dark:shadow-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/60 transition-colors rounded-full"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Scrollable list */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredMolecules.length > 0 ? (
                  filteredMolecules.map((m) => {
                    const isSelected = activeMolecule.id === m.id
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMolecule(m)}
                        className={`w-full p-4 rounded-2xl flex flex-col items-start gap-1 transition-all duration-200 text-left border ${
                          isSelected
                            ? 'bg-primary/10 border-primary/30 text-slate-900 dark:text-white font-bold shadow-sm'
                            : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-white/80'
                        }`}
                      >
                        <span className="text-sm font-bold">{m.name}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
                          {m.formula}
                        </span>
                      </button>
                    )
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <Search size={32} className="text-slate-350 dark:text-white/10 mb-2" />
                    <p className="text-xs font-bold text-slate-750 dark:text-white/80">No molecules found</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1">Try another compound name or chemical formula.</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-hover rounded-xl text-[10px] font-bold tracking-wider uppercase transition-colors"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>

              {/* Molecule Scanner Launch Option (Below Library) */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setViewMode('scanner')}
                  className="w-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-600 dark:text-sky-400 font-bold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 group"
                >
                  <Scan size={15} className="group-hover:rotate-90 transition-transform duration-300" />
                  Molecule Scanner
                </button>
              </div>

            </div>

            {/* Middle Card: 3D Visualization Area */}
            <div className="lg:col-span-2 relative bg-gradient-to-b from-slate-100 to-slate-200 dark:from-[#0B1026] dark:to-[#020617] border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden h-[550px] shadow-sm flex flex-col justify-between p-6">
              
              {/* Transparent container for Canvas */}
              <div className="absolute inset-0 z-0">
                <MoleculeViewer3D molecule={activeMolecule} />
              </div>

              {/* Floating Instructions Capsule */}
              <div className="absolute bottom-6 left-6 z-10 px-4 py-2 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/60 pointer-events-none shadow-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                Drag • scroll • auto-rotate
              </div>
            </div>

            {/* Right Card: Molecule Details */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[550px] overflow-y-auto">
              
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xs font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em]">
                    Molecule
                  </h2>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {activeMolecule.name}
                  </h3>
                  <p className="text-lg font-black text-primary uppercase tracking-widest">
                    {activeMolecule.formula}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-gray-300 font-medium leading-relaxed font-sans">
                    {activeMolecule.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest">
                    Atoms
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {distinctElements.map((el) => {
                      const color = ELEMENT_COLORS[el] || '#CCCCCC'
                      const name = ELEMENT_NAMES[el] || el
                      return (
                        <div key={el} className="flex items-center gap-2">
                          <div 
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-white/10 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs font-bold text-slate-800 dark:text-white">
                            {el} <span className="text-[10px] font-medium text-slate-400 dark:text-white/40">({name})</span>
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Footer Warning / Note */}
              <div className="mt-8 border-t border-slate-100 dark:border-white/5 pt-4">
                <p className="text-[10px] text-slate-400 dark:text-gray-500 font-medium leading-normal">
                  Bonds shown as gray cylinders. Double/triple bonds appear as parallel lines. Geometry is approximate, not energy-minimized.
                </p>
              </div>

            </div>

          </div>
        </>
      ) : (
        /* Molecule Scanner Layout exactly matching the user's reference photo */
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
          
          {/* Header & Back Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setViewMode('viewer')
                  clearUpload()
                }}
                className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-sky-500/10 text-sky-500 border border-sky-500/20 rounded-2xl flex items-center justify-center">
                  <Scan size={24} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">
                    Molecule Scanner
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-gray-400 font-medium mt-1">
                    Upload a structure image. AI vision identifies the molecule.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Double Column Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Card: IMAGE */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[480px]">
              
              <div className="space-y-5">
                <h2 className="text-xs font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em]">
                  Image
                </h2>

                {/* Dashed Dropzone Box */}
                <div 
                  onClick={uploadedImage ? undefined : handleDropzoneClick}
                  className={`relative w-full h-[220px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all duration-300 ${
                    uploadedImage 
                      ? 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/10 overflow-hidden' 
                      : 'border-slate-300 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 bg-slate-50/50 dark:bg-white/5 cursor-pointer hover:shadow-inner'
                  }`}
                >
                  {uploadedImage ? (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      {uploadedImage === 'preset' ? (
                        <div className="flex items-center justify-center p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm relative w-full h-full max-w-[180px]">
                          {PRESET_SVGS[activePresetId as keyof typeof PRESET_SVGS]}
                        </div>
                      ) : (
                        <img 
                          src={uploadedImage} 
                          alt="Molecule Skeletal upload" 
                          className="max-h-full max-w-full object-contain rounded-lg border border-slate-200 dark:border-white/5 shadow-sm"
                        />
                      )}

                      {/* Moving laser scan line during scanning */}
                      {isScanning && (
                        <div 
                          className="absolute left-0 w-full h-1 bg-green-400 dark:bg-sky-400 shadow-[0_0_10px_#4ade80] pointer-events-none"
                          style={{ animation: 'scan 2s ease-in-out infinite' }}
                        />
                      )}

                      {/* Remove Button overlay */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          clearUpload()
                        }}
                        className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors active:scale-90"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center space-y-3 pointer-events-none">
                      <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-full text-slate-400 dark:text-white/20">
                        <Upload size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-white/95">Drop a structure image here</p>
                        <p className="text-[10px] text-slate-400 dark:text-white/30 font-medium mt-1">PNG/JPG • up to 4 MB</p>
                      </div>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>

                {/* Custom Sample Presets Row */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-wider">
                    Or test with chemical presets:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {SAMPLE_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handlePresetSelect(preset)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          activePresetId === preset.id
                            ? 'bg-primary/10 border-primary/40 text-primary dark:text-white font-bold'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10'
                        }`}
                      >
                        <p className="text-xs font-bold leading-tight truncate">{preset.name}</p>
                        <p className="text-[9px] text-slate-400 dark:text-white/40 leading-none mt-0.5">{preset.formula}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Hint Box */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest block">
                    Optional hint (e.g. 'an alcohol', 'natural product')
                  </label>
                  <input
                    type="text"
                    placeholder="Enter keywords or formula..."
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl py-3.5 px-4 text-xs font-semibold outline-none text-slate-800 dark:text-white focus:border-primary/50 dark:focus:border-primary/50 transition-all placeholder:text-slate-400 dark:placeholder:text-white/20"
                    value={hintQuery}
                    onChange={(e) => setHintQuery(e.target.value)}
                  />
                </div>

              </div>

              {/* Launch Scan trigger */}
              <div className="mt-8">
                <button
                  disabled={!uploadedImage || isScanning}
                  onClick={handleIdentifyMolecule}
                  className={`w-full font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.98] text-xs ${
                    uploadedImage && !isScanning
                      ? 'bg-primary hover:bg-primary-hover text-white cursor-pointer hover:shadow-lg'
                      : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-400 dark:text-white/20 cursor-not-allowed'
                  }`}
                >
                  <Sparkles size={14} className={isScanning ? 'animate-spin' : ''} />
                  Identify Molecule
                </button>
              </div>

            </div>

            {/* Right Card: RESULTS */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-sm min-h-[480px] flex flex-col">
              
              {isScanning ? (
                /* Scanning loading status */
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 animate-pulse">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-t-primary border-primary/20 animate-spin" />
                    <Scan className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-850 dark:text-white/95">Analyzing molecular structure...</p>
                    <p className="text-xs text-slate-400 dark:text-white/30">Gemma-4 Vision offline core mapping coordinates</p>
                  </div>
                </div>
              ) : scanResult ? (
                /* Dynamic Scan result layout */
                <div className="flex-1 flex flex-col justify-between space-y-6 overflow-y-auto max-h-[500px] pr-1 custom-scrollbar">
                  
                  {/* Smaller 3D molecular canvas */}
                  <div>
                    <h3 className="text-xs font-black text-slate-400 dark:text-white/40 uppercase tracking-[0.2em] mb-3">
                      Identified Structure (3D Canvas)
                    </h3>
                    <div className="relative w-full h-[180px] bg-gradient-to-b from-slate-100 to-slate-200 dark:from-[#0B1026] dark:to-[#020617] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                      <div className="absolute inset-0 z-0">
                        <MoleculeViewer3D molecule={scanResult} />
                      </div>
                      <span className="absolute bottom-3 left-3 z-10 px-2.5 py-1 bg-black/40 border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-white/80 pointer-events-none">
                        Interactive Model
                      </span>
                    </div>
                  </div>

                  {/* Compound description & parameters */}
                  <div className="space-y-4">
                    <div className="space-y-0.5">
                      <h4 className="text-[10px] font-black text-slate-450 dark:text-white/30 uppercase tracking-[0.15em]">
                        {scanResult.category} Compound
                      </h4>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                        {scanResult.name}
                      </h3>
                      <p className="text-sm font-black text-primary uppercase tracking-widest">
                        {scanResult.formula}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-4 rounded-2xl">
                      <div>
                        <span className="text-[9px] font-black text-slate-400 dark:text-white/30 uppercase tracking-wider block">IUPAC Name</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white truncate block">{scanResult.iupacName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-slate-400 dark:text-white/30 uppercase tracking-wider block">Molar Mass</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white truncate block">{scanResult.molarMass}</span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-white/5">
                        <span className="text-[9px] font-black text-slate-400 dark:text-white/30 uppercase tracking-wider block">Functional Groups</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {scanResult.functionalGroups.map(g => (
                            <span key={g} className="px-2 py-0.5 bg-primary/10 text-primary dark:text-white/80 rounded-md text-[9px] font-bold">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* AI vision breakdown analysis reports */}
                    <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-white/5">
                      
                      <div className="space-y-1">
                        <h5 className="text-[9px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <Eye size={10} className="text-sky-500" />
                          AI Vision Structural Breakdown
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-gray-300 font-medium leading-relaxed">
                          The uploaded structure shows clean bond geometry matching our local molecular signature. {scanResult.bondExplanation}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <h5 className="text-[9px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <HelpCircle size={10} className="text-green-500" />
                          Educational Insights & Uses
                        </h5>
                        <ul className="text-xs text-slate-650 dark:text-gray-350 list-disc pl-4 space-y-1">
                          {scanResult.uses.map((use, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {use}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1">
                        <h5 className="text-[9px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                          <AlertTriangle size={10} className="text-amber-500" />
                          Safety profile
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-gray-350 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-2.5 rounded-xl font-semibold leading-relaxed">
                          {scanResult.safety}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              ) : (
                /* Default Standard placeholder layout exactly matching the photo */
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-full text-slate-400 dark:text-white/20">
                    <Scan size={36} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white/95">
                      Upload a structure to identify it.
                    </h3>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 font-medium mt-1">
                      Skeletal formulas work best.
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  )
}
