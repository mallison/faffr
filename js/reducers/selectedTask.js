export default function selectedTask(state = "", action) {
  if (action.type === 'SELECT_TASK') {
    return action.taskID;
  }
  if (action.type === 'add') {
    return '';
  }
  return state;
}
