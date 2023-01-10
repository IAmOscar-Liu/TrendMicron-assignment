export type ViewType = "date" | "month" | "year";
export type CenturyType = 1700 | 1800 | 1900 | 2000 | 2100;
export type MonthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type CalendarDateType = {
  date: number;
  isThisMonth: boolean;
};
export type CalendarType = CalendarDateType[][];
export type DateType = {
  year: number;
  month: MonthType;
  date: number;
};
