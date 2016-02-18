export default function selectedTask(state = "", action) {
  if (action.type === 'SELECT_TASK') {
    return action.taskID;
  }
  if (action.type === 'ADD_TASK') {
    return [...action.ancestors, action.name].join('.');
  }
  return state;
}
