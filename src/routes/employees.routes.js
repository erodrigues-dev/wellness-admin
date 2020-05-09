import React from 'react';
import {
  // FiClock,
  // FiUser,
  FiUsers,
  // FiActivity,
  // FiBriefcase,
  // FiShoppingBag,
  // FiSettings,
  // FiLogOut,
} from 'react-icons/fi';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import { Home, Employee, EmployeeForm } from '~/pages/employees';

const routes = [
  {
    title: 'Employees',
    path: '/employees',
    Icon: FiUsers,
  },
];

const EmployeesRoutes = () => (
  <MainLayout routes={routes}>
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/employees" component={Employee} />
      <Route path="/employees/create" component={EmployeeForm} />
      <Route path="/employees/:id" component={EmployeeForm} />

      <Redirect to="/" />
    </Switch>
  </MainLayout>
);

export default EmployeesRoutes;
