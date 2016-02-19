import React from 'react';

import DayGrid from './DayGrid';
import * as dateTime from '../utils/dateTime';
import * as slotUtils from '../slot';

export default class Day extends React.Component {
  static defaultProps = {
    startTime: 6,
    height: 400
  };

  state = {
    showTooltips: {}
  };

  render() {
    this.taskColour = {};
    this.props.tasks.forEach(t => this.taskColour[t.name] = t.colour);
    let slotsInDay = slotUtils.getSlotsInDay(this.props.slots, this.props.day);
    return (
      <div>
        <DayGrid {...this.props} />
        {slotsInDay.map((slot, i) => this._renderSlot(slotsInDay, slot, i))}
      </div>
    );
  }

  _renderSlot = (slots, slot, i) => {
    let end;
    // TODO this next slot stuff is duplicated
    if (slot.end) {
      end = slot.end;
    } else if (i === slots.length - 1) {
      let now = new Date();
      if (dateTime.isDateInDay(slot.start, now)) {
        end = now;
      } else {
        end = dateTime.getEndOfDay(slot.start);
      }
    } else {
      end = slots[i + 1].start;
    }
    //////////////////////////////////////////////////
    // TODO factor out duplication with grid and slot
    let pixelsPerMinute = this.props.height / dateTime.getMinutesInDayAfterHour(this.props.startTime);
    let startInMinutes = dateTime.getDeltaFromHourInMinutes(this.props.startTime, slot.start);
    let top = startInMinutes * pixelsPerMinute;
    let durationInMinutes = dateTime.getDeltaInMinutes(slot.start, end);
    let height = durationInMinutes * pixelsPerMinute;
    let style = {
      width: '85%',
      marginLeft: '5%',
      height: height,
      border: '1px solid black',
      backgroundColor: this.taskColour[slot.task],
      position: 'absolute',
      top: top,
      overflowY: 'visible'
    };
    return (
      <div style={style} key={slot.id}
              onMouseEnter={this._toggleTooltip.bind(this, i)}
              onMouseLeave={this._toggleTooltip.bind(this, i)}
              >
        {slot.task}
        {slot.note ? this._renderTooltip(slot, i) : null}
      </div>
    );
  };

  _renderTooltip(slot, i) {
    return (
      <aside style={{width: '100%', display: this.state.showTooltips[i] ? 'block' : 'none', position: 'absolute', zIndex: 100}}
              >
        <div className="panel panel-default">
          <div className="panel-body">
            {slot.note.split('\n').map(l => [l, <br/>])}
          </div>
        </div>
      </aside>
    );
  }

  _toggleTooltip(i) {
    let showTooltips = this.state.showTooltips;
    showTooltips[i] = !this.state.showTooltips[i];
    this.setState({showTooltips});
  }
}
