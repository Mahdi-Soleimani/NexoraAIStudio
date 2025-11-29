
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Zap, Database } from 'lucide-react';
import Button from '../components/Button';
import ROICalculator from '../components/ROICalculator';

// --- Animated Hero Background Component ---
const HeroBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#020617]">
    {/* Custom Animations */}
    <style>{`
      @keyframes float-particle {
        0%, 100% { transform: translate(0, 0); opacity: 0.3; }
        25% { transform: translate(15px, -15px); opacity: 0.6; }
        50% { transform: translate(-5px, -25px); opacity: 0.3; }
        75% { transform: translate(-20px, 10px); opacity: 0.7; }
      }
      @keyframes grid-move {
        0% { background-position: 0 0; }
        100% { background-position: 30px 30px; }
      }
      @keyframes circuit-flow {
        0% { stroke-dashoffset: 1000; opacity: 0.1; }
        50% { opacity: 0.4; }
        100% { stroke-dashoffset: 0; opacity: 0.1; }
      }
    `}</style>

    {/* Tech Grid Background */}
    <div 
      className="absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        animation: 'grid-move 20s linear infinite'
      }}
    ></div>

    {/* Glowing Ambient Orbs */}
    <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite_reverse]"></div>
    <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] animate-[bounce_10s_infinite]"></div>

    {/* Floating Data Particles */}
    <div className="absolute inset-0">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            backgroundColor: Math.random() > 0.5 ? '#22d3ee' : '#8b5cf6',
            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() > 0.5 ? '#22d3ee' : '#8b5cf6'}`,
            animation: `float-particle ${15 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`,
            opacity: 0.4
          }}
        />
      ))}
    </div>

    {/* Circuit Lines SVG */}
    <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d="M0,100 Q400,150 800,100 T1600,100" fill="none" stroke="url(#circuit-grad)" strokeWidth="1" strokeDasharray="10 10" className="animate-[pulse_5s_infinite]" />
      <path d="M0,300 Q300,250 600,300 T1200,300" fill="none" stroke="url(#circuit-grad)" strokeWidth="1" strokeDasharray="15 15" className="animate-[pulse_7s_infinite]" />
      <path d="M0,600 Q500,650 1000,600 T2000,600" fill="none" stroke="url(#circuit-grad)" strokeWidth="1" strokeDasharray="20 20" className="animate-[pulse_6s_infinite]" />
    </svg>

    {/* Noise Texture */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-10 overflow-hidden">
        {/* Animated Background */}
        <HeroBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-cyan-400 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              پیشرو در تکنولوژی هوش مصنوعی ایران
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight text-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              هوش مصنوعی، <br />
              <span className="gradient-text">نیروی محرکه</span> کسب‌وکار شما
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              ما در نکسورا با بهره‌گیری از جدیدترین مدل‌های هوش مصنوعی، فرایندهای سازمانی شما را خودکار کرده و بهره‌وری را به سطح جدیدی می‌رسانیم.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto">درخواست مشاوره رایگان</Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">مشاهده نمونه‌کارها</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      <section className="w-full overflow-hidden border-y border-white/5 bg-slate-950/50 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center mb-8">
          <span className="text-sm text-slate-500 font-medium">تکنولوژی‌های برتر جهان مورد استفاده نکسورا</span>
        </div>
        <div className="flex justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 flex-wrap px-4">
          <span className="text-2xl font-bold text-white">OpenAI</span>
          <span className="text-2xl font-bold text-white">Python</span>
          <span className="text-2xl font-bold text-white">TensorFlow</span>
          <span className="text-2xl font-bold text-white">PyTorch</span>
          <span className="text-2xl font-bold text-white">n8n</span>
          <span className="text-2xl font-bold text-white">LangChain</span>
        </div>
      </section>

      {/* Service Boxes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">خدمات اصلی نکسورا</h2>
          <p className="text-slate-400">راهکارهای جامع برای تحول دیجیتال سازمان شما</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Bot className="w-10 h-10 text-primary" />,
              title: "ایجنت‌های هوشمند",
              desc: "طراحی دستیارهای هوشمند اختصاصی برای پاسخگویی به مشتریان و مدیریت وظایف."
            },
            {
              icon: <Zap className="w-10 h-10 text-cyan-400" />,
              title: "اتوماسیون فرایندها",
              desc: "حذف کارهای تکراری و اتصال سیستم‌های مختلف سازمانی با n8n و Python."
            },
            {
              icon: <Database className="w-10 h-10 text-pink-500" />,
              title: "هوش تجاری و داده",
              desc: "تحلیل پیشرفته داده‌ها برای تصمیم‌گیری دقیق‌تر و پیش‌بینی روندهای بازار."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-surface border border-slate-800 p-8 rounded-2xl hover:border-primary/50 transition-all hover:translate-y-[-5px] group">
              <div className="mb-6 bg-slate-950 w-20 h-20 rounded-2xl flex items-center justify-center border border-slate-800 group-hover:border-primary/30 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROI Calculator Section */}
      <ROICalculator />

      {/* CTA */}
      <section className="py-20 text-center px-4">
        <h2 className="text-4xl font-bold text-white mb-6">آماده تحول هستید؟</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          برای دریافت مشاوره تخصصی و نیازسنجی رایگان، همین حالا با متخصصان نکسورا تماس بگیرید.
        </p>
        <Link to="/contact">
          <Button size="lg" className="shadow-2xl shadow-primary/30">شروع همکاری</Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
