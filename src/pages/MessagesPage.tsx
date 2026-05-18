import React, { useState, useEffect } from 'react';
import { 
  getMessages, markAsRead, deleteMessage, getUnreadCount
} from '../services/messageService';
import type { Message } from '../services/messageService';
import { 
  Trash2, Mail, User, Clock, 
  ChevronDown, Inbox, 
  Trash, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadMessages = async () => {
    const fetchedMessages = await getMessages();
    setMessages(fetchedMessages);
    const count = await getUnreadCount();
    setUnreadCount(count);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      await markAsRead(id);
      loadMessages();
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this message?')) {
      await deleteMessage(id);
      loadMessages();
      if (expandedId === id) setExpandedId(null);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black flex items-center gap-4">
              <Inbox className="text-cyan-400" size={36} />
              Admin Inbox
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full animate-pulse">
                  {unreadCount} UNREAD
                </span>
              )}
            </h1>
            <p className="text-[#8892a4] mt-2 font-medium tracking-tight">Manage your chemical inquiries and support requests</p>
          </div>
          <button 
            onClick={loadMessages}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold text-sm flex items-center gap-2"
          >
            Refresh Feed
          </button>
        </header>

        {/* Content */}
        {messages.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-[20px] p-20 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#4a5568]">
              <Inbox size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-[#8892a4]">No messages yet 📭</h2>
            <p className="text-[#4a5568]">Your inbox is currently empty.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => handleExpand(msg.id)}
                className={`bg-white/5 border transition-all duration-300 rounded-[20px] overflow-hidden cursor-pointer group ${expandedId === msg.id ? 'border-cyan-400/50 ring-1 ring-cyan-400/20' : 'border-white/10 hover:border-white/20'}`}
              >
                {/* Compact View */}
                <div className="p-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`w-3 h-3 rounded-full shrink-0 ${msg.status === 'unread' ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-transparent'}`}></div>
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <User size={18} className="text-[#8892a4]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold truncate">{msg.name}</h3>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                          msg.subject === 'bug' ? 'bg-red-500/20 text-red-400' : 
                          msg.subject === 'feature' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-cyan-500/20 text-cyan-400'
                        }`}>
                          {msg.subject}
                        </span>
                      </div>
                      <p className="text-sm text-[#8892a4] truncate mt-0.5">{msg.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="hidden md:flex items-center gap-2 text-[#4a5568] text-xs font-medium">
                      <Clock size={14} />
                      {formatTimeAgo(msg.timestamp)}
                    </div>
                    <button 
                      onClick={(e) => handleDelete(e, msg.id)}
                      className="p-2 text-[#4a5568] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className={`transition-transform duration-300 ${expandedId === msg.id ? 'rotate-180' : ''}`}>
                      <ChevronDown size={20} className="text-[#4a5568]" />
                    </div>
                  </div>
                </div>

                {/* Expanded View */}
                <AnimatePresence>
                  {expandedId === msg.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5 bg-black/20"
                    >
                      <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-[#4a5568] uppercase tracking-[0.2em]">SENDER DETAILS</h4>
                            <div className="space-y-2">
                              <p className="flex items-center gap-3 font-bold"><User size={16} className="text-cyan-400" /> {msg.name}</p>
                              <p className="flex items-center gap-3 text-[#8892a4]"><Mail size={16} /> {msg.email}</p>
                              <p className="flex items-center gap-3 text-[#8892a4]"><Clock size={16} /> {new Date(msg.timestamp).toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-[#4a5568] uppercase tracking-[0.2em]">SUBJECT CATEGORY</h4>
                            <div className="flex items-center gap-2">
                               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-cyan-400">
                                 <MessageSquare size={20} />
                               </div>
                               <span className="text-xl font-black capitalize">{msg.subject} Inquiry</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[10px] font-black text-[#4a5568] uppercase tracking-[0.2em]">MESSAGE CONTENT</h4>
                          <div className="bg-white/5 rounded-2xl p-6 border border-white/5 leading-relaxed text-[#8892a4]">
                            {msg.message}
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button 
                            onClick={(e) => handleDelete(e, msg.id)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-bold transition-all"
                          >
                            <Trash size={18} /> Delete Message
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
