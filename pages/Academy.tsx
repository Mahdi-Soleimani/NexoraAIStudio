import React, { useState, useRef } from 'react';
import { PlayCircle, FileText, Mail, Loader2, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import Button from '../components/Button';
import AparatPlayer from '../components/AparatPlayer';

// --- داده‌های بوت‌کمپ (برای اضافه کردن ویدیو جدید، فقط این لیست را آپدیت کنید) ---
const n8nBootcampVideos = [
  {
    id: 1,
    title: "جلسه ۰: معرفی n8n و ورود به دنیای اتوماسیون",
    hash: "nnwltfi", // هش ویدیو از لینک آپارات
    duration: "07:29",
    level: "BootCamp"
  },
];

const Academy: React.FC = () => {
  const [email, setEmail] = useState('');
  const [honeyPot, setHoneyPot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // اسکرول افقی برای ویدیوها
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef.current;
      const scrollAmount = 350; // مقدار اسکرول به پیکسل
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeyPot) return; // Bot detection

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('لطفاً یک ایمیل معتبر وارد کنید.');
      return;
    }

    const webhookUrl = import.meta.env.VITE_NEWSLETTER_WEBHOOK;
    if (!webhookUrl) {
      setStatus('error');
      setErrorMessage('خطای تنظیمات سیستم.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          email: email,
          source: 'nexora_website',
          page: 'academy',
          date: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('مشکلی پیش آمد.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">آکادمی نکسورا</h1>
        <p className="text-slate-400">یادگیری هوش مصنوعی به زبان ساده و کاربردی</p>
      </div>

      {/* --- بخش جدید: بوت‌کمپ n8n (اسکرول افقی) --- */}
      <section className="relative">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Video className="text-primary w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">بوت‌کمپ جامع n8n</h2>
              <p className="text-slate-400 text-sm">مسیر ورود به بازار کار اتوماسیون</p>
            </div>
          </div>
          
          {/* دکمه‌های نویگیشن اسکرول */}
          <div className="flex gap-2">
            <button onClick={() => scroll('right')} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700">
              <ChevronRight size={20} />
            </button>
            <button onClick={() => scroll('left')} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700">
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>

        {/* کانتینر اسکرول */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {n8nBootcampVideos.map((video) => (
            <div 
              key={video.id} 
              className="flex-shrink-0 w-[300px] md:w-[350px] snap-start bg-surface border border-slate-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="p-3">
                <AparatPlayer videoId={video.hash} title={video.title} />
              </div>
              
              <div className="px-5 pb-5 pt-2">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                  <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">{video.level}</span>
                  <span>{video.duration} دقیقه</span>
                </div>
                <h3 className="text-white font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
          
          {/* کارت "به زودی" برای انتهای لیست */}
          <div className="flex-shrink-0 w-[200px] snap-start bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center animate-pulse">
              <Video size={20} />
            </div>
            <span className="text-sm font-medium">قسمت‌های بعدی...</span>
          </div>
        </div>
      </section>

      {/* Featured Video (Existing)
      <section className="bg-surface border border-slate-800 rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-bold mb-4 w-fit">وبینار ویژه</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">چگونه هوش مصنوعی جایگزین کارمندان نمی‌شود؟</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              در این وبینار تخصصی، به بررسی نقش ابزارهای AI در افزایش بهره‌وری تیم‌های انسانی می‌پردازیم.
            </p>
            <Button className="w-fit gap-2">
              <PlayCircle size={20} />
              مشاهده در یوتیوب
            </Button>
          </div>
          <div className="bg-slate-900 relative h-64 md:h-auto overflow-hidden">
             <div className="absolute inset-0 opacity-60">
                <img src="https://picsum.photos/800/600?grayscale" className="w-full h-full object-cover" alt="cover"/>
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white/80" />
             </div>
          </div>
        </div>
      </section> */}

      {/* Newsletter Box */}
      <section className="bg-gradient-to-r from-primary to-indigo-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <Mail className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">عضویت در خبرنامه تخصصی AI</h2>
          <p className="text-white/80 mb-8">
            هفته‌ای یک ایمیل، حاوی جدیدترین اخبار و آموزش‌های کاربردی هوش مصنوعی.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative" onSubmit={handleSubscribe}>
            {/* Honeypot */}
            <input type="text" className="hidden" value={honeyPot} onChange={(e) => setHoneyPot(e.target.value)} />

            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید" 
              disabled={status === 'loading' || status === 'success'}
              className="flex-grow bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:bg-white/20 transition-all disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-70 min-w-[100px] flex justify-center items-center"
            >
              {status === 'loading' ? <Loader2 className="animate-spin w-5 h-5" /> : status === 'success' ? <CheckCircle className="w-5 h-5 text-green-600" /> : 'عضویت'}
            </button>
          </form>
          
          {status === 'success' && (
            <div className="mt-4 text-green-300 bg-green-500/20 py-2 px-4 rounded-lg inline-flex items-center gap-2 text-sm">
              <CheckCircle size={16} /> ثبت شد! منتظر خبرهای خوب باشید.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Academy;