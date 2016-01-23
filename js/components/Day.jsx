import React, { PropTypes } from 'react';

export default class Day extends React.Component {
  static defaultProps = {
    startTime: 6,
    height: 400,
    width: 150
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
    if (i === this.props.slots.length - 1) {
      end = new Date();
    } else {
      end = this.props.slots[i + 1].start;
    }
    //////////////////////////////////////////////////
    let pixelsPerMinute = this.props.height / (60 * (24 - this.props.startTime));
    let startInMinutes = 60 * (slot.start.getHours() - this.props.startTime) + slot.start.getMinutes();
    let top = startInMinutes * pixelsPerMinute;
    let durationInMinutes = (end - slot.start) / (60 * 1000);
    let height = durationInMinutes * pixelsPerMinute;
    let style = {
      width: '100%',
      height: height,
      border: '1px solid black',
      backgroundColor: this.taskColour[slot.task],
      position: 'absolute',
      top: top
    };
    return (
      <div style={style}>
        {slot.task}
      </div>
    );
  };

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
