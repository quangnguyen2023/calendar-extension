import { getDaysInMonth, isSameDay, isSaturday, isSunday } from 'date-fns';
import { DayOfMonthType, MonthRange, FirstDayOfWeekType } from './types';
import { LunarDate, SolarDate } from '@nghiavuive/lunar_date_vi';

// Module-level cache persists for the entire extension session.
// Same solar date always maps to the same lunar date, so this is safe.
const lunarCache = new Map<string, LunarDate>();

const getLunarDate = (date: Date): LunarDate => {
  const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const cached = lunarCache.get(key);
  if (cached) return cached;

  const result = new SolarDate(date).toLunarDate();
  lunarCache.set(key, result);
  return result;
};

export const generateDaysOfMonth = (
  month: MonthRange,
  year: number,
  firstDayOfWeek: FirstDayOfWeekType,
  selectedDate: { day: number; month: number; year: number } | null,
  enableLunar = true,
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
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const date = new Date(prevYear, prevMonth, lastDayOfPreviousMonth - i);
    const dayValue = lastDayOfPreviousMonth - i;
    const isSelectedDay = selectedDate
      ? selectedDate.day === dayValue &&
        selectedDate.month === prevMonth &&
        selectedDate.year === prevYear
      : false;

    days.push({
      value: dayValue,
      month: prevMonth,
      year: prevYear,
      lunarValue: enableLunar ? getLunarDate(date) : undefined,
      isNotCurrentMonthDay: true,
      isSelectedDay,
    });
  }

  // Add days of the current month
  for (let i = 1; i <= totalDaysOfMonth; i++) {
    const date = new Date(year, month, i);
    const isSelectedDay = selectedDate
      ? selectedDate.day === i && selectedDate.month === month && selectedDate.year === year
      : false;

    days.push({
      value: i,
      month: month,
      year: year,
      lunarValue: enableLunar ? getLunarDate(date) : undefined,
      isCurrentDay: isSameDay(new Date(year, month, i), currentDate),
      isWeekendDay: isSaturday(date) || isSunday(date),
      isSelectedDay,
    });
  }

  // Add days from the next month to pad the end of the calendar
  for (let i = 1; i <= nextMonthPadding; i++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const date = new Date(nextYear, nextMonth, i);
    const isSelectedDay = selectedDate
      ? selectedDate.day === i && selectedDate.month === nextMonth && selectedDate.year === nextYear
      : false;

    days.push({
      value: i,
      month: nextMonth,
      year: nextYear,
      lunarValue: enableLunar ? getLunarDate(date) : undefined,
      isNotCurrentMonthDay: true,
      isSelectedDay,
    });
  }

  // Add days of the next month if there are not enough 42 days ~ 6 weeks
  let extraDay = nextMonthPadding + 1;
  while (days.length < 42) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const date = new Date(nextYear, nextMonth, extraDay);
    const isSelectedDay = selectedDate
      ? selectedDate.day === extraDay &&
        selectedDate.month === nextMonth &&
        selectedDate.year === nextYear
      : false;

    days.push({
      value: extraDay,
      month: nextMonth,
      year: nextYear,
      lunarValue: enableLunar ? getLunarDate(date) : undefined,
      isNotCurrentMonthDay: true,
      isSelectedDay,
    });
    extraDay++;
  }

  return days;
};
