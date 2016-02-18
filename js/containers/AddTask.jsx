import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actionCreators/tasks';

let AddTask = ({ placeholder, onAddTask }) => {
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
                       onAddTask(input.value);
                       input.value = '';
                       }}>
        <span className="sr-only">Add Task</span>
        <span aria-hidden="true" className="glyphicon glyphicon-plus"></span>
      </button>
    </div>
  );
};

/* AddTask = connect()(AddTask); */
// TODO move to components
export default AddTask;
