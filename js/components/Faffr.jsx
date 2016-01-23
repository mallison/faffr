import React, { PropTypes } from 'react';

import TaskSwitcher from './TaskSwitcher';
import Slot from './Slot';
import Visualiser from './Visualiser';
import Day from './Day';

const TASKS = [
  {name: 'afk', colour: 'red'},
  {name: 'lunch',colour: 'green'},
  {name: 'admin', colour: 'blue'},
  {name: 'coding', colour: 'yellow'}
];

export default class Faffr extends React.Component {
  state = {
    slots: [
      {
        start: new Date('2016-01-23 09:00'),
        task: 'coding',
        note: ''
      },
      {
        start: new Date('2016-01-23 11:00'),
        task: 'admin',
        note: ''
      },
      {
        start: new Date('2016-01-23 12:30'),
        task: 'lunch',
        note: ''
      },
      {
        start: new Date('2016-01-23 13:20'),
        task: 'coding',
        note: ''
      },
      {
        start: new Date('2016-01-23 15:00'),
        task: 'workout',
        note: ''
      },
      {
        start: new Date('2016-01-23 16:15'),
        task: 'afk',
        note: ''
      }
    ],
    isEditing: null
  };

  render() {
    return (
      <div>
        <h1>Faffr</h1>
        <div style={{clear: 'both'}}>
          <Day slots={this.state.slots} tasks={TASKS} />
        </div>
        <TaskSwitcher onStartTask={this._startTask} tasks={TASKS.map(t => t.name)}/>
        <hr />
        <div style={{width: '40%', height: 300, 'float': 'left', overflowY: 'scroll'}}>
          {this.state.slots.map(
            (s, i) => {
              return (
                <Slot {...s}
                onNoteChange={this._changeNote.bind(this, i)}
                isEditable={this.state.isEditing === i}
                showNote={i === this.state.slots.length - 1}
                onClickEdit={this._markEditable.bind(this, i)}
                onUpdateSlot={this._updateSlot.bind(this, i)}
                onDeleteSlot={this._deleteSlot.bind(this, i)}
                onInsertSlot={this._insertSlot.bind(this, i)}
                />
              );
            }
           )}
        </div>
        <div style={{width: '20%', height: 300, 'float': 'left'}}>
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

  _deleteSlot(index) {
    let slots = this.state.slots;
    slots.splice(index, 1);
    this.setState({
      slots: slots,
      isEditing: null
    });
  }

  _insertSlot(index) {
    let slots = this.state.slots;
    slots.splice(index, 0, {task: '', start: slots[index].start});
    this.setState({
      slots: slots,
      isEditing: index
    });
  }
}
