import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import NotFound from './containers/NotFound';
import Devices from './containers/Devices';
import Login from './containers/Login';

function Home({ userToken }) {
  return (userToken ? <Redirect to="/devices" /> : <Redirect to="/login" />);
}

export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <Route path="/devices" exact component={Devices} props={childProps} />
    <Route component={NotFound} />
  </Switch>
);
