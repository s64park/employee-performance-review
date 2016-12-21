import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './containers/app';
import Welcome from './containers/welcome';
import Signin from './containers/signin';
import AdminEmployee from './containers/adminEmployee';
import Employee from './containers/employee';
import Admin from './containers/admin';
import reducers from './reducers';
import { AUTH_USER } from './actions/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

if(localStorage.getItem('token')) {
    store.dispatch({type: AUTH_USER});
}


ReactDOM.render(
  <Provider store={store}>
      <Router history={browserHistory}>
          <Route path="/" component={App}>
              <IndexRoute component={Welcome}/>
              <Route path="signin" component={Signin}/>
              <Route path="admin" component={Admin}/>
              <Route path="admin/:employeeId" component={AdminEmployee}/>
              <Route path="employee/:employeeId" component={Employee} />
          </Route>
      </Router>
  </Provider>
  , document.querySelector('.container'));
