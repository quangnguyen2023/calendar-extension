'use client';

import { useState } from 'react';
import { ArrowsUpDownIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import TimeSelector from './TimeSelector';
import useTime from './useTime';

type QuickViewByDateProps = {
  onClose?: () => void;
};

const QuickViewByDate = ({ onClose }: QuickViewByDateProps) => {
  const [enableLunarCalendar, setEnableLunarCalendar] = useState(false);
  const { solarTime, lunarTime, handleLunarChange, handleSolarChange, onGoToDate } = useTime();

  return (
    <div className="bg-[#f8fafc] p-4 pb-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SunIcon width={18} height={18} />
            <div className="text-xs font-medium"> Solar date </div>
          </div>
          <div
            className="cursor-pointer rounded p-1 text-xs text-[rgb(35,131,226)] select-none hover:bg-[rgba(35,131,226,0.07)]"
            onClick={() => setEnableLunarCalendar(!enableLunarCalendar)}
          >
            {enableLunarCalendar ? 'Hide lunar' : 'Show lunar'}
          </div>
        </div>

        <TimeSelector selectedTime={solarTime} onChange={handleSolarChange} />
      </div>

      {enableLunarCalendar && (
        <div className="mt-2 mb-1 flex justify-center">
          <ArrowsUpDownIcon width={14} height={14} color="#888" />
        </div>
      )}

      {enableLunarCalendar && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MoonIcon width={18} height={18} className="-mt-0.5" />
            <div className="text-xs font-medium"> Lunar date </div>
          </div>
          <TimeSelector selectedTime={lunarTime} isLunarDate onChange={handleLunarChange} />
        </div>
      )}

      <button
        className="mt-4 ml-auto block w-full rounded bg-[#2383e2] px-2 py-3 text-xs font-medium text-white transition-colors hover:bg-[#3a83cc] active:bg-[#377abe]"
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
