import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import FaffrContainer from './components/FaffrContainer';
import slotReducer from './reducer';
import { fetchSlots } from './actions';

const store = createStore(
  slotReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

// Load slots from API straightaway
store.dispatch(fetchSlots());

ReactDOM.render(
    <Provider store={store}>
    <FaffrContainer />
    </Provider>,
  document.getElementById('faffr')
);
