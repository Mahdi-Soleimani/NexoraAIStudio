import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { TerminalLog } from '../types';

interface TerminalProps {
    logs: TerminalLog[];
    isOpen: boolean;
    onToggle: () => void;
    onClear: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ logs, isOpen, onToggle, onClear }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const getTypeStyles = (type: TerminalLog['type']) => {
        switch (type) {
            case 'success':
                return 'text-green-400 before:content-["✓"] before:mr-2';
            case 'error':
                return 'text-red-400 before:content-["✗"] before:mr-2';
            case 'warning':
                return 'text-yellow-400 before:content-["⚠"] before:mr-2';
            default:
                return 'text-blue-400 before:content-["→"] before:mr-2';
        }
    };

    return (
        <motion.div
            initial={false}
            animate={{ height: isOpen ? 200 : 48 }}
            className="border-t border-gray-700 bg-[#0d1117] flex flex-col relative"
            style={{ minHeight: 48 }}
        >
            {/* Header */}
            <div
                onClick={onToggle}
                className="h-12 flex items-center justify-between px-4 cursor-pointer hover:bg-gray-800/50 transition-colors flex-shrink-0"
            >
                <div className="flex items-center gap-3">
                    <TerminalIcon size={16} className="text-green-400" />
                    <span className="font-mono text-sm text-gray-300">Terminal Output</span>
                    {logs.length > 0 && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 font-bold">
                            {logs.length}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {isOpen && logs.length > 0 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClear();
                            }}
                            className="p-1.5 rounded hover:bg-gray-700 text-gray-500 hover:text-red-400 transition-colors"
                            title="Clear logs"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                    {isOpen ? <ChevronDown size={16} className="text-gray-500" /> : <ChevronUp size={16} className="text-gray-500" />}
                </div>
            </div>

            {/* Log Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        ref={scrollRef}
                        className="flex-grow overflow-y-auto p-4 font-mono text-sm space-y-1"
                    >
                        {logs.length === 0 ? (
                            <div className="text-gray-600 text-center py-4">
                                Output will appear here when you run code...
                            </div>
                        ) : (
                            logs.map((log) => (
                                <motion.div
                                    key={log.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex items-start gap-2 ${getTypeStyles(log.type)}`}
                                >
                                    <span className="text-gray-600 text-xs shrink-0 hidden sm:inline">
                                        {log.timestamp.toLocaleTimeString()}
                                    </span>
                                    <span className="break-all">{log.message}</span>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
