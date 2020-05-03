import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

export default function PublicRoutes() {
  return (
    <Switch>
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Redirect to="/sign-in" />
    </Switch>
  );
}
