import { format } from 'date-fns';
// import DropdownMenu from './DropdownMenu';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type MonthNavigatorProps = {
  selectedTime: { month: number; year: number };
  accentColor: string;
  onMonthChange: (newTime: { month: number; year: number }) => void;
};

export default function MonthNavigator({
  accentColor,
  selectedTime,
  onMonthChange,
}: MonthNavigatorProps) {
  const date = new Date(selectedTime.year, selectedTime.month);
  // #f64338

  return (
    <div className="group flex items-center justify-between">
      <div
        className="col-span-4 ml-3 flex items-center text-lg font-bold uppercase"
        style={{ color: accentColor }}
      >
        {format(date, 'MMMM yyyy')}
      </div>

      <div className="col-span-3 flex items-center justify-center gap-1 font-medium text-black transition-all duration-300 dark:text-white">
        <div
          className="flex cursor-pointer justify-center rounded-full bg-[#ddd] p-1 opacity-40 transition-opacity hover:opacity-100 dark:bg-[#555]"
          onClick={() =>
            onMonthChange({
              month: selectedTime.month - 1,
              year: selectedTime.year,
            })
          }
        >
          <ChevronLeft width={18} height={18} />
        </div>

        <div
          className="cursor-pointer rounded-full bg-[#ddd] px-2 py-1.5 text-xs opacity-40 transition-opacity hover:opacity-100 dark:bg-[#555]"
          onClick={() =>
            onMonthChange({
              month: new Date().getMonth(),
              year: new Date().getFullYear(),
            })
          }
        >
          Today
        </div>

        <div
          className="flex cursor-pointer justify-center rounded-full bg-[#ddd] p-1 opacity-40 transition-opacity hover:opacity-100 dark:bg-[#555]"
          onClick={() =>
            onMonthChange({
              month: selectedTime.month + 1,
              year: selectedTime.year,
            })
          }
        >
          <ChevronRight width={18} height={18} />
        </div>

        {/* <DropdownMenu /> */}
      </div>
    </div>
  );
}
