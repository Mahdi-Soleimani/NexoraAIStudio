import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from '../types';
import { Binary, ArrowRight, BrainCircuit } from 'lucide-react';
import { Tooltip, TERMS } from '../components/Tooltip';

export const SlideIntro: React.FC<SlideProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block px-4 py-1 rounded-full bg-nexora-900/50 border border-nexora-500/30 text-nexora-100 text-sm font-medium mb-4"
      >
        Episode 1: Data Mindset
      </motion.div>

      <motion.h1 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-6xl font-extrabold text-white tracking-tight"
      >
        زبان مشترک <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexora-500 to-purple-500">داده‌ها</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-gray-400 max-w-2xl leading-relaxed dir-rtl"
        dir="rtl"
      >
        در n8n تمام اطلاعاتی که بین <Tooltip term="NODE" definition={TERMS.NODE}>نودها</Tooltip> جابجا میشه، یک زبان مشترک دارند. اگر اون زبان رو بلد نباشید، فقط دارید دکمه‌ها رو شانسی می‌زنید.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-12">
        <Card 
          icon={<Binary className="w-8 h-8 text-yellow-400" />} 
          title="Python" 
          desc="ساده‌ترین راه برای درک منطق" 
          delay={0.3} 
        />
        <div className="hidden md:flex items-center justify-center">
             <ArrowRight className="w-8 h-8 text-gray-600 animate-pulse" />
        </div>
        <Card 
          icon={<BrainCircuit className="w-8 h-8 text-nexora-500" />} 
          title="Data Structure" 
          desc="زیر کاپوت n8n" 
          delay={0.5} 
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg max-w-lg"
      >
         <p className="text-yellow-200 text-sm text-center" dir="rtl">
           ما از پایتون استفاده می‌کنیم چون تمیزترین راه برای درک ساختاره، حتی اگر n8n با جاوا اسکریپت کار کنه.
         </p>
      </motion.div>
    </div>
  );
};

const Card = ({ icon, title, desc, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-nexora-card border border-gray-700 p-6 rounded-xl flex flex-col items-center hover:border-nexora-500 transition-colors"
  >
    <div className="mb-4 bg-gray-800 p-3 rounded-full">{icon}</div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm" dir="rtl">{desc}</p>
  </motion.div>
);