import React from 'react';

import TaskSwitcher from './TaskSwitcher';
import getID from '../utils/getID';

export default class Slot extends React.Component {
  componentWillMount() {
    this._id = getID();
  }

  componentDidMount() {
    if (this.props.isFocused && this._note) {
      //      this._note.focus();
    }
  }

  componentDidUpdate() {
    // TODO this is hacky. web suggests other solution might be off page element
    // to track height of content. Other implementations suggest it's not this simple
    // either!
    this._note.style.height = '1px';
    this._note.style.height = `${this._note.scrollHeight}px`;
  }

  render() {
    let { id, editableSlot } = this.props;
    let isEditable = editableSlot === id;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {isEditable ?
           this._renderTaskAndTimeEditor() :
           this._renderTaskAndTime()}
        </div>
        <div className="panel-body">
          <div className="form-group">
            <textarea
                    id={this._id}
                    className="form-control"
                    placeholder="Add note"
                    ref={t => this._note = t}
                    rows={1}
                    cols={70}
                    value={this.props.note}
                    onChange={e => this.props.onNoteChange(e.target.value)}
            />
          </div>
        </div>
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
                onStartTask={(task, start) => this.props.updateSlot(this.props.id, task, start)}
        />
      </div>
    );
  }

  _renderTaskAndTime() {
    return [
      <label htmlFor={this._id}>
        {this.props.start.toLocaleTimeString()}
        {this.props.end ? [' - ', this.props.end.toLocaleTimeString()] : null}
        {' '}
        {this.props.task}
        {' '}
      </label>,
      ' ',
      <button
              className="btn btn-primary btn-xs"
              onClick={() => this.props.markEditable(this.props.id)}
              ariaLabel="Edit"
              >
        <span className="glyphicon glyphicon-pencil" aria-hidden="true">
        </span>
      </button>,
      ' ',
      <button
              className="btn btn-danger btn-xs"
              onClick={() => this.props.deleteSlot(this.props.id)}
              ariaLabel="Delete"
              >
        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </button>,
      ' ',
      <button
              className="btn btn-success btn-xs"
              onClick={() => this.props.insertSlot(this.props.id)}
              ariaLabel="Insert"
              >
        <span className="glyphicon glyphicon-plus" aria-hidden="true">
        </span>
      </button>
    ];
  }
}
