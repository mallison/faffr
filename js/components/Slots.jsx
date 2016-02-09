import React from 'react';

import TaskSwitcher from './TaskSwitcher';
import Slot from './Slot';

export default class Slots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: null
    };
  }

  render() {
    let taskNames = this.props.tasks.map(t => t.name);
    let slots = [...this.props.slots];
    slots.reverse();
    return (
      <div>
        <div className="form-inline">
          <TaskSwitcher onStartTask={(task, start) => this.props.addSlot(task, start)} tasks={taskNames}/>
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
              key={s.id}
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
    let slots = this.props.slots;
    // TODO move this check to slot util function
    if (slots.length && !slots[slots.length - 1].end) {
      return [
        ' Or ',
        <div className="form-group">
          <button
                  className="btn btn-success"
                  onClick={this.props.endDay}
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

  // TODO how come .bind doesn't work with _changeNote = () =>?
  _changeNote(slotID, note) {
    this.props.updateNote(slotID, note);
  }

  _updateSlot(slotID, task, start) {
    this.props.updateSlot(slotID, task, start);
    this.setState({
      isEditing: null
    });
  }

  _deleteSlot(slotID) {
    this.props.deleteSlot(slotID);
    this.setState({
      isEditing: null
    });
  }

  _insertSlot(beforeSlotID) {
    this.props.insertSlot(beforeSlotID);
    /* this.setState({
       isEditing: slotID  // TODO how to get ID of newly inserted slot!?
       }); */
  }
}
