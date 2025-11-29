
import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

// --- Custom Micro-Icons for Visuals ---

const IconDataNode: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2C7 2 3 3.5 3 5C3 6.5 7 8 12 8C17 8 21 6.5 21 5C21 3.5 17 2 12 2Z" />
    <path d="M21 5V19C21 20.5 17 22 12 22C7 22 3 20.5 3 19V5" />
    <path d="M3 12C3 13.5 7 15 12 15C17 15 21 13.5 21 12" />
  </svg>
);

const IconPacket: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 8L12 14L22 8" />
    <path d="M2 16L7 13" />
    <path d="M22 16L17 13" />
  </svg>
);

const IconEnergy: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
  </svg>
);

// --- Large Custom Icons ---

const CustomAutomationIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cyanGrad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Base Structure */}
    <circle cx="32" cy="32" r="28" stroke="url(#cyanGrad)" strokeWidth="0.5" opacity="0.2" />
    <path d="M32 4V12M32 52V60M4 32H12M52 32H60" stroke="url(#cyanGrad)" strokeWidth="1" opacity="0.4" />
    
    {/* Rotating Hexagon */}
    <g className="animate-[spin_20s_linear_infinite] origin-center">
      <path d="M32 16L46 24V40L32 48L18 40V24L32 16Z" stroke="url(#cyanGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
    </g>

    {/* Inner Mechanism */}
    <circle cx="32" cy="32" r="8" stroke="url(#cyanGrad)" strokeWidth="2" />
    <path d="M32 24V32L38 38" stroke="url(#cyanGrad)" strokeWidth="2" strokeLinecap="round" />
    
    {/* Floating Elements */}
    <circle cx="50" cy="20" r="2" fill="#22d3ee" className="animate-pulse" />
    <circle cx="14" cy="44" r="2" fill="#22d3ee" className="animate-pulse delay-700" />
    
    {/* Dynamic Data Flow */}
    <path d="M10 10L20 20" stroke="url(#cyanGrad)" strokeWidth="1.5" className="animate-[pulse_3s_infinite]" />
    <path d="M54 54L44 44" stroke="url(#cyanGrad)" strokeWidth="1.5" className="animate-[pulse_3s_infinite_1s]" />
  </svg>
);

const CustomAgentIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="purpleGrad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>

    {/* Brain/Chip Outline */}
    <path d="M16 20C16 12 20 8 32 8C44 8 48 12 48 20V44C48 52 44 56 32 56C20 56 16 52 16 44V20Z" stroke="url(#purpleGrad)" strokeWidth="2" strokeLinecap="round" fill="rgba(124,58,237,0.05)" />
    
    {/* Neural Connections */}
    <path d="M22 24C22 24 26 28 32 28C38 28 42 24 42 24" stroke="url(#purpleGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M22 36C22 36 26 40 32 40C38 40 42 36 42 36" stroke="url(#purpleGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    
    {/* Central Core */}
    <circle cx="32" cy="32" r="4" fill="#a78bfa" className="animate-[pulse_2s_ease-in-out_infinite]" />
    <circle cx="32" cy="32" r="12" stroke="url(#purpleGrad)" strokeWidth="0.5" strokeDasharray="2 2" className="animate-[spin_10s_linear_infinite]" />

    {/* External Signals */}
    <path d="M8 32H12" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" className="animate-[pulse_1s_infinite]" />
    <path d="M52 32H56" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" className="animate-[pulse_1s_infinite_0.5s]" />
    <path d="M32 4V6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 58V60" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// --- Visual Components ---

const AutomationVisual: React.FC = () => (
  <div 
    className="w-full h-full min-h-[350px] bg-slate-950 relative overflow-hidden flex items-center justify-center group select-none" 
    role="img" 
    aria-label="تصویر سازی گرافیکی از سیستم اتوماسیون هوشمند فرایندها"
  >
    {/* Background Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
    
    {/* Central Hub Animation */}
    <div className="relative z-10 w-64 h-64 flex items-center justify-center">
       {/* Rotating Rings */}
       <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
       <div className="absolute inset-4 border border-dashed border-cyan-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
       
       {/* Center Core */}
       <div className="relative w-24 h-24 bg-slate-900 rounded-full border border-cyan-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.2)] z-20">
         <CustomAutomationIcon className="w-14 h-14 text-cyan-400 animate-pulse" />
         
         {/* Connecting Beams */}
         {[0, 120, 240].map((deg) => (
            <div 
                key={deg}
                className="absolute top-1/2 left-1/2 w-[140px] h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent -translate-y-1/2 origin-left"
                style={{ transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(50%)` }}
            ></div>
         ))}
       </div>

       {/* Floating Satellite Icons */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 bg-slate-800/80 backdrop-blur-md p-2.5 rounded-xl border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)] animate-bounce delay-0">
          <IconDataNode className="w-6 h-6 text-cyan-300" />
       </div>
       <div className="absolute bottom-4 right-0 translate-x-4 bg-slate-800/80 backdrop-blur-md p-2.5 rounded-xl border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)] animate-bounce delay-700">
          <IconPacket className="w-6 h-6 text-purple-300" />
       </div>
       <div className="absolute bottom-4 left-0 -translate-x-4 bg-slate-800/80 backdrop-blur-md p-2.5 rounded-xl border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)] animate-bounce delay-1000">
          <IconEnergy className="w-6 h-6 text-yellow-300" />
       </div>
    </div>
  </div>
);

const AgentVisual: React.FC = () => (
  <div 
    className="w-full h-full min-h-[350px] bg-slate-950 relative overflow-hidden flex items-center justify-center group select-none" 
    role="img" 
    aria-label="تصویر سازی گرافیکی از ایجنت هوشمند تعاملی"
  >
    {/* Ambient Glows */}
    <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-primary/10 rounded-full blur-[100px]"></div>
    <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-indigo-500/10 rounded-full blur-[100px]"></div>

    <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xs">
      {/* Bot Avatar */}
      <div className="relative mb-8 group-hover:scale-105 transition-transform duration-500">
        <div className="w-32 h-32 bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2rem] border border-slate-700 flex items-center justify-center shadow-2xl relative z-10 overflow-hidden">
          <CustomAgentIcon className="w-20 h-20 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
          {/* Eyes/Core Glow */}
          <div className="absolute w-full h-full inset-0 bg-primary/20 blur-xl -z-10 animate-pulse"></div>
          {/* Scanning Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20 blur-sm animate-[scan_3s_linear_infinite]"></div>
          <style>{`
            @keyframes scan {
                0% { top: 0%; opacity: 0; }
                50% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
            }
          `}</style>
        </div>
        
        {/* Floating Chat Bubbles */}
        <div className="absolute -right-16 -top-6 bg-slate-800/90 backdrop-blur-md border border-slate-700 px-4 py-2.5 rounded-2xl rounded-bl-none text-xs text-slate-300 shadow-xl animate-[bounce_3s_infinite]">
          <span className="flex gap-2 items-center text-white"><Check size={14} className="text-green-400"/> ثبت سفارش آنی</span>
        </div>
        <div className="absolute -left-16 top-12 bg-slate-800/90 backdrop-blur-md border border-slate-700 px-4 py-2.5 rounded-2xl rounded-br-none text-xs text-slate-300 shadow-xl animate-[bounce_4s_infinite_0.5s]">
          <span className="flex gap-2 items-center text-white"><Check size={14} className="text-green-400"/> پشتیبانی ۲۴/۷</span>
        </div>
      </div>

      {/* Server/Data Connection */}
      <div className="w-full relative flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-slate-700 to-transparent"></div>
        {/* Custom Data Stream Icons */}
        <div className="flex gap-4 opacity-50">
           <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor">
              <path d="M4 6H20M4 12H20M4 18H20" strokeWidth="2" strokeLinecap="round" />
           </svg>
           <svg viewBox="0 0 24 24" className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor">
              <rect x="2" y="2" width="20" height="8" rx="2" strokeWidth="2"/>
              <rect x="2" y="14" width="20" height="8" rx="2" strokeWidth="2"/>
              <path d="M6 6H6.01" strokeWidth="3" strokeLinecap="round" />
              <path d="M6 18H6.01" strokeWidth="3" strokeLinecap="round" />
           </svg>
        </div>
      </div>
    </div>
  </div>
);

// --- FAQ Component ---

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-surface border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary/50 shadow-lg shadow-primary/5' : 'hover:border-slate-600'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-right focus:outline-none"
      >
        <span className={`text-base md:text-lg font-bold transition-colors ${isOpen ? 'text-primary' : 'text-white'}`}>
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 mr-4 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
        />
      </button>
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="text-slate-400 text-sm md:text-base leading-relaxed px-5 md:px-6 pb-6 pt-0 border-t border-slate-800/50 pt-4">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

const Services: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">راهکارهای هوشمند نکسورا</h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          ما مجموعه‌ای از پیشرفته‌ترین ابزارهای هوش مصنوعی را برای حل چالش‌های واقعی کسب‌وکار شما طراحی کرده‌ایم.
        </p>
      </div>

      {/* Detailed Services */}
      <div className="space-y-20">
        {[
          {
            id: 'automation-service',
            title: "اتوماسیون هوشمند فرایندها (RPA)",
            desc: "با استفاده از n8n و Python، ما گردش‌کارهای پیچیده بین نرم‌افزارهای مختلف (CRM، حسابداری، ایمیل مارکتینگ) را کاملاً خودکار می‌کنیم.",
            features: ["اتصال بیش از ۱۰۰۰ سرویس مختلف", "بدون نیاز به دخالت انسانی", "کاهش ۹۰٪ خطاهای ورود اطلاعات"],
            icon: <CustomAutomationIcon className="w-16 h-16 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" />,
            Visual: AutomationVisual,
            tooltip: "مدیریت و خودکارسازی کامل گردش کار سازمانی"
          },
          {
            id: 'agent-service',
            title: "ایجنت‌های هوشمند تعاملی",
            desc: "چت‌بات‌های پیشرفته مبتنی بر LLM که فراتر از یک پاسخگوی ساده هستند. آنها می‌توانند سفارش ثبت کنند، وقت رزرو کنند و پشتیبانی فنی ارائه دهند.",
            features: ["پاسخگویی ۲۴/۷ به مشتریان", "یادگیری از مستندات سازمانی شما", "شخصی‌سازی لحن و رفتار"],
            icon: <CustomAgentIcon className="w-16 h-16 drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]" />,
            Visual: AgentVisual,
            tooltip: "دستیار هوشمند با قابلیت یادگیری و تعامل انسانی"
          }
        ].map((service, idx) => (
          <div key={service.id} className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1 space-y-6">
              
              {/* Icon with Accessible Tooltip */}
              <div 
                className="relative group/icon inline-block"
                role="img"
                aria-label={service.title}
                aria-describedby={`tooltip-${service.id}`}
                tabIndex={0}
              >
                <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 shadow-lg shadow-primary/5 transition-all duration-300 group-hover/icon:scale-105 group-hover/icon:border-primary/50 group-hover/icon:shadow-primary/20 cursor-help relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity"></div>
                  {service.icon}
                </div>
                
                {/* Tooltip */}
                <div 
                  id={`tooltip-${service.id}`}
                  role="tooltip" 
                  className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-slate-800/95 backdrop-blur-sm text-white text-sm font-medium rounded-xl border border-slate-700 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-50 shadow-2xl translate-y-2 group-hover/icon:translate-y-0"
                >
                  {service.tooltip}
                  {/* Arrow */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800/95 border-b border-r border-slate-700 rotate-45"></div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white">{service.title}</h2>
              <p className="text-slate-400 text-lg leading-relaxed">{service.desc}</p>
              <ul className="space-y-3">
                {service.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                      <Check size={14} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link to="/contact">
                  <Button variant="outline">سفارش این سرویس</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/50 backdrop-blur w-full">
                {/* Visual Component Render */}
                <service.Visual />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-surface rounded-3xl border border-slate-800 p-8 overflow-hidden">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">چرا نکسورا؟</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="py-4 px-6 text-slate-400 font-medium w-1/3">ویژگی</th>
                <th className="py-4 px-6 text-slate-400 font-medium w-1/3 text-center">روش سنتی</th>
                <th className="py-4 px-6 text-primary font-bold w-1/3 text-center bg-primary/5 rounded-t-xl">راهکار نکسورا</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "هزینه عملیاتی", trad: "بسیار بالا", nexora: "بهینه و مقیاس‌پذیر" },
                { label: "زمان پیاده‌سازی", trad: "۳ تا ۶ ماه", nexora: "۲ تا ۴ هفته" },
                { label: "خطای انسانی", trad: "اجتناب‌ناپذیر", nexora: "نزدیک به صفر" },
                { label: "پشتیبانی", trad: "ساعات اداری", nexora: "۲۴/۷ هوشمند" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-6 text-white font-medium">{row.label}</td>
                  <td className="py-4 px-6 text-slate-400 text-center">{row.trad}</td>
                  <td className="py-4 px-6 text-white text-center font-bold bg-primary/5">{row.nexora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto pb-12">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-white mb-4">پرسش‌های متداول</h3>
          <p className="text-slate-400">شفافیت در همکاری، امنیت و هزینه‌ها</p>
        </div>
        
        <div className="space-y-4">
          {[
            {
              q: "آیا امنیت داده‌های سازمانی ما تضمین می‌شود؟",
              a: "بله، امنیت خط قرمز ماست. ما از قراردادهای محرمانگی (NDA) رسمی استفاده می‌کنیم. همچنین تمام داده‌های شما با پروتکل‌های رمزنگاری پیشرفته محافظت می‌شوند و مدل‌های هوش مصنوعی را می‌توانیم به صورت Local (روی سرورهای خودتان) پیاده‌سازی کنیم تا هیچ داده‌ای از سازمان خارج نشود."
            },
            {
              q: "هزینه پروژه‌ها چقدر است و نحوه پرداخت چگونه است؟",
              a: "هزینه‌ها کاملاً شفاف و بر اساس اسکوپ پروژه است. ما معمولاً ۳۰٪ پیش‌پرداخت، ۳۰٪ پس از نسخه اولیه و ۴۰٪ پس از تحویل نهایی دریافت می‌کنیم. برای سرویس‌های آماده نیز مدل اشتراکی (SaaS) داریم که بسیار مقرون‌به‌صرفه است."
            },
            {
              q: "زمان پیاده‌سازی پروژه‌ها چقدر طول می‌کشد؟",
              a: "بسته به ابعاد پروژه متفاوت است. ربات‌های تلگرام و اتوماسیون‌های ساده بین ۱۰ تا ۲۰ روز کاری، و سیستم‌های جامع سازمانی بین ۱ تا ۳ ماه زمان می‌برند. جدول زمان‌بندی دقیق در قرارداد ذکر می‌شود."
            },
            {
              q: "آیا پس از تحویل پروژه، پشتیبانی فنی دارید؟",
              a: "بله، تمامی پروژه‌های نکسورا شامل ۶ ماه گارانتی عملکرد و پشتیبانی فنی رایگان هستند. پس از آن نیز می‌توانید قرارداد پشتیبانی را تمدید کنید."
            },
            { 
              q: "آیا برای استفاده از راهکارها نیاز به تیم فنی داریم؟", 
              a: "خیر، راهکارهای ما با رابط کاربری ساده طراحی شده‌اند. ما آموزش‌های کامل ویدیویی و مستندات را در اختیار تیم شما قرار می‌دهیم تا بدون نیاز به دانش برنامه‌نویسی از سیستم‌ها استفاده کنند." 
            }
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
