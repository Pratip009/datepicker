import React, { useState, } from "react";
import "../styles/WeekdayDateRangePicker.css";

interface WeekdayDateRangePickerProps {
  onChange: (range: [string, string], weekends: string[]) => void;
  predefinedRanges?: { label: string; range: [Date, Date] }[];
  selectedMonth: number;
  selectedYear: number;
}

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  onChange,
  predefinedRanges = [],
  selectedMonth,
  selectedYear,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [weekdaysInRange, setWeekdaysInRange] = useState<Date[]>([]);

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isWeekday = (date: Date): boolean => {
    const day = date.getDay();
    return day >= 1 && day <= 5;
  };

  const calculateWeekendsInRange = (start: Date, end: Date): string[] => {
    const weekends: string[] = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      if (isWeekend(currentDate)) {
        weekends.push(formatDate(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekends;
  };

  const calculateWeekdaysInRange = (start: Date, end: Date): Date[] => {
    const weekdays: Date[] = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      if (isWeekday(currentDate)) {
        weekdays.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekdays;
  };

  const formatDate = (date: Date): string => {
    
    const normalizedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return normalizedDate.toISOString().split("T")[0]; 
  };


  const handleDateClick = (date: Date) => {
   
    const selectedDate = new Date(date);
  
   
    if (isWeekend(selectedDate)) {
      return;
    }
  
 
    const localDate = new Date(selectedDate.setHours(0, 0, 0, 0));
  
  
    if (!startDate || (startDate && endDate)) {
      setStartDate(new Date(localDate));
      setEndDate(null);
      setWeekdaysInRange([]); 
    } else if (startDate && localDate > startDate) {
      setEndDate(new Date(localDate));
      const weekdays = calculateWeekdaysInRange(startDate, localDate);
      setWeekdaysInRange(weekdays);
      onChange(
        [formatDate(startDate), formatDate(localDate)],
        calculateWeekendsInRange(startDate, localDate)
      );
    }
  };
  


  const renderCalendar = () => {
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const startDay = firstDayOfMonth.getDay();
    const dates: (Date | null)[] = Array(startDay).fill(null);

    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(selectedYear, selectedMonth, i));
    }

    const weekdayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <>
        <div className="calendar-header">
          {weekdayHeaders.map((day, index) => (
            <div key={index} className="calendar-header-cell">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {dates.map((date, index) => {
            if (!date) {
              return <div key={index} className="calendar-cell empty"></div>;
            }

            const isSelected =
              (startDate && date.toDateString() === startDate.toDateString()) ||
              (endDate && date.toDateString() === endDate.toDateString());

            const isInRange =
              startDate && endDate && date > startDate && date < endDate;

            const isSelectedWeekday = weekdaysInRange.some(
              (weekday) => weekday.toDateString() === date.toDateString()
            );

            return (
              <button
                key={date.toDateString()}
                disabled={isWeekend(date)}
                className={`calendar-cell ${isSelected ? "selected" : ""
                  } ${isInRange ? "in-range" : ""} ${isSelectedWeekday ? "weekday-highlight" : ""
                  }`}
                onClick={() => handleDateClick(date)}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="weekday-date-range-picker">
      <div className="calendar">{renderCalendar()}</div>
      <div className="predefined-ranges">
        {predefinedRanges.map((range) => (
          <button
            key={range.label}
            onClick={() => {
              setStartDate(range.range[0]);
              setEndDate(range.range[1]);
              const weekdays = calculateWeekdaysInRange(
                range.range[0],
                range.range[1]
              );
              setWeekdaysInRange(weekdays);
              onChange(
                [formatDate(range.range[0]), formatDate(range.range[1])],
                calculateWeekendsInRange(range.range[0], range.range[1])
              );
            }}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekdayDateRangePicker;
