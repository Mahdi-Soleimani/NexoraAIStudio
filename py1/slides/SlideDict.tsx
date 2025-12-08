import React from 'react';
import { SlideProps, CodeLanguage } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { N8nNode } from '../components/N8nNode';
import { Tooltip, TERMS } from '../components/Tooltip';
import { MousePointerClick, Play } from 'lucide-react';

export const SlideDict: React.FC<SlideProps> = ({ isActive, onLog }) => {
  if (!isActive) return null;

  const pyCode = `# مشخصات یک مشتری (Dictionary)
customer = {
    "id": 101,
    "full_name": "Sara Ahmadi",
    "is_vip": True,
    "tags": ["loyal", "tehran"]
}

# Mapping: کشیدن اسم بیرون
name = customer["full_name"]`;

  const jsonOutput = {
    "id": 101,
    "full_name": "Sara Ahmadi",
    "is_vip": true,
    "tags": ["loyal", "tehran"]
  };

  const handleSimulate = () => {
    onLog('Creating dictionary "customer"...', 'info');
    onLog('Fetching customer["full_name"]...', 'info');
    onLog('>> "Sara Ahmadi"', 'success');
  };

  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Dictionary = <Tooltip term="JSON" definition={TERMS.JSON}>JSON Object</Tooltip></h2>
        <p className="text-nexora-500 font-mono text-lg">Heart of n8n &lt;3</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Python */}
        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
           <div className="relative bg-nexora-dark">
             <div className="absolute top-2 right-2 z-20">
                <button onClick={handleSimulate} className="bg-gray-700 hover:bg-gray-600 text-white p-1 rounded transition-colors" title="Run Snippet">
                   <Play size={16} />
                </button>
             </div>
             <CodeBlock language={CodeLanguage.PYTHON} code={pyCode} title="Python Dictionary" />
           </div>
        </div>

        {/* N8n */}
        <div className="relative">
           <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce z-20 flex items-center gap-1">
             <MousePointerClick size={12}/> <Tooltip term="MAPPING" definition={TERMS.MAPPING}>Drag & Drop</Tooltip>
           </div>
           
           <N8nNode 
             title="Webhook Output" 
             type="trigger" 
             output={jsonOutput}
             isActive={true}
           />
           
           <div className="mt-4 p-4 bg-gray-800 rounded-lg border-l-4 border-n8n-node text-right" dir="rtl">
             <p className="text-gray-300 text-sm">
               وقتی در n8n یک فیلد را Drag & Drop می‌کنید، در واقع دارید به زبان برنامه‌نویسی می‌گویید: 
               <code className="bg-black px-2 py-0.5 rounded text-yellow-400 mx-1 ltr font-mono">customer["full_name"]</code>
               را برای من بیاور.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};