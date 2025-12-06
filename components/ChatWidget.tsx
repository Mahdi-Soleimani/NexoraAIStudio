import React from 'react';
import { Bot } from 'lucide-react';
import Button from './Button';

const ChatWidget: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end animate-float">
      <a
        href="https://ai.nexoraaistudio.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button
          className="rounded-full w-14 h-14 shadow-2xl shadow-cyan-500/50 flex items-center justify-center p-0 bg-slate-900 border border-cyan-500/30 overflow-hidden"
        >
          <div className="relative flex items-center justify-center">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-20 animate-pulse"></div>
            <Bot
              size={32}
              className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] filter"
            />
          </div>
        </Button>
      </a>
    </div>
  );
};

export default ChatWidget;