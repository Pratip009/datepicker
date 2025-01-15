// Utility function to format a date to YYYY-MM-DD
export const formatDate = (date: Date): string =>
  date.toISOString().split("T")[0];

// Utility function to check if a date is a weekend (only Saturday and Sunday)
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

// Utility function to get all dates in a range
export const getDatesInRange = (start: Date, end: Date): Date[] => {
  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};
