import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { selectTask, addTask } from '../actionCreators/tasks';
import TaskMenu from './TaskMenu';
import * as utils from '../utils/dateTime';


class TaskSwitcher extends React.Component {
  constructor(props) {
    super(props);
    let start;
    if (!props.start) {
      start = null;
    } else {
      start = props.start;
    }
    this.state = {start};
  }

  componentDidMount() {
    this._input.focus();
  }

  render() {
    let glyphClassNames = classnames({
      glyphicon: true,
      'glyphicon-play': true
    });
    let buttonAction = 'Start';
    return (
      <div>
        <div className="form-group">
          <input
                  className="form-control"
                  ref={i => this._input = i}
                  type="time"
                  value={this.state.start === null ? '' : this._getTime(this.state.start)}
                  onChange={this._updateTime}
          />
        </div>
        {' '}
        <div className="form-group">
          <TaskMenu {...this.props} />
        </div>
        {' '}
        <button
                type="submit"
                className="btn btn-primary"
                aria-label={buttonAction}
                onClick={this._onTaskChange}
                >
          <span className="sr-only">
            {buttonAction}
          </span>
          <span
                  className={glyphClassNames}
                  aria-hidden="true"
                  >
          </span>
        </button>
      </div>
    );
  }

  _updateTime = (e) => {
    let start = this._getDateTime(e.target.value);
    this.setState({start: start});
  };

  _onTaskChange = () => {
    let { selectedTask } = this.props;
    // TODO check start time is > start time of last slot
    let start = this.state.start;
    // TODO this default time should be in action creator
    if (!start) {
      start = this._getCurrentTime();
    }
    this._startTask(selectedTask, start);
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
    return utils.dateToTime(datetime);
  }

  _getDateTime(time) {
    return utils.timeToDate(time);
  }
}

// TODO move container to other file?
TaskSwitcher = connect(
  state => ({
    tasks: state.tasks,
    selectedTask: state.selectedTask
  }),
  dispatch => {
    return {
      selectTask: (taskID) => dispatch(selectTask(taskID)),
      addTask: (name, ancestors) => dispatch(addTask(name, ancestors))
    };
  }
)(TaskSwitcher);

export default TaskSwitcher;
