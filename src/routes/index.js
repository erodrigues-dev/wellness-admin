import React from 'react';

import useAuth from '~/contexts/auth';

import AuthRoutes from './auth.routes';
import CustomersRoutes from './customers.routes';
import EmployeesRoutes from './employees.routes';

const Routes = () => {
  const { signed, isEmployee } = useAuth();

  if (signed && isEmployee) {
    return <EmployeesRoutes />;
  }

  if (signed && !isEmployee) {
    return <CustomersRoutes />;
  }
  console.log('>>>>>');
  return <AuthRoutes />;
};

export default Routes;
