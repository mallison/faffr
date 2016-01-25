import React, { PropTypes } from 'react';

export default class TaskSwitcher extends React.Component {
  constructor(props) {
    super(props);
    let start = this.props.start === undefined ? null : this.props.start;
    this.state = {
      start: start,
      task: this.props.task
    };
  }

  componentDidMount() {
    this._input.focus();
  }

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          <label>
            Start time:{' '}
            <input
                    className="form-control"
                    ref={i => this._input = i}
                    type="time"
                    value={this.state.start === null ? '' : this._getTime(this.state.start)}
                    onChange={this._updateTime}
            />
          </label>
        </div>
        {' '}
        <div className="form-group">
          <label>
            Task: {' '}
            <select
                    className="form-control"
                    defaultValue={this.state.task}
                    onChange={this._onTaskChange}
                    >
              <option value="">-- Choose task --</option>
              {this.props.tasks.map(t => <option value={t}>{t}</option>)}
            </select>
          </label>
        </div>
        {' '}
        {this.props.withSave ?
         <button
         className="btn btn-primary"
         onClick={this._onSave}
         >
         Save
         </button>
         :
         null
         }
      </div>
    );
  }

  _updateTime = (e) => {
    let start = this._getDateTime(e.target.value);
    this.setState({start: start});
  };

  _onTaskChange = (e) => {
    if (this.props.withSave) {
      this.setState({task: e.target.value});
      return;
    }
    // TODO check start time is > start time of last slot
    let task = e.target.value;
    e.target.value = '';
    let start = this.state.start;
    if (!start) {
      start = this._getCurrentTime();
    }
    this._startTask(task, start);
  };

  _onSave = (e) => {
    e.preventDefault();
    this._startTask(this.state.task, this.state.start);
  };

  _startTask(task, start) {
    // TODO call setState first, does it matter? call callback in setState callback?
    this.props.onStartTask(task, start);
    this.setState({start: null});
  }

  _getCurrentTime = () => {
    return new Date();
  };

  _getTime(datetime) {
    // TODO no native strftime?
    let hours = datetime.getHours();
    hours = this._zFill(hours);
    let minutes = datetime.getMinutes();
    minutes = this._zFill(minutes);
    return `${hours}:${minutes}`;
  }

  _zFill(number) {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  }

  _getDateTime(time) {
    let [hours, minutes] = time.split(':');
    let date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date;
  }
}
