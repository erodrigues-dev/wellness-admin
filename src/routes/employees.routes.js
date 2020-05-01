import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from '~/pages/employees/Home';

const EmployeesRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Redirect to="/" />
  </Switch>
);

export default EmployeesRoutes;
