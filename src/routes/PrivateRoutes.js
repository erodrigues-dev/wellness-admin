import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import PrivateRoute from '~/components/PrivateRoute';
import { ACTIONS } from '~/consts/actions';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import {
  Home,
  Activity,
  ActivityForm,
  ActivitySchedule,
  Customer,
  CustomerForm,
  CustomerPackage,
  Employee,
  EmployeeForm,
  Package,
  PackageForm,
  Profile,
  ProfileForm,
  NotAuthorized,
} from '~/pages';

const PrivateRoutes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path="/" component={Home} />

        <PrivateRoute
          exact
          action={ACTIONS.LIST}
          functionality={FUNCTIONALITIES.ACTIVITIES}
          path="/activities"
          component={Activity}
        />
        <PrivateRoute
          exact
          action={ACTIONS.CREATE}
          functionality={FUNCTIONALITIES.ACTIVITIES}
          path="/activities/create"
          component={ActivityForm}
        />
        <PrivateRoute
          exact
          action={ACTIONS.UPDATE}
          functionality={FUNCTIONALITIES.ACTIVITIES}
          path="/activities/:id"
          component={ActivityForm}
        />
        <PrivateRoute
          exact
          action={ACTIONS.UPDATE}
          functionality={FUNCTIONALITIES.ACTIVITIES}
          path="/activities/:id/schedule"
          component={ActivitySchedule}
        />

        <PrivateRoute
          exact
          action={ACTIONS.LIST}
          functionality={FUNCTIONALITIES.CUSTOMERS}
          path="/customers"
          component={Customer}
        />
        <PrivateRoute
          exact
          action={ACTIONS.CREATE}
          functionality={FUNCTIONALITIES.CUSTOMERS}
          path="/customers/create"
          component={CustomerForm}
        />
        <PrivateRoute
          exact
          action={ACTIONS.UPDATE}
          functionality={FUNCTIONALITIES.CUSTOMERS}
          path="/customers/:id"
          component={CustomerForm}
        />
        <PrivateRoute
          exact
          action={ACTIONS.UPDATE}
          functionality={FUNCTIONALITIES.CUSTOMERS}
          path="/customers/:id/packages"
          component={CustomerPackage}
        />

        <PrivateRoute
          exact
          action={ACTIONS.LIST}
          functionality={FUNCTIONALITIES.EMPLOYEES}
          path="/employees"
          component={Employee}
        />
        <PrivateRoute
          exact
          action={ACTIONS.CREATE}
          functionality={FUNCTIONALITIES.EMPLOYEES}
          path="/employees/create"
          component={EmployeeForm}
        />
        <PrivateRoute
          exact
          action={ACTIONS.UPDATE}
          functionality={FUNCTIONALITIES.EMPLOYEES}
          path="/employees/:id"
          component={EmployeeForm}
        />

        <PrivateRoute
          exact
          action={ACTIONS.LIST}
          functionality={FUNCTIONALITIES.PACKAGES}
          path="/packages"
          component={Package}
        />
        <PrivateRoute
          exact
          action={ACTIONS.CREATE}
          functionality={FUNCTIONALITIES.PACKAGES}
          path="/packages/create"
          component={PackageForm}
        />
        <PrivateRoute
          exact
          action={ACTIONS.UPDATE}
          functionality={FUNCTIONALITIES.PACKAGES}
          path="/packages/:id"
          component={PackageForm}
        />

        <PrivateRoute
          exact
          action={ACTIONS.LIST}
          functionality={FUNCTIONALITIES.PROFILES}
          path="/profiles"
          component={Profile}
        />
        <PrivateRoute
          exact
          action={ACTIONS.CREATE}
          functionality={FUNCTIONALITIES.PROFILES}
          path="/profiles/create"
          component={ProfileForm}
        />
        <PrivateRoute
          exact
          action={ACTIONS.UPDATE}
          functionality={FUNCTIONALITIES.PROFILES}
          path="/profiles/:id"
          component={ProfileForm}
        />

        <Route path="/404" component={NotAuthorized} />
        <Redirect to="/" />
      </Switch>
    </MainLayout>
  );
};

export default PrivateRoutes;
