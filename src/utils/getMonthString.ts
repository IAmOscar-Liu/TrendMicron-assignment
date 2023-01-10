import { MonthType } from "./types";

export const getMonthString = (month: MonthType, isShort: Boolean = false) => {
  switch (month) {
    case 1:
      return isShort ? "Jan" : "January";
    case 2:
      return isShort ? "Feb" : "February";
    case 3:
      return isShort ? "Mar" : "March";
    case 4:
      return isShort ? "Apr" : "April";
    case 5:
      return isShort ? "May" : "May";
    case 6:
      return isShort ? "Jun" : "June";
    case 7:
      return isShort ? "Jul" : "July";
    case 8:
      return isShort ? "Aug" : "August";
    case 9:
      return isShort ? "Sep" : "September";
    case 10:
      return isShort ? "Oct" : "October";
    case 11:
      return isShort ? "Nov" : "November";
    default:
      return isShort ? "Dec" : "December";
  }
};
