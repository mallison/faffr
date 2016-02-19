import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actionCreators/tasks';

let AddTask = ({ placeholder, onAddTask, onCancel }) => {
  let input;

  return (
    <div>
      <input
              className="form-control"
              type="text"
              placeholder={placeholder}
              ref={node => {
                   input = node;
                   }} />
      {' '}
      <button
              className="btn btn-primary"
              aria-label="Add task"
              onClick={() => {
                       if (input.value) {
                         onAddTask(input.value);
                         input.value = '';
                       }}}>
        <span className="sr-only">Add Task</span>
        <span aria-hidden="true" className="glyphicon glyphicon-plus"></span>
      </button>
      {' '}
      <button
              className="btn btn-warning"
              aria-label="Cancel"
              onClick={onCancel}
              >
        <span className="sr-only">Cancel</span>
        <span aria-hidden="true" className="glyphicon glyphicon-remove"></span>
      </button>
    </div>
  );
};

/* AddTask = connect()(AddTask); */
// TODO move to components
export default AddTask;
