export default function selectedTask(state = [], action) {
  if (action.type === 'SELECT_TASK') {
    state = action.task;
  }
  return state;
}