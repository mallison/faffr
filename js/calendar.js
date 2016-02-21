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

export function getDaysOfWeek(date) {
  let mondayThisWeek = new Date(date - (date.getDay() + 6) * 24 * 60 * 60 * 1000);
  let week = [];
  for (let i = 0; i < 7; i += 1) {
    week.push(new Date(mondayThisWeek.getTime() + i * 24 * 60 * 60 * 1000));
  }
  return week;
}

function getfirstDayOfMonthOffsetFromMonday(year, month) {
  let firstDayOfMonth = new Date(year, month, 1);
  return firstDayOfMonth.getDay() - 1;
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
