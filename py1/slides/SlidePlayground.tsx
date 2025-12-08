import React from 'react';
import { SlideProps } from '../types';
import { PythonPlayground } from '../components/PythonPlayground';
import { Tooltip, TERMS } from '../components/Tooltip';
import { Terminal } from 'lucide-react';

export const SlidePlayground: React.FC<SlideProps> = ({ isActive, onLog }) => {
  if (!isActive) return null;

  const starterCode = `# Welcome to the Playground!
# Try creating variables and printing them.

user = {
  "name": "Ali",
  "role": "Student"
}

print("User Info:")
print(user["name"])

scores = [10, 20, 30]
print("Scores list loaded")
`;

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Terminal className="text-green-500" />
          محیط تمرین (Playground)
        </h2>
        <p className="text-gray-400 text-sm mt-2" dir="rtl">
          اینجا می‌توانید کدهای ساده <Tooltip term="Python" definition="زبان برنامه‌نویسی ساده و قدرتمند برای کار با داده‌ها">پایتون</Tooltip> را بنویسید و اجرا کنید. خروجی در ترمینال پایین صفحه نمایش داده می‌شود.
        </p>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full">
         <PythonPlayground initialCode={starterCode} onLog={onLog} />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
         <div className="p-3 bg-gray-800 rounded border border-gray-700">
            <h4 className="text-nexora-500 font-bold text-xs mb-1">Define Dictionary</h4>
            <code className="text-gray-400 text-xs">x = {"{'key': 'value'}"}</code>
         </div>
         <div className="p-3 bg-gray-800 rounded border border-gray-700">
            <h4 className="text-nexora-500 font-bold text-xs mb-1">Print Value</h4>
            <code className="text-gray-400 text-xs">print(x["key"])</code>
         </div>
         <div className="p-3 bg-gray-800 rounded border border-gray-700">
            <h4 className="text-nexora-500 font-bold text-xs mb-1">List Append</h4>
            <code className="text-gray-400 text-xs">list.append(item)</code>
         </div>
      </div>
    </div>
  );
};