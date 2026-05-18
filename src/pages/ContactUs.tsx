import React, { useState } from 'react'
import { 
  Mail, Phone, Send, MessageSquare, 
  User, AtSign, Camera, Users
} from 'lucide-react'
import { useTranslation } from '../i18n'

export const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useTranslation()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto space-y-12 pb-32">
      
      {/* 1. Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white">
          {t('contact.title')} <span className="text-primary">{t('contact.titleHighlight')}</span>
        </h1>
        <p className="text-slate-500 dark:text-gray-400 text-lg max-w-md mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Form */}
        <div className="space-y-8">
           <div className="bg-white dark:bg-white/5 p-8 rounded-[40px] border border-slate-200 dark:border-white/10 relative overflow-hidden group shadow-sm">
             <div className="absolute top-0 right-0 p-8 text-primary/5 -mr-8 -mt-8 group-hover:text-primary/10 transition-colors">
               <MessageSquare size={160} />
             </div>

             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>
             
             {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
                   <div className="w-20 h-20 bg-green-500/10 dark:bg-green-500/20 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mx-auto border-2 border-green-500/20 dark:border-green-500/30">
                     <Send size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('contact.sent')}</h3>
                   <p className="text-slate-500 dark:text-gray-400 text-sm">{t('contact.sentDesc')}</p>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest px-2">{t('contact.name')}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" size={18} />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all shadow-sm"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest px-2">{t('contact.email')}</label>
                    <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500" size={18} />
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all shadow-sm"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest px-2">{t('contact.message')}</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-slate-900 dark:text-white min-h-[150px] focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all resize-none shadow-sm"
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary text-bg-dark font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send size={20} />
                  </button>
                </form>
             )}
           </div>


        </div>

        {/* Right Column: Support Info & Socials */}
        <div className="space-y-8">
            <div className="bg-white dark:bg-white/5 p-8 rounded-[40px] border border-slate-200 dark:border-white/10 shadow-sm space-y-10">
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('contact.getInTouch')}</h2>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-6 group">
                     <div className="p-4 bg-primary/10 text-primary rounded-[20px] border border-primary/20 group-hover:scale-110 transition-transform">
                       <Mail size={24} />
                     </div>
                     <div>
                       <p className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest">{t('contact.emailUs')}</p>
                       <a href="mailto:support@nxchemistree.com" className="text-xl font-bold text-slate-900 dark:text-white hover:text-primary transition-colors">support@nxchemistree.com</a>
                     </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                     <div className="p-4 bg-secondary/10 text-secondary rounded-[20px] border border-secondary/20 group-hover:scale-110 transition-transform">
                       <Phone size={24} />
                     </div>
                     <div>
                       <p className="text-[10px] font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest">{t('contact.phone')}</p>
                       <a href="tel:+910000000000" className="text-xl font-bold text-slate-900 dark:text-white hover:text-secondary transition-colors">+91 XXXXX XXXXX</a>
                     </div>
                  </div>
               </div>

               <div className="pt-8 border-t border-slate-100 dark:border-white/5 space-y-6">
                  <h3 className="text-sm font-black text-slate-500 dark:text-gray-500 uppercase tracking-widest">{t('contact.followUs')}</h3>
                   <div className="flex gap-4">
                      {/* Twitter / X */}
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-slate-600 dark:text-white hover:bg-black hover:text-white transition-all shadow-sm group">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                      {/* Instagram */}
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-slate-600 dark:text-white hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white transition-all shadow-sm">
                        <Camera size={24} />
                      </a>
                      {/* LinkedIn */}
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-slate-600 dark:text-white hover:bg-[#0077b5] hover:text-white transition-all shadow-sm">
                        <Users size={24} />
                      </a>
                   </div>
               </div>
            </div>

            {/* Location/Office Card (Bonus) */}
            <div className="bg-white dark:bg-white/5 p-8 rounded-[40px] border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-sm">
               <div className="relative z-10 space-y-4">
                  <h3 className="text-slate-900 dark:text-white font-bold italic">Innovation Hub</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
                    Tech Park, Level 4, Block C<br />
                    Innovation District, Chennai<br />
                    India - 600001
                  </p>
               </div>
               {/* Abstract decorative element */}
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
        </div>

      </div>

    </div>
  )
}
