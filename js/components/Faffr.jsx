import React, { PropTypes } from 'react';

import TaskSwitcher from './TaskSwitcher';
import Slot from './Slot';
import Visualiser from './Visualiser';

export default class Faffr extends React.Component {
  state = {
    slots: [
      /* {
         start: new Date(),
         task: 'coding',
         note: ''
         } */
    ],
    isEditing: null
  };

  render() {
    return (
      <div>
        <h1>Faffr</h1>
        <TaskSwitcher onStartTask={this._startTask} />
        <hr />
        <div style={{width: '40%', height: 600, 'float': 'left', overflowY: 'scroll'}}>
          {this.state.slots.map(
            (s, i) => {
              return (
                <Slot {...s}
                onNoteChange={this._changeNote.bind(this, i)}
                isEditable={this.state.isEditing === i}
                onClickEdit={this._markEditable.bind(this, i)}
                onUpdateSlot={this._updateSlot.bind(this, i)}
                />
              );
            }
           )}
        </div>
        <div style={{width: '20%', height: 600, 'float': 'left'}}>
          {this.state.slots.length ? <Visualiser slots={this.state.slots} /> : null}
        </div>
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

  _markEditable(index) {
    this.setState({isEditing: index});
  }

  _updateSlot(index, task, start) {
    let slots = this.state.slots;
    let slot = slots[index];
    slot.task = task;
    slot.start = start;
    this.setState({
      slots: slots,
      isEditing: null
    });
  }
}
