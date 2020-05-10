import React from 'react';
import {
  // FiClock,
  FiUsers,
  // FiActivity,
  // FiBriefcase,
  // FiShoppingBag,
} from 'react-icons/fi';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import {
  Home,
  Employee,
  EmployeeForm,
  Customer,
  CustomerForm,
} from '~/pages/employees';

const routes = [
  {
    title: 'Employees',
    path: '/employees',
    Icon: FiUsers,
  },
  {
    title: 'Customers',
    path: '/customers',
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

      <Route exact path="/customers" component={Customer} />
      <Route path="/customers/create" component={CustomerForm} />
      <Route path="/customers/:id" component={CustomerForm} />

      <Redirect to="/" />
    </Switch>
  </MainLayout>
);

export default EmployeesRoutes;
