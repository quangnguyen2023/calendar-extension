import { SelectedTime } from '@/components/Calendar/types';
import { getDaysInMonth } from 'date-fns';
import { CustomCombobox } from './DropdownMenu/CustomCombobox';

type TimeSelectorType = {
  selectedTime: SelectedTime;
  isLunarDate?: boolean;
  onChange: (newTime: SelectedTime) => void;
};

const minYear = 1900;
const maxYear = 2199;

const TimeSelector = ({ selectedTime, isLunarDate, onChange }: TimeSelectorType) => {
  const years = Array(maxYear - minYear + 1)
    .fill('')
    .map((_, i) => minYear + i);

  const months = Array(12)
    .fill('')
    .map((_, i) => i + 1);

  let days: number[] = [];

  if (isLunarDate) {
    days = Array(30)
      .fill('')
      .map((_, i) => i + 1);
  } else {
    const daysInMonth = getDaysInMonth(new Date(selectedTime.year, selectedTime.month - 1));
    days = Array(daysInMonth)
      .fill('')
      .map((_, i) => i + 1);
  }

  return (
    <div className="flex gap-1 text-sm">
      <CustomCombobox
        items={days}
        value={selectedTime.day ?? 1}
        placeholder="Chọn ngày"
        emptyMessage="Không có lựa chọn phù hợp"
        onValueChange={(newValue) => onChange({ ...selectedTime, day: newValue as number })}
      />

      <CustomCombobox
        items={months}
        value={selectedTime.month ?? 1}
        placeholder="Chọn tháng"
        emptyMessage="Không có lựa chọn phù hợp"
        onValueChange={(newValue) => onChange({ ...selectedTime, month: newValue as number })}
      />

      <CustomCombobox
        items={years}
        value={selectedTime.year ?? minYear}
        placeholder="Chọn năm"
        emptyMessage="Không có lựa chọn phù hợp"
        onValueChange={(newValue) => onChange({ ...selectedTime, year: newValue as number })}
      />
    </div>
  );
};

export default TimeSelector;
