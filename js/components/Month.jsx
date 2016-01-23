import React, { PropTypes } from 'react';
import Day from './Day';

export default class Month extends React.Component {
  static defaultProps = {
    dayWidth: 100,
    dayHeight: 150
  };

  render() {
    let monthStyle = {
      width: this.props.dayWidth * 7
    };
    let firstDayOffset = this._getOffset();
    return (
      <div style={monthStyle}>
        {(() => {
          let days = [];
          for (let day = 1; day <= 38; day += 1) {
            days.push(
              this._renderDay(day, firstDayOffset)
            );
          }
          return days;
        })()}
      </div>
    );
  }

  _getOffset() {
    let firstDayOfMonth = new Date(this.props.year, this.props.month, 1);
    let dayName = firstDayOfMonth.toString().slice(0, 3);
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(dayName);
  }

  _renderDay(day, firstDayOffset) {
    let dayNumber = day - firstDayOffset;
    let dayDate = new Date(
      this.props.year,
      this.props.month,
      dayNumber
    );
    let dayMonthNumber = dayDate.getMonth();
    let isDayInMonth = dayMonthNumber === this.props.month;
    let dayStyle = {
      width: this.props.dayWidth,
      height: this.props.dayHeight,
      'float': 'left',
      border: isDayInMonth ? '1px solid black' : 'none'
    };
    let slotsInDay = this.props.slots.filter(s => s.start.getDate() === dayNumber);
    return (
      <div style={dayStyle}>
        {isDayInMonth ? dayNumber : null}
        {isDayInMonth && slotsInDay.length ? <Day
         slots={slotsInDay}
         tasks={this.props.tasks}
         width={this.props.dayWidth - 20}
         height={this.props.dayHeight - 20}
         /> : null}
      </div>
    );
  }
}
