import { SelectedTime } from '@/components/Calendar/types';
import { getDaysInMonth } from 'date-fns';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

type TimeSelectorType = {
  selectedTime: SelectedTime;
  isLunarDate?: boolean;
  onChange: (newTime: SelectedTime) => void;
};

// const minYear = 1900;
// const maxYear = 2199;

const TimeSelector = ({ selectedTime, isLunarDate, onChange }: TimeSelectorType) => {
  // const years = Array(maxYear - minYear + 1)
  //   .fill('')
  //   .map((_, i) => minYear + i);

  // const months = Array(12)
  //   .fill('')
  //   .map((_, i) => i + 1);

  let days: number[] = [];

  if (isLunarDate) {
    days = Array(30)
      .fill('')
      .map((_, i) => i + 1);
  } else {
    const daysInMonth = getDaysInMonth(new Date(selectedTime.year, selectedTime.month));
    days = Array(daysInMonth)
      .fill('')
      .map((_, i) => i + 1);
  }

  return (
    <div className="flex gap-1">
       <Combobox items={days} onValueChange={(value) => onChange({ ...selectedTime, day: value as number })}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>

      {/* <Combobox
        options={days}
        value={selectedTime.day || 1}
        onChangeVal={(newValue) => onChange({ ...selectedTime, day: newValue })}
      />
      <Combobox
        options={months}
        value={selectedTime.month}
        onChangeVal={(newValue) => onChange({ ...selectedTime, month: newValue })}
      />
      <Combobox
        options={years}
        value={selectedTime.year}
        onChangeVal={(newValue) => onChange({ ...selectedTime, year: newValue })}
      /> */}
    </div>
  );
};

export default TimeSelector;
