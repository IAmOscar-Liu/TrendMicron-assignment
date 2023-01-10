import { calcDayOfWeek } from "./calcDayOfWeek";
import { getDaysOfMonth } from "./getDaysOfMonth";
import { CalendarType, MonthType } from "./types";

export const initCalendar = (year: number, month: MonthType): CalendarType => {
  const calendar: CalendarType = Array(6)
    .fill(null)
    .map(() => Array(7).fill(0));

  const firstWeekday = calcDayOfWeek(`${year}-${month}-1`);

  const numOfThisMonth = getDaysOfMonth(year, month);
  const numOfPrevMonth =
    month > 1
      ? getDaysOfMonth(year, (month - 1) as MonthType)
      : getDaysOfMonth(year - 1, 12);

  for (let i = 0; i < 42; i++) {
    if (i < firstWeekday)
      calendar[0][i] = {
        date: numOfPrevMonth + i + 1 - firstWeekday,
        isThisMonth: false,
      };
    else if (i < firstWeekday + numOfThisMonth)
      calendar[parseInt(i / 7 + "")][i % 7] = {
        date: i - firstWeekday + 1,
        isThisMonth: true,
      };
    else
      calendar[parseInt(i / 7 + "")][i % 7] = {
        date: i - firstWeekday + 1 - numOfThisMonth,
        isThisMonth: false,
      };
  }
  return calendar;
};
