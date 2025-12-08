import React, { useRef, useEffect, useState } from 'react';
import { TerminalLog } from '../types';
import { ChevronUp, ChevronDown, Trash2, GripHorizontal } from 'lucide-react';

interface TerminalProps {
  logs: TerminalLog[];
  isOpen: boolean;
  onToggle: () => void;
  onClear: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ logs, isOpen, onToggle, onClear }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(250); // Default height in pixels
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  // Handle resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newHeight = window.innerHeight - e.clientY - 80; // 80px is approx footer height
      if (newHeight > 100 && newHeight < 600) {
        setHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className={`absolute left-0 right-0 z-40 flex flex-col transition-all duration-300 ease-in-out bg-[#0f172a]/95 backdrop-blur-md border-t border-nexora-500/30 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]`}
      style={{ 
        bottom: '80px', // Sits exactly above the footer (h-20)
        height: isOpen ? `${height}px` : '40px',
      }}
    >
      {/* Resizer Handle (Only visible when open) */}
      {isOpen && (
        <div 
          className="w-full h-2 bg-transparent hover:bg-nexora-500/20 cursor-ns-resize absolute top-0 left-0 z-50 flex items-center justify-center group"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
        >
          <div className="w-12 h-1 rounded-full bg-gray-600 group-hover:bg-nexora-500 transition-colors"></div>
        </div>
      )}

      {/* Terminal Header */}
      <div 
        className="flex items-center justify-between px-4 h-10 shrink-0 bg-[#0c0c0c] border-b border-gray-800 cursor-pointer select-none"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          {isOpen ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronUp size={16} className="text-nexora-500 animate-bounce" />}
          <span className="text-sm font-mono font-bold text-gray-300">Terminal Output</span>
          {logs.length > 0 && !isOpen && (
            <span className="bg-nexora-600 text-white text-[10px] px-1.5 rounded-full min-w-[1.2rem] text-center shadow-lg shadow-nexora-600/50">
              {logs.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={onClear}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-red-400 transition-colors"
            title="Clear Console"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      {isOpen && (
        <div 
          ref={scrollRef}
          className="flex-grow overflow-auto p-4 font-mono text-sm bg-[#0c0c0c]/90 text-gray-300 space-y-2 custom-scrollbar"
        >
          {logs.length === 0 ? (
            <div className="text-gray-600 italic select-none opacity-50">nexora-studio@local:~$ Waiting for execution...</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                <span className="text-gray-600 shrink-0 select-none">[{log.timestamp.toLocaleTimeString().split(' ')[0]}]</span>
                <span className={`break-words font-medium ${
                  log.type === 'error' ? 'text-red-400' : 
                  log.type === 'success' ? 'text-green-400' : 
                  log.type === 'warning' ? 'text-yellow-400' : 'text-blue-300'
                }`}>
                  {log.type === 'info' && <span className="text-blue-500 mr-2">➜</span>}
                  {log.message}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};