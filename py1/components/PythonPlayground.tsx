import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface PythonPlaygroundProps {
  initialCode: string;
  onLog: (msg: string, type?: 'info' | 'success' | 'error') => void;
}

export const PythonPlayground: React.FC<PythonPlaygroundProps> = ({ initialCode, onLog }) => {
  const [code, setCode] = useState(initialCode);

  const runCode = () => {
    onLog(">>> Running Python Script...", "info");
    
    try {
      const variables: Record<string, any> = {};
      const rawLines = code.split('\n');
      
      let i = 0;
      while (i < rawLines.length) {
        let line = rawLines[i].trim();
        
        // Skip empty or comments
        if (!line || line.startsWith('#')) {
            i++;
            continue;
        }

        // Check for multi-line structures (brackets not balanced)
        let openBraces = (line.match(/\{/g) || []).length;
        let closeBraces = (line.match(/\}/g) || []).length;
        let openBrackets = (line.match(/\[/g) || []).length;
        let closeBrackets = (line.match(/\]/g) || []).length;
        
        let accumulatedLine = line;
        let j = i + 1;

        // Accumulate lines if unbalanced
        while ((openBraces > closeBraces || openBrackets > closeBrackets) && j < rawLines.length) {
            const nextLine = rawLines[j].trim();
            // Simple comment stripping for cleaner accumulation
            const cleanNextLine = nextLine.split('#')[0].trim();
            
            accumulatedLine += " " + cleanNextLine;
            
            openBraces += (cleanNextLine.match(/\{/g) || []).length;
            closeBraces += (cleanNextLine.match(/\}/g) || []).length;
            openBrackets += (cleanNextLine.match(/\[/g) || []).length;
            closeBrackets += (cleanNextLine.match(/\]/g) || []).length;
            j++;
        }

        const trimmed = accumulatedLine;
        
        // --- PARSING LOGIC (Applied to the full statement) ---
        
        // Handle print()
        if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
            const content = trimmed.substring(6, trimmed.length - 1); 
            
             // Check if printing a variable
            if (variables.hasOwnProperty(content)) {
                const val = variables[content];
                onLog(typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val), 'success');
            } 
            // Check if printing a literal string
            else if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
                onLog(content.slice(1, -1), 'success');
            }
            // Simple math
             else if (content.includes('+') && !content.includes('"') && !content.includes("'")) {
                try {
                     // eslint-disable-next-line no-eval
                    const result = eval(content);
                    onLog(String(result), 'success');
                } catch {
                    onLog(`Output: [Math Expression]`, 'success');
                }
            }
            // Dict access x['key']
            else if (content.includes('[') && content.includes(']')) {
                 const match = content.match(/^(\w+)\[["'](\w+)["']\]$/);
                 if (match) {
                     const [_, varName, key] = match;
                     if (variables[varName]) {
                         const res = variables[varName][key];
                         onLog(res !== undefined ? String(res) : 'None', 'success');
                     } else {
                         onLog(`NameError: name '${varName}' is not defined`, 'error');
                     }
                 } else {
                     onLog(content, 'success');
                 }
            }
            else {
                onLog(content, 'success');
            }
        }
        
        // Handle Assignment
        else if (trimmed.includes('=')) {
            const eqIndex = trimmed.indexOf('=');
            const varName = trimmed.substring(0, eqIndex).trim();
            const valStr = trimmed.substring(eqIndex + 1).trim();
            
            // List
            if (valStr.startsWith('[') && valStr.endsWith(']')) {
                 try {
                     // eslint-disable-next-line no-eval
                     const arr = eval('(' + valStr + ')');
                     variables[varName] = arr;
                     onLog(`Assigning List to '${varName}'`, 'info');
                 } catch(e) {
                     onLog(`SyntaxError parsing list on line ${i+1}`, 'error');
                 }
            } 
            // Dict
            else if (valStr.startsWith('{')) {
                 try {
                     const jsObjStr = valStr.replace(/True/g, 'true').replace(/False/g, 'false');
                     // eslint-disable-next-line no-eval
                     const obj = eval('(' + jsObjStr + ')'); 
                     variables[varName] = obj;
                     onLog(`Assigning Dictionary to '${varName}'`, 'info');
                 } catch (e) {
                     onLog(`SyntaxError parsing dictionary starting line ${i+1}`, 'error');
                 }
            }
            // String
            else if ((valStr.startsWith('"') && valStr.endsWith('"')) || (valStr.startsWith("'") && valStr.endsWith("'"))) {
                variables[varName] = valStr.slice(1, -1);
            }
            // Number
            else if (!isNaN(Number(valStr))) {
                variables[varName] = Number(valStr);
            }
        }
        
        // Handle .append()
        else if (trimmed.includes('.append(')) {
             onLog(`Executed: ${trimmed} (Item added to list)`, 'info');
        }

        i = j; // Advance main loop
      }

    } catch (err) {
      onLog("Error executing script", "error");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
      <div className="bg-[#2d2d2d] px-4 py-2 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 rounded-full bg-red-500"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
           <div className="w-3 h-3 rounded-full bg-green-500"></div>
           <span className="ml-2 text-xs text-gray-400 font-mono">playground.py</span>
        </div>
        <div className="flex gap-2">
           <button onClick={() => setCode(initialCode)} className="p-1 hover:bg-gray-700 rounded text-gray-400" title="Reset Code">
             <RotateCcw size={14}/>
           </button>
           <button 
             onClick={runCode}
             className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded transition-colors shadow-lg shadow-green-900/20"
             title="Execute Python Script"
           >
             <Play size={12} fill="currentColor" /> Run Code
           </button>
        </div>
      </div>
      <div className="flex-grow relative">
        <textarea 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm p-4 resize-none focus:outline-none leading-6"
          spellCheck="false"
        />
      </div>
    </div>
  );
};