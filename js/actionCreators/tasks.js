export function addTask(name, ancestors) {
  return {
    type: 'ADD_TASK',
    name,
    ancestors
  };
}

export function selectTask(taskID) {
  return {
    type: 'SELECT_TASK',
    taskID
  };
}
