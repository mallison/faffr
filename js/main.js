import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import thunkMiddleware from 'redux-thunk';

import FaffrContainer from './components/FaffrContainer';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import slotReducer from './reducer';

function fetchSlots() {
  return (dispatch) => {
    return request
      .get('/slots')
      .end((err, res) => dispatch({
        type: 'receiveSlots',
        slots: res.body
      }));
  };
}

const store = createStore(
  slotReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

// Load slots from API straightaway
//store.dispatch(fetchSlots());

ReactDOM.render(
    <Provider store={store}>
    <FaffrContainer />
    </Provider>,
  document.getElementById('faffr')
);
