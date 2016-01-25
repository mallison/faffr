import React, { PropTypes } from 'react';

import TaskSwitcher from './TaskSwitcher';

export default class Slot extends React.Component {
  componentDidMount() {
    if (this._note) {
      this._note.focus();
    }
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
              tasks={this.props.tasks}
              task={this.props.task}
              start={this.props.start}
              withSave={true}
              onStartTask={this.props.onUpdateSlot}
      />
    );
  }

  _renderTaskAndTime() {
    return (
      <div className="form-inline">
        {this.props.start.toLocaleTimeString()}
        {' '}
        {this.props.task}
        {' '}
        <button
                className="btn btn-primary btn-sm"
                onClick={this.props.onClickEdit}
                ariaLabel="Edit"
                >
          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        </button>
        {' '}
        <button
                className="btn btn-danger btn-sm"
                onClick={this.props.onDeleteSlot}
                ariaLabel="Delete"
                >
          <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
        {' '}
        <button
                className="btn btn-success btn-sm"
                onClick={this.props.onInsertSlot}
                ariaLabel="Insert"
                >
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
      </div>
    );
  }

  _renderNoteEditor() {
    return (
      <form>
        <div className="form-group">
          <label className="sr-only">
            Note
          </label>
          <textarea
                  className="form-control"
                  placeholder="Add note"
                  ref={t => this._note = t}
                  rows={4}
                  cols={70}
                  value={this.props.note}
                  onChange={e => this.props.onNoteChange(e.target.value)}
          />
        </div>
      </form>
    );
  }

  _renderNote() {
    return <p>{this.props.note}</p>;
  }
}
