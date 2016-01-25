import React, { PropTypes } from 'react';

import TaskSwitcher from './TaskSwitcher';
import Slot from './Slot';
import Visualiser from './Visualiser';
import Day from './Day';
import Month from './Month';

const TASKS = [
  {name: 'afk', colour: 'red'},
  {name: 'lunch', colour: 'green'},
  {name: 'admin', colour: 'blue'},
  {name: 'coding', colour: 'yellow'},
  {name: 'workout', colour: 'purple'}
];

export default class Faffr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: null,
      // TODO deepcopy? not supposed to mutate props
      slots: this.props.slots
    };
  }

  componentDidMount() {
    this._slots.scrollTop = this._slots.scrollHeight;
  }

  render() {
    let taskNames = TASKS.map(t => t.name);
    let monthSlots = this.state.slots.filter(s => (s.start.getMonth() === 0) && (s.start.getFullYear() === 2015));
    return (
      <div>
        <h1>Faffr</h1>
        <Month year={2015} month={0} slots={monthSlots} tasks={TASKS} />
        <hr style={{clear: 'both'}}/>
        <div style={{width: '40%', height: 300, 'float': 'left'}}>
          <div
                  style={{height: '100%', overflowY: 'scroll'}}
                  ref={r => this._slots = r}
                  >
          {this.state.slots.map(
            (s, i) => {
              return (
                <Slot {...s}
                tasks={taskNames}
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
          <TaskSwitcher onStartTask={this._startTask} tasks={taskNames}/>
        </div>
        <div style={{width: '20%', height: 300, 'float': 'left'}}>
          <Day slots={this.state.slots} tasks={TASKS} />
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
