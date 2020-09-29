import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import PrivateRoute from '~/components/PrivateRoute';
import { ACTIONS } from '~/consts/actions';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import {
  Home,
  Account,
  Activity,
  ActivityForm,
  ActivityDisplay,
  ActivitySchedule,
  Customer,
  CustomerForm,
  CustomerDisplay,
  CustomPackage,
  CustomPackageForm,
  Employee,
  EmployeeForm,
  EmployeeDisplay,
  Package,
  PackageForm,
  PackageDisplay,
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
          action={ACTIONS.GET}
          functionality={FUNCTIONALITIES.ACTIVITIES}
          path="/activities/:id/display"
          component={ActivityDisplay}
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
          action={ACTIONS.GET}
          functionality={FUNCTIONALITIES.CUSTOMERS}
          path="/customers/:id/display"
          component={CustomerDisplay}
        />
        <PrivateRoute
          exact
          action={ACTIONS.UPDATE}
          functionality={FUNCTIONALITIES.PACKAGES}
          path="/customers/:id/custom-packages"
          component={CustomPackage}
        />
        <PrivateRoute
          exact
          action={ACTIONS.CREATE}
          functionality={FUNCTIONALITIES.PACKAGES}
          path="/customers/:id/custom-packages/create"
          component={CustomPackageForm}
        />
        <PrivateRoute
          exact
          action={ACTIONS.UPDATE}
          functionality={FUNCTIONALITIES.PACKAGES}
          path="/customers/:id/custom-packages/:packageId"
          component={CustomPackageForm}
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
          action={ACTIONS.GET}
          functionality={FUNCTIONALITIES.EMPLOYEES}
          path="/employees/:id/display"
          component={EmployeeDisplay}
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
          action={ACTIONS.GET}
          functionality={FUNCTIONALITIES.PACKAGES}
          path="/packages/:id/display"
          component={PackageDisplay}
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
        <PrivateRoute
          exact
          path="/account"
          action={ACTIONS.UPDATE}
          functionality={FUNCTIONALITIES.PROFILES}
          component={Account}
        />

        <Route path="/404" component={NotAuthorized} />
        <Redirect to="/" />
      </Switch>
    </MainLayout>
  );
};

export default PrivateRoutes;
