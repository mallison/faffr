import React, { PropTypes } from 'react';

import Visualiser from './Visualiser';
import Month from './Month';
import Week from './Week';
import Slots from './Slots';
import * as slot from '../slot';

const TASKS = [
  {name: 'admin', colour: 'blue'},
  {name: 'afk', colour: 'red'},
  {name: 'coding', colour: 'yellow'},
  {name: 'coffee', colour: 'brown'},
  {name: 'eat', colour: 'green'},
  {name: 'job', colour: '#cab'},
  {name: 'misc', colour: '#ccc'},
  {name: 'therapy', colour: 'cyan'},
  {name: 'tv', colour: 'orange'},
  {name: 'workout', colour: 'purple'}
];

export default class Faffr extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Faffr</h1>
        <Week slots={this.props.slots} tasks={TASKS} />
        <div className="row">
          <div className="col-md-6">
            <Slots slots={this.props.slots} saveSlots={this.props.saveSlots} tasks={TASKS} />
          </div>
          <div className="col-md-3">
            <Visualiser slots={slot.getSlotsInDay(this.props.slots, new Date())} />
          </div>
        </div>
        <Month slots={this.props.slots} tasks={TASKS} year={2016} month={0} />
      </div>
    );
  }
}
