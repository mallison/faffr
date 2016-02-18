import React from 'react';

import { spaceComponents } from './utils';

// Crude multi-level select to be replaced with a nice component
export default class TaskMenu extends React.Component {
  render() {
    let { tasks } = this.props;
    return (
      <div>
        {spaceComponents(this._renderTasks(tasks))}
      </div>
    );
  }

  _renderTasks(tasks, level = 0) {
    // TODO this needed?
    if (!tasks.length) {
      return null;
    }
    ///////////
    let selected;
    let path;
    if (this.props.selectedTask.length) {
      selected = this.props.selectedTask[level];
      path = this.props.selectedTask.slice(0, level);
    } else {
      path = [];
    }
    let select;
    let menu = [
      <select
              key={level}
              ref={node => select = node}
              className="form-control"
              value={selected}
              onChange={() => this.props.selectTask([...path, select.value])}
              >
        <option></option>
        {tasks.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
      </select>
    ];
    if (selected) {
      let selectedTask = tasks.find(t => t.name === selected);
      if (selectedTask.subtasks) {
        menu = menu.concat(
          this._renderTasks(selectedTask.subtasks, level + 1)
        );
      }
    }
    return menu;
  }
}
