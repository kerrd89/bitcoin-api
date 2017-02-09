import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

const Routes = () => {
  return <Router history={browserHistory}>
            <Route path="/" component={App}/>
            <Route path="/:id" component={App}/>
          </Router>
}

export default Routes;
