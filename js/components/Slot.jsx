import React, { PropTypes } from 'react';

import TaskSwitcher from './TaskSwitcher';

export default class Slot extends React.Component {
  componentDidMount() {
    this._note.focus();
  }

  render() {
    return (
      <div>
        {this.props.isEditable ?
         this._renderTaskAndTimeEditor() :
         this._renderTaskAndTime()
         }
        {this.props.showNote ?
         this._renderNoteEditor() :
         this._renderNote()
         }
      </div>
    );
  }

  _renderTaskAndTimeEditor() {
    return (
      <TaskSwitcher
              task={this.props.task}
              start={this.props.start}
              withSave={true}
              onStartTask={this.props.onUpdateSlot}
      />
    );
  }

  _renderTaskAndTime() {
    return (
      <div>
        <p>
          {this.props.start.toLocaleTimeString()}
          {' '}
          {this.props.task}
          {' '}
          <button
                  onClick={this.props.onClickEdit}
                  >
            Edit
          </button>
        </p>
      </div>
    );
  }

  _renderNoteEditor() {
    return (
      <textarea
              placeholder="Add note"
              ref={t => this._note = t}
              rows={4}
              cols={70}
              value={this.props.note}
              onChange={e => this.props.onNoteChange(e.target.value)}
      />
    );
  }

  _renderNote() {
    return <p>{this.props.note}</p>;
  }
}
