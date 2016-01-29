import React, { PropTypes } from 'react';

import * as dateTime from '../utils/dateTime';

export default class Day extends React.Component {
  static defaultProps = {
    startTime: 6,
    height: 400,
    width: 150
  };

  state = {
    showTooltips: {}
  };

  render() {
    let style = {
      height: this.props.height,
      width: this.props.width,
      border: '1px solid black',
      position: 'relative',
      marginLeft: 20
    };
    this.taskColour = {};
    this.props.tasks.forEach(t => this.taskColour[t.name] = t.colour);
    return (
      <div style={style}>
        {this._renderGrid()}
        {this.props.slots.map(this._renderSlot)}
      </div>
    );
  }

  _renderSlot = (slot, i) => {
    let end;
    // TODO this next slot stuff is duplicated
    if (slot.end) {
      end = slot.end;
    } else if (i === this.props.slots.length - 1) {
      let now = new Date();
      if (dateTime.isDateInDay(slot.start, now)) {
        end = now;
      } else {
        end = dateTime.getEndOfDay(slot.start);
      }
    } else {
      end = this.props.slots[i + 1].start;
    }
    //////////////////////////////////////////////////
    let pixelsPerMinute = this.props.height / dateTime.getMinutesInDayAfterHour(this.props.startTime);
    let startInMinutes = dateTime.getDeltaFromHourInMinutes(this.props.startTime, slot.start);
    let top = startInMinutes * pixelsPerMinute;
    let durationInMinutes = dateTime.getDeltaInMinutes(slot.start, end);
    let height = durationInMinutes * pixelsPerMinute;
    let style = {
      width: '100%',
      height: height,
      border: '1px solid black',
      backgroundColor: this.taskColour[slot.task],
      position: 'absolute',
      top: top,
      overflowY: 'visible'
    };
    return (
      <div style={style}
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
      <aside style={{width: '200%', display: this.state.showTooltips[i] ? 'block' : 'none', position: 'absolute', zIndex: 100}}
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

  _renderGrid() {
    let cells = [];
    for (let hour = this.props.startTime; hour < 24; hour += 1) {
      cells.push(this._renderCell(hour));
    }
    return cells;
  }

  _renderCell(hour) {
    let pixelsPerMinute = this.props.height / (60 * (24 - this.props.startTime));
    let startInMinutes = 60 * (hour - this.props.startTime);
    let top = startInMinutes * pixelsPerMinute;
    let durationInMinutes = 60;
    let height = durationInMinutes * pixelsPerMinute;
    let style = {
      vAlign: 'top',
      width: this.props.width + 20,
      height: height,
      border: '1px dotted grey',
      position: 'absolute',
      top: top,
      left: -20
    };
    return (
      <div style={style}>
        <small>{hour}</small>
      </div>
    );
  }
}
