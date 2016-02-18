import React from 'react';

import { spaceComponents } from './utils';

// TODO is there best practice for hierarchical data (on mobile)?
const TaskMenu = ({ tasks, task, selectedTask, selectTask }) => {
  return (
    <select
            className="form-control"
            value={selectedTask || task}
            onChange={(e) => selectTask(e.target.value)}
            >
      <option value="">- Choose task -</option>
      {tasks.map(t => renderTask(t))}
    </select>
  );
};

const renderTask = (task, level=0) => {
  let prefix = Array(2 * level + 1).join('-');
  let options = [
    <option
            key={task.name}
            value={task.id}
            >
      {prefix} {task.name}
    </option>
  ];
  if (task.subtasks.length) {
    options = options.concat(
      task.subtasks.map(t => renderTask(t, level + 1))
    );
  }
  return options;
};

export default TaskMenu;
