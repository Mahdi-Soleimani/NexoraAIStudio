import React, { useState, useRef } from 'react';
import { Briefcase, MapPin, Clock, UploadCloud, FileText, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const Careers: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  // State for form fields
  const [selectedJob, setSelectedJob] = useState<string>('ارسال عمومی رزومه');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // State for submission status
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // State for expanded job descriptions
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set());

  // Scroll to form handler
  const handleJobSelect = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Toggle job description visibility
  const toggleJobDescription = (index: number) => {
    setExpandedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // File handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        alert('لطفاً فقط فایل PDF آپلود کنید.');
        return;
      }
      // Max size check (e.g. 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('حجم فایل نباید بیشتر از ۵ مگابایت باشد.');
        return;
      }
      setFile(selectedFile);
    }
  };

  // Convert file to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the "data:application/pdf;base64," prefix for cleaner n8n handling
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Failed to convert file'));
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage('لطفاً فایل رزومه (PDF) را آپلود کنید.');
      setStatus('error');
      return;
    }

    const webhookUrl = import.meta.env.VITE_NEWSLETTER_WEBHOOK;
    if (!webhookUrl) {
      setErrorMessage('خطای تنظیمات سیستم.');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      // 1. Convert file to Base64
      const base64File = await fileToBase64(file);

      // 2. Prepare Payload
      const payload = {
        type: 'resume_submission', // Tag to identify request type in n8n
        job_title: selectedJob,
        description: description,
        file_name: file.name,
        file_data: base64File, // The PDF content in Base64
        file_mime: file.type,
        submitted_at: new Date().toISOString()
      };

      // 3. Send to Webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        // Reset form
        setDescription('');
        setFile(null);
        setSelectedJob('ارسال عمومی رزومه');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Resume upload error:', error);
      setStatus('error');
      setErrorMessage('خطایی در ارسال رزومه پیش آمد. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-6">به تیم نکسورا بپیوندید</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          ما به دنبال افراد خلاق، پرشور و یادگیرنده هستیم. اگر عاشق هوش مصنوعی هستید و می‌خواهید روی لبه تکنولوژی حرکت کنید، جای شما اینجا خالیست.
        </p>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {[
          {
            title: "n8n Workflow Developer (Automation Specialist)",
            type: "تمام وقت",
            location: "ریموت",
            description: "ما به دنبال یک توسعه‌دهنده ماهر در n8n هستیم که بتواند گردش‌کارهای پیچیده و اتوماسیون‌های هوشمند ایجاد کند. شما با استفاده از n8n، API ها و سرویس‌های ابری، راه‌حل‌های اتوماسیون سفارشی برای مشتریان ما طراحی خواهید کرد. تجربه در کار با LLM ها و تکنیک‌های RAG یک مزیت بزرگ است."
          },
          {
            title: "AI Agent Developer (LLM-Based Agents)",
            type: "تمام وقت",
            location: "ریموت",
            description: "ما در جستجوی یک توسعه‌دهنده هوش مصنوعی هستیم که در ساخت عامل‌های مبتنی بر مدل‌های زبانی بزرگ (LLM) تخصص داشته باشد. شما با استفاده از تکنولوژی‌های پیشرفته مانند GPT، Claude، و فریمورک‌های Agent، سیستم‌های هوشمند خودمختار ایجاد خواهید کرد. آشنایی با Prompt Engineering و RAG ضروری است."
          },
          {
            title: "Automation Engineer (n8n/LLM)",
            type: "تمام وقت",
            location: "ریموت",
            description: "به یک مهندس اتوماسیون با تجربه در ترکیب n8n و مدل‌های زبانی نیاز داریم. شما مسئول طراحی و پیاده‌سازی راه‌حل‌های اتوماسیون هوشمند خواهید بود که از قابلیت‌های AI بهره می‌برند. توانایی کار با API ها، وب‌هوک‌ها و سرویس‌های ابری از مهارت‌های کلیدی مورد نیاز است."
          },
          {
            title: "LLM / Prompt Engineer",
            type: "تمام وقت",
            location: "ریموت",
            description: "ما یک متخصص Prompt Engineering می‌خواهیم که در بهینه‌سازی و طراحی پرامپت‌های حرفه‌ای برای مدل‌های زبانی مهارت داشته باشد. شما با تست، اصلاح و بهبود مستمر پرامپت‌ها، کیفیت خروجی‌های AI را به حداکثر خواهید رساند. درک عمیق از رفتار LLM ها و تکنیک‌های پیشرفته مانند Few-Shot Learning الزامی است."
          },
          {
            title: "AI Solutions Architect",
            type: "تمام وقت",
            location: "ریموت",
            description: "به دنبال یک معمار راه‌حل‌های هوش مصنوعی هستیم که بتواند سیستم‌های AI پیچیده و مقیاس‌پذیر طراحی کند. شما با مشتریان کار خواهید کرد تا نیازهای آن‌ها را به راه‌حل‌های فنی تبدیل کنید و معماری کلی پروژه‌های AI را مدیریت کنید. تجربه در طراحی سیستم، Cloud Architecture و درک عمیق از اکوسیستم AI ضروری است."
          },
          {
            title: "Internship",
            type: "تمام وقت",
            location: "ریموت",
            description: "اگر به دنبال فرصتی برای یادگیری و رشد در زمینه هوش مصنوعی و اتوماسیون هستید، برنامه کارآموزی ما را بررسی کنید. این برنامه به شما امکان می‌دهد تا با پروژه‌های واقعی کار کنید، مهارت‌های فنی خود را توسعه دهید و با تیم ما همکاری کنید. دانش پایه در AI و علاقه‌مندی به یادگیری از ملزومات این موقعیت است."
          },
        ].map((job, i) => (
          <div key={i} className="bg-surface border border-slate-800 p-6 rounded-2xl hover:border-slate-600 transition-colors">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                <div className="flex gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Briefcase size={14} /> {job.type}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> فوری</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleJobDescription(i)}
                >
                  {expandedJobs.has(i) ? 'بستن توضیحات' : 'نمایش توضیحات'}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleJobSelect(job.title)}
                >
                  ارسال رزومه
                </Button>
              </div>
            </div>

            {/* Job Description (Expandable) */}
            {expandedJobs.has(i) && (
              <div className="mt-4 pt-4 border-t border-slate-700 animate-fadeIn">
                <p className="text-slate-300 leading-relaxed text-sm">
                  {job.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-slate-800"></div>

      {/* Resume Submission Form */}
      <div ref={formRef} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(124,58,237,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <UploadCloud className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">ارسال رزومه</h2>
            <p className="text-slate-400 text-sm">
              {selectedJob === 'ارسال عمومی رزومه'
                ? 'موقعیت شغلی خاصی مدنظرتان نیست؟ رزومه خود را برای ما بفرستید.'
                : `در حال ارسال درخواست برای موقعیت: `}
              <span className="text-primary font-bold">{selectedJob === 'ارسال عمومی رزومه' ? '' : selectedJob}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">

            {/* File Upload Input */}
            <div className="space-y-2">
              <label className="block text-slate-300 text-sm font-medium">فایل رزومه (PDF)</label>
              <div className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${file ? 'border-green-500/50 bg-green-500/5' : 'border-slate-700 hover:border-primary/50 hover:bg-slate-800/50'}`}>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  disabled={status === 'loading' || status === 'success'}
                />

                {file ? (
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <FileText size={20} />
                    <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                      className="z-30 p-1 hover:text-red-400 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-slate-500">
                    <p className="text-sm font-medium">برای انتخاب فایل کلیک کنید یا فایل را اینجا رها کنید</p>
                    <p className="text-xs mt-1 opacity-70">حداکثر ۵ مگابایت</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="block text-slate-300 text-sm font-medium">توضیحات تکمیلی (اختیاری)</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="درباره خودتان، مهارت‌ها و اشتیاقتان بنویسید..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                disabled={status === 'loading' || status === 'success'}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  در حال آپلود رزومه...
                </span>
              ) : status === 'success' ? (
                <span className="flex items-center gap-2 text-white">
                  <CheckCircle size={18} />
                  رزومه با موفقیت ارسال شد
                </span>
              ) : (
                'ارسال نهایی'
              )}
            </Button>

            {/* Error Message */}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                <AlertCircle size={16} />
                {errorMessage}
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Careers;