import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// import { Container } from './styles';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => false;

  if (!isAuthenticated()) {
    return <Redirect to="/sign-in" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
