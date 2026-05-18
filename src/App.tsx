import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { useStore } from './store/useStore'
import { Dashboard } from './pages/Dashboard'
import { Sidebar } from './components/layout/Sidebar'
import { TopNavigation } from './components/layout/TopNavigation'
import { BottomNavigation } from './components/layout/BottomNavigation'
import { PeriodicTable } from './pages/PeriodicTable'
import { AITutor } from './pages/AITutor'
import { VirtualLab } from './pages/VirtualLab'
import { QuizSelection } from './pages/QuizSelection'
import { QuizActive } from './pages/QuizActive'
import { Tutorials } from './pages/Tutorials'
import { Settings } from './pages/Settings'
// @ts-ignore
import LessonsPage from './pages/LessonsPage'
// @ts-ignore
import ErrorBoundary from './components/ErrorBoundary'
import { GamesSelection } from './pages/GamesSelection'
import { AdventureMode } from './pages/AdventureMode'
import { LessonDetail } from './pages/LessonDetail'
import { WordSearch } from './components/games/WordSearch'
import { FillInBlanks } from './components/games/FillInBlanks'
import { Flashcards } from './components/games/Flashcards'
import { MoleculeLab } from './pages/MoleculeLab'
import ContactPage from './pages/ContactPage'
import MessagesPage from './pages/MessagesPage'

function App() {
  const theme = useStore(state => state.theme)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <Router>
      <div className="h-screen w-full bg-white dark:bg-bg-dark text-gray-900 dark:text-white flex overflow-hidden transition-colors">
        <Toaster position="top-right" theme={theme === 'dark' ? 'dark' : 'light'} />
        <Sidebar />
        
        <div className="flex-1 flex flex-col h-full relative overflow-hidden">
          <TopNavigation />
          
          <main className="flex-1 overflow-y-auto overflow-x-hidden pb-[68px] relative z-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Add future routes here */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/tutorial" element={<Tutorials />} />
              <Route path="/ai-tutor" element={<AITutor />} />
              <Route path="/quiz" element={<QuizSelection />} />
              <Route path="/quiz/active" element={<QuizActive />} />
              <Route path="/games" element={<GamesSelection />} />
              <Route path="/games/flashcards" element={<Flashcards />} />
              <Route path="/games/word-search" element={<WordSearch />} />
              <Route path="/games/fill-blanks" element={<FillInBlanks />} />
              <Route path="/games/adventure" element={<AdventureMode />} />
              <Route path="/lessons" element={
                <ErrorBoundary>
                  <LessonsPage />
                </ErrorBoundary>
              } />
              <Route path="/lessons/:id" element={<LessonDetail />} />
              <Route path="/periodic-table" element={<PeriodicTable />} />
              <Route path="/virtual-lab" element={<VirtualLab />} />
              <Route path="/molecule-insight" element={<MoleculeLab />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin/messages" element={<MessagesPage />} />
            </Routes>
          </main>
          
          <BottomNavigation />
        </div>

      </div>
    </Router>
  )
}

export default App
