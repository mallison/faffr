import React, { PropTypes } from 'react';
import request from 'superagent';

import Faffr from './Faffr';

export default class FaffrContainer extends React.Component {
  state = {
    slots: []
  };

  componentDidMount() {
    request.get('slots.json').end((err, res) => this._saveSlots(res.body));
  }

  _saveSlots(slots) {
    slots = slots.map(s => ({
      task: s[1][0],
      start: new Date(s[0])
    }));
    this.setState({slots});
  }

  render() {
    console.log(this.state.slots);
    if (this.state.slots.length) {
      return <Faffr slots={this.state.slots} />;
    }
    return null;
  }
}
