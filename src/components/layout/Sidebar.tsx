import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Settings, MessageSquare, 
  Video, BookOpen, FlaskConical, Mail, Hexagon, X
} from 'lucide-react'
import { useStore } from '../../store/useStore'
import { useTranslation } from '../../i18n'
import { Logo } from '../ui/Logo'

export const Sidebar: React.FC = () => {
  const sidebarExpanded = useStore(state => state.sidebarExpanded)
  const toggleSidebar = useStore(state => state.toggleSidebar)
  const { t } = useTranslation()

  const MAIN_NAV_ITEMS = [
    { name: t('nav.aiTutor'), path: '/ai-tutor', icon: MessageSquare },
    { name: t('nav.tutorial'), path: '/tutorial', icon: Video },
    { name: t('nav.chemistryMaterials'), path: '/lessons', icon: BookOpen },
    { name: t('nav.virtualLab'), path: '/virtual-lab', icon: FlaskConical },
    { name: t('nav.moleculeInsight'), path: '/molecule-insight', icon: Hexagon },
    { name: t('nav.settings'), path: '/settings', icon: Settings },
    { name: t('nav.contactUs'), path: '/contact', icon: Mail },
  ]

  const renderNavLinks = (items: typeof MAIN_NAV_ITEMS) => (
    items.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => {
          if (window.innerWidth < 768) {
            toggleSidebar()
          }
        }}
        className={({ isActive }) => `
          flex items-center rounded min-h-[48px] px-3
          transition-colors duration-150 group cursor-pointer
          ${isActive 
            ? 'bg-primary/10 dark:bg-primary/12 border-l-[3px] border-primary text-primary' 
            : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 border-l-[3px] border-transparent'
          }
        `}
      >
        {({ isActive }) => (
          <>
            <div className={`
              shrink-0 flex items-center justify-center
              ${sidebarExpanded ? 'w-8' : 'w-full'}
              ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,229,255,0.6)] text-primary' : 'group-hover:scale-110 transition-transform duration-150'}
              ${item.path === '/ai-tutor' ? 'animate-pulse-glow' : ''}
            `}>
              <item.icon size={24} strokeWidth={2} />
            </div>
            
            <span className={`
              ml-3 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-sm
              transition-all duration-300
              ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 hidden'}
            `}>
              {item.name}
            </span>
          </>
        )}
      </NavLink>
    ))
  )

  return (
    <>
      {/* Mobile Sidebar Overlay Backdrop */}
      {sidebarExpanded && (
        <div 
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      <aside 
        className={`
          fixed md:relative inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 dark:border-white/10 glass
          transition-all duration-300 ease-in-out h-full
          ${sidebarExpanded 
            ? 'w-[280px] translate-x-0 opacity-100' 
            : 'w-[72px] -translate-x-full opacity-0 pointer-events-none md:translate-x-0 md:opacity-100 md:pointer-events-auto md:w-[72px]'
          }
        `}
      >
        <div className="p-4 h-16 flex items-center justify-between border-b border-slate-200 dark:border-white/10 shrink-0 overflow-hidden">
          <NavLink to="/" className="flex items-center gap-2 select-none">
            {sidebarExpanded ? (
              <Logo variant="horizontal" size={32} className="animate-in fade-in duration-300" />
            ) : (
              <Logo variant="icon" size={32} className="mx-auto w-full flex justify-center animate-in fade-in duration-300" />
            )}
          </NavLink>
          
          {/* Mobile Close Button */}
          {sidebarExpanded && (
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-500 dark:text-gray-400 active:scale-95 transition-transform"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 flex flex-col no-scrollbar">
          <nav className="space-y-2 mb-auto">
            {renderNavLinks(MAIN_NAV_ITEMS)}
          </nav>
        </div>
      </aside>
    </>
  )
}
