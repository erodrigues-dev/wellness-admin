import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import useAuth from '~/contexts/auth';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const Routes = () => {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      {signed ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
};

export default Routes;
