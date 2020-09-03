import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Main from '../pages/Main';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login}/>
    <Route path="/main" component={Main} isPrivate/>
  </Switch>
)

export default Routes;