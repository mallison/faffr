import getID from '../utils/getID';

// TODO obviously these add/update/delete/... actions could generalise
// to any list of objects
export function addSlot(task, start) {
  return {
    type: 'add',
    task,
    start
  };
}

// TODO possibly this could be two separate actions?
export function updateSlot(slotID, task, start) {
  return {
    type: 'update',
    slotID,
    task,
    start
  };
}

export function updateNote(slotID, note) {
  return {
    type: 'updateNote',
    slotID,
    note
  };
}

export function deleteSlot(slotID) {
  return {
    type: 'delete',
    slotID
  };
}

export function insertSlot(beforeSlotID) {
  return {
    type: 'insert',
    beforeSlotID,
    newSlotID: getID()
  };
}

export function endSlot(slotID) {
  return {
    type: 'END_SLOT',
    slotID
  };
}

export function markEditable(slotID) {
  return {
    type: 'MARK_EDITABLE',
    slotID
  };
}
