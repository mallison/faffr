import React, { PropTypes } from 'react';

import TaskSwitcher from './TaskSwitcher';

export default class Faffr extends React.Component {
  state = {
    slots: []
  };

  render() {
    return (
      <div>
        <h1>Faffr</h1>
        <TaskSwitcher onStartTask={this._startTask} />
        {this.state.slots.map(s => <p>{s[0]} {s[1]}</p>)}
      </div>
    );
  }

  _startTask = (task, startTime) => {
    let slots = this.state.slots;
    slots.push([startTime, task]);
    this.setState({slots});
  };

}
