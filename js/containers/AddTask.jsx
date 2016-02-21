import React from 'react';

// TODO move to components
export default class AddTask extends React.Component {
  state = {
    parentTask: null
  };

  render() {
    let { onCancel, tasks } = this.props;
    let input;
    let placeholder;
    if (this.state.parentTask) {
      placeholder = `New ${this.state.parentTask.name} task`;
    } else {
      placeholder = 'New task';
    }
    tasks = [{
      name: 'TOP',
      subtasks: tasks
    }];
    return (
      <div>
        {this._renderTasks(tasks)}
        <input
                className="form-control"
                type="text"
                placeholder={placeholder}
                ref={node => {
                     input = node;
                     }} />
        {' '}
        <button
                className="btn btn-primary"
                aria-label="Add task"
                onClick={() => {
                         if (input.value) {
                           this._onAddTask(input.value);
                           input.value = '';
                         }}}>
          <span className="sr-only">Add Task</span>
          <span aria-hidden="true" className="glyphicon glyphicon-plus"></span>
        </button>
        {' '}
        <button
                className="btn btn-warning"
                aria-label="Cancel"
                onClick={onCancel}
                >
          <span className="sr-only">Cancel</span>
          <span aria-hidden="true" className="glyphicon glyphicon-remove"></span>
        </button>
      </div>
    );
  }

  _renderTasks(tasks) {
    let taskItems = tasks.map(this._renderTask);
    return (
      <ul>
        {taskItems}
      </ul>
    );
  }

  _renderTask = (task) => {
    let subtasks;
    if (task.subtasks.length) {
      subtasks = this._renderTasks(task.subtasks);
    }
    let { parentTask } = this.state;
    let activeClass = parentTask && (task.id === this.state.parentTask.id) ? 'active' : '';
    return (
      <li
              className={activeClass}
              key={task.name}
              >
        <a
                role='button'
                onClick={() => this.setState({parentTask: task})}
                >
          {task.name}
        </a>
        {subtasks}
      </li>
    );
  };

  _onAddTask(taskName) {
    let { parentTask } = this.state;
    if (!parentTask.id) {
      this.props.onAddTask([], taskName);
    } else {
      this.props.onAddTask(parentTask.id.split('.'), taskName);
    }
    this.setState({parentTask: null});
  }
}
