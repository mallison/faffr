import React from 'react';
import { connect } from 'react-redux';

import Day from './Day';
import { getDaysOfMonth } from '../calendar';
import * as slot from '../slot';

class Month extends React.Component {
  static defaultProps = {
    dayWidth: 100,
    dayHeight: 300
  };

  render() {
    let today = new Date();
    let monthStyle = {
      width: this.props.dayWidth * 7
    };
    return (
      <div style={monthStyle}>
        {getDaysOfMonth(today.getFullYear(), today.getMonth()).map(
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
    let slotsInDay = slot.getSlotsInDay(this.props.slots, day.date);
    return (
      <div style={dayStyle} key={day.date}>
        {day.isDayInMonth ? day.number : null}
        <div style={{position: 'relative'}}>
          {day.isDayInMonth && slotsInDay.length ?
           <Day
           slots={slotsInDay}
           day={day.date}
           tasks={this.props.tasks}
           width={this.props.dayWidth - 20}
           height={this.props.dayHeight - 20}
           /> : null}
        </div>
      </div>
    );
  };
}

// TODO move container to other file?
Month = connect(
  state => ({tasks: state.tasks, slots: state.slots}),
  () => ({})
)(Month);

export default Month;
