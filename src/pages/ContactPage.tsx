import React from 'react';
import { 
  User, Mail, Phone, Clock, 
  AlertCircle, CheckCircle2, ChevronDown,
  MessageSquare, Share2, Camera, Users, MessageCircle, Play
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useContactForm } from '../hooks/useContactForm';
import { useStore } from '../store/useStore';

const ContactPage: React.FC = () => {
  const theme = useStore((state) => state.theme);
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NX Chemistree',
          text: 'Check out NX Chemistree - The ultimate AI Chemistry learning platform!',
          url: window.location.origin,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copied to clipboard!');
    }
  };
  
  const {
    formData,
    errors,
    status,
    charCount,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useContactForm();

  // Floating background symbols data
  const symbols = ['⚛', '⚗', '🧪', 'H₂O', 'CO₂', 'CH₄', 'O₂', 'NH₃', 'C₆H₁₂O₆', 'NaCl'];

  const getCharCountColor = () => {
    if (charCount > 480) return 'text-red-500';
    if (charCount > 400) return 'text-amber-500';
    return 'text-emerald-400';
  };

  const getBorderClass = (field: keyof typeof formData) => {
    if (!touched[field]) return 'border-white/10';
    if (errors[field]) return 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]';
    if (formData[field]) return 'border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]';
    return 'border-white/10';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-slate-50 text-slate-900'} overflow-hidden relative selection:bg-cyan-500/30 pb-20`}>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.15; }
          80% { opacity: 0.15; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        .animate-float {
          animation: float 15s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes bannerShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-banner {
          background: linear-gradient(270deg, #0a0f1e, #0d1f3c, #0a2a1f, #0a0f1e);
          background-size: 600% 600%;
          animation: bannerShift 6s ease infinite;
        }
        /* CSS Checkmark Animation */
        .checkmark-wrapper { width: 100px; height: 100px; margin: 0 auto 24px; position: relative; }
        .checkmark-circle { stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 2; stroke-miterlimit: 10; stroke: #10b981; fill: none; animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
        .checkmark { width: 100px; height: 100px; border-radius: 50%; display: block; stroke-width: 2; stroke: #fff; stroke-miterlimit: 10; box-shadow: inset 0px 0px 0px #10b981; animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both; }
        .checkmark-check { transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; }
        @keyframes stroke { 100% { stroke-dashoffset: 0; } }
        @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
        @keyframes fill { 100% { box-shadow: inset 0px 0px 0px 50px #10b981; } }
      `}</style>

      {/* Floating Background Symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {symbols.map((symbol, i) => (
          <div 
            key={i}
            className={`absolute text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-300'} opacity-0 animate-float`}
            style={{ 
              left: `${(i * 15) % 100}%`, 
              bottom: '-50px',
              animationDelay: `${i * 2}s`,
              animationDuration: `${12 + (i % 5)}s`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-black mb-4 fade-in bg-gradient-to-r from-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent tracking-tighter">
          Get In Touch
        </h1>
        <p className={`text-xl ${theme === 'dark' ? 'text-[#8892a4]' : 'text-slate-600'} max-w-2xl mx-auto fade-in`} style={{ animationDelay: '0.2s' }}>
          Have a question about NX Chemistree? <br className="hidden sm:block" />
          We're here to help you learn better 🧪
        </p>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-12 relative z-10 mb-20">
        
        {/* Left: Contact Form */}
        <div className="lg:col-span-6">
          <div className={`${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'} backdrop-blur-[20px] border rounded-[20px] p-8 md:p-10 relative`}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <div key="success" className="text-center py-10">
                  <div className="checkmark-wrapper">
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                      <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                      <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-black mb-4">Thank you, {formData.name}! 🎉</h2>
                  <p className="text-[#8892a4] mb-2">Your message has been saved successfully.</p>
                  <p className="text-[#8892a4] mb-10">We'll get back to you at <span className="text-cyan-400">{formData.email}</span> soon.</p>
                  <button 
                    onClick={resetForm}
                    className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-2 mx-auto"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="relative group">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${touched.name && !errors.name ? 'text-emerald-400' : 'text-[#8892a4] group-focus-within:text-cyan-400'}`}>
                      <User size={20} />
                    </div>
                    <input 
                      type="text"
                      placeholder="Your full name"
                      className={`w-full ${theme === 'dark' ? 'bg-black/20 text-white' : 'bg-slate-50 text-slate-900'} border ${getBorderClass('name')} rounded-xl py-4 pl-12 pr-12 outline-none transition-all placeholder:text-[#4a5568]`}
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      aria-label="Full Name"
                      aria-describedby="name-error"
                    />
                    {touched.name && !errors.name && formData.name && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400">
                        <CheckCircle2 size={18} />
                      </div>
                    )}
                    {touched.name && errors.name && (
                      <p id="name-error" role="alert" className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="relative group">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${touched.email && !errors.email ? 'text-emerald-400' : 'text-[#8892a4] group-focus-within:text-cyan-400'}`}>
                      <Mail size={20} />
                    </div>
                    <input 
                      type="email"
                      placeholder="your@email.com"
                      className={`w-full ${theme === 'dark' ? 'bg-black/20 text-white' : 'bg-slate-50 text-slate-900'} border ${getBorderClass('email')} rounded-xl py-4 pl-12 pr-12 outline-none transition-all placeholder:text-[#4a5568]`}
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      aria-label="Email Address"
                      aria-describedby="email-error"
                    />
                    {touched.email && !errors.email && formData.email && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400">
                        <CheckCircle2 size={18} />
                      </div>
                    )}
                    {touched.email && errors.email && (
                      <p id="email-error" role="alert" className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject Dropdown */}
                  <div className="relative group">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${touched.subject && !errors.subject ? 'text-emerald-400' : 'text-[#8892a4] group-focus-within:text-cyan-400'}`}>
                      <MessageSquare size={20} />
                    </div>
                    <select 
                      className={`w-full ${theme === 'dark' ? 'bg-black/20' : 'bg-slate-50'} border ${getBorderClass('subject')} rounded-xl py-4 pl-12 pr-12 outline-none transition-all appearance-none cursor-pointer ${!formData.subject ? 'text-[#4a5568]' : (theme === 'dark' ? 'text-white' : 'text-slate-900')}`}
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      onBlur={() => handleBlur('subject')}
                      aria-label="Subject"
                      aria-describedby="subject-error"
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="study">Study Help</option>
                      <option value="partnership">Partnership</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8892a4]">
                      <ChevronDown size={20} />
                    </div>
                    {touched.subject && errors.subject && (
                      <p id="subject-error" role="alert" className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Area */}
                  <div className="relative">
                    <textarea 
                      placeholder="Your message here..."
                      className={`w-full ${theme === 'dark' ? 'bg-black/20 text-white' : 'bg-slate-50 text-slate-900'} border ${getBorderClass('message')} rounded-xl py-4 px-4 outline-none transition-all placeholder:text-[#4a5568] min-h-[150px] resize-y`}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      aria-label="Message"
                      aria-describedby="message-error"
                    />
                    <div className={`absolute bottom-3 right-4 text-[10px] font-black tracking-widest ${getCharCountColor()}`}>
                      {charCount} / 500
                    </div>
                    {touched.message && errors.message && (
                      <p id="message-error" role="alert" className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full h-[52px] rounded-xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 relative overflow-hidden group 
                      ${status === 'loading' ? 'bg-white/10 cursor-not-allowed text-[#8892a4]' : 
                        status === 'error' ? 'bg-red-500 hover:brightness-110' :
                        'bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-black hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    aria-busy={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : status === 'error' ? (
                      <span>Failed. Try Again</span>
                    ) : (
                      <>
                        <span>Send Message 🚀</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Info Cards */}
        <div className="lg:col-span-4 space-y-6">
          {/* Email Card */}
          <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-[20px] p-6 flex items-start gap-5 hover:-translate-y-1 hover:border-cyan-400/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-cyan-400 mb-1">Email Support</p>
              <a href="mailto:support@nxchemistree.com" className="text-xl font-bold hover:text-cyan-400 transition-colors">support@nxchemistree.com</a>
              <p className="text-xs text-[#8892a4] mt-1">We reply within 24 hours</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-[20px] p-6 flex items-start gap-5 hover:-translate-y-1 hover:border-emerald-400/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-emerald-400/20 rounded-full flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-1">Phone Support</p>
              <a href="tel:+919876543210" className="text-xl font-bold hover:text-emerald-400 transition-colors">+91 98765 43210</a>
              <p className="text-xs text-[#8892a4] mt-1">Mon–Sat, 9AM–6PM IST</p>
            </div>
          </div>

          {/* Response Card */}
          <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-[20px] p-6 flex items-start gap-5 hover:-translate-y-1 hover:border-amber-400/50 transition-all duration-300 group">
            <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-amber-400 mb-1">Response Time</p>
              <p className="text-xl font-bold text-white">Within 24 Hours</p>
              <p className="text-xs text-[#8892a4] mt-1">For all inquiries</p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="pt-10 text-center lg:text-left">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#8892a4] mb-6 flex items-center gap-2 justify-center lg:justify-start">
              Follow Our Journey ✨
            </h3>
            <div className="flex justify-center lg:justify-start gap-4">
              {[
                { icon: Camera, color: 'hover:shadow-[0_0_20px_#E1306C] hover:border-[#E1306C]', name: 'Instagram', url: 'https://instagram.com' },
                { icon: Users, color: 'hover:shadow-[0_0_20px_#0077B5] hover:border-[#0077B5]', name: 'LinkedIn', url: 'https://linkedin.com' },
                { icon: MessageCircle, color: 'hover:shadow-[0_0_20px_#1DA1F2] hover:border-[#1DA1F2]', name: 'Twitter', url: 'https://twitter.com' },
                { icon: Play, color: 'hover:shadow-[0_0_20px_#FF0000] hover:border-[#FF0000]', name: 'YouTube', url: 'https://youtube.com' }
              ].map((social, i) => (
                <div key={i} className="relative group/social">
                  <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-14 h-14 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} border rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 ${social.color}`}
                  >
                    <social.icon size={24} />
                  </a>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-black tracking-widest opacity-0 group-hover/social:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-white">
                    {social.name}
                  </div>
                </div>
              ))}
              {/* Share Button */}
              <div className="relative group/social">
                <button 
                  onClick={handleShare}
                  className={`w-14 h-14 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} border rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 hover:shadow-[0_0_20px_#00ff88] hover:border-[#00ff88]`}
                >
                  <Share2 size={24} />
                </button>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-black tracking-widest opacity-0 group-hover/social:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-white">
                  Share
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ContactPage;
