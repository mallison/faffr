import React, { PropTypes } from 'react';

export default class Slot extends React.Component {
  componentDidMount() {
    this._note.focus();
  }

  render() {
    return (
      <div>
        <dl>
          <dt>{this.props.start}</dt>
          <dd>{this.props.task}</dd>
        </dl>
        <textarea
                ref={t => this._note = t}
                rows={10}
                cols={70}
                value={this.props.note}
                onChange={e => this.props.onNoteChange(e.target.value)}
        />
      </div>
    );
  }
}
