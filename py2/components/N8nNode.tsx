import React from 'react';
import { motion } from 'framer-motion';

interface N8nNodeProps {
    label: string;
    icon?: React.ReactNode;
    color?: string;
    isActive?: boolean;
    branches?: boolean;
}

export const N8nNode: React.FC<N8nNodeProps> = ({
    label,
    icon,
    color = '#ff6d5a',
    isActive = false,
    branches = false
}) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`relative flex flex-col items-center ${isActive ? 'animate-pulse-glow' : ''}`}
        >
            {/* Node Body */}
            <div
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold shadow-lg border-2 transition-all duration-300"
                style={{
                    backgroundColor: color + '20',
                    borderColor: color,
                    boxShadow: isActive ? `0 0 20px ${color}60` : 'none'
                }}
            >
                {icon}
            </div>

            {/* Label */}
            <span className="mt-2 text-xs text-gray-400 font-mono text-center max-w-20 truncate">
                {label}
            </span>

            {/* Output connector */}
            <div
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-3 h-3 rounded-full border-2"
                style={{ borderColor: color, backgroundColor: color + '40' }}
            />

            {/* Input connector */}
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-3 h-3 rounded-full border-2"
                style={{ borderColor: color, backgroundColor: color + '40' }}
            />

            {/* Branch connectors for If node */}
            {branches && (
                <>
                    <div className="absolute -right-4 top-1/4 text-xs text-green-400 font-mono">True</div>
                    <div className="absolute -right-4 bottom-1/4 text-xs text-red-400 font-mono">False</div>
                </>
            )}
        </motion.div>
    );
};
