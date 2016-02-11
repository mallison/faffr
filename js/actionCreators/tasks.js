export function addTask(name, parent) {
  return {
    type: 'ADD_TASK',
    name,
    parent
  };
}

export function selectTask(task) {
  return {
    type: 'SELECT_TASK',
    task
  };
}
