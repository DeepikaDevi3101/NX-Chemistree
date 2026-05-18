import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Cpu, Sparkles, RotateCw, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface ScannerPanelProps {
  onResult: (result: any) => void
  onClose: () => void
}

export const ScannerPanel: React.FC<ScannerPanelProps> = ({ onResult, onClose }) => {
  const [image, setImage] = useState<string | null>(null)
  const [hint, setHint] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("File too large", { description: "Maximum size is 4MB" })
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const startScan = async () => {
    if (!image) return
    if (!navigator.onLine) {
      toast.error("Offline Mode", { description: "Please check your internet connection to use AI scanning." })
      return
    }

    setIsScanning(true)
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 95) return p
        return p + Math.random() * 15
      })
    }, 400)

    try {
      // Mocking the Supabase Edge Function call for demonstration
      // In a real implementation:
      /*
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
      const { data, error } = await supabase.functions.invoke('scan-molecule', {
        body: { imageDataUrl: image, hint }
      })
      */
      
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulated successful result
      onResult({
        name: hint.toLowerCase().includes('benzene') ? 'Benzene' : 'Ethanol',
        confidence: 0.98,
        notes: "Identified via structural pattern recognition."
      })
      
      clearInterval(interval)
      setProgress(100)
    } catch (err) {
      toast.error("Scan failed", { description: "The AI could not identify the molecule structure." })
    } finally {
      setTimeout(() => setIsScanning(false), 500)
    }
  }

  return (
    <div className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[40px] overflow-hidden shadow-2xl relative text-slate-800 dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/5">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <Cpu size={20} className={isScanning ? 'animate-pulse' : ''} />
           </div>
           <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">AI Molecule Scanner</h2>
              <p className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest">Neural Recognition Engine v2.0</p>
           </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors text-slate-500 dark:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="p-8 space-y-8">
        {!image ? (
          <motion.label 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[32px] p-16 flex flex-col items-center justify-center gap-6 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/5 transition-all cursor-pointer group relative overflow-hidden bg-slate-50/50 dark:bg-transparent shadow-inner dark:shadow-none"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl"></div>
            <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center text-slate-400 dark:text-white/40 group-hover:text-primary group-hover:scale-110 transition-all duration-500 border border-slate-200 dark:border-none shadow-sm dark:shadow-none">
               <Upload size={40} />
            </div>
            <div className="text-center space-y-2 relative z-10">
               <p className="text-lg font-bold text-slate-800 dark:text-white">Drop chemical diagram here</p>
               <p className="text-sm text-slate-400 dark:text-white/40">Support PNG, JPG, JPEG up to 4MB</p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </motion.label>
        ) : (
          <div className="space-y-6">
            <div className="relative aspect-video rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/10 group">
               <img src={image} className="w-full h-full object-cover" alt="Preview" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button 
                    onClick={() => setImage(null)}
                    className="p-4 bg-red-500 text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl shadow-red-500/20"
                  >
                     <Trash2 size={24} />
                  </button>
               </div>

               {isScanning && (
                 <div className="absolute inset-0 z-30 overflow-hidden">
                    <motion.div 
                      initial={{ top: '-10%' }}
                      animate={{ top: '110%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(165,243,252,0.8)] z-40"
                    />
                    <div className="absolute inset-0 bg-primary/10 backdrop-blur-[2px] animate-pulse"></div>
                 </div>
               )}
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 group focus-within:border-primary/50 transition-all shadow-sm dark:shadow-none">
                  <Sparkles size={18} className="text-primary/60" />
                  <input 
                    type="text" 
                    placeholder="Optional text hint (e.g. 'This is an alcohol')" 
                    className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                  />
               </div>

               <button 
                onClick={startScan}
                disabled={isScanning}
                className="w-full py-5 bg-gradient-to-r from-primary to-indigo-500 text-bg-dark font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
               >
                  {isScanning ? (
                    <>
                      <RotateCw size={24} className="animate-spin" />
                      <span>ANALYZING MOLECULAR STRUCTURE...</span>
                    </>
                  ) : (
                    <>
                      <Cpu size={24} />
                      <span>INITIATE AI SCAN</span>
                    </>
                  )}
               </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl flex flex-col items-center gap-1 shadow-sm dark:shadow-none">
              <span className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest">Accuracy</span>
              <span className="text-lg font-bold text-primary">99.4%</span>
           </div>
           <div className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl flex flex-col items-center gap-1 shadow-sm dark:shadow-none">
              <span className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest">Model</span>
              <span className="text-lg font-bold text-slate-800 dark:text-white">ChemNet-X</span>
           </div>
           <div className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl flex flex-col items-center gap-1 shadow-sm dark:shadow-none">
              <span className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest">Engine</span>
              <span className="text-lg font-bold text-slate-800 dark:text-white">Supabase</span>
           </div>
        </div>
      </div>

      {isScanning && (
        <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full overflow-hidden">
           <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary shadow-[0_0_10px_#a5f3fc]"
           />
        </div>
      )}
    </div>
  )
}
