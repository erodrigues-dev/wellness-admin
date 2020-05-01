import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Register from '~/pages/Register';
import SignIn from '~/pages/SignIn';

export default function AuthRoutes() {
  return (
    <Switch>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/register" component={Register} />
      <Redirect to="/sign-in" />
    </Switch>
  );
}
