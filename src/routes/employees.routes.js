import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import Home from '~/pages/employees/Home';

const EmployeesRoutes = () => (
  <MainLayout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  </MainLayout>
);

export default EmployeesRoutes;
