import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import useAuth from '~/contexts/auth';

const PrivateRoute = ({
  functionality,
  action,
  component: Component,
  ...rest
}) => {
  const { hasPermission, user } = useAuth();

  const allowed = (paramId) => {
    if (
      ['employees', 'customers'].includes(functionality) &&
      Number(paramId) === Number(user.id)
    ) {
      return true;
    }

    return hasPermission(functionality, action);
  };

  const render = (routeProps) => {
    const { match } = routeProps;
    const { id } = match.params;

    if (allowed(id)) return <Component {...routeProps} />;

    return <Redirect to="/404" />;
  };

  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
