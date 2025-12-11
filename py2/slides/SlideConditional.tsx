import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideProps, CodeLanguage } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { GitBranch, CheckCircle, XCircle, ArrowRight, Zap, Play } from 'lucide-react';

export const SlideConditional: React.FC<SlideProps> = ({ isActive, onLog }) => {
    const [cartTotal, setCartTotal] = useState(1200000);
    const [hasDiscount, setHasDiscount] = useState<boolean | null>(null);

    if (!isActive) return null;

    const pythonCode = `# سناریو: تخفیف فروشگاه اینترنتی
cart_total = ${cartTotal}  # مبلغ سبد خرید

if cart_total > 1000000:
    print("تخفیف ویژه فعال شد! ✅")
    final_price = cart_total * 0.9  # ۱۰٪ تخفیف
else:
    print("تخفیفی شامل نشد ❌")
    final_price = cart_total

print(f"قیمت نهایی: {final_price}")`;

    const runSimulation = () => {
        const discount = cartTotal > 1000000;
        setHasDiscount(discount);

        if (discount) {
            onLog(`سبد خرید: ${cartTotal.toLocaleString()} تومان`, 'info');
            onLog('شرط بررسی شد: cart_total > 1000000 → True', 'info');
            onLog('تخفیف ویژه فعال شد! ✅', 'success');
            const final = cartTotal * 0.9;
            onLog(`قیمت نهایی با ۱۰٪ تخفیف: ${final.toLocaleString()} تومان`, 'success');
        } else {
            onLog(`سبد خرید: ${cartTotal.toLocaleString()} تومان`, 'info');
            onLog('شرط بررسی شد: cart_total > 1000000 → False', 'info');
            onLog('تخفیفی شامل نشد ❌', 'warning');
            onLog(`قیمت نهایی: ${cartTotal.toLocaleString()} تومان`, 'warning');
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-start p-4 overflow-y-auto">
            {/* Left: Explanation */}
            <div className="space-y-6" dir="rtl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-3xl font-bold text-nexora-100 border-r-4 border-green-500 pr-4 flex items-center gap-3">
                        <GitBranch className="w-8 h-8 text-green-400" />
                        شرط‌ها (Conditional Logic)
                    </h2>
                    <p className="text-gray-400 mt-2">مغز متفکر ربات شما</p>
                </motion.div>

                {/* Key Concept */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-xl p-4"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold text-yellow-400">نکته کلیدی</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                        کامپیوترها فقط صفر و یک (True/False) می‌فهمند.
                        هر شرط یا درسته (True) یا غلط (False).
                    </p>
                </motion.div>

                {/* Code Block */}
                <CodeBlock
                    language={CodeLanguage.PYTHON}
                    code={pythonCode}
                    title="Store Discount Logic"
                    highlightLines={[4, 5, 6, 7, 8, 9]}
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
                            <label className="text-gray-300 text-sm">مبلغ سبد خرید (تومان):</label>
                            <input
                                type="range"
                                min={500000}
                                max={2000000}
                                step={100000}
                                value={cartTotal}
                                onChange={(e) => {
                                    setCartTotal(Number(e.target.value));
                                    setHasDiscount(null);
                                }}
                                className="w-40 accent-nexora-500"
                            />
                            <span className="font-mono text-nexora-400 font-bold">
                                {cartTotal.toLocaleString()}
                            </span>
                        </div>

                        <button
                            onClick={runSimulation}
                            className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                        >
                            <Play size={18} />
                            اجرای شرط
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Right: n8n Connection */}
            <div className="space-y-6">
                {/* n8n IF Node */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-nexora-card rounded-2xl p-6 border border-gray-700 relative"
                >
                    <div className="absolute top-0 right-0 px-3 py-1 bg-n8n-red/20 rounded-bl-xl border-l border-b border-n8n-red/30 text-xs text-n8n-red font-mono">
                        🔗 اتصال به n8n
                    </div>

                    <div className="mt-6 space-y-4" dir="rtl">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="w-8 h-8 rounded bg-n8n-red/20 flex items-center justify-center text-n8n-red text-sm">IF</span>
                            نود If در n8n
                        </h3>

                        <p className="text-gray-400 text-sm">
                            اون کادری که توش شرط می‌نویسید (مثلاً <code className="text-nexora-400">Price {'>'} 1000</code>)،
                            دقیقاً همین خط <code className="text-purple-400">if</code> پایتونه!
                        </p>

                        {/* Visual If Node */}
                        <div className="bg-[#0d1117] rounded-xl p-6 mt-4">
                            <div className="flex items-center justify-center gap-8">
                                {/* Input */}
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-lg bg-gray-700/50 border-2 border-gray-600 flex items-center justify-center">
                                        <span className="text-xs text-gray-400">Data</span>
                                    </div>
                                </div>

                                <ArrowRight className="text-gray-600" />

                                {/* IF Node */}
                                <div className="relative">
                                    <motion.div
                                        animate={hasDiscount !== null ? { scale: [1, 1.1, 1] } : {}}
                                        className="w-20 h-20 rounded-lg bg-n8n-red/20 border-2 border-n8n-red flex flex-col items-center justify-center"
                                    >
                                        <span className="font-bold text-n8n-red">IF</span>
                                        <span className="text-[10px] text-gray-400 mt-1">{'>'} 1M</span>
                                    </motion.div>

                                    {/* Branches */}
                                    <div className="absolute -right-8 top-1 text-[10px] text-green-400">True</div>
                                    <div className="absolute -right-8 bottom-1 text-[10px] text-red-400">False</div>
                                </div>

                                {/* Outputs */}
                                <div className="flex flex-col gap-4">
                                    <AnimatePresence>
                                        <motion.div
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${hasDiscount === true ? 'bg-green-500/20 border border-green-500' : 'bg-gray-800/50 border border-gray-700'
                                                }`}
                                        >
                                            <CheckCircle className={`w-4 h-4 ${hasDiscount === true ? 'text-green-400' : 'text-gray-600'}`} />
                                            <span className={`text-xs ${hasDiscount === true ? 'text-green-400' : 'text-gray-500'}`}>تخفیف</span>
                                        </motion.div>
                                    </AnimatePresence>

                                    <motion.div
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${hasDiscount === false ? 'bg-red-500/20 border border-red-500' : 'bg-gray-800/50 border border-gray-700'
                                            }`}
                                    >
                                        <XCircle className={`w-4 h-4 ${hasDiscount === false ? 'text-red-400' : 'text-gray-600'}`} />
                                        <span className={`text-xs ${hasDiscount === false ? 'text-red-400' : 'text-gray-500'}`}>بدون تخفیف</span>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Switch Node Tip */}
                        <div className="flex items-start gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg mt-4">
                            <span className="text-purple-400 text-lg">💡</span>
                            <p className="text-purple-300 text-xs">
                                <strong>نکته:</strong> وقتی بیشتر از ۲ حالت داریم (مثلاً if / elif / else)،
                                از نود <span className="font-mono text-purple-400">Switch</span> استفاده می‌کنیم.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
