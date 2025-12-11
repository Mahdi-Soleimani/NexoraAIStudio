import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideProps, CodeLanguage } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { Container, ArrowRight, Play, Zap, Workflow } from 'lucide-react';

export const SlideFunctions: React.FC<SlideProps> = ({ isActive, onLog }) => {
    const [inputPrice, setInputPrice] = useState(100000);
    const [result, setResult] = useState<number | null>(null);

    if (!isActive) return null;

    const pythonCode = `# تعریف تابع محاسبه مالیات
def calculate_tax(price):
    tax = price * 0.09  # ۹ درصد مالیات
    return tax

# استفاده از تابع
my_tax = calculate_tax(${inputPrice})
print(f"مالیات: {my_tax}")`;

    const runFunction = () => {
        const tax = inputPrice * 0.09;
        setResult(tax);
        onLog(`ورودی تابع: price = ${inputPrice.toLocaleString()}`, 'info');
        onLog(`پردازش: tax = ${inputPrice} × 0.09`, 'info');
        onLog(`خروجی تابع: ${tax.toLocaleString()} تومان`, 'success');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-start p-4 overflow-y-auto">
            {/* Left: Explanation */}
            <div className="space-y-6" dir="rtl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-3xl font-bold text-nexora-100 border-r-4 border-purple-500 pr-4 flex items-center gap-3">
                        <Container className="w-8 h-8 text-purple-400" />
                        توابع (Functions)
                    </h2>
                    <p className="text-gray-400 mt-2">کارخانه کوچک شما</p>
                </motion.div>

                {/* Analogy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-xl p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">🍎</span>
                        <ArrowRight className="text-gray-500" />
                        <div className="w-16 h-16 rounded-xl bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                            <span className="text-2xl">🎰</span>
                        </div>
                        <ArrowRight className="text-gray-500" />
                        <span className="text-4xl">🧃</span>
                    </div>
                    <p className="text-gray-300 text-sm text-center">
                        تابع مثل یک <span className="text-yellow-400 font-bold">دستگاه آبمیوه‌گیری</span> است:
                        <br />
                        میوه (ورودی) ← پردازش ← آبمیوه (خروجی)
                    </p>
                </motion.div>

                {/* Code Block */}
                <CodeBlock
                    language={CodeLanguage.PYTHON}
                    code={pythonCode}
                    title="Tax Calculator Function"
                    highlightLines={[2, 3, 4]}
                />

                {/* Interactive Demo */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-nexora-card rounded-xl p-4 border border-gray-700"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <label className="text-gray-300 text-sm">قیمت محصول (تومان):</label>
                            <input
                                type="number"
                                value={inputPrice}
                                onChange={(e) => {
                                    setInputPrice(Number(e.target.value));
                                    setResult(null);
                                }}
                                className="w-32 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white font-mono text-right"
                            />
                        </div>

                        <button
                            onClick={runFunction}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                        >
                            <Play size={18} />
                            calculate_tax({inputPrice.toLocaleString()})
                        </button>

                        {result !== null && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                            >
                                <span className="text-gray-400 text-sm">نتیجه:</span>
                                <div className="text-2xl font-bold text-green-400 mt-1">
                                    {result.toLocaleString()} تومان
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Right: n8n Connection */}
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-nexora-card rounded-2xl p-6 border border-gray-700 relative"
                >
                    <div className="absolute top-0 right-0 px-3 py-1 bg-n8n-red/20 rounded-bl-xl border-l border-b border-n8n-red/30 text-xs text-n8n-red font-mono">
                        🔗 اتصال به n8n
                    </div>

                    <div className="mt-6 space-y-6" dir="rtl">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Workflow className="w-6 h-6 text-n8n-red" />
                            Workflow = تابع بزرگ
                        </h3>

                        {/* Workflow as Function */}
                        <div className="bg-[#0d1117] rounded-xl p-6">
                            <div className="flex items-center justify-between gap-4">
                                {/* Webhook Input */}
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-lg bg-green-500/20 border-2 border-green-500 flex flex-col items-center justify-center">
                                        <span className="text-xs text-green-400">Webhook</span>
                                        <span className="text-[8px] text-gray-500">ورودی</span>
                                    </div>
                                </div>

                                <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500 via-gray-600 to-blue-500"></div>

                                {/* Processing Nodes */}
                                <div className="flex flex-col items-center">
                                    <div className="flex gap-2">
                                        <div className="w-10 h-10 rounded bg-gray-700/50 border border-gray-600"></div>
                                        <div className="w-10 h-10 rounded bg-gray-700/50 border border-gray-600"></div>
                                        <div className="w-10 h-10 rounded bg-gray-700/50 border border-gray-600"></div>
                                    </div>
                                    <span className="text-[10px] text-gray-500 mt-2">پردازش</span>
                                </div>

                                <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-600 to-blue-500"></div>

                                {/* Response Output */}
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-lg bg-blue-500/20 border-2 border-blue-500 flex flex-col items-center justify-center">
                                        <span className="text-xs text-blue-400">Response</span>
                                        <span className="text-[8px] text-gray-500">خروجی</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm">
                            کل ورک‌فلویی که می‌سازید، در واقع یک <span className="text-purple-400 font-bold">تابع بزرگ</span> است که با Webhook (ورودی) شروع میشه و با Response (خروجی) تموم میشه.
                        </p>

                        {/* Each Node is a Function */}
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <Zap className="w-5 h-5 text-purple-400" />
                                <span className="font-bold text-purple-400">هر نود هم یک تابع کوچیکه</span>
                            </div>

                            <div className="flex items-center justify-center gap-4 py-4">
                                <div className="text-center">
                                    <div className="w-6 h-6 rounded-full bg-green-500/40 mx-auto mb-1"></div>
                                    <span className="text-[10px] text-gray-500">ورودی</span>
                                </div>
                                <ArrowRight className="text-gray-600 w-4 h-4" />
                                <div className="w-12 h-12 rounded-lg bg-n8n-red/20 border-2 border-n8n-red flex items-center justify-center">
                                    <span className="text-xs text-n8n-red">Node</span>
                                </div>
                                <ArrowRight className="text-gray-600 w-4 h-4" />
                                <div className="text-center">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/40 mx-auto mb-1"></div>
                                    <span className="text-[10px] text-gray-500">خروجی</span>
                                </div>
                            </div>

                            <p className="text-gray-400 text-xs text-center">
                                ورودی از سمت چپ ← تغییر ← خروجی از سمت راست
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
