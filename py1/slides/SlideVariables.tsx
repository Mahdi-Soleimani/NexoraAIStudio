import React, { useState } from 'react';
import { SlideProps, CodeLanguage } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { Tooltip, TERMS } from '../components/Tooltip';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Play } from 'lucide-react';

export const SlideVariables: React.FC<SlideProps> = ({ isActive, onLog }) => {
  const [demoValue, setDemoValue] = useState<'math' | 'concat'>('concat');

  if (!isActive) return null;

  const pythonCode = `# 1. String (متن)
first_name = "Ali"
phone_number = "09120000000"  # شماره موبایل ریاضی نیست!

# 2. Integer (عدد صحیح)
age = 25
salary = 50000000

# 3. Boolean (منطق)
is_active = True`;

  const runDemo = (type: 'math' | 'concat') => {
      setDemoValue(type);
      if (type === 'concat') {
          onLog('Executing: "100" + "20"', 'info');
          setTimeout(() => onLog('Result: "10020" (String Concatenation)', 'warning'), 300);
      } else {
          onLog('Executing: 100 + 20', 'info');
          setTimeout(() => onLog('Result: 120 (Integer Math)', 'success'), 300);
      }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center p-4">
      <div className="space-y-6" dir="rtl">
        <h2 className="text-3xl font-bold text-nexora-100 border-r-4 border-nexora-500 pr-4">
          متغیرها و انواع داده
          <br/>
          <span className="text-lg font-normal text-gray-400 font-sans">Variables & Data Types</span>
        </h2>
        
        <p className="text-gray-300 leading-relaxed">
          بزرگترین باگ تازه‌کارها عدم تشخیص "جنس" داده است. در پروژه‌های بانکی و مالی، نوع داده (<span className="text-yellow-400 font-mono">Type</span>) حیاتی است.
          در <Tooltip term="VARIABLE" definition={TERMS.VARIABLE}>متغیرها</Tooltip> باید دقت کنید.
        </p>

        <CodeBlock 
          language={CodeLanguage.PYTHON} 
          code={pythonCode} 
          title="Python Data Types"
        />
      </div>

      <div className="bg-nexora-card rounded-2xl p-6 border border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 bg-gray-800 rounded-bl-xl border-l border-b border-gray-700 text-xs text-gray-400 font-mono">
          n8n Simulation
        </div>

        <div className="mt-8 space-y-6">
          <p className="text-center text-gray-300 mb-4 font-bold" dir="rtl">
            چرا Type مهمه؟ تفاوت جمع بستن:
          </p>

          <div className="flex justify-center gap-4 mb-6">
             <button 
                onClick={() => runDemo('concat')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${demoValue === 'concat' ? 'bg-red-500/20 text-red-400 border border-red-500' : 'bg-gray-800 text-gray-400'}`}
             >
                <Play size={12}/> String ("Text")
             </button>
             <button 
                onClick={() => runDemo('math')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${demoValue === 'math' ? 'bg-green-500/20 text-green-400 border border-green-500' : 'bg-gray-800 text-gray-400'}`}
             >
                 <Play size={12}/> Integer (Number)
             </button>
          </div>

          <motion.div 
            key={demoValue}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0f172a] p-6 rounded-xl border border-gray-700 font-mono text-center text-2xl"
          >
             {demoValue === 'concat' ? (
               <>
                 <span className="text-green-400">"100"</span> + <span className="text-green-400">"20"</span> = <span className="text-red-400 font-bold">"10020"</span>
               </>
             ) : (
               <>
                 <span className="text-orange-400">100</span> + <span className="text-orange-400">20</span> = <span className="text-green-400 font-bold">120</span>
               </>
             )}
          </motion.div>
            
          <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
             {demoValue === 'concat' ? <AlertTriangle className="text-red-500 shrink-0" /> : <CheckCircle2 className="text-green-500 shrink-0" />}
             <p className="text-sm text-gray-400" dir="rtl">
               {demoValue === 'concat' 
                 ? 'اگر اعداد داخل کوتیشن "" باشند، n8n آن‌ها را به هم می‌چسباند (Concatenation).' 
                 : 'برای عملیات ریاضی، داده‌ها باید حتماً از جنس عدد (Integer) باشند.'}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};