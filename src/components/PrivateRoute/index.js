import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import useAuth from '~/contexts/auth';

const PrivateRoute = ({
  functionality,
  action,
  component: Component,
  ...rest
}) => {
  const { hasPermission } = useAuth();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        hasPermission(1) ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/404" />
        )
      }
    />
  );
};

export default PrivateRoute;
