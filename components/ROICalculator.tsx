import React, { useState, useMemo } from 'react';
import { Calculator, Zap } from 'lucide-react';

const ROICalculator: React.FC = () => {
  const [employees, setEmployees] = useState(10);
  const [salary, setSalary] = useState(15); // Million Tomans
  const [automationRate, setAutomationRate] = useState(30); // Percentage

  // Calculation Logic
  // Monthly Savings = Employees * Salary * (AutomationRate / 100)
  const maxMonthlySavings = useMemo(() => {
    return employees * salary * (automationRate / 100);
  }, [employees, salary, automationRate]);

  const annualSavings = maxMonthlySavings * 12;

  // Chart Generation Logic - S-Curve for realistic ramp up
  const chartPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 12; i++) {
      // Sigmoid-like ease-in-out for realistic adoption curve
      // t goes from 0 to 1
      const t = i / 12;
      // Ease function: t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      
      const val = maxMonthlySavings * ease;
      points.push(val);
    }
    return points;
  }, [maxMonthlySavings]);

  // Chart Dimensions
  const width = 400;
  const height = 250;
  const padding = { top: 30, right: 10, bottom: 30, left: 50 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Scale Y
  const maxY = Math.max(maxMonthlySavings * 1.1, 10); 
  const scaleY = (val: number) => graphHeight - (val / maxY) * graphHeight;
  
  // Scale X
  const scaleX = (index: number) => (index / 12) * graphWidth;

  // SVG Path Generator
  const generatePath = () => {
    if (chartPoints.length === 0) return "";
    
    // Start point
    let d = `M ${padding.left} ${padding.top + scaleY(chartPoints[0])}`;
    
    for (let i = 1; i < chartPoints.length; i++) {
      const x = padding.left + scaleX(i);
      const y = padding.top + scaleY(chartPoints[i]);
      
      const prevX = padding.left + scaleX(i - 1);
      const prevY = padding.top + scaleY(chartPoints[i - 1]);
      
      // Control points for smooth bezier
      const cp1x = prevX + (x - prevX) * 0.5;
      const cp1y = prevY;
      const cp2x = prevX + (x - prevX) * 0.5;
      const cp2y = y;
      
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
    }
    return d;
  };

  const generateFillPath = () => {
    const linePath = generatePath();
    if (!linePath) return "";
    return `${linePath} L ${padding.left + graphWidth} ${padding.top + graphHeight} L ${padding.left} ${padding.top + graphHeight} Z`;
  };

  // تابع فرمت اعداد فارسی برای اسلایدرها و متن‌ها
  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('fa-IR').format(val);
  };

  // تابع جدید: فرمت اعداد انگلیسی برای استفاده در نمودار
  const formatNumberEn = (val: number) => {
    return new Intl.NumberFormat('en-US').format(val);
  };

  // Custom Slider Style for RTL direction
  const getSliderStyle = (val: number, min: number, max: number) => {
    const percent = ((val - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to left, #6366f1 0%, #8b5cf6 ${percent}%, #1e293b ${percent}%, #1e293b 100%)`
    };
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16">
      <style>{`
        /* Custom Range Input Styling */
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }

        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #f8fafc;
          cursor: pointer;
          margin-top: -8px;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
          border: 2px solid #8b5cf6;
          transition: transform 0.1s;
        }

        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.8);
        }

        input[type=range]::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #f8fafc;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
          border: 2px solid #8b5cf6;
          transition: transform 0.1s;
        }

        input[type=range]:focus {
          outline: none;
        }

        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          border-radius: 8px;
        }
        
        input[type=range]::-moz-range-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          border-radius: 8px;
        }
      `}</style>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Column: Chart */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col shadow-xl shadow-slate-900/50 relative overflow-hidden h-full min-h-[400px]">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
          
          <div className="relative z-10 flex items-start justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">نمودار بازگشت سرمایه</h3>
              <p className="text-slate-400 text-sm">روند کاهش هزینه‌های عملیاتی در ۱۲ ماه اول</p>
            </div>
            <div className="bg-slate-800/50 p-2 rounded-xl border border-slate-700">
               <Zap className="text-yellow-400" size={20} />
            </div>
          </div>

          <div className="flex-grow w-full relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => {
                const yVal = graphHeight * (1 - tick);
                return (
                  <g key={i}>
                    <line 
                      x1={padding.left} 
                      y1={padding.top + yVal} 
                      x2={width - padding.right} 
                      y2={padding.top + yVal} 
                      stroke="#334155" 
                      strokeWidth="1" 
                      strokeDasharray="4 6" 
                      opacity="0.3" 
                    />
                    <text 
                      x={padding.left - 15} 
                      y={padding.top + yVal + 4} 
                      fill="#64748b" 
                      fontSize="11" 
                      textAnchor="end"
                      className="font-mono font-medium"
                    >
                      {/* استفاده از فرمت انگلیسی برای اعداد محور عمودی */}
                      {formatNumberEn(Math.round(maxY * tick))}M
                    </text>
                  </g>
                );
              })}

              {/* Chart Data */}
              <path d={generateFillPath()} fill="url(#chartFill)" className="transition-all duration-300 ease-out" />
              <path d={generatePath()} fill="none" stroke="url(#chartLine)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all duration-300 ease-out" />

              {/* X Axis Labels */}
              {[1, 3, 6, 9, 12].map((month) => {
                const xPos = padding.left + scaleX(month);
                return (
                  <g key={month}>
                    <text 
                      x={xPos} 
                      y={height} 
                      fill="#94a3b8" 
                      fontSize="11" 
                      textAnchor="middle"
                      className="font-bold"
                    >
                      {/* ماه فارسی باشد اما عدد آن انگلیسی */}
                      ماه {formatNumberEn(month)}
                    </text>
                    <line x1={xPos} y1={padding.top + graphHeight} x2={xPos} y2={padding.top + graphHeight + 5} stroke="#334155" strokeWidth="1" />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Column: Calculator Inputs */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
               <div className="bg-primary/20 p-2.5 rounded-xl text-primary">
                 <Calculator size={24} />
               </div>
               <h2 className="text-3xl font-black text-white">ماشین حساب ROI</h2>
            </div>
            
            <p className="text-slate-400 mb-10 text-sm leading-relaxed max-w-md">
              باور نکردنی است که چقدر سرمایه در فرآیندهای دستی هدر می‌رود. با ابزار زیر تخمین بزنید که نکسورا چقدر به سودآوری شما کمک می‌کند.
            </p>

            <div className="space-y-8">
              {/* Employee Slider */}
              <div className="group">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-slate-200 font-bold text-base">تعداد کارمندان (نفر)</label>
                  <div className="bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-lg min-w-[3.5rem] text-center text-white font-bold shadow-inner">
                    {formatNumber(employees)}
                  </div>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  step="1"
                  value={employees} 
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  style={getSliderStyle(employees, 1, 100)}
                  className="rounded-lg h-2 w-full"
                />
              </div>

              {/* Salary Slider */}
              <div className="group">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-slate-200 font-bold text-base">میانگین حقوق ماهانه</label>
                  <div className="bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-lg min-w-[7rem] text-center text-white font-bold text-sm shadow-inner">
                    {formatNumber(salary)} میلیون تومان
                  </div>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  step="1"
                  value={salary} 
                  onChange={(e) => setSalary(Number(e.target.value))}
                  style={getSliderStyle(salary, 5, 100)}
                  className="rounded-lg h-2 w-full"
                />
              </div>

              {/* Automation Rate Slider */}
              <div className="group">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-slate-200 font-bold text-base">قابلیت اتوماسیون</label>
                  <div className="bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-lg min-w-[3.5rem] text-center text-white font-bold shadow-inner">
                    {formatNumber(automationRate)}٪
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5"
                  value={automationRate} 
                  onChange={(e) => setAutomationRate(Number(e.target.value))}
                  style={getSliderStyle(automationRate, 0, 100)}
                  className="rounded-lg h-2 w-full"
                />
              </div>
            </div>

            {/* Results */}
            <div className="mt-12 pt-8 border-t border-slate-800/50">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <p className="text-slate-400 text-sm font-medium">صرفه‌جویی سالانه احتمالی:</p>
                <div className="text-right flex items-baseline gap-2">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-500 drop-shadow-lg">
                    {formatNumber(Math.round(annualSavings))}
                  </span>
                  <span className="text-xl font-bold text-slate-500">میلیون تومان</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;