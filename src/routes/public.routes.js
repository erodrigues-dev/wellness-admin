import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignIn from '~/pages/SignIn';

export default function PublicRoutes() {
  return (
    <Switch>
      <Route path="/sign-in" component={SignIn} />
      <Redirect to="/sign-in" />
    </Switch>
  );
}
