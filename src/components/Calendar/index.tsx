'use client';

import DaysOfWeek from './DaysOfWeek';
import DaysOfMonth from './DaysOfMonth';
import MonthNavigator from './MonthNavigator';
import { createContext, useMemo, useState, startTransition, useEffect } from 'react';
import { generateDaysOfMonth } from './services';
import { FirstDayOfWeekType, MonthRange, SelectedTime, WeekdayFormatType } from './types';
import CalendarMenu from './CalendarMenu';

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
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>({
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (selectedTime.day !== undefined) {
      setSelectedDate({
        day: selectedTime.day,
        month: selectedTime.month,
        year: selectedTime.year,
      });
    }
  }, [selectedTime.day, selectedTime.month, selectedTime.year]);

  const daysOfMonth = useMemo(
    () =>
      generateDaysOfMonth(
        selectedTime.month as MonthRange,
        selectedTime.year,
        firstDayOfWeek,
        selectedDate,
        enableLunarCalendar, // skip 42× lunar computations when not needed
      ),
    [selectedTime.month, selectedTime.year, firstDayOfWeek, selectedDate, enableLunarCalendar],
  );

  const onMonthChange = (newTime: { day?: number; month: number; year: number }) => {
    // startTransition marks this update as non-urgent,
    // letting React render the current frame first before recalculating days.
    startTransition(() => {
      setSelectedTime(newTime);
    });
  };

  const onDayClick = (date: { day: number; month: number; year: number }) => {
    startTransition(() => {
      setSelectedDate(date);
    });
  };

  return (
    <CalendarContext.Provider value={{ selectedTime, changeTime: onMonthChange }}>
      <div
        className="select-none dark:bg-[#2e2e2e] px-4"
        style={{ width: 360, height: 400, backgroundColor: bgColor }}
      >
        <div className="flex items-center ">
          <MonthNavigator
            selectedTime={selectedTime}
            onMonthChange={onMonthChange}
            accentColor={accentColor}
          />
          <CalendarMenu />
        </div>

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
            onDayClick={onDayClick}
          />
        </div>
      </div>
    </CalendarContext.Provider>
  );
}
