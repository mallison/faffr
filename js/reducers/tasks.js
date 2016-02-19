import update from 'react-addons-update';

import dummyTasks from './dummyTasks';

export default function reduce(state = dummyTasks, action) {
  if (action.type === 'LOAD_APP_DATA_SUCCESS') {
    return action.data.tasks;
  }

  if (action.type === 'ADD_TASK') {
    let taskID = [...action.ancestors, action.name].join('.');
    let task = {
      name: action.name,
      subtasks: [],
      colour: '#123',
      id: taskID
    };
    if (!action.ancestors) {
      return update(state, {$push: [task]});
    }
    return addSubtask(state, action.ancestors, task);
  }
  return state;
}

function addSubtask(state, ancestors, task) {
  let updateOperation = {};
  let node = state;
  let op = updateOperation;
  ancestors.forEach((a, i) => {
    let taskID = ancestors.slice(i).join('.');
    let taskIndex = node.findIndex(t => t.id === taskID);
    op[taskIndex] = {};
    op = op[taskIndex];
    node = node[taskIndex];
    op.subtasks = {};
    op = op.subtasks;
    node = node.subtasks;
  });
  op.$push = [task];
  return update(state, updateOperation);
}
