import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ term, definition, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block border-b border-dotted border-nexora-500 cursor-help group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="text-nexora-100 font-medium">{children}</span>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 text-left"
          >
            <div className="text-nexora-500 text-xs font-bold uppercase mb-1">{term}</div>
            <div className="text-gray-300 text-sm leading-snug">{definition}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-2 border-8 border-transparent border-t-gray-900"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export const TERMS = {
  NODE: "بلوک‌های سازنده n8n که هر کدام یک کار خاص (مثل خواندن ایمیل یا تغییر داده) انجام می‌دهند.",
  WEBHOOK: "نقطه‌ای که منتظر می‌ماند تا داده‌ای از بیرون (مثل پر شدن فرم سایت) به آن ارسال شود.",
  LOOP: "تکرار یک عملیات برای تک تک آیتم‌های یک لیست (مثلاً ارسال ایمیل برای ۵ کاربر).",
  MAPPING: "وصل کردن خروجی یک نود به ورودی نود دیگر (کشیدن و رها کردن فیلدها).",
  JSON: "فرمت استاندارد جابجایی داده در وب و n8n که شباهت زیادی به Dictionary پایتون دارد.",
  ARRAY: "لیستی از آیتم‌ها که در پایتون با [] نشان داده می‌شود و n8n برای پردازش ردیف‌ها از آن استفاده می‌کند.",
  VARIABLE: "ظرفی برای نگهداری داده‌ها (مثل عدد، متن یا لیست) در حافظه.",
  TRANSFORMATION: "تغییر شکل و تمیزکردن داده‌ها (مثلاً حذف فاصله یا کوچک کردن حروف) برای قابل استفاده شدن در سیستم مقصد.",
  INTEGER: "نوع داده عدد صحیح (بدون اعشار) که برای محاسبات ریاضی استفاده می‌شود.",
  STRING: "نوع داده متنی که داخل کوتیشن (\" \") قرار می‌گیرد. حتی اگر داخل آن عدد باشد، رفتار متنی دارد.",
  KEY_VALUE: "ساختار اصلی دیکشنری که هر داده (Value) با یک نام منحصر به فرد (Key) شناخته می‌شود."
};