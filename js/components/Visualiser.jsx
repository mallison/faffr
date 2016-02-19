import React, { PropTypes } from 'react';

import { getMillisecondsAsHoursAndMinutes } from '../utils/dateTime';

export default class Visualiser extends React.Component {
  /* componentDidMount() {
     this._tickInterval = setInterval(this._tick, 1000);
     }

     componentWillUnmount() {
     clearInterval(this._tickInterval);
     }

     _tick = () => {
     this.forceUpdate();
     }; */

  render() {
    if (!this.props.slots.length) {
      return null;
    }
    let slots = this.props.slots;
    if (!slots.length) {
      return null;
    }
    let durations = {};
    let totalDuration = 0;
    slots.forEach((s, i) => {
      let end;
      if (s.end) {
        end = s.end;
      } else if (i === slots.length - 1) {
        end = new Date();
      } else {
        end = slots[i + 1].start;
      }
      if (durations[s.task] === undefined) {
        durations[s.task] = 0;
      }
      let duration = end - s.start;
      durations[s.task] += duration;
      totalDuration += duration;
    });
    durations = Object.keys(durations).map(
      k => ({task: k, duration: durations[k]})
    );
    durations.sort((a, b) => b.duration - a.duration);
    let maxDuration = durations[0].duration;
    let dayDuration = new Date() - slots[0].start;
    return (
      <div>
        <p>
          <strong>
            {getMillisecondsAsHoursAndMinutes(dayDuration)}
          </strong>
        </p>
        {durations.map(this._renderDuration.bind(this, maxDuration))}
      </div>
    );
  }

  _renderDuration(maxDuration, d) {
    let taskConfig = this.props.tasks.find(t => t.name === d.task);
    let colour;
    if (taskConfig) {
      colour = taskConfig.colour;
    } else {
      colour = '#ccc';
    }
    let barStyle = {
      backgroundColor: colour,
      width: `${100 * d.duration / maxDuration}%`
    };
    return (
      <div className="progress">
        <div className="progress-bar" role="progressbar" aria-valuenow={d.duration} aria-valuemin="0" aria-valuemax={maxDuration} style={barStyle}>
          <p style={{'float': 'left', paddingLeft: 5}}>{d.task}</p>
          <p style={{'float': 'right', paddingRight: 5}}>{getMillisecondsAsHoursAndMinutes(d.duration)}</p>

        </div>
      </div>
    );
  }
}
