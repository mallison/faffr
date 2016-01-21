import React, { PropTypes } from 'react';

import TaskSwitcher from './TaskSwitcher';

export default class Slot extends React.Component {
  componentDidMount() {
    this._note.focus();
  }

  render() {
    return (
      <div>
        {this.props.isEditable ?
         <TaskSwitcher
         task={this.props.task}
         start={this.props.start}
         withSave={true}
         onStartTask={this.props.onUpdateSlot}
         />
         :
         <div>
         <button
         onClick={this.props.onClickEdit}
         >
         Edit
         </button>
         <dl>
         <dt>{this.props.start.toLocaleTimeString()}</dt>
         <dd>
         {this.props.task}
         </dd>
         </dl>
         </div>
        }
         <textarea
                 placeholder="Add note"
                ref={t => this._note = t}
                rows={4}
                cols={70}
                value={this.props.note}
                onChange={e => this.props.onNoteChange(e.target.value)}
        />
      </div>
    );
  }
}
