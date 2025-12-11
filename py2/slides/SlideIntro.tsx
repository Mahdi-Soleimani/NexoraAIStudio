import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from '../types';
import { Bot, BrainCircuit, GitBranch, RefreshCw, MessageCircle } from 'lucide-react';

export const SlideIntro: React.FC<SlideProps> = ({ isActive }) => {
    if (!isActive) return null;

    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-4">
            {/* Episode Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1 rounded-full bg-nexora-900/50 border border-nexora-500/30 text-nexora-100 text-sm font-medium"
            >
                قسمت ۲: منطق ربات‌سازی
            </motion.div>

            {/* Main Title */}
            <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
                dir="rtl"
            >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">ربات‌های بی‌مغز!</span>
            </motion.h1>

            {/* Robot Animation */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative"
            >
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [-5, 5, -5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Bot className="w-24 h-24 text-gray-500" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-4 -right-8 bg-red-500/20 border border-red-500/50 rounded-lg px-2 py-1 text-xs text-red-400"
                >
                    ❓ چیکار کنم؟
                </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
                dir="rtl"
            >
                توی قسمت قبل یاد گرفتیم داده‌ها (Data) چی هستن. اما داده خالی به درد نمی‌خوره.
                <br />
                <span className="text-yellow-400 font-bold">یه ربات اگه فقط داده داشته باشه ولی ندونه باهاش چیکار کنه، یه ربات احمقه!</span>
            </motion.p>

            {/* Key Concept */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass rounded-2xl p-6 max-w-md"
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <BrainCircuit className="w-8 h-8 text-nexora-500" />
                    <span className="text-xl font-bold text-white" dir="rtl">شعور = قدرت تصمیم‌گیری</span>
                </div>
                <p className="text-gray-400 text-sm" dir="rtl">
                    ما نیاز داریم به رباتمون "شعور" بدیم تا بتونه تصمیم بگیره.
                </p>
            </motion.div>

            {/* Example Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-8">
                <FeatureCard
                    icon={<GitBranch className="w-6 h-6 text-green-400" />}
                    title="شرط‌ها"
                    desc="if / else"
                    delay={0.6}
                />
                <FeatureCard
                    icon={<RefreshCw className="w-6 h-6 text-blue-400" />}
                    title="حلقه‌ها"
                    desc="for / while"
                    delay={0.7}
                />
                <FeatureCard
                    icon={<MessageCircle className="w-6 h-6 text-purple-400" />}
                    title="توابع"
                    desc="def function()"
                    delay={0.8}
                />
            </div>

            {/* Real Example */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl max-w-lg"
            >
                <p className="text-green-300 text-sm font-mono" dir="rtl">
                    🎯 <strong>مثال:</strong> اگر مشتری پول داد ← محصول رو بفرست
                    <br />
                    اگر نداد ← ایمیل یادآوری بفرست
                </p>
            </motion.div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="glass p-4 rounded-xl flex flex-col items-center hover:border-nexora-500/50 transition-all group cursor-default"
    >
        <div className="mb-3 bg-gray-800 p-3 rounded-full group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-1" dir="rtl">{title}</h3>
        <p className="text-gray-500 text-xs font-mono">{desc}</p>
    </motion.div>
);
