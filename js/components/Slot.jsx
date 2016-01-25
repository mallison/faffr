import React, { PropTypes } from 'react';

import TaskSwitcher from './TaskSwitcher';
import getID from '../utils/getID';

export default class Slot extends React.Component {
  componentWillMount() {
    this._id = getID();
  }

  componentDidMount() {
    if (this.props.isFocused && this._note) {
      this._note.focus();
    }
  }

  render() {
    return (
      <div>
        <div className="form-group">
          {this.props.isEditable ?
           this._renderTaskAndTimeEditor() :
           this._renderTaskAndTime()
           }
          <textarea
                  id={this._id}
                  className="form-control"
                  placeholder="Add note"
                  ref={t => this._note = t}
                  rows={4}
                  cols={70}
                  value={this.props.note}
                  onChange={e => this.props.onNoteChange(e.target.value)}
          />
        </div>
        <button
                className="btn btn-success btn-xs"
                onClick={this.props.onInsertSlot}
                ariaLabel="Insert"
                >
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      </div>
    );
  }

  _renderTaskAndTimeEditor() {
    return (
      <div className="form-inline">
        <TaskSwitcher
                tasks={this.props.tasks}
                task={this.props.task}
                start={this.props.start}
                withSave={true}
                onStartTask={this.props.onUpdateSlot}
        />
      </div>
    );
  }

  _renderTaskAndTime() {
    return [
      <label htmlFor={this._id}>
        {this.props.start.toLocaleTimeString()}
        {' '}
        {this.props.task}
        {' '}
      </label>,
      ' ',
      <button
              className="btn btn-primary btn-xs"
              onClick={this.props.onClickEdit}
              ariaLabel="Edit"
              >
        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
      </button>,
      ' ',
      <button
              className="btn btn-danger btn-xs"
              onClick={this.props.onDeleteSlot}
              ariaLabel="Delete"
              >
        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </button>
    ];
  }
}
