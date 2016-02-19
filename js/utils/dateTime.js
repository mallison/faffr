// Util functions for date/time calculations

// TODO unless these are used in multiple places they'd probably
// better live with the component they are relevant to

export function dateFromISODateString(dateString) {
  return new Date(dateString);
}

export function timeToDate(hhmm, day) {
  // TODO need day argument if updating slots not ending today
  let [hours, minutes] = hhmm.split(':');
  let date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return date;
}

export function dateToTime(date) {
  // TODO no native strftime!?
  let hours = date.getHours();
  hours = zeroFill(hours);
  let minutes = date.getMinutes();
  minutes = zeroFill(minutes);
  return `${hours}:${minutes}`;
}

function zeroFill(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
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


export function getMillisecondsAsHoursAndMinutes(milliseconds) {
  let hours = Math.floor(milliseconds / (3600 * 1000));
  let minutes = Math.floor(milliseconds % (3600 * 1000) / (60 * 1000));
  return `${hours}h ${minutes}m`;
}
