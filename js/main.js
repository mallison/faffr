import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import App from './components/App';
import Faffr from './containers/Faffr';
import Week from './components/Week';
import Month from './components/Month';
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
    <Router history={browserHistory}>
    <Route path="/" component={App}>
    <IndexRoute component={Faffr}/>
    <Route path="week" component={Week} />
    <Route path="month" component={Month} />
    </Route>
    </Router>
    </Provider>,
    document.getElementById('faffr')
);
