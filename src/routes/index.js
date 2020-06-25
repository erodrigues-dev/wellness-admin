import React from 'react';

import useAuth from '~/contexts/auth';

import CustomersRoutes from './customers.routes';
import EmployeesRoutes from './Employees';
import PublicRoutes from './public.routes';

const Routes = () => {
  const { signed, isEmployee } = useAuth();

  if (signed && isEmployee) {
    return <EmployeesRoutes />;
  }

  if (signed && !isEmployee) {
    return <CustomersRoutes />;
  }

  return <PublicRoutes />;
};

export default Routes;
