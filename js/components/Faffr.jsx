import React, { PropTypes } from 'react';

import Visualiser from './Visualiser';
import Month from './Month';
import Week from './Week';
import Day from './Day';
import Slot from './Slot';
import TaskSwitcher from './TaskSwitcher';
import * as slot from '../slot';

export default class Faffr extends React.Component {
  render() {
    let today = new Date();
    let todaysSlots = slot.getSlotsInDay(this.props.slots, today);
    let todaysSlotsReversed = [...todaysSlots];
    todaysSlotsReversed.reverse();
    let { slots, tasks } = this.props;
    return (
      <div>
        <p>
          <button
                  className="btn btn-success"
                  onClick={() => this.props.save(slots, tasks)}
                  >
            Save
          </button>
        </p>
        <div className="row">
          <div className="col-md-4 col-md-push-4">
            <Visualiser
                    slots={todaysSlots}
                    tasks={this.props.tasks}
            />
          </div>
          <div className="col-md-4 col-md-pull-4">
            <div className="form-inline" style={{paddingBottom: 15}}>
              <TaskSwitcher
                      onStartTask={(task, start) => this.props.addSlot(task, start)}
                      tasks={this.props.tasks} />
            </div>
            {todaysSlotsReversed.map(s => <Slot key={s.id} {...s} {...this.props} />)}
          </div>
          <div className="col-md-4">
            <Day {...this.props} slots={todaysSlots} day={today} />
          </div>
        </div>
      </div>
    );
  }
}
