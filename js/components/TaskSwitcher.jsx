import React, { PropTypes } from 'react';

const TASKS = [
  'afk',
  'lunch',
  'admin',
  'coding'
];

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
      <form>
        <label>
          Start time:{' '}
          <input
                  ref={i => this._input = i}
                  type="time"
                  value={this.state.start}
                  onChange={this._updateTime}
          />
        </label>
        {' '}
        <label>
          Task: {' '}
          <select
                  defaultValue={this.state.task}
                  onChange={this._onTaskChange}
                  >
            <option value="">-- Choose task --</option>
            {TASKS.map(t => <option value={t}>{t}</option>)}
          </select>
        </label>
        {this.props.withSave ?
         <button
         onClick={this._onSave}
         >
          Save
        </button>
        :
        null
        }
      </form>
    );
  }

  _updateTime = (e) => {
    this.setState({start: e.target.value});
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
    this.setState({start: ''});
  }

  _getCurrentTime = () => {
    let now = new Date();
    // TODO 0-fill!
    return `${now.getHours()}:${now.getMinutes()}`;
  };

}
