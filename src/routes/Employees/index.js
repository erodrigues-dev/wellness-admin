import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import useAuth from '~/contexts/auth';
import { Home } from '~/pages/employees';
import NotAuthorized from '~/pages/NotAuthorized';

import PrivateRoute from '../PrivateRoute';
import routes from './config';

const EmployeesRoutes = () => {
  const { hasPermission } = useAuth();

  const filteredRoutes = routes.filter((x) =>
    hasPermission(x.routes.functionality, 1)
  );

  return (
    <MainLayout routes={filteredRoutes}>
      <Switch>
        <Route exact path="/" component={Home} />

        {filteredRoutes.map((item) => (
          <PrivateRoute
            key={`${item.path}list`}
            exact
            action={1}
            functionality={item.routes.functionality}
            path={item.path}
            component={item.routes.componentList}
          />
        ))}
        {filteredRoutes.map((item) => (
          <PrivateRoute
            key={`${item.path}create`}
            action={2}
            functionality={item.routes.functionality}
            path={`${item.path}/create`}
            component={item.routes.componentForm}
          />
        ))}
        {filteredRoutes.map((item) => (
          <PrivateRoute
            key={`${item.path}update`}
            action={4}
            functionality={item.routes.functionality}
            path={`${item.path}/:id`}
            component={item.routes.componentForm}
          />
        ))}

        <Route path="/404" component={NotAuthorized} />
        <Redirect to="/" />
      </Switch>
    </MainLayout>
  );
};

export default EmployeesRoutes;
