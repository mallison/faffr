import getID from '../utils/getID';
import SLOTS from '../dummyInitialState';
import { dateFromISODateString } from '../utils/dateTime';

// const initialState = SLOTS;  // for debug

// TODO generalise this to any state which is a list of objects
// TODO use React.addons.update or Immutable.js instead of shallow copies with spread operator?
// TODO better data structure than list for this?
export default function reduce(state = [], action) {
  // if (typeof state === 'undefined') {
  //   return initialState;
  // }

  let newState = [...state];

  if (action.type === 'LOAD_APP_DATA_SUCCESS') {
    /* this is for slots from timesheet.py */
    /* slots = slots.map(s => ({
       task: s[1][0],
       start: new Date(s[0])
       })); */
    let slots = action.data.slots.map(s => {
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
    return slots;

  } else if (action.type === 'add') {
    let { task, start } = action;
    let slot = {
      task,
      start,
      id: getID()
    };
    if (newState.length) {
      let slotIndex = newState.length - 1;
      let lastSlot = {...newState[slotIndex]};
      if (!lastSlot.end) {
        lastSlot.end = start;
        newState.splice(slotIndex, 1, lastSlot);
      }
    }
    newState.push(slot);

  } else if (action.type === 'insert') {
    let slotIndex = getSlotIndex(newState, action.beforeSlotID);
    let slot = {
      task: '',
      start: newState[slotIndex].start,
      id: action.newSlotID
    };
    newState.splice(slotIndex, 0, slot);

  } else if (action.type === 'update') {
    let { task, start, end } = action;
    let slotIndex = getSlotIndex(newState, action.slotID);
    let slot = newState[slotIndex];
    slot = {...slot};
    slot.task = task;
    slot.start = start;
    slot.end = end;
    newState.splice(slotIndex, 1, slot);
    // We have to re-sort here as the update may have changed the slot
    // start time
    newState.sort((a, b) => a.start - b.start);

  } else if (action.type === 'updateNote') {
    let slotIndex = getSlotIndex(newState, action.slotID);
    let slot = newState[slotIndex];
    slot = {...slot};
    slot.note = action.note;
    newState.splice(slotIndex, 1, slot);

  } else if (action.type === 'delete') {
    let slotIndex = getSlotIndex(newState, action.slotID);
    newState.splice(slotIndex, 1);

  }
  return newState;
}

function getSlotIndex(slots, slotID) {
  return slots.findIndex(slot => slot.id === slotID);
}

// TODO
// export function initLoadedSlots(slots) {
// }
