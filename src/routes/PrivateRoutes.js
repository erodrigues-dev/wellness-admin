import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import PrivateRoute from '~/components/PrivateRoute';
import { FUNCTIONALITIES } from '~/consts/functionalities';
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
  NotAuthorized,
} from '~/pages';

const PrivateRoutes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path="/" component={Home} />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.activities.list}
          path="/activities"
          component={Activity}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.activities.create}
          path="/activities/create"
          component={ActivityForm}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.activities.update}
          path="/activities/:id"
          component={ActivityForm}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.activities.list}
          path="/activities/:id/display"
          component={ActivityDisplay}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.activities.createEventTimes}
          path="/activities/:id/schedule"
          component={ActivitySchedule}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.customers.list}
          path="/customers"
          component={Customer}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.customers.list}
          path="/customers/:id/dashboard"
          component={CustomerDashboard}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.employees.list}
          path="/employees"
          component={Employee}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.employees.create}
          path="/employees/create"
          component={EmployeeForm}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.employees.update}
          path="/employees/:id"
          component={EmployeeForm}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.employees.list}
          path="/employees/:id/display"
          component={EmployeeDisplay}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.packages.list}
          path="/packages"
          component={Package}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.packages.create}
          path="/packages/create"
          component={PackageForm}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.packages.update}
          path="/packages/:id"
          component={PackageForm}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.packages.list}
          path="/packages/:id/display"
          component={PackageDisplay}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.profiles.list}
          path="/profiles"
          component={Profile}
        />

        <PrivateRoute
          exact
          path="/account"
          functionality={FUNCTIONALITIES.settings.profiles.update}
          component={Account}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.categories.list}
          path="/categories"
          component={Category}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.discount.list}
          path="/discounts"
          component={Discount}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.discount.list}
          path="/discounts/:id"
          component={Discount}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.orders.list}
          path="/orders"
          component={Order}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.orders.list}
          path="/orders/:id"
          component={Order}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.appointments.list}
          path="/appointments"
          component={Appointments}
        />
        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.appointments.list}
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
