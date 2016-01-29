import { isDateInDay, dateFromISODateString } from './utils/dateTime';

export function getSlotsInDay(slots, day) {
  return slots.filter(s => isDateInDay(s.start, day));
}

export function getSlotEnd(slots, slotIndex) {
  // TODO
}

// TODO this is basically a store. Use redux or observable or ... ?
// Also this is generalisable to *any* ordered collection of things!
// Probably redux library to handle collections?
let _slots = [];
let _slotID = 1;

export function getSlots() {
  return _slots;
}

export function initLoadedSlots(slots) {
  /* this is for slots from timesheet.py */
  /* slots = slots.map(s => ({
     task: s[1][0],
     start: new Date(s[0])
     })); */
  _slots = slots.map(s => {
    let slot = {
      start: dateFromISODateString(s.start),
      task: s.task,
      note: s.note
    };
    if (s.end) {
      slot.end = dateFromISODateString(s.end);
    }
    slot.id = getID();
    return slot;
  });
  return _slots;
}

export function addSlot(task, start) {
  let slot = {
    task,
    start,
    id: getID()
  };
  _slots.push(slot);
  return _slots;
}

export function insertSlot(beforeSlotID) {
  let slotIndex = getSlotIndex(beforeSlotID);
  let slot = {
    task: '',
    start: _slots[slotIndex].start,
    id: getID()
  };
  _slots.splice(slotIndex, 0, slot);
  return [_slots, slot.id];
}

export function updateSlot(slotID, task, start) {
  let slot = _slots[getSlotIndex(slotID)];
  slot.task = task;
  slot.start = start;
  return _slots;
}

export function deleteSlot(slotID) {
  _slots.splice(getSlotIndex(slotID), 1);
  return _slots;
}

export function endSlot() {
  if (_slots.length) {
    let lastSlot = _slots[_slots.length - 1];
    lastSlot.end = new Date();
  }
  return _slots;
}

function getID() {
  let newID = _slotID;
  _slotID += 1;
  return newID;
}

function getSlotIndex(slotID) {
  return _slots.findIndex(slot => slot.id === slotID);
}
