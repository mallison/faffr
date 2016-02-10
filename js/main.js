import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Faffr from './containers/Faffr';
import slots from './reducers/slots';
import editableSlot from './reducers/editableSlot';
import { fetchSlots } from './actions';

const store = createStore(
  combineReducers({
    slots,
    editableSlot
  }),
  applyMiddleware(
    thunkMiddleware
  )
);

// Load slots from API straightaway
store.dispatch(fetchSlots());

ReactDOM.render(
    <Provider store={store}>
    <Faffr />
    </Provider>,
  document.getElementById('faffr')
);
