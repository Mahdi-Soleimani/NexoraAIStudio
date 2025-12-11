import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps, CodeLanguage } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { BookOpen, Rocket, CheckCircle, Lightbulb, Globe } from 'lucide-react';

export const SlideSummary: React.FC<SlideProps> = ({ isActive }) => {
    if (!isActive) return null;

    const exerciseCode = `# تمرین: فیلتر قیمت‌های زیر ۵۰۰ هزار تومن
prices = [250000, 800000, 150000, 1200000, 450000, 600000]

# لیست خالی برای ذخیره قیمت‌های کم
cheap_items = []

# حلقه و شرط
for price in prices:
    if price < 500000:
        cheap_items.append(price)
        print(f"✅ قیمت {price} اضافه شد")

print("قیمت‌های ارزان:", cheap_items)`;

    const concepts = [
        { icon: '🔀', title: 'شرط‌ها (if/else)', desc: 'تصمیم‌گیری بر اساس True/False', color: 'green' },
        { icon: '🔄', title: 'حلقه‌ها (for)', desc: 'تکرار کار روی لیست آیتم‌ها', color: 'blue' },
        { icon: '📦', title: 'توابع (def)', desc: 'ورودی ← پردازش ← خروجی', color: 'purple' },
    ];

    return (
        <div className="flex flex-col items-center justify-start h-full px-4 py-6 overflow-y-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h2 className="text-4xl font-bold text-white mb-2" dir="rtl">
                    🎉 جمع‌بندی قسمت ۲
                </h2>
                <p className="text-gray-400" dir="rtl">منطق ربات‌سازی - شرط‌ها، حلقه‌ها و توابع</p>
            </motion.div>

            {/* Concepts Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8"
            >
                {concepts.map((concept, index) => (
                    <motion.div
                        key={concept.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`glass rounded-xl p-4 text-center border-t-2 ${concept.color === 'green' ? 'border-t-green-500' :
                                concept.color === 'blue' ? 'border-t-blue-500' :
                                    'border-t-purple-500'
                            }`}
                    >
                        <div className="text-4xl mb-3">{concept.icon}</div>
                        <h3 className="font-bold text-white mb-2" dir="rtl">{concept.title}</h3>
                        <p className="text-gray-400 text-sm" dir="rtl">{concept.desc}</p>
                        <CheckCircle className={`w-5 h-5 mx-auto mt-3 ${concept.color === 'green' ? 'text-green-400' :
                                concept.color === 'blue' ? 'text-blue-400' :
                                    'text-purple-400'
                            }`} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Exercise */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-4xl"
            >
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4" dir="rtl">
                        <BookOpen className="w-6 h-6 text-yellow-400" />
                        <h3 className="text-xl font-bold text-yellow-400">تمرین برای شما 📝</h3>
                    </div>

                    <p className="text-gray-300 mb-4" dir="rtl">
                        یک لیست قیمت بسازید، و با پایتون کدی بنویسید که فقط قیمت‌های زیر ۵۰۰ هزار تومن رو چاپ کنه:
                    </p>

                    <CodeBlock
                        language={CodeLanguage.PYTHON}
                        code={exerciseCode}
                        title="Exercise: Price Filter"
                    />
                </div>
            </motion.div>

            {/* Next Episode Teaser */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 max-w-2xl"
            >
                <div className="bg-gradient-to-r from-nexora-900/50 to-purple-900/50 border border-nexora-500/30 rounded-2xl p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Rocket className="w-8 h-8 text-nexora-500 animate-bounce" />
                        <h3 className="text-xl font-bold text-white" dir="rtl">قسمت بعدی...</h3>
                    </div>

                    <p className="text-gray-300 text-lg" dir="rtl">
                        حالا که منطق رو یاد گرفتیم، قسمت بعدی می‌ریم سراغ جذاب‌ترین بخش:
                    </p>

                    <div className="flex items-center justify-center gap-3 mt-4">
                        <Globe className="w-10 h-10 text-cyan-400" />
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            حرف زدن با اینترنت (API)!
                        </span>
                    </div>

                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full"
                    >
                        <Lightbulb className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-300 text-sm font-medium">به زودی...</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-8 text-center"
            >
                <p className="text-gray-500 text-sm" dir="rtl">
                    ما رو در شبکه‌های اجتماعی دنبال کنید! 🚀
                </p>
            </motion.div>
        </div>
    );
};
