import React from 'react';

import TaskSwitcher from './TaskSwitcher';
import Slot from './Slot';
import * as slot from '../slot';

export default class Slots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: null,
      slots: slot.getSlots()
    };
  }

  render() {
    let taskNames = this.props.tasks.map(t => t.name);
    let slots = [...this.state.slots];
    slots.reverse();
    return (
      <div>
        <div className="form-inline">
          <TaskSwitcher onStartTask={this._startSlot} tasks={taskNames}/>
          {this._renderStop()}
        </div>
        {slots.map(
          s => {
            // TODO temp hack to limit to today's slots
            if (s.start.toDateString() !== new Date().toDateString()) {
              return null;
            }
            return (
              <Slot {...s}
              tasks={taskNames}
              onNoteChange={this._changeNote.bind(this, s.id)}
              isEditable={this.state.isEditing === s.id}
              isFocused={this.state.isEditing !== s.id}
              onClickEdit={this._markEditable.bind(this, s.id)}
              onUpdateSlot={this._updateSlot.bind(this, s.id)}
              onDeleteSlot={this._deleteSlot.bind(this, s.id)}
              onInsertSlot={this._insertSlot.bind(this, s.id)}
              />
            );
          }
         )}
      </div>
    );
  }

  _renderStop() {
    let slots = this.state.slots;
    // TODO move this check to slot util function
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

  _markEditable(slotID) {
    this.setState({isEditing: slotID});
  }

  _startSlot = (task, startTime) => {
    let slots = slot.addSlot(task, startTime);
    this.setState({slots});
  };

  // TODO how come .bind doesn't work with _changeNote = () =>?
  _changeNote(index, note) {
    let slots = this.state.slots;
    slots[index].note = note;
    this.setState({slots: slots});
  }

  _updateSlot(slotID, task, start) {
    let slots = slot.updateSlot(slotID, task, start);
    this.setState({
      slots: slots,
      isEditing: null
    });
  }

  _deleteSlot(slotID) {
    let slots = slot.deleteSlot(slotID);
    this.setState({
      slots: slots,
      isEditing: null
    });
  }

  _insertSlot(beforeSlotID) {
    let [slots, slotID] = slot.insertSlot(beforeSlotID);
    this.setState({
      slots: slots,
      isEditing: slotID
    });
  }

  _stop = () => {
    let slots = slot.endSlot();
    this.setState({
      slots: slots
    });
  };
}
