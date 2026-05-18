import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, Sparkles, MoreHorizontal } from 'lucide-react'
import { useStore } from '../store/useStore'
import type { ChatMessage } from '../store/useStore'
import { simulateGemmaStream } from '../lib/mockGemmaApi'
import { useTranslation } from '../i18n'

export const AITutor: React.FC = () => {
  const { chatHistory, addChatMessage, updateChatMessage } = useStore()
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      status: navigator.onLine ? 'sent' : 'pending',
      timestamp: Date.now()
    }

    addChatMessage(userMessage)
    setInputValue('')
    
    if (!navigator.onLine) {
      // Offline fallback
      return
    }

    setIsTyping(true)
    const aiMessageId = (Date.now() + 1).toString()
    
    // Add empty AI message placeholder
    addChatMessage({
      id: aiMessageId,
      role: 'ai',
      content: '',
      status: 'pending',
      timestamp: Date.now()
    })

    // Simulate streaming
    await simulateGemmaStream(
      userMessage.content,
      (chunk) => {
        setIsTyping(false) // First chunk received
        updateChatMessage(aiMessageId, chunk, 'pending')
      },
      () => {
        updateChatMessage(aiMessageId, undefined, 'sent')
      }
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-64px)] md:max-h-screen bg-bg-light dark:bg-bg-dark relative transition-colors duration-300">
      {/* Header */}
      <div className="p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shrink-0 sticky top-0 z-10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('aiTutor.name')}</h2>
            <p className="text-brand text-xs font-medium">{t('aiTutor.poweredBy')}</p>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar pb-32">
        {chatHistory.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`
                max-w-[85%] md:max-w-[75%] p-4 rounded-2xl
                ${msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-sm shadow-md' 
                  : 'bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 border-l-4 border-l-brand dark:border-l-brand text-slate-900 dark:text-white rounded-tl-sm shadow-sm'
                }
              `}
            >
              {msg.role === 'ai' && (
                <div className="flex items-center gap-2 mb-2 text-brand">
                  <Sparkles size={14} />
                  <span className="text-[10px] uppercase font-bold tracking-wider">Chemi</span>
                </div>
              )}
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              
              {msg.status === 'pending' && msg.role === 'user' && (
                <span className="text-[10px] text-slate-400 dark:text-gray-400 mt-2 block flex items-center gap-1">
                  {t('aiTutor.offlineQueued')}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start">
            <div className="bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 border-l-4 border-l-brand p-4 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm">
               <MoreHorizontal size={24} className="text-brand animate-pulse" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-bg-light via-bg-light/80 to-transparent dark:from-bg-dark dark:via-bg-dark dark:to-transparent">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900/90 backdrop-blur-2xl rounded-full flex items-center p-2 pr-3 border border-slate-200 dark:border-white/20 shadow-2xl">
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 dark:text-gray-400 transition-colors">
            <Mic size={20} />
          </button>
          
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('aiTutor.placeholder')}
            className="flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:ring-0 outline-none px-2 h-10"
            disabled={isTyping}
          />
          
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-all
              ${inputValue.trim() && !isTyping 
                ? 'bg-brand text-white shadow-[0_0_15px_rgba(21,101,192,0.6)] hover:bg-brand/90' 
                : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-500'
              }
            `}
          >
            <Send size={18} className={inputValue.trim() && !isTyping ? 'translate-x-0.5' : ''} />
          </button>
        </div>
      </div>
    </div>
  )
}
