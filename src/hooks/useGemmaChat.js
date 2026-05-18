import { useState, useEffect, useRef } from 'react';
import { askGemma } from '../services/gemmaService';

export const useGemmaChat = (currentLesson) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  useEffect(() => {
    if (currentLesson) {
      setMessages([{
        id: Date.now(),
        role: 'assistant',
        text: `Hi! I'm your AI chemistry tutor 🧪\n\nI'm here to help you understand "${currentLesson.title}".\n\nAsk me anything about this topic!`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  }, [currentLesson?.id]);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const result = await askGemma(
      text,
      currentLesson.title,
      currentLesson.content.overview
    );

    const aiMsg = {
      id: Date.now() + 1,
      role: 'assistant',
      text: result.answer,
      timestamp: new Date().toLocaleTimeString(),
      isError: !result.success
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      role: 'assistant',
      text: `Chat cleared! Ask me anything about "${currentLesson?.title}" 🧪`,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  return {
    messages, input, setInput,
    isLoading, isOpen, setIsOpen,
    sendMessage, clearChat, messagesEndRef
  };
};
