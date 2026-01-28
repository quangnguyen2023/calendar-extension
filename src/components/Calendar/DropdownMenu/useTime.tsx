import { CalendarContext } from '@/components/Calendar';
import { SelectedTime } from '@/components/Calendar/types';
import { LunarDate, SolarDate } from '@nghiavuive/lunar_date_vi';
import { useContext, useState } from 'react';

const useTime = () => {
  const { selectedTime, changeTime } = useContext(CalendarContext);

  const [solarTime, setSolarTime] = useState({
    ...selectedTime,
    month: selectedTime.month + 1,
  });

  const [lunarTime, setLunarTime] = useState<SelectedTime>(() => {
    const lunar = new SolarDate({
      day: solarTime?.day ?? 1,
      month: solarTime.month,
      year: solarTime.year,
    })
      .toLunarDate()
      .get();
    return { day: lunar.day, month: lunar.month, year: lunar.year };
  });

  const handleSolarChange = (newSolar: SelectedTime) => {
    setSolarTime(newSolar);

    const lunar = new SolarDate({
      day: newSolar?.day ?? 1,
      month: newSolar.month,
      year: newSolar.year,
    })
      .toLunarDate()
      .get();

    setLunarTime({ day: lunar.day, month: lunar.month, year: lunar.year });
  };

  const handleLunarChange = (newLunar: SelectedTime) => {
    let lunar: any;
    try {
      lunar = new LunarDate({
        day: newLunar?.day ?? 1,
        month: newLunar.month,
        year: newLunar.year,
      });
      lunar.init();
      setLunarTime(newLunar);
    } catch (e) {
      // Case: the selected day is the 30th, but the selected lunar month only has 29 days
      lunar = new LunarDate({
        day: 1,
        month: newLunar.month + 1,
        year: newLunar.year,
      });
      lunar.init();
      setLunarTime({ ...newLunar, day: 1, month: newLunar.month + 1 });
    }

    const solar = lunar.toSolarDate().get();

    setSolarTime({ day: solar.day, month: solar.month, year: solar.year });
  };

  const onGoToDate = () => {
    // Ensure 'day' exists in solarTime, default to 1 if not
    const day = solarTime?.day ?? 1;
    const month = solarTime.month - 1;
    changeTime({ ...solarTime, day, month });
  };

  return {
    solarTime,
    lunarTime,
    handleSolarChange,
    handleLunarChange,
    onGoToDate,
  };
};

export default useTime;
