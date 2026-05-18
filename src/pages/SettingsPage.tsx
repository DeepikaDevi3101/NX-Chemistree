// HOW TO USE SETTINGS IN ANY COMPONENT:
// import { useAppSettings } from '@/context/AppSettingsContext'
// const { theme, language, difficulty, soundEffects } = useAppSettings()
// These values update globally when changed in Settings.

import { useState } from 'react';
import { 
  Moon, Sun, Globe, Bell, Volume2, 
  User, Save, X, Camera,
  ChevronLeft, Shield, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSettings } from '../context/AppSettingsContext';
import { Logo } from '../components/ui/Logo';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { 
    theme, setTheme,
    language, setLanguage,
    notifications, setNotifications,
    difficulty, setDifficulty,
    soundEffects, setSoundEffects,
    userProfile, setUserProfile
  } = useAppSettings();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ ...userProfile });

  const handleSaveProfile = () => {
    setUserProfile(editForm);
    setIsEditingProfile(false);
  };

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: (val: boolean) => void }) => (
    <button 
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${enabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${enabled ? 'left-7' : 'left-1'}`}></div>
    </button>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0f1e]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-black uppercase tracking-tight">Settings</h1>
      </header>

      <div className="max-w-[430px] mx-auto p-4 space-y-6 pb-20">
        
        {/* SECTION 1 — USER PROFILE */}
        <section className="bg-slate-50 dark:bg-white/5 rounded-[24px] p-6 border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
          <h2 className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <User size={14} /> User Profile
          </h2>
          
          {!isEditingProfile ? (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30 relative overflow-hidden">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-black text-primary">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera size={20} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">{userProfile.name}</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">{userProfile.email}</p>
              </div>
              <button 
                onClick={() => setIsEditingProfile(true)}
                className="px-6 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl font-bold text-sm hover:bg-primary/20 transition-all"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest px-1">Name</label>
                <input 
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary/50 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest px-1">Email</label>
                <input 
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary/50 transition-all"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={handleSaveProfile}
                  className="flex-1 bg-primary text-bg-dark font-black py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Save
                </button>
                <button 
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 bg-slate-200 dark:bg-white/10 font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <X size={18} /> Cancel
                </button>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 2 — APP PREFERENCES */}
        <section className="bg-slate-50 dark:bg-white/5 rounded-[24px] p-6 border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
          <h2 className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <Globe size={14} /> App Preferences
          </h2>
          
          <div className="space-y-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                  {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div>
                  <p className="font-bold text-sm">Dark Mode</p>
                  <p className="text-[10px] text-slate-500 dark:text-gray-500">Enable deep space theme</p>
                </div>
              </div>
              <Toggle enabled={theme === 'dark'} onChange={(val: boolean) => setTheme(val ? 'dark' : 'light')} />
            </div>

            {/* Language Selector */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">App Language</p>
                </div>
              </div>
              <div className="flex bg-white dark:bg-black/20 p-1 rounded-xl border border-slate-200 dark:border-white/10">
                {['English', 'Tamil', 'Hindi'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${language === lang ? 'bg-primary text-bg-dark shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                  <Bell size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Push Notifications</p>
                  <p className="text-[10px] text-slate-500 dark:text-gray-500">Alerts for new lessons</p>
                </div>
              </div>
              <Toggle enabled={notifications} onChange={setNotifications} />
            </div>
          </div>
        </section>

        {/* SECTION 3 — LEARNING PREFERENCES */}
        <section className="bg-slate-50 dark:bg-white/5 rounded-[24px] p-6 border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
          <h2 className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={14} /> Learning Preferences
          </h2>

          <div className="space-y-6">
            {/* Difficulty Selector */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Target Difficulty</p>
                </div>
              </div>
              <div className="flex bg-white dark:bg-black/20 p-1 rounded-xl border border-slate-200 dark:border-white/10">
                {['Beginner', 'Intermediate', 'Advanced'].map(d => (
                  <button 
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${difficulty === d ? 'bg-primary text-bg-dark shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Sound Effects */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                  <Volume2 size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Sound Effects</p>
                  <p className="text-[10px] text-slate-500 dark:text-gray-500">Interactive UI sounds</p>
                </div>
              </div>
              <Toggle enabled={soundEffects} onChange={setSoundEffects} />
            </div>
          </div>
        </section>

        {/* SECTION 4 — ABOUT */}
        <section className="bg-slate-50 dark:bg-white/5 rounded-[24px] p-8 border border-slate-200 dark:border-white/10 text-center space-y-6 shadow-sm flex flex-col items-center justify-center">
          <Logo variant="full" size={80} />
          <div>
            <p className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest mt-2">Version v1.0.0</p>
          </div>
          <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed max-w-[300px] mx-auto">
            An AI-powered chemistry learning platform designed for students, educators, and researchers. Learn chemistry interactively with AI assistance, simulations, and multilingual support.
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <a href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Privacy Policy</a>
            <a href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Terms of Use</a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SettingsPage;
