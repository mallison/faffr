import React from 'react';

const DayGrid = (props) => {
  let rows = [];
  for (let hour = props.startTime; hour < 24; hour += 1) {
    rows.push(<DayRow {...props} hour={hour} />);
  }
  return (
    <div>
      {rows}
    </div>
  );
};

DayGrid.defaultProps = {
  startTime: 6,
  height: 400
};

const DayRow = ({ startTime, height, hour }) => {
  let pixelsPerMinute = height / (60 * (24 - startTime));
  let startInMinutes = 60 * (hour - startTime);
  let top = startInMinutes * pixelsPerMinute;
  let durationInMinutes = 60;
  let rowHeight = durationInMinutes * pixelsPerMinute;
  let style = {
    vAlign: 'top',
    width: '95%',
    height: rowHeight,
    border: '1px dotted grey',
    position: 'absolute',
    top: top
  };
  return (
    <div style={style} key={hour}>
      <small>{hour}</small>
    </div>
  );
};

export default DayGrid;
