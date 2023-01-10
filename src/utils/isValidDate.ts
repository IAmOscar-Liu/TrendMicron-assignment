import { isLeapYear } from "./isLeapYear";

export const isValidDate = (year: number, month: number, date: number) => {
  if (isNaN(year) || isNaN(month) || isNaN(date)) return false;

  if (year < 1700 && year > 2199) return false;
  if (month < 1 && month > 12) return false;
  if (date < 1 && date > 31) return false;

  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return date <= 31;
  if ([4, 6, 9, 11].includes(month)) return date <= 30;
  if (isLeapYear(year)) {
    return date <= 29;
  }
  return date <= 28;
};
