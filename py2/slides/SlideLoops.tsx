import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideProps, CodeLanguage } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { RefreshCw, Mail, Play, ArrowRight, Layers, Zap } from 'lucide-react';

export const SlideLoops: React.FC<SlideProps> = ({ isActive, onLog }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const users = ["ali@gmail.com", "reza@yahoo.com", "sara@outlook.com", "mina@gmail.com"];

    if (!isActive) return null;

    const pythonCode = `# لیست کاربران (آرایه/لیست)
users = ["ali@gmail.com", "reza@yahoo.com", "sara@outlook.com", "mina@gmail.com"]

# حلقه For (پیمایشگر)
for user_email in users:
    print(f"Sending email to: {user_email}...")
    # اینجا کد ارسال ایمیل قرار می‌گیره
    
print("همه ایمیل‌ها ارسال شدند! ✅")`;

    const runLoop = async () => {
        setIsRunning(true);
        setCurrentIndex(-1);
        onLog('شروع حلقه for...', 'info');

        for (let i = 0; i < users.length; i++) {
            setCurrentIndex(i);
            onLog(`Iteration ${i + 1}: user_email = "${users[i]}"`, 'info');
            await new Promise(resolve => setTimeout(resolve, 800));
            onLog(`📧 Sending email to: ${users[i]}...`, 'success');
            await new Promise(resolve => setTimeout(resolve, 400));
        }

        setCurrentIndex(-1);
        setIsRunning(false);
        onLog('همه ایمیل‌ها ارسال شدند! ✅', 'success');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-start p-4 overflow-y-auto">
            {/* Left: Explanation */}
            <div className="space-y-6" dir="rtl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-3xl font-bold text-nexora-100 border-r-4 border-blue-500 pr-4 flex items-center gap-3">
                        <RefreshCw className="w-8 h-8 text-blue-400" />
                        حلقه‌ها (Loops)
                    </h2>
                    <p className="text-gray-400 mt-2">قدرت تکرار بی‌نهایت</p>
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
                        <span className="font-bold text-yellow-400">مفهوم کلیدی</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                        انجام یک کار تکراری روی یک لیست از آیتم‌ها.
                        به جای نوشتن ۱۰۰ خط کد، یک حلقه می‌نویسیم!
                    </p>
                </motion.div>

                {/* Code Block */}
                <CodeBlock
                    language={CodeLanguage.PYTHON}
                    code={pythonCode}
                    title="Email Loop Example"
                    highlightLines={[5, 6, 7]}
                />

                {/* Run Button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={runLoop}
                    disabled={isRunning}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                    <Play size={18} />
                    {isRunning ? 'در حال اجرا...' : 'اجرای حلقه'}
                </motion.button>

                {/* Visual Loop Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-nexora-card rounded-xl p-4 border border-gray-700"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <span className="text-gray-300 text-sm font-bold">آیتم‌های لیست:</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {users.map((email, index) => (
                            <motion.div
                                key={email}
                                animate={{
                                    scale: currentIndex === index ? 1.1 : 1,
                                    backgroundColor: currentIndex === index ? 'rgba(59, 130, 246, 0.3)' : 'rgba(55, 65, 81, 0.5)',
                                    borderColor: currentIndex === index ? 'rgb(59, 130, 246)' : 'rgb(75, 85, 99)'
                                }}
                                className="px-3 py-2 rounded-lg border text-sm font-mono transition-all"
                            >
                                {currentIndex === index && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-blue-400 mr-2"
                                    >
                                        →
                                    </motion.span>
                                )}
                                <span className={currentIndex === index ? 'text-blue-300' : 'text-gray-400'}>
                                    {email}
                                </span>
                                {currentIndex === index && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-green-400 ml-2"
                                    >
                                        ✓
                                    </motion.span>
                                )}
                            </motion.div>
                        ))}
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

                    <div className="mt-6 space-y-4" dir="rtl">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Layers className="w-6 h-6 text-n8n-red" />
                            نکته طلایی درباره n8n
                        </h3>

                        {/* Auto Loop */}
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                            <p className="text-green-300 text-sm font-bold mb-2">✨ خبر خوب:</p>
                            <p className="text-gray-300 text-sm">
                                در n8n، اکثر نودها به صورت اتوماتیک این حلقه را دارند!
                                یعنی اگر ۵ تا آیتم به نود Gmail بدید، خودش ۵ بار اجرا میشه.
                            </p>
                        </div>

                        {/* Why Learn */}
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                            <p className="text-yellow-300 text-sm font-bold mb-2">❓ پس چرا یاد بگیریم؟</p>
                            <ul className="text-gray-300 text-sm space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400">•</span>
                                    گاهی لازمه این رفتار رو کنترل کنیم
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400">•</span>
                                    نود <span className="font-mono text-blue-400">Split In Batches</span> دقیقاً همین حلقه‌ست
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-400">•</span>
                                    در نود <span className="font-mono text-purple-400">Code</span> باید بلد باشید حلقه بنویسید
                                </li>
                            </ul>
                        </div>

                        {/* Visual Split Batches */}
                        <div className="bg-[#0d1117] rounded-xl p-6">
                            <div className="text-center mb-4">
                                <span className="text-xs text-gray-500">نود Split In Batches</span>
                            </div>

                            <div className="flex items-center justify-center gap-4">
                                {/* Items */}
                                <div className="flex flex-col gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-8 h-4 bg-blue-500/30 rounded text-[10px] text-center text-blue-300">{i}</div>
                                    ))}
                                </div>

                                <ArrowRight className="text-gray-600" />

                                {/* Split Node */}
                                <div className="w-16 h-16 rounded-lg bg-purple-500/20 border-2 border-purple-500 flex flex-col items-center justify-center">
                                    <Layers className="w-6 h-6 text-purple-400" />
                                    <span className="text-[8px] text-gray-400 mt-1">10 تا 10 تا</span>
                                </div>

                                <ArrowRight className="text-gray-600" />

                                {/* Batches */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-1">
                                        <div className="w-4 h-4 bg-green-500/40 rounded text-[8px] text-center text-green-300">1</div>
                                        <div className="w-4 h-4 bg-green-500/40 rounded text-[8px] text-center text-green-300">2</div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-4 h-4 bg-green-500/40 rounded text-[8px] text-center text-green-300">3</div>
                                        <div className="w-4 h-4 bg-green-500/40 rounded text-[8px] text-center text-green-300">4</div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-4 h-4 bg-green-500/40 rounded text-[8px] text-center text-green-300">5</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
