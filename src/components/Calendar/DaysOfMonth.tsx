import { cn } from '@/lib/utils';
import { DayOfMonthType } from './types';

type DaysOfMonthProps = {
  daysOfMonth: DayOfMonthType[];
  enableLunarCalendar?: boolean;
  accentColor: string;
  textColor: string;
};

export default function DaysOfMonth({
  daysOfMonth,
  enableLunarCalendar,
  accentColor,
  textColor,
}: DaysOfMonthProps) {
  return (
    <div
      className="mt-2 grid grid-cols-7 gap-1 gap-y-2"
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
          className={cn(
            'relative rounded-md border-2 border-dashed border-transparent py-5',
            {
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
            <span className="text-base">{day.value}</span>

            {/* Lunar date */}
            {enableLunarCalendar && day.value && (
              <span
                className={cn(`-mt-0.5 ml-4 text-[0.65rem]`, {
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
