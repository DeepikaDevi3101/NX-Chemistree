import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, HelpCircle, Gamepad2, Grid } from 'lucide-react'
import { useTranslation } from '../../i18n'

export const BottomNavigation: React.FC = () => {
  const { t } = useTranslation()

  const BOTTOM_NAV_ITEMS = [
    { name: t('nav.home'), path: '/', icon: Home },
    { name: t('nav.quiz'), path: '/quiz', icon: HelpCircle },
    { name: t('nav.games'), path: '/games', icon: Gamepad2 },
    { name: t('nav.table'), path: '/periodic-table', icon: Grid },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[68px] pb-safe bg-white dark:bg-bg-dark border-t border-slate-100 dark:border-white/10 z-20 flex justify-around items-center px-2 transition-colors">
      {BOTTOM_NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            flex flex-col items-center justify-center flex-1 h-full
            transition-all duration-200
            ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300'}
          `}
        >
          {({ isActive }) => (
            <>
              <div className={`
                flex items-center justify-center w-12 h-8 rounded-full mb-1
                transition-all duration-300
                ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-transparent'}
              `}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-semibold tracking-wide ${isActive ? 'font-bold' : ''}`}>
                {item.name}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
