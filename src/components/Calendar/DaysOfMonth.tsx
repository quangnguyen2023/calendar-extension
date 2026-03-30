import { cn } from '@/lib/utils';
import { DayOfMonthType } from './types';

type DaysOfMonthProps = {
  daysOfMonth: DayOfMonthType[];
  enableLunarCalendar?: boolean;
  accentColor: string;
  textColor: string;
  onDayClick?: (date: { day: number; month: number; year: number }) => void;
};

export default function DaysOfMonth({
  daysOfMonth,
  enableLunarCalendar,
  accentColor,
  textColor,
  onDayClick,
}: DaysOfMonthProps) {
  return (
    <div
      className="mt-3 grid grid-cols-7 gap-2"
      style={{
        ['--text' as any]: textColor,
        ['--accent' as any]: accentColor,
        color: textColor,
      }}
    >
      {daysOfMonth.map((day, index) =>
        // prettier-ignore
        <div
          key={index}
          onClick={() => day && onDayClick?.({ day: day.value, month: day.month, year: day.year })}
          className={cn(
            'relative rounded-md border border-transparent py-5 transition-colors',
            {
              'hover:bg-gray-100 dark:hover:bg-gray-700': day,
              'text-white': day?.isCurrentDay,
              'text-[var(--text)]/50 dark:text-[#a8a8a8]': !day?.isCurrentDay && day?.isWeekendDay,
              'text-[var(--text)]/20 dark:text-[#5d5d5d]': day?.isNotCurrentMonthDay,
            },
          )}
          style={{
            backgroundColor: day?.isCurrentDay ? accentColor : '',
            borderColor: day?.isSelectedDay ? accentColor : '',
          }}
        >
          <div
            className={`absolute ${enableLunarCalendar ? 'top-[60%]' : 'top-1/2'} left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center`}
          >
            {/* Solar date */}
            <span className="text-sm">{day.value}</span>

            {/* Lunar date */}
            {enableLunarCalendar && day.value && (
              <span
                className={cn(`-mt-0.5 ml-4 text-[0.6rem]`, {
                  'text-[var(--accent)]': day.lunarValue?.get().day == 1 && !day?.isCurrentDay,
                })}
              >
                {day.lunarValue?.get().day === 1
                  ? `${day.lunarValue?.get().day}/${day.lunarValue?.get().month}`
                  : day.lunarValue?.get().day}
              </span>
            )}
          </div>
        </div>,
      )}
    </div>
  );
}
