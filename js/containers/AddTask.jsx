import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actionCreators/tasks';

let AddTask = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input
              className="form-control"
              ref={node => {
                   input = node;
                   }} />
      <button
              className="btn btn-primary"
              onClick={() => {
                       dispatch(addTask(input.value));
                       input.value = '';
                       }}>
        Add Task
      </button>
    </div>
  );
};

AddTask = connect()(AddTask);
export default AddTask;
