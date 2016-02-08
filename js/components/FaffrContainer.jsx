import React, { PropTypes } from 'react';
import request from 'superagent';

import Faffr from './Faffr';
import { dateFromISODateString } from '../utils/dateTime.js';

export default class FaffrContainer extends React.Component {
  state = {
    slots: null
  };

  componentDidMount() {
    request.get('/slots').end((err, res) => this._initSlots(res.body));
  }

  _initSlots(slots) {
    /* this is for slots from timesheet.py */
    /* slots = slots.map(s => ({
       task: s[1][0],
       start: new Date(s[0])
       })); */
    slots.forEach(s => {
      s.start = dateFromISODateString(s.start);
      if (s.end) {
        s.end = dateFromISODateString(s.end);
      }
    });
    this.setState({slots});
  }
  render() {
    if (this.state.slots !== null) {
      return <Faffr slots={this.state.slots} saveSlots={this._saveSlots} />;
    }
    return null;
  }

  _saveSlots = (slots) => {
    request.post('/slots')
      .send(slots)
      .end();
      // TODO .end((err, res)
  };
}
