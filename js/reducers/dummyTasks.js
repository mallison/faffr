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

export default TASKS;

