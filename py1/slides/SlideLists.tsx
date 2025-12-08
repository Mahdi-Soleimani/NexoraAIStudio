import React from 'react';
import { SlideProps, CodeLanguage } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { N8nNode } from '../components/N8nNode';
import { Tooltip, TERMS } from '../components/Tooltip';
import { ArrowDown, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const SlideLists: React.FC<SlideProps> = ({ isActive, onLog }) => {
  if (!isActive) return null;

  const code = `# یک لیست از ایمیل‌ها
emails = ["info@nexora.com", "admin@google.com"]

# دسترسی به اولین آیتم (ایندکس 0)
first = emails[0] 
# خروجی: info@nexora.com

# اضافه کردن به لیست
emails.append("new@user.com")`;

  const n8nOutput = [
    { json: { email: "info@nexora.com" }, index: 0 },
    { json: { email: "admin@google.com" }, index: 1 },
    { json: { email: "new@user.com" }, index: 2 }
  ];

  const handleRun = () => {
    onLog('Initializing list: ["info@nexora.com", "admin@google.com"]', 'info');
    setTimeout(() => onLog('Accessing index 0: "info@nexora.com"', 'success'), 500);
    setTimeout(() => onLog('Appending "new@user.com"... List size is now 3.', 'success'), 1000);
  };

  return (
    <div className="flex flex-col h-full gap-6 p-4">
       <div className="text-right border-r-4 border-nexora-500 pr-4">
          <h2 className="text-2xl font-bold text-white">لیست‌ها (<Tooltip term="ARRAY" definition={TERMS.ARRAY}>Arrays</Tooltip>) = Items</h2>
          <p className="text-gray-400 mt-2">در n8n، نودها به صورت پیش‌فرض روی این لیست‌ها "<Tooltip term="LOOP" definition={TERMS.LOOP}>Loop</Tooltip>" می‌زنند.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start flex-grow">
          {/* Python Side */}
          <div className="space-y-4">
             <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-6 h-6" alt="python"/>
                   <span className="font-mono text-nexora-500 font-bold">Python Code</span>
                </div>
                <button onClick={handleRun} className="text-xs bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1">
                   <Play size={12} /> Run Code
                </button>
             </div>
             <CodeBlock language={CodeLanguage.PYTHON} code={code} />
             <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-200" dir="rtl">
                   مفهوم لیست در پایتون دقیقاً همان مفهومی است که n8n وقتی ۵ ردیف از Google Sheets می‌خواند، ایجاد می‌کند.
                </p>
             </div>
          </div>

          {/* Transformation Visual */}
          <div className="flex flex-col items-center justify-center space-y-4 h-full">
             <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="hidden md:block"
             >
                <ArrowDown size={32} className="text-gray-500 animate-bounce" />
             </motion.div>

             {/* n8n Side */}
             <div className="w-full">
                 <div className="flex items-center gap-2 mb-4 justify-end">
                    <span className="font-mono text-n8n-node font-bold">n8n Output View</span>
                    <div className="w-6 h-6 bg-n8n-node rounded flex items-center justify-center text-xs font-bold text-white">n</div>
                 </div>
                 <N8nNode 
                    title="Google Sheets: Read" 
                    type="trigger" 
                    output={n8nOutput} 
                    isActive={true}
                 />
             </div>
          </div>
       </div>
    </div>
  );
};