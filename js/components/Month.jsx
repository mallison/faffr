import React, { PropTypes } from 'react';
import Day from './Day';
import { getDaysOfMonth } from '../calendar.js';

export default class Month extends React.Component {
  static defaultProps = {
    dayWidth: 100,
    dayHeight: 300
  };

  render() {
    let monthStyle = {
      width: this.props.dayWidth * 7
    };
    return (
      <div style={monthStyle}>
        {getDaysOfMonth(this.props.year, this.props.month).map(
          this._renderDay
        )}
      </div>
    );
  }

  _renderDay = (day) => {
    let dayStyle = {
      width: this.props.dayWidth,
      height: this.props.dayHeight,
      'float': 'left',
      border: day.isDayInMonth ? '1px solid black' : 'none'
    };
    let slotsInDay = this.props.slots.filter(
      s => s.start.getDate() === day.number
    );
    return (
      <div style={dayStyle}>
        {day.isDayInMonth ? day.number : null}
        {day.isDayInMonth && slotsInDay.length ? <Day
         slots={slotsInDay}
         tasks={this.props.tasks}
         width={this.props.dayWidth - 20}
         height={this.props.dayHeight - 20}
         /> : null}
      </div>
    );
  };
}
