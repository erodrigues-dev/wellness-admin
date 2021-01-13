import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import PrivateRoute from '~/components/PrivateRoute';
import {
  Home,
  Account,
  Activity,
  ActivityForm,
  ActivityDisplay,
  ActivitySchedule,
  Appointments,
  Category,
  Customer,
  CustomerForm,
  CustomerDisplay,
  CustomerDashboard,
  Discount,
  Employee,
  EmployeeForm,
  EmployeeDisplay,
  Order,
  Package,
  PackageForm,
  PackageDisplay,
  Profile,
  ProfileForm,
  ProfileDisplay,
  NotAuthorized,
} from '~/pages';

const PrivateRoutes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path="/" component={Home} />

        <PrivateRoute
          exact
          functionality={256}
          path="/activities"
          component={Activity}
        />
        <PrivateRoute
          exact
          functionality={512}
          path="/activities/create"
          component={ActivityForm}
        />
        <PrivateRoute
          exact
          functionality={256}
          path="/activities/:id"
          component={ActivityForm}
        />
        <PrivateRoute
          exact
          functionality={256}
          path="/activities/:id/display"
          component={ActivityDisplay}
        />
        <PrivateRoute
          exact
          functionality={1024}
          path="/activities/:id/schedule"
          component={ActivitySchedule}
        />

        <PrivateRoute
          exact
          functionality={8}
          path="/customers"
          component={Customer}
        />
        <PrivateRoute
          exact
          functionality={16}
          path="/customers/create"
          component={CustomerForm}
        />
        <PrivateRoute
          exact
          functionality={8}
          path="/customers/:id"
          component={CustomerForm}
        />
        <PrivateRoute
          exact
          functionality={8}
          path="/customers/:id/display"
          component={CustomerDisplay}
        />
        <PrivateRoute
          exact
          functionality={8}
          path="/customers/:id/dashboard"
          component={CustomerDashboard}
        />

        <PrivateRoute
          exact
          functionality={8192}
          path="/employees"
          component={Employee}
        />
        <PrivateRoute
          exact
          functionality={16384}
          path="/employees/create"
          component={EmployeeForm}
        />
        <PrivateRoute
          exact
          functionality={8192}
          path="/employees/:id"
          component={EmployeeForm}
        />
        <PrivateRoute
          exact
          functionality={8192}
          path="/employees/:id/display"
          component={EmployeeDisplay}
        />

        <PrivateRoute
          exact
          functionality={2048}
          path="/packages"
          component={Package}
        />
        <PrivateRoute
          exact
          functionality={4096}
          path="/packages/create"
          component={PackageForm}
        />
        <PrivateRoute
          exact
          functionality={2048}
          path="/packages/:id"
          component={PackageForm}
        />
        <PrivateRoute
          exact
          functionality={2048}
          path="/packages/:id/display"
          component={PackageDisplay}
        />

        <PrivateRoute
          exact
          functionality={32768}
          path="/profiles"
          component={Profile}
        />
        <PrivateRoute
          exact
          functionality={65536}
          path="/profiles/create"
          component={ProfileForm}
        />
        <PrivateRoute
          exact
          functionality={32768}
          path="/profiles/:id"
          component={ProfileForm}
        />
        <PrivateRoute
          exact
          path="/account"
          functionality={32768}
          component={Account}
        />

        <PrivateRoute
          exact
          functionality={32768}
          path="/profiles/:id/display"
          component={ProfileDisplay}
        />

        <PrivateRoute
          exact
          functionality={131072}
          path="/categories"
          component={Category}
        />

        <PrivateRoute
          exact
          functionality={524288}
          path="/discounts"
          component={Discount}
        />
        <PrivateRoute
          exact
          functionality={524288}
          path="/discounts/:id"
          component={Discount}
        />

        <PrivateRoute
          exact
          functionality={32}
          path="/orders"
          component={Order}
        />
        <PrivateRoute
          exact
          functionality={32}
          path="/orders/:id"
          component={Order}
        />

        <PrivateRoute
          exact
          functionality={1}
          path="/appointments"
          component={Appointments}
        />
        <PrivateRoute
          exact
          functionality={1}
          path="/appointments/:id"
          component={Appointments}
        />

        <Route path="/404" component={NotAuthorized} />
        <Redirect to="/" />
      </Switch>
    </MainLayout>
  );
};

export default PrivateRoutes;
