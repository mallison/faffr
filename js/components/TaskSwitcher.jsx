import React, { PropTypes } from 'react';

const TASKS = [
  'afk',
  'lunch',
  'admin',
  'coding'
];

export default class TaskSwitcher extends React.Component {
  state = {
    startTime: null
  };

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
                  value={this.state.startTime}
                  onChange={this._updateTime}
          />
        </label>
        {' '}
        <label>
          Task: {' '}
          <select
                  onChange={this._startTask}
                  >
            <option value="">-- Choose task --</option>
            {TASKS.map(t => <option value={t}>{t}</option>)}
          </select>
        </label>
      </form>
    );
  }

  _updateTime = (e) => {
    this.setState({startTime: e.target.value});
  };

  _startTask = (e) => {
    // TODO check start time is > start time of last slot
    let task = e.target.value;
    e.target.value = '';
    let startTime = this.state.startTime;
    if (!startTime) {
      startTime = this._getTime();
    }
    this.props.onStartTask(task, startTime);
    this.setState({startTime: ""});
  };

  _getTime = () => {
    let now = new Date();
    // TODO 0-fill!
    return `${now.getHours()}:${now.getMinutes()}`;
  };

}
