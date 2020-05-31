import React from 'react';
import { FiUsers, FiSettings, FiActivity, FiPackage } from 'react-icons/fi';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import {
  Home,
  Employee,
  EmployeeForm,
  Customer,
  CustomerForm,
  Profile,
  ProfileForm,
  Activity,
  ActivityForm,
  Package,
  PackageForm,
} from '~/pages/employees';

const routes = [
  {
    title: 'Activities',
    path: '/activities',
    Icon: FiActivity,
  },
  {
    title: 'Packages',
    path: '/packages',
    Icon: FiPackage,
  },
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
  {
    title: 'Profiles',
    path: '/profiles',
    Icon: FiSettings,
  },
];

const EmployeesRoutes = () => (
  <MainLayout routes={routes}>
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/activities" component={Activity} />
      <Route path="/activities/create" component={ActivityForm} />
      <Route path="/activities/:id" component={ActivityForm} />

      <Route exact path="/packages" component={Package} />
      <Route path="/packages/create" component={PackageForm} />
      <Route path="/packages/:id" component={PackageForm} />

      <Route exact path="/employees" component={Employee} />
      <Route path="/employees/create" component={EmployeeForm} />
      <Route path="/employees/:id" component={EmployeeForm} />

      <Route exact path="/customers" component={Customer} />
      <Route path="/customers/create" component={CustomerForm} />
      <Route path="/customers/:id" component={CustomerForm} />

      <Route exact path="/profiles" component={Profile} />
      <Route path="/profiles/create" component={ProfileForm} />
      <Route path="/profiles/:id" component={ProfileForm} />

      <Redirect to="/" />
    </Switch>
  </MainLayout>
);

export default EmployeesRoutes;
