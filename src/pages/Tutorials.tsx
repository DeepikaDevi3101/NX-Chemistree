import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
   Search, Play, Clock, 
   Sparkles, X, ChevronRight, Bookmark, ArrowLeft
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { TUTORIALS } from '../data/tutorials'
import type { Tutorial } from '../data/tutorials'
import { useTranslation } from '../i18n'

export const Tutorials: React.FC = () => {
  const navigate = useNavigate()
  const { watchHistory, savedTutorials, toggleSaveTutorial, updateTutorialProgress } = useStore()
  const { t } = useTranslation()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeVideo, setActiveVideo] = useState<Tutorial | null>(null)
  const [videoFinished, setVideoFinished] = useState(false)

  React.useEffect(() => {
    if (!activeVideo) {
      setVideoFinished(false)
      return
    }

    let player: any = null

    const initPlayer = () => {
      const videoId = activeVideo.videoUrl.split('/').pop()?.split('?')[0] || ''

      player = new (window as any).YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onStateChange: (event: any) => {
            // event.data === 0 means YT.PlayerState.ENDED
            if (event.data === 0) {
              setVideoFinished(true)
            }
          }
        }
      })
    }

    if (!(window as any).YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      ;(window as any).onYouTubeIframeAPIReady = () => {
        initPlayer()
      }
    } else {
      const timer = setTimeout(() => {
        initPlayer()
      }, 100)
      return () => clearTimeout(timer)
    }

    return () => {
      if (player && typeof player.destroy === 'function') {
        player.destroy()
      }
    }
  }, [activeVideo])

  const categories = ['All', 'Organic', 'Inorganic', 'Physical', 'Lab Skills']

  // Filtered Tutorials
  const filteredTutorials = useMemo(() => {
    return TUTORIALS.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Recommendations (Simple: logic based on saved or history)
  const recommendations = useMemo(() => {
    return TUTORIALS.filter(t => !watchHistory.find(h => h.tutorialId === t.id && h.progress > 80)).slice(0, 3)
  }, [watchHistory])

  const getProgress = (id: string) => watchHistory.find(h => h.tutorialId === id)?.progress || 0

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-12 pb-32">
      
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
              {t('tutorials.title')} <span className="text-primary">{t('tutorials.titleHighlight')}</span>
            </h1>
            <p className="text-slate-600 dark:text-gray-400 text-sm md:text-base">{t('tutorials.subtitle')}</p>
          </div>
        </div>

        <div className="relative group max-w-md w-full">
          <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/20 rounded-2xl flex items-center px-4 py-3 focus-within:border-primary/50 transition-all shadow-sm">
            <Search className="text-slate-400 dark:text-gray-400 mr-3" size={20} />
            <input 
              type="text" 
              placeholder={t('tutorials.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-slate-900 dark:text-white w-full placeholder:text-slate-400 dark:placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Categories & Filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-6 py-2 rounded-full border transition-all whitespace-nowrap font-bold text-sm
              ${selectedCategory === cat 
                ? 'bg-primary border-primary text-bg-dark shadow-md' 
                : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-primary/50 dark:hover:border-white/30 shadow-sm'}
            `}
          >
            {cat === 'All' ? t('tutorials.all') : 
             cat === 'Organic' ? t('tutorials.organic') :
             cat === 'Inorganic' ? t('tutorials.inorganic') :
             cat === 'Physical' ? t('tutorials.physical') :
             cat === 'Lab Skills' ? t('tutorials.labSkills') : cat}
          </button>
        ))}
      </div>

      {/* Recommendations Section */}
      {!searchQuery && selectedCategory === 'All' && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-primary" size={24} />
            {t('tutorials.recommended')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map(tData => (
              <TutorialCard 
                key={tData.id} 
                tutorial={tData} 
                progress={getProgress(tData.id)}
                isSaved={savedTutorials.includes(tData.id)}
                onWatch={() => setActiveVideo(tData)}
                onSave={() => toggleSaveTutorial(tData.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Library Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {selectedCategory === 'All' ? t('tutorials.all') : 
           selectedCategory === 'Organic' ? t('tutorials.organic') :
           selectedCategory === 'Inorganic' ? t('tutorials.inorganic') :
           selectedCategory === 'Physical' ? t('tutorials.physical') :
           selectedCategory === 'Lab Skills' ? t('tutorials.labSkills') : selectedCategory} {t('nav.tutorial')}s
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTutorials.map(tData => (
            <TutorialCard 
              key={tData.id} 
              tutorial={tData} 
              progress={getProgress(tData.id)}
              isSaved={savedTutorials.includes(tData.id)}
              onWatch={() => setActiveVideo(tData)}
              onSave={() => toggleSaveTutorial(tData.id)}
            />
          ))}
        </div>
      </section>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 dark:bg-bg-dark/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-white/20 overflow-y-auto max-h-[90vh] shadow-2xl relative scrollbar-thin">
            
            {/* Sticky Header with Back Button */}
            <div className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between z-30 rounded-t-[40px]">
              <button 
                onClick={() => {
                  updateTutorialProgress(activeVideo.id, 100)
                  setActiveVideo(null)
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <ChevronRight size={18} className="rotate-180" />
                Back to Library
              </button>
              <span className="text-slate-500 dark:text-gray-400 text-xs font-black uppercase tracking-widest hidden sm:inline max-w-[50%] truncate">
                Now Playing: {activeVideo.title}
              </span>
              <button 
                onClick={() => {
                  updateTutorialProgress(activeVideo.id, 100)
                  setActiveVideo(null)
                }}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:bg-red-500 hover:text-white transition-all hover:scale-105"
              >
                <X size={18} />
              </button>
            </div>

            <div className="aspect-video relative bg-black overflow-hidden">
              <div id="youtube-player" className="w-full h-full"></div>
              
              {videoFinished && (
                <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 space-y-6 animate-in fade-in zoom-in-95 duration-500 z-10">
                  <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center border border-primary/30 shadow-[0_0_30px_rgba(0,229,255,0.4)] animate-bounce">
                    <Sparkles size={36} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                      🎉 Tutorial Completed!
                    </h3>
                    <p className="text-slate-400 max-w-md text-sm md:text-base leading-relaxed">
                      Amazing job! You have fully completed the video: <span className="text-primary font-bold">"{activeVideo.title}"</span>. You are ready to choose another topic!
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      updateTutorialProgress(activeVideo.id, 100)
                      setActiveVideo(null)
                    }}
                    className="px-8 py-3 bg-primary text-bg-dark font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center gap-2"
                  >
                    <ChevronRight size={20} className="rotate-180" />
                    Back to Library
                  </button>
                </div>
              )}

              <button 
                onClick={() => {
                  updateTutorialProgress(activeVideo.id, 100)
                  setActiveVideo(null)
                }}
                className="absolute top-6 right-6 w-12 h-12 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 dark:hover:bg-black/40 transition-all z-20 border border-white/20"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 md:p-12 space-y-4">
               <div className="flex items-center gap-2">
                 <span className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest">{activeVideo.category}</span>
                 <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest">{activeVideo.difficulty}</span>
               </div>
               <h2 className="text-3xl font-black text-slate-900 dark:text-white">{activeVideo.title}</h2>
               <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">{activeVideo.description}</p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      updateTutorialProgress(activeVideo.id, 100)
                      setActiveVideo(null)
                    }}
                    className="px-8 py-3 bg-primary rounded-2xl text-bg-dark font-black hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                  >
                    <ChevronRight size={20} className="rotate-180" />
                    Back to Tutorials
                  </button>
                  <button 
                    onClick={() => toggleSaveTutorial(activeVideo.id)}
                    className={`px-8 py-3 rounded-2xl font-black flex items-center gap-2 transition-all hover:scale-105 ${savedTutorials.includes(activeVideo.id) ? 'bg-secondary text-white' : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white'}`}
                  >
                    <Bookmark size={20} fill={savedTutorials.includes(activeVideo.id) ? 'currentColor' : 'none'} />
                    {savedTutorials.includes(activeVideo.id) ? t('tutorials.saved') : t('tutorials.saveForLater')}
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

interface TutorialCardProps {
  tutorial: Tutorial
  progress: number
  isSaved: boolean
  onWatch: () => void
  onSave: () => void
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial, progress, isSaved, onWatch, onSave }) => {
  return (
    <div className="group bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 overflow-hidden hover:border-primary/50 dark:hover:border-white/30 transition-all flex flex-col h-full relative shadow-sm hover:shadow-md">
      
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden shrink-0">
        <img 
          src={tutorial.thumbnail} 
          alt={tutorial.title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
        
        {/* Play Overlay */}
        <button 
          onClick={onWatch}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-bg-dark shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-90 group-hover:scale-100 transition-transform">
            <Play size={24} fill="currentColor" />
          </div>
        </button>

        {/* Badge Overlay */}
        <div className="absolute top-3 left-3 flex gap-2">
           <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-white flex items-center gap-1">
             <Clock size={10} /> {tutorial.duration}
           </span>
        </div>

        {/* Save Toggle */}
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onSave()
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-md flex items-center justify-center transition-all ${isSaved ? 'text-secondary bg-secondary/20' : 'text-white opacity-0 group-hover:opacity-100'}`}
        >
          <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">{tutorial.category}</span>
          <h3 className="text-slate-900 dark:text-white font-bold group-hover:text-primary transition-colors line-clamp-2">{tutorial.title}</h3>
          <p className="text-slate-500 dark:text-gray-500 text-xs mt-2 line-clamp-2">{tutorial.description}</p>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5">
          <span className={`text-[10px] font-bold uppercase ${tutorial.difficulty === 'Beginner' ? 'text-green-600 dark:text-green-400' : tutorial.difficulty === 'Intermediate' ? 'text-yellow-600 dark:text-yellow-400' : 'text-purple-600 dark:text-purple-400'}`}>
            {tutorial.difficulty}
          </span>
          <button 
            onClick={onWatch}
            className="text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            Watch Now <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
