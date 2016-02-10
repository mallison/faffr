export default function editableSlot(state = null, action) {
  if (action.type === 'MARK_EDITABLE') {
    return action.slotID;

  } else if (action.type === 'insert') {
    return action.newSlotID;

  } else if (action.type === 'update') {
    return null;
  }
  return state;
}
