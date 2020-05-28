import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import * as views from './views'

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      {Object.keys(views).map(( key, index )=>(
        <RouteWithLayout key={key} exact path={`/${key}`} component={views[key]} layout={MainLayout}/>
      ))}
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
