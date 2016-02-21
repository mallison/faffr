import React from 'react';
import classnames from 'classnames';

import AddTask from '../containers/AddTask';

export default class TaskMenu extends React.Component {
  state = {
    isAddingNewTask: false
  };

  render() {
    return (
      !this.state.isAddingNewTask ?
        <TaskSelect
                {...this.props}
                onChange={this._onChange}
        />
        :
        <AddTask
                onAddTask={this._onAddTask}
                onCancel={this._cancelAddTask}
                tasks={this.props.tasks}
        />
    );
  }

  _onChange = (e) => {
    let value = e.target.value;
    if (value.substr(0, 1) === '+') {
      this.setState({isAddingNewTask: true});
    } else {
      this.props.selectTask(value);
      this.setState({isAddingNewTask: false});
    }
  };

  _onAddTask = (ancestors, name) => {
    this.setState({isAddingNewTask: false});
    this.props.addTask(ancestors, name);
  };

  _cancelAddTask = () => {
    this.setState({isAddingNewTask: false});
  };
}

const TaskSelect = ({ tasks, task, selectedTask, onChange, size }) => {
  let classes = classnames({
    'form-control': true,
    'input-sm': size === 'small'
  });
  return (
    <select
            className={classes}
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
