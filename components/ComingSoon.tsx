import React from 'react';
import { Bot, Wrench, Hammer, Cog } from 'lucide-react';

const ComingSoon: React.FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] animate-[pulse_4s_infinite_reverse] z-0"></div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        
        {/* Working Robot Animation */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          {/* Main Bot */}
          <div className="absolute inset-0 flex items-center justify-center animate-[bounce_3s_infinite]">
            <Bot size={100} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>
          
          {/* Rotating Gears */}
          <div className="absolute -top-2 -right-4 animate-[spin_4s_linear_infinite]">
            <Cog size={40} className="text-slate-600" />
          </div>
          <div className="absolute bottom-0 -left-4 animate-[spin_5s_linear_infinite_reverse]">
            <Cog size={32} className="text-slate-700" />
          </div>

          {/* Tools Animation */}
          <div className="absolute -bottom-2 -right-2 bg-slate-800 p-2 rounded-full border border-slate-700 shadow-xl animate-[pulse_2s_infinite]">
            <Wrench size={24} className="text-cyan-400" />
          </div>
          <div className="absolute top-0 -left-2 bg-slate-800 p-2 rounded-full border border-slate-700 shadow-xl animate-[pulse_2s_infinite_0.5s]">
            <Hammer size={24} className="text-primary" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6">
          به زودی...
        </h1>
        
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            ایجنت‌های هوشمند نکسورا مشغول ساخت و پردازش این بخش هستند! 🤖🏗️
          </p>
          <p className="text-slate-400 text-sm">
            ما در حال آماده‌سازی محتوایی هستیم که ارزش صبر کردن را دارد. از شکیبایی شما سپاسگزاریم.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ComingSoon;