import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '~/pages/customers/Home';

const CustomersRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Redirect to="/" />
  </Switch>
);

export default CustomersRoutes;
