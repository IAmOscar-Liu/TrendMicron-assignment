import { isLeapYear } from "./isLeapYear";
import { MonthType } from "./types";


export const getDaysOfMonth = (year: number, month: MonthType) => {
  if ([1,3,5,7,8,10,12].includes(month)) return 31;
  if ([4,6,9,11].includes(month)) return 30;
  if (isLeapYear(year)) return 29;
  return 28;
}