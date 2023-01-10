import React from "react";
import { getMonthString } from "../utils/getMonthString";
import { initCalendar } from "../utils/initCalendar";
import { CalendarProps } from "./Calendar";

const DateViewComp: React.FC<
  Pick<
    CalendarProps,
    | "setViewType"
    | "today"
    | "year"
    | "month"
    | "goToNextMonth"
    | "goToPrevMonth"
    | "selectedDate"
    | "onSelectDate"
  >
> = ({
  setViewType,
  today,
  year,
  month,
  goToNextMonth,
  goToPrevMonth,
  selectedDate,
  onSelectDate,
}) => {
  const calendar = initCalendar(year, month);
  const isToday = (thisDate: number) =>
    today.year === year && today.month === month && today.date === thisDate;

  const isSelectedDate = (thisDate: number) =>
    selectedDate?.year === year &&
    selectedDate?.month === month &&
    selectedDate?.date === thisDate;

  return (
    <>
      <h1 className="calendar__header">
        <span className="left-arrow" onClick={goToPrevMonth}>
          {"<"}
        </span>
        <span className="calendar__header-title" onClick={() => setViewType("month")}>
          {getMonthString(month, true)} {year}
        </span>
        <span className="right-arrow" onClick={goToNextMonth}>
          {">"}
        </span>
      </h1>
      <main
        style={
          {
            "--char-length": "2ch",
            "--body-gap": ".5em",
          } as React.CSSProperties
        }
        className="calendar__body"
      >
        <p className="weekday-title">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </p>
        {calendar.map((row, rowIdx) => (
          <p key={rowIdx} className="weekday-body">
            {row.map((d, dIdx) => (
              <span
                key={`${rowIdx},${dIdx}`}
                className={
                  "weekday-body-element " +
                  (!d.isThisMonth
                    ? "gray"
                    : isSelectedDate(d.date)
                    ? "select"
                    : isToday(d.date)
                    ? "today"
                    : "")
                }
                onClick={() => {
                  if (d.isThisMonth)
                    onSelectDate({ year, month, date: d.date });
                }}
              >
                {d.date}
              </span>
            ))}
          </p>
        ))}
      </main>
    </>
  );
};

export default DateViewComp;
