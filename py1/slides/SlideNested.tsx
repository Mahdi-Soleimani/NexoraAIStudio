import React from 'react';
import { SlideProps, CodeLanguage } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { Network } from 'lucide-react';
import { Tooltip, TERMS } from '../components/Tooltip';

export const SlideNested: React.FC<SlideProps> = ({ isActive }) => {
  if (!isActive) return null;

  const complexData = `api_response = {
    "status": "success",
    "data": {
        "users": [
            {"id": 1, "name": "Ali"},
            {"id": 2, "name": "Reza"}
        ]
    }
}

# چالش: چطور اسم "Reza" رو بکشیم بیرون؟
# مسیر (Dot Notation در n8n):
# data.users[1].name

target = api_response["data"]["users"][1]["name"]
print(target) # Reza`;

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Network className="text-nexora-500" />
          ساختارهای تو در تو (Nested)
        </h2>
        <span className="bg-nexora-900 text-nexora-100 px-3 py-1 rounded text-xs font-bold uppercase">
          سطح سازمانی
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 flex-grow">
        <div className="md:col-span-3">
          <CodeBlock
            language={CodeLanguage.PYTHON}
            code={complexData}
            title="Complex API Response"
            highlightLines={[12, 13]}
          />
        </div>

        <div className="md:col-span-2 flex flex-col justify-center space-y-4">
          <div className="bg-nexora-card p-4 rounded-xl border border-gray-600">
            <h3 className="text-white font-bold mb-4 border-b border-gray-700 pb-2 text-right">Path Finding</h3>
            <ul className="space-y-4 text-sm font-mono text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                1. api_response <span className="text-gray-500">(Dict)</span>
              </li>
              <li className="flex items-center gap-2 ml-4">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                2. ["data"] <span className="text-gray-500">(<Tooltip term="JSON" definition={TERMS.JSON}>Dict</Tooltip>)</span>
              </li>
              <li className="flex items-center gap-2 ml-8">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                3. ["users"] <span className="text-gray-500">(<Tooltip term="ARRAY" definition={TERMS.ARRAY}>List</Tooltip>)</span>
              </li>
              <li className="flex items-center gap-2 ml-12">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                4. [1] <span className="text-gray-500">(Index 2)</span>
              </li>
              <li className="flex items-center gap-2 ml-16 bg-nexora-600/20 p-1 rounded text-white font-bold">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                5. ["name"] &rarr; "Reza"
              </li>
            </ul>
          </div>

          <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-700/50">
            <p className="text-yellow-200 text-sm leading-relaxed text-right" dir="rtl">
              در n8n به این مسیر <strong>Dot Notation</strong> می‌گوییم.
              <br />
              مثال: <code className="font-mono bg-black/50 px-1">data.users[1].name</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};