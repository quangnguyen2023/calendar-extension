'use client';

import { useEffect, useState } from 'react';
import { FirstDayOfWeekType, WeekdayFormatType } from './types';

type DaysOfWeekProps = {
  firstDayOfWeek: FirstDayOfWeekType;
  weekdayFormat: WeekdayFormatType;
  textColor: string;
};

export default function DaysOfWeek({ firstDayOfWeek, weekdayFormat, textColor }: DaysOfWeekProps) {
  const [daysOfWeek, setDaysOfWeek] = useState([
    { value: 'Mon', isWeekend: false },
    { value: 'Tue', isWeekend: false },
    { value: 'Wed', isWeekend: false },
    { value: 'Thu', isWeekend: false },
    { value: 'Fri', isWeekend: false },
    { value: 'Sat', isWeekend: true },
    { value: 'Sun', isWeekend: true },
  ]);

  useEffect(() => {
    if (firstDayOfWeek === 'Sunday' && daysOfWeek[0].value !== 'Sun') {
      setDaysOfWeek((prev: any) => {
        const sunday = prev.find((day: any) => day.value === 'Sun');
        const otherDays = prev.filter((day: any) => day.value !== 'Sun');
        return [sunday, ...otherDays];
      });
    } else if (firstDayOfWeek === 'Monday' && daysOfWeek[0].value !== 'Mon') {
      setDaysOfWeek((prev: any) => {
        const sunday = prev.find((day: any) => day.value === 'Sun');
        const otherDays = prev.filter((day: any) => day.value !== 'Sun');
        return [...otherDays, sunday];
      });
    }
  }, [firstDayOfWeek, daysOfWeek]);

  return (
    <div className="mt-2 grid grid-cols-7 gap-1 text-sm font-semibold">
      {daysOfWeek.map((day, index) => (
        <div
          key={index}
          className={`text-center ${day.isWeekend ? 'text-[#9b9b9b]' : ''}`}
          style={{ color: textColor, opacity: day.isWeekend ? '50%' : undefined }}
        >
          {day.value.slice(0, weekdayFormat === '2-char' ? 2 : 1)}
        </div>
      ))}
    </div>
  );
}
