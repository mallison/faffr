import React, { PropTypes } from 'react';
import Day from './Day';
import { getDaysOfWeek } from '../calendar';

export default class Week extends React.Component {
  render() {
    // TODO allow week to be specified in props
    let week = getDaysOfWeek(new Date());
    return (
      <div className="row">
        <div className="col-md-12">
          {week.map(day => this._renderDay(day))}
        </div>
      </div>
    );
  }

  _renderDay(day) {
    return (
      <div style={{'float': 'left', marginBottom: 25}}>
        <p><strong>{day.toDateString().slice(0, 10)}</strong></p>
        <Day
                day={day}
                slots={this.props.slots}
                tasks={this.props.tasks}
                width={125}
        />
      </div>
    );
  }
}
