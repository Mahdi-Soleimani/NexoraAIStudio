import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const Contact: React.FC = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    subject: 'مشاوره عمومی AI',
    message: ''
  });

  // Status state
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name || !formData.phone) {
      setStatus('error');
      setErrorMessage('لطفاً نام و شماره تماس خود را وارد کنید.');
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact_form', // Tag for n8n routing
          ...formData,
          submitted_at: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setStatus('success');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          company: '',
          subject: 'مشاوره عمومی AI',
          message: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage('خطایی در ارسال پیام پیش آمد. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-6">تماس با نکسورا</h1>
            <p className="text-slate-400 leading-relaxed">
              برای مشاوره رایگان یا شروع یک پروژه جدید، فرم روبرو را پر کنید یا از طریق راه‌های ارتباطی زیر با ما در تماس باشید.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface border border-slate-800 flex items-center justify-center text-primary shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">تلفن تماس</h3>
                <p className="text-slate-400 ltr text-right" dir="ltr">021 - 88 12 34 56</p>
                <p className="text-slate-500 text-sm">شنبه تا چهارشنبه، ۹ تا ۱۷</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface border border-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">ایمیل</h3>
                <p className="text-slate-400 font-mono">hello@nexora.ai</p>
                <p className="text-slate-500 text-sm">پاسخگویی در کمتر از ۲ ساعت</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface border border-slate-800 flex items-center justify-center text-purple-400 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">دفتر مرکزی</h3>
                <p className="text-slate-400">تهران، خیابان ولیعصر، پارک علم و فناوری</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-surface p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <h2 className="text-2xl font-bold text-white mb-6">فرم درخواست مشاوره</h2>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">نام و نام خانوادگی</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">شماره تماس</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-slate-400 text-sm mb-2">نام سازمان / شرکت</label>
              <input 
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50" 
              />
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-2">موضوع درخواست</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              >
                <option>مشاوره عمومی AI</option>
                <option>سفارش ربات تلگرام</option>
                <option>اتوماسیون اداری</option>
                <option>سایر موارد</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-sm mb-2">توضیحات تکمیلی</label>
              <textarea 
                rows={4} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
              ></textarea>
            </div>

            <Button 
              className="w-full gap-2 text-lg" 
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  در حال ارسال...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle size={20} />
                  درخواست ثبت شد
                </>
              ) : (
                <>
                  ارسال درخواست
                  <Send size={18} />
                </>
              )}
            </Button>

            {/* Error Message */}
            {status === 'error' && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} />
                {errorMessage}
              </div>
            )}

            {/* Success Message Detail */}
            {status === 'success' && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center text-green-400 text-sm animate-in fade-in slide-in-from-top-2">
                پیام شما با موفقیت دریافت شد. کارشناسان ما به زودی با شما تماس خواهند گرفت.
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;