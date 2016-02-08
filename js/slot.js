import { isDateInDay } from './utils/dateTime';

export function getSlotsInDay(slots, day) {
  return slots.filter(s => isDateInDay(s.start, day));
}
