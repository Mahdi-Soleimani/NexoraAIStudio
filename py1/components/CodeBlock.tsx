import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CodeLanguage, CodeBlockProps } from '../types';
import { Copy, Check } from 'lucide-react';

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, title, highlightLines = [] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting logic (regex based for demo purposes)
  const processCode = (line: string) => {
    // Comments
    if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
      return <span className="text-gray-500 italic">{line}</span>;
    }
    
    // Strings
    const stringRegex = /"(.*?)"|'(.*?)'/g;
    
    // Very basic simulation of coloring keywords
    return line.split(' ').map((word, i) => {
      const cleanWord = word.trim();
      if (['def', 'return', 'import', 'from', 'if', 'else', 'True', 'False', 'None', 'print'].includes(cleanWord.split('(')[0])) return <span key={i} className="text-purple-400 font-bold">{word} </span>;
      if (['int', 'str', 'len', 'strip', 'lower', 'append', 'split'].includes(cleanWord.split('(')[0])) return <span key={i} className="text-yellow-300">{word} </span>;
      if (word.includes('"') || word.includes("'")) return <span key={i} className="text-green-400">{word} </span>;
      if (!isNaN(Number(word.replace(/,/g, '')))) return <span key={i} className="text-orange-400">{word} </span>;
      if (word.endsWith(':')) return <span key={i} className="text-white">{word} </span>;
      return <span key={i} className="text-gray-200">{word} </span>;
    });
  };

  return (
    <div className="rounded-lg overflow-hidden bg-[#1e1e1e] border border-gray-700 shadow-2xl my-4 relative group">
      {title && (
        <div className="bg-[#2d2d2d] px-4 py-2 text-xs text-gray-400 flex justify-between items-center border-b border-gray-700">
          <span className="font-mono font-bold uppercase">{language}</span>
          <span>{title}</span>
        </div>
      )}
      
      {/* Copy Button */}
      <button 
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all z-10"
        title="Copy to clipboard"
      >
        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
      </button>

      <div className="p-4 font-mono text-sm overflow-x-auto relative">
        {copied && (
          <div className="absolute top-0 right-12 mt-4 mr-2 text-xs text-green-400 font-bold bg-black/50 px-2 py-1 rounded">
            Copied!
          </div>
        )}
        <pre>
          {code.split('\n').map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`${highlightLines.includes(i + 1) ? 'bg-white/10 -mx-4 px-4 border-l-2 border-nexora-500' : ''}`}
            >
              <span className="text-gray-600 select-none mr-4 w-6 inline-block text-right">{i + 1}</span>
              {processCode(line)}
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  );
};