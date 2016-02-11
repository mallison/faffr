export function addTask(name, parent) {
  return {
    type: 'ADD_TASK',
    name,
    parent
  };
}

export function selectTask(path) {
  return {
    type: 'SELECT_TASK',
    path
  };
}
