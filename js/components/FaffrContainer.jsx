import React, { PropTypes } from 'react';
import request from 'superagent';

import Faffr from './Faffr';
import * as slot from '../slot';

export default class FaffrContainer extends React.Component {
  state = {
    slots: null
  };

  componentDidMount() {
    request.get('/slots').end((err, res) => this._initSlots(res.body));
  }

  _initSlots(slotsFromAPI) {
    let slots = slot.initLoadedSlots(slotsFromAPI);
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
    this.setState({slots: slots});
  };
}
