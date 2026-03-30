'use client';

import { useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import TimeSelector from './TimeSelector';
import useTime from './useTime';

type QuickViewByDateProps = {
  onClose?: () => void;
};

type DateMode = 'solar' | 'lunar';

const QuickViewByDate = ({ onClose }: QuickViewByDateProps) => {
  const [mode, setMode] = useState<DateMode>('solar');
  const { solarTime, lunarTime, handleLunarChange, handleSolarChange, onGoToDate } = useTime();

  const isLunar = mode === 'lunar';

  return (
    <div className="py-2">
      {/* Switch toggle: ☀️ Solar ──[○]── 🌙 Lunar */}
      <div className="mb-3 flex items-center gap-3">
        <span
          className={`flex cursor-pointer items-center gap-1 text-xs font-medium transition-colors duration-200 select-none ${
            !isLunar ? 'text-[#2383e2] font-semibold' : 'text-gray-400'
          }`}
          onClick={() => setMode('solar')}
        >
          <SunIcon width={14} height={14} />
          Solar
        </span>

        <button
          role="switch"
          aria-checked={isLunar}
          onClick={() => setMode(isLunar ? 'solar' : 'lunar')}
          className={`relative inline-flex h-5 w-9 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${
            isLunar ? 'bg-[#2383e2]' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
              isLunar ? 'translate-x-4' : 'translate-x-1'
            }`}
          />
        </button>

        <span
          className={`flex cursor-pointer items-center gap-1 text-xs font-medium transition-colors duration-200 select-none ${
            isLunar ? 'text-[#2383e2] font-semibold' : 'text-gray-400'
          }`}
          onClick={() => setMode('lunar')}
        >
          <MoonIcon width={14} height={14} />
          Lunar
        </span>
      </div>

      {/* TimeSelector — only renders the active mode */}
      {!isLunar ? (
        <TimeSelector selectedTime={solarTime} onChange={handleSolarChange} />
      ) : (
        <TimeSelector selectedTime={lunarTime} isLunarDate onChange={handleLunarChange} />
      )}

      <button
        className="mt-4 block w-full rounded bg-[#2383e2] px-2 py-3 text-xs font-medium text-white transition-colors hover:bg-[#3a83cc] active:bg-[#377abe]"
        onClick={() => {
          onGoToDate();
          onClose?.();
        }}
      >
        Go to date
      </button>
    </div>
  );
};

export default QuickViewByDate;
