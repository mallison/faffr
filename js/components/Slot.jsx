import React from 'react';

import TaskMenu from './TaskMenu';
import getID from '../utils/getID';
import * as utils from '../utils/dateTime';


export default class Slot extends React.Component {
  constructor(props) {
    super(props);
    let { task, start, end } = this.props;
    // TODO move state to container (and store?)
    this.state = { task, start, end };
  }

  componentWillMount() {
    this._id = getID();
  }

  componentDidMount() {
    if (this.props.isFocused && this._note) {
      //      this._note.focus();
    }
    this._reszieTextarea();
  }

  componentDidUpdate() {
    this._reszieTextarea();
  }

  _reszieTextarea() {
    // TODO this is hacky. web suggests other solution might be off page element
    // to track height of content. Other implementations suggest it's not this simple
    // either!
    this._note.style.height = '1px';
    this._note.style.height = `${this._note.scrollHeight}px`;
  }

  render() {
    let { id, editableSlot } = this.props;
    let isEditable = editableSlot === id;
    let heading;
    if (isEditable) {
      heading = this._renderTaskAndTimeEditor();
    } else {
      heading = this._renderTaskAndTime();
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {heading}
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
                    onChange={e => this.props.updateNote(this.props.id, e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  _renderTaskAndTime() {
    return (
      <div className="form-inline">
        <label htmlFor={this._id}>
          {this.props.start.toLocaleTimeString()}
          {this.props.end ? [' - ', this.props.end.toLocaleTimeString()] : null}
          {' '}
          {this.props.task}
          {' '}
        </label>
        {' '}
        <button
                className="btn btn-primary btn-xs"
                onClick={() => this.props.markEditable(this.props.id)}
                ariaLabel="Edit"
                >
          <span className="glyphicon glyphicon-pencil" aria-hidden="true">
          </span>
        </button>
        {' '}
        <button
                className="btn btn-success btn-xs"
                onClick={() => this.props.insertSlot(this.props.id)}
                ariaLabel="Insert"
                >
          <span className="glyphicon glyphicon-plus" aria-hidden="true">
          </span>
        </button>
        {' '}
        <button
                className="btn btn-warning btn-xs"
                onClick={() => {
                         let end = new Date();
                         this._updateSlot(end);
                         this.setState({end});
                         }
                         }
                ariaLabel="End slot"
                >
          <span className="glyphicon glyphicon-stop" aria-hidden="true">
          </span>
        </button>
        {' '}
        <button
                className="btn btn-danger btn-xs"
                onClick={() => this.props.deleteSlot(this.props.id)}
                ariaLabel="Delete"
                >
          <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
      </div>
    );
  }

  _renderTaskAndTimeEditor() {
    return (
      <div className="form-inline">
        <TaskMenu
                size='small'
                task={this.state.task}
                tasks={this.props.tasks}
                selectTask={task => this.setState({task})}
        />
        {' '}
        <div className="form-group">
          <input
                  className="form-control input-sm"
                  type="time"
                  ref={startTime => this._startTime = startTime}
                  value={this.state.start && utils.dateToTime(this.state.start)}
                  onChange={() => this.setState({
                            start: this._startTime.value ? utils.timeToDate(this._startTime.value) : ''
                            })}
          />
        </div>
        {' '}
        <div className="form-group">
          <input
                  className="form-control input-sm"
                  type="time"
                  ref={endTime => this._endTime = endTime}
                  value={this.state.end && utils.dateToTime(this.state.end)}
                  onChange={() => this.setState({
                            end: this._endTime.value ? utils.timeToDate(this._endTime.value) : ''
                            })}
          />
        </div>
        <button
                className="btn btn-primary btn-xs"
                onClick={() => this._updateSlot()}
                ariaLabel="Update"
                >
          <span className="glyphicon glyphicon-ok" aria-hidden="true">
          </span>
        </button>
      </div>
    );
  }

  _updateSlot = (defaultEnd) => {
    let { task, start, end } = this.state;
    if (defaultEnd) {
      end = defaultEnd;
    }
    this.props.updateSlot(this.props.id, task, start, end);
  };
}
