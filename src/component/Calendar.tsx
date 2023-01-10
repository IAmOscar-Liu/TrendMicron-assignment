import { useState } from "react";
import { useCalendar } from "../context/CalendarProvider";
import { DateType, MonthType, ViewType } from "../utils/types";
import DateViewComp from "./DateViewComp";
import MonthViewComp from "./MonthViewComp";
import YearViewComp from "./YearViewComp";

export type CalendarProps = {
  viewType: ViewType;
  setViewType: React.Dispatch<React.SetStateAction<ViewType>>;
  today: DateType;
  year: number;
  month: MonthType;
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
  goToMonth: (_month: MonthType) => void;
  selectedDate: DateType | undefined;
  onSelectDate: (_date: DateType) => void;
  goToNextYear: () => void;
  goToPrevYear: () => void;
  goToYear: (_year: number) => void;
  goToNextDecade: () => void;
  goToPrevDecade: () => void;
};

const Calendar: React.FC<{
  onSelect: (_data: DateType) => void;
  today: DateType;
  resetViewType?: boolean;
}> = ({ onSelect, today, resetViewType = false }) => {
  const {
    viewType: calendarViewType,
    setViewType: calendarSetViewType,
    year,
    setYear,
    month,
    setMonth,
    selectedDate,
    setSelectedDate,
  } = useCalendar();

  const [newViewType, setNewViewType] = useState<ViewType>("date");

  const viewType = resetViewType ? newViewType : calendarViewType!;
  const setViewType = resetViewType ? setNewViewType : calendarSetViewType!;

  const onSelectDate = (_date: DateType) => {
    setSelectedDate!(_date);
    onSelect(_date);
  };

  // month controller
  const goToNextMonth = () => {
    if (month === 12) {
      setYear!((prev) => prev + 1);
      setMonth!(1);
    } else setMonth!((prev) => (prev + 1) as MonthType);
  };

  const goToPrevMonth = () => {
    if (month === 1) {
      setYear!((prev) => prev - 1);
      setMonth!(12);
    } else setMonth!((prev) => (prev - 1) as MonthType);
  };
  const goToMonth = (_month: MonthType) => {
    setMonth!(_month);
    setViewType!("date");
  };

  // year controller
  const goToNextYear = () =>
    setYear!((prev) => (prev < 2199 ? prev + 1 : prev));
  const goToPrevYear = () =>
    setYear!((prev) => (prev > 1700 ? prev - 1 : prev));
  const goToYear = (_year: number) => {
    setYear!(_year);
    setViewType!("month");
  };

  // decade controller
  const goToNextDecade = () =>
    setYear!((prev) => (prev < 2190 ? prev + 10 : prev));
  const goToPrevDecade = () =>
    setYear!((prev) => (prev > 1709 ? prev - 10 : prev));

  const viewComp =
    viewType === "date" ? (
      <DateViewComp
        setViewType={setViewType}
        today={today}
        year={year!}
        month={month!}
        goToNextMonth={goToNextMonth}
        goToPrevMonth={goToPrevMonth}
        selectedDate={selectedDate!}
        onSelectDate={onSelectDate}
      />
    ) : viewType === "month" ? (
      <MonthViewComp
        setViewType={setViewType}
        today={today!}
        year={year!}
        goToMonth={goToMonth}
        goToNextYear={goToNextYear}
        goToPrevYear={goToPrevYear}
        selectedDate={selectedDate}
      />
    ) : (
      <YearViewComp
        today={today}
        year={year!}
        goToYear={goToYear}
        selectedDate={selectedDate!}
        goToNextDecade={goToNextDecade}
        goToPrevDecade={goToPrevDecade}
      />
    );

  return <div className="calendar">{viewComp}</div>;
};

export default Calendar;
