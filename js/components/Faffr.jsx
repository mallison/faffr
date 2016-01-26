import React, { PropTypes } from 'react';

import TaskSwitcher from './TaskSwitcher';
import Slot from './Slot';
import Visualiser from './Visualiser';
import Day from './Day';
import Month from './Month';

const TASKS = [
  {name: 'admin', colour: 'blue'},
  {name: 'afk', colour: 'red'},
  {name: 'coding', colour: 'yellow'},
  {name: 'coffee', colour: 'brown'},
  {name: 'eat', colour: 'green'},
  {name: 'misc', colour: '#ccc'},
  {name: 'therapy', colour: 'cyan'},
  {name: 'tv', colour: 'orange'},
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
    /* this._slots.scrollTop = this._slots.scrollHeight; */
    this._autoSave = setInterval(
      () => this.props.saveSlots(this.state.slots),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this._autoSave);
  }

  render() {
    let taskNames = TASKS.map(t => t.name);
    let monthSlots = this.state.slots.filter(s => (s.start.getMonth() === 0) && (s.start.getFullYear() === 2015));
    let slots = [...this.state.slots];
    slots.reverse();
    return (
      <div className="row">
        <h1>Faffr</h1>
        <div className="col-md-6">
          <div className="form-inline">
            <TaskSwitcher onStartTask={this._startTask} tasks={taskNames}/>
            {this._renderStop()}
          </div>
          {slots.map(
            (s, i) => {
              let slotIndex = slots.length - 1 - i;
              return (
                <Slot {...s}
                tasks={taskNames}
                onNoteChange={this._changeNote.bind(this, slotIndex)}
                isEditable={this.state.isEditing === slotIndex}
                isFocused={this.state.isEditing !== slotIndex && i === 0}
                onClickEdit={this._markEditable.bind(this, slotIndex)}
                onUpdateSlot={this._updateSlot.bind(this, slotIndex)}
                onDeleteSlot={this._deleteSlot.bind(this, slotIndex)}
                onInsertSlot={this._insertSlot.bind(this, slotIndex)}
                />
              );
            }
           )}
        </div>
        <div className="col-md-6">
          <Day slots={this.state.slots} tasks={TASKS} />
        </div>
      </div>
    );
  }

  _renderStop() {
    let slots = this.state.slots;
    if (slots.length && !slots[slots.length - 1].end) {
      return [
        ' Or ',
        <div className="form-group">
          <button
                  className="btn btn-success"
                  onClick={this._stop}
                  ariaLabel="End"
                  >
            <span className="glyphicon glyphicon-stop" aria-hidden="true"></span>
          </button>
        </div>
      ];
    }
    return null;
  }

  _startTask = (task, startTime) => {
    let slots = this.state.slots;
    if (slots.length > 1 && slots[slots.length - 1].end) {
      delete slots[slots.length - 1].end;
    }
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

  _stop =() => {
    let slots = this.state.slots;
    if (slots.length) {
      let lastSlot = slots[slots.length - 1];
      lastSlot.end = new Date();
    }
    this.setState({
      slots: slots,
    });
  };
}
