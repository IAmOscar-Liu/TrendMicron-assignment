import { CalendarProps } from "./Calendar";

const YearViewComp: React.FC<
  Pick<
    CalendarProps,
    | "today"
    | "year"
    | "goToYear"
    | "selectedDate"
    | "goToNextDecade"
    | "goToPrevDecade"
  >
> = ({
  today,
  year,
  goToYear,
  selectedDate,
  goToNextDecade,
  goToPrevDecade,
}) => {
  const decade = Math.floor(year / 10) * 10;
  const calendar = Array(3)
    .fill(null)
    .map((_, row) =>
      Array(4)
        .fill(null)
        .map((__, col) => {
          const displayYear = decade + row * 4 + col - 1;
          return {
            year: displayYear,
            isThisDecade: displayYear >= decade && displayYear < decade + 10,
          };
        })
    );

  const isThisYear = (thisYear: number) => today.year === thisYear;

  const isSelectedYear = (thisYear: number) => selectedDate?.year === thisYear;

  return (
    <>
      <h1 className="calendar__header large-bottom-margin">
        <span className="left-arrow" onClick={goToPrevDecade}>
          {"<"}
        </span>
        <span className="calendar__header-title">
          {decade}
          {"-"}
          {decade + 9}
        </span>
        <span className="right-arrow" onClick={goToNextDecade}>
          {">"}
        </span>
      </h1>
      <main
        style={
          {
            "--char-length": "4ch",
            "--body-gap": "1.5em",
          } as React.CSSProperties
        }
        className="calendar__body"
      >
        {calendar.map((row, rowIdx) => (
          <p key={rowIdx} className="year-body">
            {row.map((d, dIdx) => (
              <span
                key={`${rowIdx},${dIdx}`}
                className={
                  "weekday-body-element " +
                  (!d.isThisDecade
                    ? "gray"
                    : isSelectedYear(d.year)
                    ? "select"
                    : isThisYear(d.year)
                    ? "today"
                    : "")
                }
                onClick={() => {
                  if (d.isThisDecade) goToYear(d.year);
                }}
              >
                {d.year}
              </span>
            ))}
          </p>
        ))}
      </main>
    </>
  );
};

export default YearViewComp;
