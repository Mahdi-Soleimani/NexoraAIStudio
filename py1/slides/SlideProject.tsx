import React, { useState } from 'react';
import { SlideProps, CodeLanguage } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { Tooltip, TERMS } from '../components/Tooltip';
import { ArrowRight, Play, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const SlideProject: React.FC<SlideProps> = ({ isActive, onLog }) => {
  const [ran, setRan] = useState(false);

  if (!isActive) return null;

  const script = `# داده خام و کثیف ورودی
raw_input = {
    "  Name  ": "  Mohammad  ",  # فاصله اضافی
    "Age": "28",                # رشته به جای عدد
    "Email": "TEST@GMAIL.COM"   # حروف بزرگ
}

# پردازش و تمیزسازی (Data Transformation)
clean_data = {
    "name": raw_input["  Name  "].strip(),
    "age": int(raw_input["Age"]),
    "email": raw_input["Email"].lower()
}`;

  const dirtyData = {
    "  Name  ": "  Mohammad  ",
    "Age": "28",
    "Email": "TEST@GMAIL.COM"
  };

  const cleanData = {
    "name": "Mohammad",
    "age": 28,
    "email": "test@gmail.com"
  };

  const handleRun = () => {
    onLog("Starting data transformation script...", "info");
    setRan(true);
    setTimeout(() => onLog('Stripping whitespace from "Name"', 'info'), 500);
    setTimeout(() => onLog('Converting "Age" to integer', 'info'), 800);
    setTimeout(() => onLog('Lowercasing "Email"', 'info'), 1100);
    setTimeout(() => onLog('Transformation Complete!', 'success'), 1500);
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Mini Project: <Tooltip term="Transformation" definition={TERMS.TRANSFORMATION}>Data Cleaning</Tooltip></h2>
        <p className="text-gray-400 text-sm" dir="rtl">فرض کنید داده خام از فرم سایت آمده و می‌خواهیم برای ارسال به CRM تمیزش کنیم.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center flex-grow">
         {/* Input */}
         <div className="bg-[#1e1e1e] p-4 rounded-xl border border-red-500/30">
            <h3 className="text-red-400 font-bold mb-2 flex items-center justify-between">
               <span>Dirty Input</span>
               <span className="text-xs bg-red-900/50 px-2 py-1 rounded">Raw JSON</span>
            </h3>
            <pre className="text-xs text-gray-300 font-mono overflow-auto">
              {JSON.stringify(dirtyData, null, 2)}
            </pre>
         </div>

         {/* Processor */}
         <div className="flex flex-col items-center">
            <div className="w-full">
              <CodeBlock language={CodeLanguage.PYTHON} code={script} />
            </div>
            
            <button 
              onClick={handleRun}
              className="mt-4 flex items-center gap-2 bg-nexora-600 hover:bg-nexora-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-nexora-600/30 transition-all transform hover:scale-105 active:scale-95"
            >
              {ran ? <RefreshCw className="animate-spin" size={18}/> : <Play size={18} />}
              {ran ? 'Processing...' : 'Run Transformation'}
            </button>
         </div>

         {/* Output */}
         <div className="h-full flex items-center justify-center">
           {ran ? (
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="bg-[#1e1e1e] p-4 rounded-xl border border-green-500/50 w-full shadow-green-500/20 shadow-xl"
             >
                <h3 className="text-green-400 font-bold mb-2 flex items-center justify-between">
                  <span>Clean Output</span>
                  <span className="text-xs bg-green-900/50 px-2 py-1 rounded">CRM Ready</span>
                </h3>
                <pre className="text-sm text-gray-300 font-mono">
                  {JSON.stringify(cleanData, null, 2)}
                </pre>
             </motion.div>
           ) : (
             <div className="opacity-30 border-2 border-dashed border-gray-600 rounded-xl w-full h-32 flex items-center justify-center">
                <span className="text-gray-500">Waiting for code execution...</span>
             </div>
           )}
         </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs text-gray-500" dir="rtl">
         <div className="bg-gray-800 p-2 rounded">✅ Case Sensitivity: <Tooltip term="String" definition={TERMS.STRING}>Email</Tooltip> != email</div>
         <div className="bg-gray-800 p-2 rounded">✅ Naming: نامگذاری تمیز <Tooltip term="Variable" definition={TERMS.VARIABLE}>متغیرها</Tooltip></div>
         <div className="bg-gray-800 p-2 rounded">✅ Validation: تبدیل عدد به <Tooltip term="Integer" definition={TERMS.INTEGER}>int</Tooltip></div>
      </div>
    </div>
  );
};