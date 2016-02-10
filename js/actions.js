import request from 'superagent';

export function fetchSlots() {
  return (dispatch) => {
    return request
      .get('/slots')
      .end((err, res) => dispatch({
        type: 'receiveSlots',
        slots: res.body
      }));
  };
}

export function saveSlots(slots) {
  return (dispatch) => {
    // TODO dispatch a SAVE_START action or something
    return request
      .post('/slots')
      .send(slots)
      .end();
    // TODO .end => dispatch save success/fail action
  };
}

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
    slotID: beforeSlotID
  };
}

export function endDay() {
  return {
    type: 'end'
  };
}

export function markEditable(slotID) {
  return {
    type: 'MARK_EDITABLE',
    slotID
  };
}
