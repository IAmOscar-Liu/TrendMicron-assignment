import { useEffect, useRef, useState } from "react";
import { useCalendar } from "../context/CalendarProvider";
import { formatMonthAndDate } from "../utils/formatMonthAndDate";
import { isValidDate } from "../utils/isValidDate";
import { DateType, MonthType } from "../utils/types";
import Calendar from "./Calendar";

const DatePicker: React.FC<{
  onSelect: (_data: DateType) => void;
  today: DateType;
}> = ({ onSelect: handleSelect, today }) => {
  const [isEditing, toggleIsEditing] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const { setYear, setMonth, selectedDate, setSelectedDate } = useCalendar();

  const [inputYear, setInputYear] = useState<string>(
    (selectedDate?.year || today.year) + ""
  );
  const [inputMonth, setInputMonth] = useState<string>(
    formatMonthAndDate(selectedDate?.month || today.month)
  );
  const [inputDate, setInputDate] = useState<string>(
    formatMonthAndDate(selectedDate?.date || today.date)
  );
  const [hasError, toggleHasError] = useState<boolean>(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        (formRef.current && formRef.current.contains(target)) ||
        (calendarRef.current && calendarRef.current.contains(target)) ||
        target.classList.contains("calendar__header-title") ||
        target.classList.contains("weekday-body-element")
      ) {
        // console.log("editing");
        // console.log(target);
        toggleIsEditing(true);
      } else {
        // console.log("close editing");
        // console.log("inputRef.current");
        // console.log(inputRef.current);
        // console.log("calendarRef.current");
        // console.log(calendarRef.current);
        // console.log("e.target");
        // console.log(target);
        toggleIsEditing(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="date-picker">
      <div className="form-wrapper">
        <form
          className={`date-input ${isEditing ? "focus" : ""}`}
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submitting...");
            const [newYear, newMonth, newDate] = [
              parseInt(inputYear),
              parseInt(inputMonth),
              parseInt(inputDate),
            ];
            if (!isValidDate(newYear, newMonth, newDate)) {
              window.alert("Invalid date formate");
              toggleHasError(true);
            } else {
              console.log("set Date manually");
              toggleHasError(false);
              setYear!(newYear);
              setMonth!(newMonth as MonthType);
              setSelectedDate!({
                year: newYear,
                month: newMonth as MonthType,
                date: newDate,
              });

              setInputYear(newYear + "");
              setInputMonth(formatMonthAndDate(newMonth));
              setInputDate(formatMonthAndDate(newDate));
              toggleIsEditing(false);
            }
          }}
        >
          <span>Date: </span>
          <input
            type="number"
            placeholder="YYYY"
            className="input-year"
            min={1700}
            max={2199}
            step={1}
            value={inputYear}
            onChange={(e) => setInputYear(e.target.value)}
            required
          />
          {"-"}
          <input
            type="number"
            placeholder="MM"
            className="input-month"
            min={1}
            max={12}
            step={1}
            value={inputMonth}
            onChange={(e) => setInputMonth(e.target.value)}
            required
          />
          {"-"}
          <input
            type="number"
            placeholder="DD"
            className="input-date"
            min={1}
            max={31}
            step={1}
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            required
          />
          <input type="submit" value="OK" />
        </form>
        {hasError && (
          <span style={{ color: "red", marginLeft: "1ch" }}>
            Invalid date format
          </span>
        )}
      </div>
      <div
        className="calendar-wrapper"
        ref={calendarRef}
        style={{ display: isEditing ? "flex" : "none" }}
      >
        <Calendar
          onSelect={(_date) => {
            setInputYear(_date.year + "");
            setInputMonth(formatMonthAndDate(_date.month));
            setInputDate(formatMonthAndDate(_date.date));
            setTimeout(() => {
              // console.log("handleSelect");
              toggleIsEditing(false);
            }, 100);
            handleSelect(_date);
          }}
          today={today}
          resetViewType={true}
        />
      </div>
    </div>
  );
};

export default DatePicker;
