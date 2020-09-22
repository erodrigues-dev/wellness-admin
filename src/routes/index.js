import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import useAuth from '~/contexts/auth';

import PrivateRoutes from './private.routes';
import PublicRoutes from './public.routes';

const Routes = () => {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      {signed ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
};

export default Routes;
