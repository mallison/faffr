import React, { PropTypes } from 'react';

export default class Visualiser extends React.Component {
  componentDidMount() {
    this._tickInterval = setInterval(this._tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._tickInterval);
  }

  _tick = () => {
    this.forceUpdate();
  };

  render() {
    let slots = this.props.slots;
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
    return (
      <div>
        {durations.map(d => <p style={{backgroundColor: '#ccc', width: 400 * d.duration / maxDuration}}>{d.task}</p>)}
      </div>
    );
  }
}
