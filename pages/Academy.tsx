import React, { useState, useRef } from 'react';
import { PlayCircle, FileText, Mail, Loader2, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Video, Code, Wrench } from 'lucide-react';
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

// --- ابزارها و دوره‌های آنلاین ---
const toolsAndCourses = [
  {
    id: 1,
    title: "پایتون برای n8n",
    description: "ساختار داده ها در n8n",
    link: "py1", // لینک به صفحه دوره - قابل تغییر توسط کاربر
    tag: "Python + n8n",
    gradient: "from-blue-600 via-purple-600 to-orange-500"
  },
];

const Academy: React.FC = () => {
  const [email, setEmail] = useState('');
  const [honeyPot, setHoneyPot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // اسکرول افقی برای ویدیوها
  const scrollRef = useRef<HTMLDivElement>(null);
  const toolsScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350; // مقدار اسکرول به پیکسل
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollTools = (direction: 'left' | 'right') => {
    if (toolsScrollRef.current) {
      const scrollAmount = 350;
      if (direction === 'left') {
        toolsScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        toolsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
              <h2 className="text-2xl font-bold text-white">بوت‌کمپ جامع n8n برای بازارکار ایران</h2>
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

      {/* --- بخش ابزارها و دوره‌های آنلاین --- */}
      <section className="relative">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-2 rounded-lg">
              <Wrench className="text-purple-400 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">ابزارها و دوره‌های آنلاین</h2>
              <p className="text-slate-400 text-sm">دسترسی به محتوای تخصصی و ابزارهای کاربردی</p>
            </div>
          </div>

          {/* دکمه‌های نویگیشن اسکرول */}
          <div className="flex gap-2">
            <button onClick={() => scrollTools('right')} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700">
              <ChevronRight size={20} />
            </button>
            <button onClick={() => scrollTools('left')} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700">
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>

        {/* کانتینر اسکرول ابزارها */}
        <div
          ref={toolsScrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {toolsAndCourses.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="flex-shrink-0 w-[320px] md:w-[380px] snap-start group block"
            >
              <div className="h-full bg-surface border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1">
                {/* Header with Animated Gradient */}
                <div className={`relative h-48 bg-gradient-to-br ${item.gradient} p-6 overflow-hidden`}>
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                  </div>

                  {/* Animated Icons */}
                  <div className="relative h-full flex items-center justify-center gap-4">
                    {/* Python Icon */}
                    <div className="relative group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-blue-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <div className="relative bg-blue-500 p-4 rounded-2xl shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                        <Code className="w-12 h-12 text-white" strokeWidth={2.5} />
                      </div>
                      {/* Python Text */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white font-bold text-sm whitespace-nowrap opacity-90">
                        Python
                      </div>
                    </div>

                    {/* Connection Animation */}
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>

                    {/* n8n Icon */}
                    <div className="relative group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-orange-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <div className="relative bg-gradient-to-br from-orange-500 to-pink-500 p-4 rounded-2xl shadow-2xl group-hover:-rotate-6 transition-transform duration-500">
                        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.5 14.5L13 9L7.5 14.5M18.5 9.5L13 15L7.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      </div>
                      {/* n8n Text */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white font-bold text-sm whitespace-nowrap opacity-90">
                        n8n
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-xs font-bold">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 text-purple-400 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>مشاهده دوره</span>
                    <ChevronLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          ))}

          {/* کارت \"به زودی\" */}
          <div className="flex-shrink-0 w-[250px] snap-start bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 gap-4 min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center animate-pulse">
              <Wrench size={24} />
            </div>
            <span className="text-sm font-medium">ابزارهای بیشتر...</span>
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