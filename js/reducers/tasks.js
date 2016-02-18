import update from 'react-addons-update';

const TASKS = [
  {
    name: 'admin',
    colour: 'blue',
    subtasks: [],
  },
  {
    name: 'afk',
    colour: 'red',
    subtasks: []
  },
  {
    name: 'coding',
    colour: 'yellow',
    subtasks: [
      {
        name: 'faffr',
        colour: 'blue',
        subtasks: []
      },
      {
        name: 'repr',
        colour: 'blue',
        subtasks: []
      }
    ]
  },
  {
    name: 'coffee',
    colour: 'brown',
    subtasks: []
  },
  {
    name: 'eat',
    colour: 'green',
    subtasks: []
  },
  {
    name: 'job',
    colour: '#cab',
    subtasks: []
  },
  {
    name: 'misc',
    colour: '#ccc',
    subtasks: []
  },
  {
    name: 'therapy',
    colour: 'cyan',
    subtasks: []
  },
  {
    name: 'tv',
    colour: 'orange',
    subtasks: []
  },
  {
    name: 'workout',
    colour: 'purple',
    subtasks: []
  }
];

function setTaskIDs() {
  TASKS.forEach(t => setTaskID(t));
}

function setTaskID(task, parent) {
  let taskID = task.name;
  if (parent) {
    taskID = `${parent}.${taskID}`;
  }
  task.id = taskID;
  task.subtasks.map(t => setTaskID(t, taskID));
}

setTaskIDs();

export default function reduce(state = TASKS, action) {
  if (action.type === 'ADD_TASK') {
    let task = {
      name: action.name,
      children: [],
      colour: '#123'
    };
    if (!action.parent) {
      state = update(state, {$push: [task]});
    } else {
      state = addSubtask(state, parent, task);
    }
  }
  return state;
}

function addSubtask(state, parent, task) {
  let parentIndex = state.findIndex(t => t === parent); // TODO compare by ref prob not good idea?
  return update(state, {[parentIndex]: {'subtasks': {$push: [task]}}});
}
