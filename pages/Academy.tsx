import React, { useState } from 'react';
import { PlayCircle, FileText, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const Academy: React.FC = () => {
  const [email, setEmail] = useState('');
  const [honeyPot, setHoneyPot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security Check: Honeypot for bots
    if (honeyPot) {
      console.log("Bot detected!");
      setStatus('success'); // Fake success
      return;
    }

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('لطفاً یک ایمیل معتبر وارد کنید.');
      return;
    }

    // Use CORS Proxy + Webhook URL from .env
    const webhookUrl = import.meta.env.VITE_NEWSLETTER_WEBHOOK;

    if (!webhookUrl) {
      console.error('Webhook URL is not defined');
      setStatus('error');
      setErrorMessage('خطای تنظیمات سیستم.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'newsletter', // <--- شناسه مهم برای تفکیک در n8n
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
      console.error('Subscription error:', error);
      setStatus('error');
      setErrorMessage('مشکلی در برقراری ارتباط پیش آمد. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">آکادمی نکسورا</h1>
        <p className="text-slate-400">یادگیری هوش مصنوعی به زبان ساده</p>
      </div>

      {/* Featured Video */}
      <section className="bg-surface border border-slate-800 rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-bold mb-4 w-fit">ویدیو آموزشی جدید</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">چگونه هوش مصنوعی جایگزین کارمندان نمی‌شود، بلکه آن‌ها را قدرتمندتر می‌کند؟</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              در این وبینار تخصصی، به بررسی نقش ابزارهای AI در افزایش بهره‌وری تیم‌های انسانی می‌پردازیم و ترس‌های رایج را بررسی می‌کنیم.
            </p>
            <Button className="w-fit gap-2">
              <PlayCircle size={20} />
              مشاهده ویدیو
            </Button>
          </div>
          <div className="bg-slate-900 relative h-64 md:h-auto">
            <img src="https://picsum.photos/800/600?random=20" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Video cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 cursor-pointer hover:scale-110 transition-transform">
                <PlayCircle className="text-white w-8 h-8 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">آخرین مقالات</h2>
          <button className="text-primary hover:text-white transition-colors text-sm">مشاهده همه</button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <article key={item} className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden mb-4 border border-slate-800">
                <img src={`https://picsum.photos/600/400?random=${20+item}`} alt="Article" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <FileText size={14} />
                <span>۵ دقیقه مطالعه</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span>۲ روز پیش</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">۵ ابزار هوش مصنوعی که هر مدیری باید بشناسد</h3>
              <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                معرفی ابزارهایی که می‌توانند در مدیریت پروژه، زمان‌بندی و تحلیل داده‌ها به شما کمک کنند.
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Box */}
      <section className="bg-gradient-to-r from-primary to-indigo-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <Mail className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">عضویت در خبرنامه تخصصی AI</h2>
          <p className="text-white/80 mb-8">
            هفته‌ای یک ایمیل، حاوی جدیدترین اخبار و آموزش‌های کاربردی هوش مصنوعی. بدون اسپم.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative" onSubmit={handleSubscribe}>
            
            {/* Honeypot Field */}
            <div className="hidden opacity-0 w-0 h-0 overflow-hidden pointer-events-none">
              <label htmlFor="user_address_verify">Address Verification</label>
              <input 
                type="text" 
                id="user_address_verify" 
                name="user_address_verify" 
                tabIndex={-1} 
                autoComplete="off"
                value={honeyPot}
                onChange={(e) => setHoneyPot(e.target.value)}
              />
            </div>

            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید" 
              disabled={status === 'loading' || status === 'success'}
              className="flex-grow bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button 
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : status === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                'عضویت'
              )}
            </button>
          </form>

          {/* Feedback Messages */}
          {status === 'success' && (
            <div className="mt-4 text-green-300 bg-green-500/20 py-2 px-4 rounded-lg inline-flex items-center gap-2 text-sm animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle size={16} />
              ایمیل شما با موفقیت ثبت شد. به جمع ما خوش آمدید!
            </div>
          )}
          
          {status === 'error' && (
            <div className="mt-4 text-red-200 bg-red-500/20 py-2 px-4 rounded-lg inline-flex items-center gap-2 text-sm animate-in fade-in slide-in-from-bottom-2">
              <AlertCircle size={16} />
              {errorMessage}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Academy;