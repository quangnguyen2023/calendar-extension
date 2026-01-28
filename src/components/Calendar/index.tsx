'use client';

import DaysOfWeek from './DaysOfWeek';
import DaysOfMonth from './DaysOfMonth';
import MonthNavigator from './MonthNavigator';
import { createContext, useMemo, useState } from 'react';
import { generateDaysOfMonth } from './services';
import { FirstDayOfWeekType, MonthRange, SelectedTime, WeekdayFormatType } from './types';
// import { getWidgetSize } from '@/configs/widgetSizes';
// import { WidgetType } from '@/types/widget';

type CalendarProps = {
  enableLunarCalendar?: boolean;
  firstDayOfWeek?: FirstDayOfWeekType;
  weekdayFormat?: WeekdayFormatType;
  accentColor?: string;
  textColor?: string;
  bgColor?: string;
};

interface CalendarContextType {
  selectedTime: SelectedTime;
  changeTime: (newTime: SelectedTime) => void;
}

export const CalendarContext = createContext<CalendarContextType>({
  selectedTime: {} as SelectedTime,
  changeTime: () => {},
});

export default function Calendar({
  enableLunarCalendar = true,
  firstDayOfWeek = 'Sunday',
  weekdayFormat = '1-char',
  accentColor = '#f64338',
  textColor = 'black',
  bgColor = 'white',
}: CalendarProps) {
  // const size = getWidgetSize(WidgetType.CALENDAR);

  const [selectedTime, setSelectedTime] = useState<SelectedTime>({
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const daysOfMonth = useMemo(
    () =>
      generateDaysOfMonth(
        selectedTime.day,
        selectedTime.month as MonthRange,
        selectedTime.year,
        firstDayOfWeek,
      ),
    [selectedTime, firstDayOfWeek],
  );

  const onMonthChange = (newTime: { day?: number; month: number; year: number }) => {
    setSelectedTime(newTime);
  };

  return (
    <CalendarContext.Provider value={{ selectedTime, changeTime: onMonthChange }}>
      <div
        className="select-none dark:bg-[#2e2e2e]"
        style={{ width: 360, height: 400, backgroundColor: bgColor }}
      >
        <MonthNavigator
          selectedTime={selectedTime}
          onMonthChange={onMonthChange}
          accentColor={accentColor}
        />

        <div
          className={`${enableLunarCalendar ? 'text-base' : 'text-sm'} mt-5 font-semibold dark:text-white`}
        >
          <DaysOfWeek
            firstDayOfWeek={firstDayOfWeek}
            weekdayFormat={weekdayFormat}
            textColor={textColor}
          />
          <DaysOfMonth
            daysOfMonth={daysOfMonth}
            enableLunarCalendar={enableLunarCalendar}
            accentColor={accentColor}
            textColor={textColor}
          />
        </div>
      </div>
    </CalendarContext.Provider>
  );
}
