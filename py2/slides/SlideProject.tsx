import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideProps, CodeLanguage } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { Filter, Play, Check, X, Sparkles, ArrowRight } from 'lucide-react';

export const SlideProject: React.FC<SlideProps> = ({ isActive, onLog }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1);
    const [processedScores, setProcessedScores] = useState<{ score: number; passed: boolean | null }[]>([
        { score: 15, passed: null },
        { score: 8, passed: null },
        { score: 20, passed: null },
        { score: 9, passed: null },
        { score: 12, passed: null },
        { score: 5, passed: null },
    ]);
    const [passedList, setPassedList] = useState<number[]>([]);

    if (!isActive) return null;

    const pythonCode = `# ۱. داده‌های ورودی (لیست نمرات)
scores = [15, 8, 20, 9, 12, 5]

# ۲. لیست خالی برای ذخیره قبول‌شدگان
passed_students = []

# ۳. حلقه و شرط (منطق اصلی)
for score in scores:
    if score >= 10:
        passed_students.append(score)  # اضافه به لیست جدید
    else:
        print(f"نمره {score} رد شد.")

# ۴. خروجی نهایی
print("لیست قبولی‌ها:", passed_students)`;

    const runProject = async () => {
        setIsRunning(true);
        setCurrentStep(-1);
        setPassedList([]);
        setProcessedScores(scores => scores.map(s => ({ ...s, passed: null })));

        onLog('🚀 شروع پروژه: فیلتر نمرات قبولی', 'info');
        onLog('scores = [15, 8, 20, 9, 12, 5]', 'info');
        onLog('passed_students = []', 'info');
        await new Promise(r => setTimeout(r, 500));

        const scores = [15, 8, 20, 9, 12, 5];
        const passed: number[] = [];

        for (let i = 0; i < scores.length; i++) {
            setCurrentStep(i);
            const score = scores[i];

            onLog(`\n🔄 Iteration ${i + 1}: score = ${score}`, 'info');
            await new Promise(r => setTimeout(r, 400));

            if (score >= 10) {
                passed.push(score);
                setPassedList([...passed]);
                setProcessedScores(prev => prev.map((s, idx) => idx === i ? { ...s, passed: true } : s));
                onLog(`✅ ${score} >= 10 → اضافه به لیست قبولی‌ها`, 'success');
            } else {
                setProcessedScores(prev => prev.map((s, idx) => idx === i ? { ...s, passed: false } : s));
                onLog(`❌ نمره ${score} رد شد.`, 'warning');
            }

            await new Promise(r => setTimeout(r, 600));
        }

        setCurrentStep(-1);
        onLog(`\n🎉 لیست قبولی‌ها: [${passed.join(', ')}]`, 'success');
        setIsRunning(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-start p-4 overflow-y-auto">
            {/* Left: Code */}
            <div className="space-y-6" dir="rtl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-3xl font-bold text-nexora-100 border-r-4 border-yellow-500 pr-4 flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-yellow-400" />
                        پروژه عملی نهایی
                    </h2>
                    <p className="text-gray-400 mt-2">ترکیب همه چیز: لیست + حلقه + شرط</p>
                </motion.div>

                {/* Scenario */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-xl p-4"
                >
                    <p className="text-gray-300 text-sm">
                        <span className="text-yellow-400 font-bold">سناریو:</span> ما یک لیست نمره داریم. می‌خوایم رباتی بنویسیم که فقط نمرات قبولی (بالای ۱۰) رو جدا کنه.
                    </p>
                </motion.div>

                {/* Code Block */}
                <CodeBlock
                    language={CodeLanguage.PYTHON}
                    code={pythonCode}
                    title="Smart Score Filter"
                    highlightLines={[8, 9, 10, 11, 12]}
                />

                {/* Run Button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={runProject}
                    disabled={isRunning}
                    className="w-full py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-lg"
                >
                    <Play size={20} />
                    {isRunning ? 'در حال اجرا...' : '🧪 اجرای پروژه'}
                </motion.button>
            </div>

            {/* Right: Visualization */}
            <div className="space-y-6">
                {/* Score Cards */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-nexora-card rounded-2xl p-6 border border-gray-700"
                >
                    <h3 className="text-lg font-bold text-white mb-4" dir="rtl">لیست نمرات:</h3>

                    <div className="grid grid-cols-6 gap-3">
                        {processedScores.map((item, index) => (
                            <motion.div
                                key={index}
                                animate={{
                                    scale: currentStep === index ? 1.2 : 1,
                                    borderColor: currentStep === index ? '#facc15' :
                                        item.passed === true ? '#22c55e' :
                                            item.passed === false ? '#ef4444' : '#4b5563'
                                }}
                                className={`relative aspect-square rounded-xl border-2 flex items-center justify-center font-bold text-xl transition-all ${item.passed === true ? 'bg-green-500/20' :
                                        item.passed === false ? 'bg-red-500/20' :
                                            'bg-gray-800/50'
                                    }`}
                            >
                                <span className={
                                    item.passed === true ? 'text-green-400' :
                                        item.passed === false ? 'text-red-400' :
                                            'text-gray-300'
                                }>
                                    {item.score}
                                </span>

                                {item.passed !== null && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center ${item.passed ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                    >
                                        {item.passed ? <Check size={12} /> : <X size={12} />}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Passed List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6"
                >
                    <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2" dir="rtl">
                        <Filter className="w-5 h-5" />
                        لیست قبولی‌ها (passed_students):
                    </h3>

                    <div className="flex items-center gap-2 font-mono text-lg">
                        <span className="text-gray-500">[</span>
                        <AnimatePresence>
                            {passedList.map((score, index) => (
                                <motion.span
                                    key={`${score}-${index}`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-green-400 font-bold"
                                >
                                    {score}{index < passedList.length - 1 ? ', ' : ''}
                                </motion.span>
                            ))}
                        </AnimatePresence>
                        <span className="text-gray-500">]</span>
                    </div>
                </motion.div>

                {/* n8n Connection */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-nexora-card rounded-2xl p-6 border border-gray-700 relative"
                >
                    <div className="absolute top-0 right-0 px-3 py-1 bg-n8n-red/20 rounded-bl-xl border-l border-b border-n8n-red/30 text-xs text-n8n-red font-mono">
                        🔗 اتصال به n8n
                    </div>

                    <div className="mt-4" dir="rtl">
                        <p className="text-gray-300 text-sm">
                            این کدی که زدیم، دقیقاً کاریه که نود <span className="text-n8n-red font-bold">Filter</span> در n8n انجام میده!
                        </p>

                        <div className="flex items-center justify-center gap-4 mt-4 py-4 bg-[#0d1117] rounded-xl">
                            <div className="flex flex-col gap-1">
                                {[15, 8, 20, 9, 12, 5].map((s, i) => (
                                    <div key={i} className="w-8 h-4 bg-gray-600/50 rounded text-[10px] text-center text-gray-400">{s}</div>
                                ))}
                            </div>

                            <ArrowRight className="text-gray-600" />

                            <div className="w-16 h-16 rounded-lg bg-n8n-red/20 border-2 border-n8n-red flex flex-col items-center justify-center">
                                <Filter className="w-5 h-5 text-n8n-red" />
                                <span className="text-[8px] text-gray-400 mt-1">Filter</span>
                            </div>

                            <ArrowRight className="text-gray-600" />

                            <div className="flex flex-col gap-1">
                                {[15, 20, 12].map((s, i) => (
                                    <div key={i} className="w-8 h-4 bg-green-500/40 rounded text-[10px] text-center text-green-300">{s}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
