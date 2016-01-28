import React, { PropTypes } from 'react';
import Day from './Day';

export default class Week extends React.Component {
  render() {
    let today = new Date();
    let mondayThisWeek = new Date(today - (today.getDay() - 1) * 24 * 60 * 60 * 1000);
    let week = [];
    for (let i = 0; i < 7; i += 1) {
      week.push(new Date(mondayThisWeek.getTime() + i * 24 * 60 * 60 * 1000));
    }
    return (
      <div>
        {week.map(day => this._renderDay(day))}
      </div>
    );
  }

  _renderDay(day) {
    let slotsInDay = this.props.slots.filter(
      s => (
        s.start.getDate() === day.getDate() &&
        s.start.getMonth() === day.getMonth() &&
        s.start.getFullYear() === day.getFullYear()
      )
    );
    return (
      <div style={{'float': 'left'}}>
        <p><strong>{day.toDateString().slice(0, 10)}</strong></p>
        <Day slots={slotsInDay} tasks={this.props.tasks} width={125} />
      </div>
    );
  }
}
