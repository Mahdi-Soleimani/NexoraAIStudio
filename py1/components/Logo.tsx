import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-10 h-10">
        {/* Abstract N Shape representing the logo description */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <path d="M20 20 L20 80 L50 50 L20 20 Z" fill="#1e3a8a" /> {/* Dark Blue Triangle */}
          <path d="M50 50 L80 80 L80 20 L50 50 Z" fill="#3b82f6" /> {/* Light Blue Shape */}
          <path d="M20 20 L40 20 L80 80 L60 80 Z" fill="#2563eb" opacity="0.9"/> {/* Crossing bar */}
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-2xl tracking-tight text-white leading-none">
          Nexora <span className="text-nexora-500">AI</span>
        </span>
        <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-semibold pl-0.5">Studio</span>
      </div>
    </div>
  );
};