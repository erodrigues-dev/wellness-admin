import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import Home from '~/pages/customers/Home';

const CustomersRoutes = () => (
  <MainLayout routes={[]}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  </MainLayout>
);

export default CustomersRoutes;
