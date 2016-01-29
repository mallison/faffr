// Util functions for date/time calculations

// TODO unless these are used in multiple places they'd probably
// better live with the component they are relevant to

export function dateFromISODateString(dateString) {
  return new Date(dateString);
}

export function isDateInMonth(date, year, month) {
  return date.getMonth() === month && date.getFullYear() === year;
}

export function isDateInDay(date, day) {
  return date.toDateString() === day.toDateString();
}

export function getEndOfDay(date) {
  // Return midnight. Intended for < comparisons
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

export function getDeltaFromHourInMinutes(hour, date) {
  return 60 * (date.getHours() - hour) + date.getMinutes();
}

export function getDeltaInMinutes(start, end) {
  return (end - start) / (60 * 1000);
}

export function getMinutesInDayAfterHour(hour) {
  return 60 * (24 - hour);
}
