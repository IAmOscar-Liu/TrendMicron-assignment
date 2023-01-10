import { createContext, useContext, useState } from "react";
import { DateType, MonthType, ViewType } from "../utils/types";

const CalendarStore = () => {
  const [viewType, setViewType] = useState<ViewType>("date");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<MonthType>(
    (new Date().getMonth() + 1) as MonthType
  );
  const [selectedDate, setSelectedDate] = useState<DateType | undefined>(undefined);

  return { viewType, setViewType, year, setYear, month, setMonth, selectedDate, setSelectedDate };
};

const CalendarContextProvider = createContext<
  Partial<ReturnType<typeof CalendarStore>>
>({});

export const useCalendar = () => useContext(CalendarContextProvider);

const CalendarProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  return (
    <CalendarContextProvider.Provider value={CalendarStore()}>
      {children}
    </CalendarContextProvider.Provider>
  );
};

export default CalendarProvider;
