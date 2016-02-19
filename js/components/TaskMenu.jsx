import React from 'react';

import AddTask from '../containers/AddTask';

export default class TaskMenu extends React.Component {
  state = {
    addingNewTaskAt: null
  };

  render() {
    return (
      this.state.addingNewTaskAt === null ?
        <TaskSelect
                {...this.props}
                onChange={this._onChange}
        />
        :
        <AddTask
                placeholder={`New ${this.state.addingNewTaskAt} task`}
                onAddTask={this._onAddTask}
                onCancel={this._cancelAddTask}
        />
    );
  }

  _onChange = (e) => {
    let value = e.target.value;
    if (value.substr(0, 1) === '+') {
      this.setState({addingNewTaskAt: value});
    } else {
      this.props.selectTask(value);
      this.setState({addingNewTaskAt: null});
    }
  };

  _onAddTask = (name) => {
    let ancestors = this.state.addingNewTaskAt.substr(1).split('.');
    this.setState({addingNewTaskAt: null});
    this.props.addTask(name, ancestors);
  };

  _cancelAddTask = () => {
    this.setState({addingNewTaskAt: null});
  };
}

const TaskSelect = ({ tasks, task, selectedTask, onChange }) => {
  return (
    <select
            className="form-control"
            value={selectedTask || task}
            onChange={onChange}
            >
      <option value="">- Choose task -</option>
      {renderTasks(tasks)}
    </select>
  );
};

const renderTasks = (tasks, parentID, level=0) => {
  let prefix = Array(2 * level + 1).join('-');
  let menuItems = tasks.map(t => renderTask(t, level, prefix));
  menuItems.push(
    <option
            value={`+${parentID}`}
            >
      {prefix} [New task]
    </option>
  );
  return menuItems;
};

const renderTask = (task, level, prefix) => {
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
      renderTasks(task.subtasks, task.id, level + 1)
    );
  }
  return options;
};
