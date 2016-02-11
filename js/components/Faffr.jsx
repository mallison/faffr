import React, { PropTypes } from 'react';

import Visualiser from './Visualiser';
import Month from './Month';
import Week from './Week';
import Slots from './Slots';
import AddTask from '../containers/AddTask';
import * as slot from '../slot';

export default class Faffr extends React.Component {
  render() {
    let today = new Date();
    return (
      <div className="container">
        <h1>Faffr</h1>
        <Week {...this.props} />
        <button
                className="btn btn-success"
                onClick={() => this.props.save(this.props.slots)}
                >
          Save
        </button>
        <div className="row">
          <div className="col-md-6">
            <Slots {...this.props} />
          </div>
          <div className="col-md-3">
            <Visualiser
                    slots={slot.getSlotsInDay(this.props.slots, new Date())}
                    tasks={this.props.tasks}
            />
          </div>
        </div>
        <Month {...this.props} year={today.getFullYear()} month={today.getMonth()} />
      </div>
    );
  }
}
