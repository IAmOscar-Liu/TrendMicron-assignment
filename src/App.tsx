import { useMemo, useState } from "react";
import "./App.css";
import Calendar from "./component/Calendar";
import DatePicker from "./component/DatePicker";
import { useCalendar } from "./context/CalendarProvider";
import { formatMonthAndDate } from "./utils/formatMonthAndDate";
import { DateType, MonthType } from "./utils/types";

function App() {
  const [compType, setCompType] = useState<"calendar" | "datePicker">(
    "calendar"
  );
  const { selectedDate } = useCalendar();

  const today: DateType = useMemo(() => {
    const d = new Date();
    return {
      year: d.getFullYear(),
      month: (d.getMonth() + 1) as MonthType,
      date: d.getDate(),
    };
  }, []);

  const onSelect = (_date: DateType) => {
    // Do whatever you want...

    console.log(`You selected ${_date.year}/${_date.month}/${_date.date}`);
  };

  return (
    <div className="App">
      <h1>Calendar and DatePicker</h1>
      <h3 className="cmp-type">{compType}</h3>
      <h4 className="date-picked">
        Date picked:{" "}
        {selectedDate ? (
          <>
            {selectedDate.year}-{formatMonthAndDate(selectedDate.month)}-
            {formatMonthAndDate(selectedDate.date)}
          </>
        ) : (
          "Null"
        )}
      </h4>
      <div className="cmp-btns">
        <button
          className={compType === "calendar" ? "active" : ""}
          onClick={() => setCompType("calendar")}
        >
          Calendar
        </button>
        <button
          className={compType === "datePicker" ? "active" : ""}
          onClick={() => setCompType("datePicker")}
        >
          DatePicker
        </button>
      </div>
      {compType === "calendar" ? (
        <Calendar onSelect={onSelect} today={today} />
      ) : (
        <DatePicker onSelect={onSelect} today={today} />
      )}
    </div>
  );
}

export default App;
