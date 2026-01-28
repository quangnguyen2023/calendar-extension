import { getDaysInMonth, isSameDay, isSaturday, isSunday } from 'date-fns';
import { DayOfMonthType, MonthRange, FirstDayOfWeekType } from './types';
import { LunarDate, SolarDate } from '@nghiavuive/lunar_date_vi';

const getLunarDate: (date: Date) => LunarDate = (date: Date) => {
  const solarDate = new SolarDate(date);
  return solarDate.toLunarDate();
};

export const generateDaysOfMonth = (
  day: number | undefined,
  month: MonthRange,
  year: number,
  firstDayOfWeek: FirstDayOfWeekType,
) => {
  let days: DayOfMonthType[] = [];
  const totalDaysOfMonth = getDaysInMonth(new Date(year, month));
  const currentDate = new Date();

  const firstWeekDayOfMonth = new Date(year, month, 1).getDay();
  const lastWeekDayOfMonth = new Date(year, month, totalDaysOfMonth).getDay();

  let previousMonthPadding = 0;
  let nextMonthPadding = 0;

  // Calculate the number of padding days needed before and after the current month
  // to fill the calendar grid, depending on whether the week starts on Monday or Sunday.
  if (firstDayOfWeek === 'Monday') {
    previousMonthPadding = firstWeekDayOfMonth === 0 ? 6 : firstWeekDayOfMonth - 1;
    nextMonthPadding = lastWeekDayOfMonth === 0 ? 0 : 7 - lastWeekDayOfMonth;
  } else {
    previousMonthPadding = firstWeekDayOfMonth === 0 ? 0 : firstWeekDayOfMonth;
    nextMonthPadding = 7 - (lastWeekDayOfMonth + 1);
  }

  let lastDayOfPreviousMonth = new Date(year, month, 0).getDate();

  // Add days from the previous month to pad the start of the calendar
  for (let i = previousMonthPadding - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, lastDayOfPreviousMonth - i);

    days.push({
      value: lastDayOfPreviousMonth - i,
      lunarValue: getLunarDate(date),
      isNotCurrentMonthDay: true,
    });
  }

  // Add days of the current month
  for (let i = 1; i <= totalDaysOfMonth; i++) {
    const date = new Date(year, month, i);

    days.push({
      value: i,
      lunarValue: getLunarDate(date),
      isCurrentDay: isSameDay(new Date(year, month, i), currentDate),
      isWeekendDay: isSaturday(date) || isSunday(date),
      isSelectedDay: i === day,
    });
  }

  // Add days from the next month to pad the end of the calendar
  for (let i = 1; i <= nextMonthPadding; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      value: i,
      lunarValue: getLunarDate(date),
      isNotCurrentMonthDay: true,
    });
  }

  // Add days of the next month if there are not enough 42 days ~ 6 weeks
  let extraDay = nextMonthPadding + 1;
  while (days.length < 42) {
    const date = new Date(year, month + 1, extraDay);
    days.push({
      value: extraDay,
      lunarValue: getLunarDate(date),
      isNotCurrentMonthDay: true,
    });
    extraDay++;
  }

  return days;
};
