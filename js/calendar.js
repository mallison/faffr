export function getDaysOfMonth(year, month) {
  let firstDayOfMonthOffsetFromMonday = getfirstDayOfMonthOffsetFromMonday(year, month);
  let days = [];
  for (let day = 1; day <= 38; day += 1) {
    days.push(
      getDayOfMonth(year, month, day - firstDayOfMonthOffsetFromMonday)
    );
  }
  return days;
}

function getfirstDayOfMonthOffsetFromMonday(year, month) {
  let firstDayOfMonth = new Date(year, month, 1);
  return firstDayOfMonth.getDay();
}

function getDayOfMonth(year, month, day) {
  let date = new Date(
    year,
    month,
    day
  );
  let dayMonthIndex = date.getMonth();
  let isDayInMonth = dayMonthIndex === month;
  return {date, isDayInMonth, number: date.getDate()};
}
