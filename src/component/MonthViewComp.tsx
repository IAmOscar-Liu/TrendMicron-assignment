import { getMonthString } from "../utils/getMonthString";
import { MonthType } from "../utils/types";
import { CalendarProps } from "./Calendar";

const MonthViewComp: React.FC<
  Pick<
    CalendarProps,
    | "setViewType"
    | "today"
    | "year"
    | "goToMonth"
    | "goToNextYear"
    | "goToPrevYear"
    | "selectedDate"
  >
> = ({
  setViewType,
  today,
  year,
  goToMonth,
  goToNextYear,
  goToPrevYear,
  selectedDate,
}) => {
  const calendar = Array(3)
    .fill(null)
    .map((_, row) =>
      Array(4)
        .fill(null)
        .map((__, col) => ({ month: row * 4 + col + 1 }))
    );

  const isThisMonth = (thisMonth: MonthType) =>
    today.year === year && today.month === thisMonth;

  const isSelectedMonth = (thisMonth: MonthType) =>
    selectedDate?.year === year && selectedDate?.month === thisMonth;

  return (
    <>
      <h1 className="calendar__header large-bottom-margin">
        <span className="left-arrow" onClick={goToPrevYear}>
          {"<"}
        </span>
        <span className="calendar__header-title" onClick={() => setViewType("year")}>
          {year}
        </span>
        <span className="right-arrow" onClick={goToNextYear}>
          {">"}
        </span>
      </h1>
      <main
        style={
          {
            "--char-length": "3ch",
            "--body-gap": "1.5em",
          } as React.CSSProperties
        }
        className="calendar__body"
      >
        {calendar.map((row, rowIdx) => (
          <p key={rowIdx} className="month-body">
            {row.map((d, dIdx) => (
              <span
                key={`${rowIdx},${dIdx}`}
                className={
                  "weekday-body-element " +
                  (isSelectedMonth(d.month as MonthType)
                    ? "select"
                    : isThisMonth(d.month as MonthType)
                    ? "today"
                    : "")
                }
                onClick={() => goToMonth(d.month as MonthType)}
              >
                {getMonthString(d.month as MonthType, true)}
              </span>
            ))}
          </p>
        ))}
      </main>
    </>
  );
};

export default MonthViewComp;
