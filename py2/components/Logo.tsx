import React from 'react';
import { BrainCircuit } from 'lucide-react';

export const Logo: React.FC = () => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nexora-600 to-purple-600 flex items-center justify-center shadow-lg shadow-nexora-500/30">
                <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div>
                <span className="font-bold text-lg text-white tracking-tight">Nexora</span>
                <span className="text-nexora-500 font-light ml-1">Academy</span>
                <div className="text-xs text-gray-500 font-mono">Episode 2: Logic</div>
            </div>
        </div>
    );
};
