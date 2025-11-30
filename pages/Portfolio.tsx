import React, { useState } from 'react';
import { Project } from '../types';
import Button from '../components/Button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import ComingSoon from '../components/ComingSoon'; // <--- Import ComingSoon

const projects: Project[] = [
  {
    id: 1,
    title: "ربات پشتیبانی صرافی دیجیتال",
    category: "telegram",
    categoryLabel: "ربات تلگرام",
    description: "سیستم پاسخگویی خودکار به سوالات احراز هویت و ترید کاربران با قابلیت اتصال به دیتابیس صرافی.",
    image: "https://picsum.photos/600/400?random=10",
    results: "کاهش ۸۰٪ تیکت‌های پشتیبانی"
  },
  {
    id: 2,
    title: "سیستم کنترل کیفیت خط تولید",
    category: "vision",
    categoryLabel: "پردازش تصویر",
    description: "استفاده از دوربین‌های صنعتی و مدل‌های بینایی ماشین برای تشخیص قطعات معیوب در لحظه.",
    image: "https://picsum.photos/600/400?random=11",
    results: "افزایش دقت به ۹۹.۸٪"
  },
  {
    id: 3,
    title: "اتوماسیون صدور فاکتور و انبارداری",
    category: "automation",
    categoryLabel: "اتوماسیون اداری",
    description: "یکپارچه‌سازی نرم‌افزار حسابداری با فروشگاه اینترنتی برای صدور آنی فاکتور رسمی.",
    image: "https://picsum.photos/600/400?random=12",
    results: "صرفه‌جویی ۱۰۰ ساعت کار در ماه"
  },
  {
    id: 4,
    title: "دستیار هوشمند حقوقی",
    category: "telegram",
    categoryLabel: "ربات تلگرام",
    description: "چت‌بات آموزش‌دیده روی قوانین مدنی و کیفری برای ارائه مشاوره اولیه به موکلین.",
    image: "https://picsum.photos/600/400?random=13",
    results: "جذب ۳۰۰+ موکل جدید"
  },
  {
    id: 5,
    title: "داشبورد تحلیل رفتار مشتری",
    category: "automation",
    categoryLabel: "تحلیل داده",
    description: "پلتفرم جامع برای رصد رفتار کاربران در وب‌سایت و اپلیکیشن و پیشنهاد کمپین‌های مارکتینگ.",
    image: "https://picsum.photos/600/400?random=14",
    results: "افزایش نرخ تبدیل به ۵٪"
  },
];

const Portfolio: React.FC = () => {
  // --- TEMPORARY: Show Coming Soon Page ---
  // برای فعال‌سازی مجدد صفحه، فقط خط زیر را پاک کنید یا کامنت کنید
  return <ComingSoon />;
  // ----------------------------------------



  const [filter, setFilter] = useState<'all' | 'telegram' | 'automation' | 'vision'>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const filters = [
    { id: 'all', label: 'همه' },
    { id: 'telegram', label: 'ربات تلگرام' },
    { id: 'automation', label: 'اتوماسیون اداری' },
    { id: 'vision', label: 'پردازش تصویر' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">نمونه‌کارهای نکسورا</h1>
        <p className="text-slate-400">پروژه‌هایی که با قدرت هوش مصنوعی اجرا شده‌اند</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === f.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-surface border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-surface rounded-2xl overflow-hidden border border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
                {project.categoryLabel}
              </div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
              
              <div className="mt-auto">
                <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 mb-4">
                  <span className="block text-xs text-slate-500 mb-1">دستاورد کلیدی:</span>
                  <span className="text-green-400 font-bold text-sm">{project.results}</span>
                </div>
                
                <button className="flex items-center gap-2 text-sm text-white font-medium hover:text-primary transition-colors">
                  مشاهده جزئیات
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;