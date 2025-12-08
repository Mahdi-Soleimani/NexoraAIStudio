import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Play, Database } from 'lucide-react';

interface N8nNodeProps {
  title: string;
  type?: 'trigger' | 'function' | 'action';
  output?: any;
  isActive?: boolean;
}

export const N8nNode: React.FC<N8nNodeProps> = ({ title, type = 'action', output, isActive = false }) => {
  const color = type === 'trigger' ? 'bg-green-500' : type === 'function' ? 'bg-orange-500' : 'bg-blue-500';

  return (
    <motion.div 
      className={`relative w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden border-2 ${isActive ? 'border-nexora-500 ring-4 ring-nexora-500/20' : 'border-gray-200'}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Node Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white shadow-sm`}>
            {type === 'function' ? <Settings size={16} /> : <Database size={16} />}
          </div>
          <span className="font-bold text-gray-700 text-sm">{title}</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <Play size={14} className="text-gray-400" />
        </div>
      </div>

      {/* Output / Data View */}
      <div className="bg-[#f8fafc] p-0">
        <div className="px-3 py-1 bg-gray-200 text-[10px] text-gray-600 font-bold uppercase tracking-wider flex justify-between">
          <span>Output Data</span>
          <span>JSON</span>
        </div>
        <div className="p-3 font-mono text-xs text-gray-600 bg-white min-h-[100px] overflow-auto max-h-[200px]">
           <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      </div>
      
      {/* Connection Dot */}
      <div className="absolute top-1/2 -right-3 w-4 h-4 bg-gray-300 rounded-full border-2 border-white z-10"></div>
      <div className="absolute top-1/2 -left-3 w-4 h-4 bg-gray-300 rounded-full border-2 border-white z-10"></div>
    </motion.div>
  );
};