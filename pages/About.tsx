import React from 'react';
import { Linkedin, Github } from 'lucide-react';
import AgentVisual from '../components/AgentVisual'; // <--- ایمپورت جدید

// --- ایمپورت کردن عکس‌ها ---
import ceoImg from '../assets/team/ceo.png';
import erfanImg from '../assets/team/erfan.jpg';
import nargesImg from '../assets/team/narges.jpg';
import mahshidImg from '../assets/team/mahshid.jpg';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      
      {/* Story Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">داستان نکسورا</h1>
          <div className="space-y-4 text-slate-400 leading-relaxed text-lg text-justify">
            <p>
              نکسورا در سال ۱۴۰۴ با یک هدف ساده اما بلندپروازانه متولد شد: 
              <span className="text-white font-bold px-1">آوردن هوش مصنوعی از آزمایشگاه‌ها به قلب کسب‌وکارهای ایرانی.</span>
            </p>
            <p>
              ما تیمی از متخصصان داده، توسعه‌دهندگان نرم‌افزار و استراتژیست‌های کسب‌وکار هستیم که معتقدیم تکنولوژی باید در خدمت انسان باشد، نه جایگزین آن.
            </p>
            <p>
              امروز، نکسورا با تمرکز در این حوزه و با استفاده از بروزترین تکنولوژی های روز دنیا (مانند n8n و AI Agents) در تلاش است تا زیرساخت‌های هوشمند فردا را بسازد.
            </p>
          </div>
        </div>
        
        {/* --- تغییرات این بخش --- */}
        <div className="relative h-[500px] flex items-center justify-center">
          {/* افکت نور پس‌زمینه گرادینت */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-cyan-500/30 rounded-full blur-[100px] animate-pulse"></div>
          
          {/* کامپوننت سه بعدی جدید */}
          <div className="relative w-full h-full z-10 drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]">
             <AgentVisual />
          </div>
        </div>
        {/* ----------------------- */}

      </section>

      {/* Values Section */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        {[
          { title: "نوآوری مداوم", desc: "ما هرگز به وضع موجود راضی نیستیم و همیشه به دنبال راهکارهای جدیدتر هستیم." },
          { title: "شفافیت و اعتماد", desc: "با مشتریانمان مثل شرکای تجاری رفتار می‌کنیم. هیچ هزینه پنهانی وجود ندارد." },
          { title: "کیفیت جهانی", desc: "استانداردهای ما فراتر از مرزهاست. ما محصولاتی در کلاس جهانی می‌سازیم." },
        ].map((val, i) => (
          <div key={i} className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
            <p className="text-slate-400">{val.desc}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-12 text-center">تیم متخصص ما</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { name: "مهندس مهدی سلیمانی", role: "بنیان‌گذار و معمار ارشد سیستم", img: ceoImg },
            { name: "مهندس عرفان تحویلیان", role: "مهندس اتوماسیون", img: erfanImg },
            { name: "نرگس میرزائی", role: "طراح تعاملات هوش مصنوعی", img: nargesImg },
            { name: "مهشید کیانی", role: "متخصص یکپارچه‌سازی", img: mahshidImg },
          ].map((member, i) => (
            <div key={i} className="group relative">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 z-10"></div>
                <img src={member.img} alt={member.name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" />
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 translate-y-10 group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <button className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white hover:bg-[#0077b5] transition-colors hover:scale-110"><Linkedin size={18} /></button>
                  <button className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white hover:bg-black transition-colors hover:scale-110"><Github size={18} /></button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white text-center group-hover:text-cyan-400 transition-colors">{member.name}</h3>
              <p className="text-slate-400 text-sm text-center font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;