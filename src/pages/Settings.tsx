import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  User, Moon, Sun, Globe, Bell, 
  Volume2, Shield, Sparkles,
  Camera, ArrowLeft
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { useTranslation } from '../i18n'
import { LANGUAGE_OPTIONS } from '../i18n/types'
import type { LanguageCode } from '../i18n/types'
import { CustomSelect } from '../components/ui/CustomSelect'
import { Logo } from '../components/ui/Logo'

export const Settings: React.FC = () => {
  const navigate = useNavigate()
  const { 
    user, theme, language, difficulty, 
    notificationsEnabled, soundEffectsEnabled,
    setTheme, setLanguage, setDifficulty,
    setNotificationsEnabled, setSoundEffectsEnabled,
    setUser
  } = useStore()
  const { t } = useTranslation()

  const [isEditing, setIsEditing] = React.useState(false)
  const [editForm, setEditForm] = React.useState({
    name: user?.name || '',
    email: user?.email || ''
  })

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name: editForm.name,
        email: editForm.email
      })
    }
    setIsEditing(false)
  }

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && user) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUser({
          ...user,
          avatar: reader.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-3xl mx-auto space-y-12 pb-32">
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl hover:scale-105 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 transition-all text-slate-600 dark:text-white/80 flex items-center justify-center shadow-sm shrink-0"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
            {t('settings.title')} <span className="text-primary">{t('settings.titleHighlight')}</span>
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm md:text-base">{t('settings.subtitle')}</p>
        </div>
      </div>

      {/* 1. User Profile Section */}
      <section className="space-y-4">
        <h2 className="text-sm font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2 px-2">
          <User size={16} /> {t('settings.userProfile')}
        </h2>
        <div className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div className="relative group">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-primary/20" 
            />
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
              accept="image/*" 
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 bg-primary text-bg-dark rounded-full shadow-lg scale-90 hover:scale-100 transition-transform"
            >
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1 text-center sm:text-left space-y-2">
            {isEditing ? (
              <div className="space-y-2">
                <input 
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-primary transition-all"
                  placeholder="Name"
                />
                <input 
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white outline-none focus:border-primary transition-all"
                  placeholder="Email"
                />
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.name}</h3>
                <p className="text-slate-500 dark:text-gray-400">{user?.email}</p>
              </>
            )}
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
               <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">{t('common.level')} {user?.level} {t('settings.scholar')}</span>
               <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-white/10">{user?.xp} {t('settings.xpTotal')}</span>
            </div>
          </div>
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-primary text-bg-dark font-bold rounded-xl hover:scale-105 transition-all text-sm"
              >
                {t('common.save') || 'Save'}
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-slate-100 dark:bg-white/5 text-slate-500 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm border border-slate-200 dark:border-white/10"
              >
                {t('common.cancel') || 'Cancel'}
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm border border-slate-200 dark:border-white/10"
            >
              {t('settings.editProfile')}
            </button>
          )}
        </div>
      </section>

      {/* 2. App Preferences */}
      <section className="space-y-4">
        <h2 className="text-sm font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2 px-2">
          <Globe size={16} /> {t('settings.appPreferences')}
        </h2>
        <div className="bg-white dark:bg-white/5 rounded-3xl divide-y divide-slate-100 dark:divide-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
          {/* Theme */}
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold">{t('settings.displayMode')}</p>
                <p className="text-slate-500 text-xs">{t('settings.displayModeDesc')}</p>
              </div>
            </div>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${theme === 'dark' ? 'bg-primary' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${theme === 'dark' ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>

          {/* Language */}
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                <Globe size={20} />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-bold">{t('settings.language')}</p>
                <p className="text-gray-500 text-xs">{t('settings.languageDesc')}</p>
              </div>
            </div>
            <CustomSelect 
              value={language}
              onChange={(val) => setLanguage(val as LanguageCode)}
              options={LANGUAGE_OPTIONS.map(lang => ({
                value: lang.code,
                label: `${lang.native} (${lang.name})`
              }))}
              className="min-w-[200px]"
            />
          </div>

          {/* Notifications */}
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                <Bell size={20} />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-bold">{t('settings.notifications')}</p>
                <p className="text-gray-500 text-xs">{t('settings.notificationsDesc')}</p>
              </div>
            </div>
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${notificationsEnabled ? 'bg-primary' : 'bg-slate-200 dark:bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${notificationsEnabled ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Learning Preferences */}
      <section className="space-y-4">
        <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 px-2">
          <Sparkles size={16} /> {t('settings.learningPreferences')}
        </h2>
        <div className="glass rounded-3xl divide-y divide-gray-200 dark:divide-white/5">
          {/* Difficulty */}
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-bold">{t('settings.difficultyLevel')}</p>
                <p className="text-gray-500 text-xs">{t('settings.difficultyDesc')}</p>
              </div>
            </div>
            <div className="flex bg-slate-50 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-inner">
              {(['Beginner', 'Intermediate', 'Advanced'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${difficulty === d ? 'bg-primary text-bg-dark shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Effects */}
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-500/10 text-green-400 rounded-lg">
                <Volume2 size={20} />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-bold">{t('settings.soundEffects')}</p>
                <p className="text-gray-500 text-xs">{t('settings.soundEffectsDesc')}</p>
              </div>
            </div>
            <button 
              onClick={() => setSoundEffectsEnabled(!soundEffectsEnabled)}
              className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${soundEffectsEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${soundEffectsEnabled ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>
      </section>

      {/* 4. About Section */}
      <section className="space-y-4 text-center">
        <div className="bg-white dark:bg-white/5 p-8 rounded-[40px] border border-slate-200 dark:border-white/10 space-y-4 shadow-sm flex flex-col items-center justify-center">
          <Logo variant="full" size={80} />
          <div>
            <p className="text-primary font-black text-xs uppercase tracking-widest mt-2">Version 2.4.0 (Aurelion)</p>
          </div>
          <div className="pt-4 flex justify-center gap-6">
            <button className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">{t('settings.privacyPolicy')}</button>
            <button className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">{t('settings.termsOfService')}</button>
            <button className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">{t('settings.support')}</button>
          </div>
        </div>
      </section>

    </div>
  )
}
