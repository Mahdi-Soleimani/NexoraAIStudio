import React, { useState, useEffect } from 'react';
import { Logo } from './components/Logo';
import { SlideIntro } from './slides/SlideIntro';
import { SlideVariables } from './slides/SlideVariables';
import { SlideLists } from './slides/SlideLists';
import { SlideDict } from './slides/SlideDict';
import { SlideNested } from './slides/SlideNested';
import { SlideProject } from './slides/SlideProject';
import { SlidePlayground } from './slides/SlidePlayground';
import { Terminal } from './components/Terminal';
import { TerminalLog } from './types';
import { ChevronRight, ChevronLeft, Terminal as TerminalIcon, Youtube, Instagram, Send, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  SlideIntro,
  SlideVariables,
  SlideLists,
  SlideDict,
  SlideNested,
  SlideProject,
  SlidePlayground
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [logs, setLogs] = useState<TerminalLog[]>([]);

  const addLog = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const newLog: TerminalLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      message,
      type
    };
    setLogs(prev => [...prev, newLog]);
    if (!isTerminalOpen) setIsTerminalOpen(true);
  };

  const clearLogs = () => setLogs([]);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) setCurrentSlide(curr => curr + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(curr => curr - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate if user is typing in a textarea (Playground)
      if (e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const CurrentSlideComponent = SLIDES[currentSlide];

  return (
    <div className="flex flex-col h-screen bg-nexora-dark text-white overflow-hidden font-sans selection:bg-nexora-500 selection:text-white relative">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-nexora-500 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-purple-500 opacity-10 blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="h-16 shrink-0 border-b border-gray-800 flex items-center justify-between px-6 bg-nexora-dark/80 backdrop-blur-md z-50">
        <Logo />
        <div className="hidden md:flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/50 border border-gray-700/50 cursor-help hover:border-nexora-500/50 transition-colors" title="Environment">
             <TerminalIcon size={14} className="text-green-400"/>
             <span className="font-mono text-xs">Python 3.10 Env</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow relative flex flex-col overflow-hidden z-10">
        
        <div className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6 relative overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
             <motion.div
               key={currentSlide}
               initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
               animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
               exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="h-full"
             >
                <CurrentSlideComponent 
                  isActive={true} 
                  onNext={nextSlide} 
                  onPrev={prevSlide} 
                  onLog={addLog}
                />
             </motion.div>
          </AnimatePresence>
        </div>

        {/* Terminal sits here, fixed to the bottom of the main area, above footer */}
        <Terminal 
          logs={logs} 
          isOpen={isTerminalOpen} 
          onToggle={() => setIsTerminalOpen(!isTerminalOpen)} 
          onClear={clearLogs}
        />
      </main>

      {/* Footer Navigation */}
      <footer className="h-20 shrink-0 border-t border-gray-800 bg-[#0f172a] flex items-center justify-between px-6 z-50 relative shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
        
        {/* Progress & Socials */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
           {/* Social Icons */}
           <div className="flex items-center gap-3 pr-4 md:border-r border-gray-700">
              <a href="https://www.youtube.com/@NexoraAIStudio" className="text-gray-500 hover:text-red-500 transition-colors"><Youtube size={20} /></a>
              <a href="https://www.instagram.com/nexora_ai_studio/?utm_source=ig_web_button_share_sheet" className="text-gray-500 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
              <a href="t.me/NexoraAICompany" className="text-gray-500 hover:text-blue-400 transition-colors"><Send size={20} /></a>
              <a href="nexoraaistudio.tech" className="text-gray-500 hover:text-nexora-500 transition-colors"><Globe size={20} /></a>
           </div>

           <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
             <span className="whitespace-nowrap">Slide {currentSlide + 1} / {SLIDES.length}</span>
             <div className="h-1.5 w-24 md:w-32 bg-gray-800 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-gradient-to-r from-nexora-600 to-purple-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                 style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
               ></div>
             </div>
           </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
           <button 
             onClick={prevSlide}
             disabled={currentSlide === 0}
             className="p-3 rounded-xl hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-95 border border-transparent hover:border-gray-700"
           >
             <ChevronLeft className="text-gray-300"/>
           </button>
           
           <button 
             onClick={nextSlide}
             disabled={currentSlide === SLIDES.length - 1}
             className="group px-6 py-2.5 bg-gradient-to-r from-nexora-600 to-nexora-700 hover:from-nexora-500 hover:to-nexora-600 text-white rounded-xl font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-nexora-900/50 hover:shadow-nexora-500/30 active:scale-95 border border-nexora-500/50"
           >
             <span>{currentSlide === SLIDES.length - 1 ? 'Finish' : 'Next'}</span>
             <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </footer>
    </div>
  );
}