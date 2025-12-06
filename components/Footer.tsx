import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Linkedin, Twitter, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-white">
                <Cpu size={18} />
              </div>
              <span className="font-bold text-xl text-white">نکسورا</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              پیشرو در ارائه راهکارهای هوشمند سازمانی. ما با تلفیق هوش مصنوعی و خلاقیت، آینده کسب‌وکار شما را متحول می‌کنیم.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><Github size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">دسترسی سریع</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-400 hover:text-primary transition-colors text-sm">درباره نکسورا</Link></li>
              <li><Link to="/portfolio" className="text-slate-400 hover:text-primary transition-colors text-sm">نمونه‌کارها</Link></li>
              <li><Link to="/careers" className="text-slate-400 hover:text-primary transition-colors text-sm">فرصت‌های شغلی</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-primary transition-colors text-sm">تماس با ما</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6">خدمات</h3>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-slate-400 hover:text-primary transition-colors text-sm">هوش مصنوعی و ML</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-primary transition-colors text-sm">اتوماسیون اداری</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-primary transition-colors text-sm">ربات‌های تلگرام</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-primary transition-colors text-sm">تحلیل داده</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6">خبرنامه</h3>
            <p className="text-slate-400 text-sm mb-4">برای دریافت آخرین اخبار تکنولوژی عضو شوید.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="ایمیل خود را وارد کنید" 
                className="bg-slate-950 border border-slate-700 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors w-full"
              />
              <button className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors border border-slate-700">
                عضویت
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © ۱۴۰۴ تمامی حقوق برای نکسورا استودیو محفوظ است.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-xs">قوانین و مقررات</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs">حریم خصوصی</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;