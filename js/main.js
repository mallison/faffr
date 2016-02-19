import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Faffr from './containers/Faffr';
// TODO add index.js to reducers
import slots from './reducers/slots';
import tasks from './reducers/tasks';
import editableSlot from './reducers/editableSlot';
import selectedTask from './reducers/selectedTask';
import { fetch } from './actionCreators/api';

const store = createStore(
  combineReducers({
    slots,
    editableSlot,
    tasks,
    selectedTask
  }),
  applyMiddleware(
    thunkMiddleware
  )
);

// Load tasks and slots from API straightaway
store.dispatch(fetch());

ReactDOM.render(
    <Provider store={store}>
    <Faffr />
    </Provider>,
  document.getElementById('faffr')
);
