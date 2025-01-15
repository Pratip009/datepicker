import React, { useState } from "react";
import WeekdayDateRangePicker from "./components/WeekdayDateRangePicker";
import "./index.css"; // Importing a custom CSS file for styling

const App: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<[string, string] | null>(null);
  const [weekendsInRange, setWeekendsInRange] = useState<string[] | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const handleDateRangeChange = (range: [string, string], weekends: string[]) => {
    setSelectedRange(range);
    setWeekendsInRange(weekends);
  };

  const predefinedRanges: { label: string; range: [Date, Date] }[] = [
    {
      label: "Last 7 Days",
      range: [
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(),
      ],
    },
    {
      label: "Last 30 Days",
      range: [
        new Date(new Date().setDate(new Date().getDate() - 30)),
        new Date(),
      ],
    },
  ];

  predefinedRanges.forEach((range) => {
    range.range[0].setHours(0, 0, 0, 0); // Normalize start date
    range.range[1].setHours(0, 0, 0, 0); // Normalize end date
  });


  const generateYearOptions = () => {
    const years: number[] = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 2000; i--) {
      years.push(i);
    }
    return years;
  };

  const generateMonthOptions = () => {
    return [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <>
     <div className="app-container">
      <h1 className="app-title">Weekday Date Range Picker</h1>

      {/* Date Picker for Year and Month Selection */}
      <div className="date-picker">
        <label>
          <span>Select Year:</span>
          <select value={selectedYear} onChange={handleYearChange}>
            {generateYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Select Month:</span>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {generateMonthOptions().map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
        </label>
      </div>

      <WeekdayDateRangePicker
        onChange={handleDateRangeChange}
        predefinedRanges={predefinedRanges}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

      
    </div>
    <div className="range-info">
        <div className="range-row">
          <div>
            <h2>Selected Range</h2>
            {selectedRange ? (
              <p>
                <strong>Start:</strong> {selectedRange[0]}, <strong>End:</strong> {selectedRange[1]}
              </p>
            ) : (
              <p>No range selected</p>
            )}
          </div>

          <div>
            <h2>Weekends in Range</h2>
            {weekendsInRange && weekendsInRange.length > 0 ? (
              <p>{weekendsInRange.join(", ")}</p>
            ) : (
              <p>No weekends in range</p>
            )}
          </div>
        </div>
      </div>
    </>
   
  );
};

export default App;
