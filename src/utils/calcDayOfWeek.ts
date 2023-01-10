import { isLeapYear } from "./isLeapYear";
import { centuriesTable, monthsTable } from "./tables";
import { CenturyType, MonthType } from "./types";

// date: 2054-06-19
export const calcDayOfWeek = (date: string) => {
  const [year, month, day] = date.split("-").map((v) => Number(v));
  // console.log(year: ${year}, month: ${month}, day: ${day});

  // 1.Look up the 2000s in the centuries table: 6
  const centuryValue = centuriesTable[(Math.floor(year / 100) * 100) as CenturyType];
  // 2.Note the last two digits of the year: 54
  const lastTwoDigitOfYear = year % 100;
  // 3.Divide the 54 by 4: 54/4 = 13.5 and drop the fractional part: 13
  const divideBy4 = Math.floor(lastTwoDigitOfYear / 4);
  // 4.Look up June in the months table: 4
  const monthValue =
    monthsTable[month as MonthType][isLeapYear(year) ? "leap" : "common"] ??
    monthsTable[month as MonthType].common;
  // 5.Add all numbers from steps 1-4 to the day of the month (in this case, 19): 6+54+13+4+19=96.
  const sum = centuryValue + lastTwoDigitOfYear + divideBy4 + monthValue + day;
  // 6.Divide the sum from step 5 by 7 and find the remainder: 96/7=13 remainder 5
  const remainderOfSum = sum % 7;

  return remainderOfSum;
};