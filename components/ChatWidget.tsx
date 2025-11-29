import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import Button from './Button';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "سلام! من ایجنت هوشمند نکسورا هستم. من اینجام تا به شما در بهره‌وری و خودکارسازی کسب‌وکارتان کمک کنم. چگونه می‌توانم به شما کمک کنم؟", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput("");

    // Simulate simple bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "ممنون از پیام شما. کارشناسان ما به زودی با شما تماس خواهند گرفت.", isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end">
      
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-surface border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">پشتیبان هوشمند</h4>
                <span className="flex items-center gap-1 text-[10px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  آنلاین
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.isBot 
                    ? 'bg-surface border border-slate-700 text-slate-200 rounded-tr-none' 
                    : 'bg-primary text-white rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-surface border-t border-slate-800">
            <form 
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                className="flex-grow bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-14 h-14 shadow-2xl shadow-primary/40 flex items-center justify-center p-0"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={32} />}
      </Button>
    </div>
  );
};

export default ChatWidget;