import React, { PropTypes } from 'react';

import TaskSwitcher from './TaskSwitcher';
import Slot from './Slot';

export default class Faffr extends React.Component {
  state = {
    slots: [
      {
        start: '12:00',
        task: 'coding',
        note: ''
      }
    ]
  };

  render() {
    return (
      <div>
        <h1>Faffr</h1>
        <TaskSwitcher onStartTask={this._startTask} />
        {this.state.slots.map(
          (s, i) => <Slot {...s} onNoteChange={this._changeNote.bind(this, i)} />
         )}
      </div>
    );
  }

  _startTask = (task, startTime) => {
    let slots = this.state.slots;
    slots.push({
      start: startTime,
      task,
      note: ''
    });
    this.setState({slots});
  };

  // TODO how come .bind doesn't work with _changeNote = () =>?
  _changeNote(index, note) {
    let slots = this.state.slots;
    slots[index].note = note;
    this.setState({slots: slots});
  }
}
