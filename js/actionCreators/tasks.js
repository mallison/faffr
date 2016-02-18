export function addTask(name, parent) {
  return {
    type: 'ADD_TASK',
    name,
    parent
  };
}

export function selectTask(taskID) {
  return {
    type: 'SELECT_TASK',
    taskID
  };
}
