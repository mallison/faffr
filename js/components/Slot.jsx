import React from 'react';

import TaskSwitcher from './TaskSwitcher';
import getID from '../utils/getID';
import * as utils from '../utils/dateTime';


export default class Slot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endTime: this.props.end ? utils.dateToTime(this.props.end) : ''
    };
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
      heading = [
        this._renderTaskAndTime(),
        ' ',
        this._renderControls()
      ];
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="form-inline">{heading}</div>
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
    return (
      <label htmlFor={this._id}>
        {this.props.start.toLocaleTimeString()}
        {this.props.end ? [' - ', this.props.end.toLocaleTimeString()] : null}
        {' '}
        {this.props.task}
        {' '}
      </label>
    );
  }

  _renderControls() {
    let controls = [
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
      </button>,
      ' ',
      <input
              className="form-control input-sm"
              type="time"
              ref={time => this._time = time}
              value={this.state.endTime}
              onChange={() => this.setState({endTime: this._time.value})}
      />,
      ' ',
      <button
              className="btn btn-warning btn-xs"
              onClick={this._endSlot}
              ariaLabel="End slot"
              >
        <span className="glyphicon glyphicon-stop" aria-hidden="true">
        </span>
      </button>
    ];
    return <div className="form-group">{controls}</div>;
  }

  _endSlot = () => {
    let endTime = this._time.value ? utils.timeToDate(this._time.value) :  new Date();
    this.props.endSlot(this.props.id, endTime);
    this.setState({endTime: utils.dateToTime(endTime)});
  };
}
