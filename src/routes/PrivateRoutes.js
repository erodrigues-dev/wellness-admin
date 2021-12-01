import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainLayout from '~/components/layouts/MainLayout';
import PrivateRoute from '~/components/PrivateRoute';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import {
  Home,
  Account,
  Activity,
  ActivitySchedule,
  Appointments,
  Category,
  Customer,
  CustomerDashboard,
  Discount,
  Employee,
  Order,
  Package,
  Profile,
  NotAuthorized,
  Specialty,
  Waiver,
  CustomerWaiver,
  WorkoutProfile,
  Notifications,
  Calendar,
  CalendarSlot,
  TeamGroup,
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
          functionality={FUNCTIONALITIES.settings.waivers.list}
          path="/customers/:id/waivers"
          component={CustomerWaiver}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.customers.list}
          path="/team-groups"
          component={TeamGroup}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.employees.list}
          path="/employees"
          component={Employee}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.packages.list}
          path="/packages"
          component={Package}
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

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.specialties.list}
          path="/specialties"
          component={Specialty}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.waivers.list}
          path="/waivers"
          component={Waiver}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.workoutProfile.list}
          path="/workout-profiles"
          component={WorkoutProfile}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.notifications.list}
          path="/notifications"
          component={Notifications}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.calendar.list}
          path="/calendars"
          component={Calendar}
        />

        <PrivateRoute
          exact
          functionality={FUNCTIONALITIES.settings.calendar.list}
          path="/calendars/:id/slots"
          component={CalendarSlot}
        />

        <Route path="/404" component={NotAuthorized} />
        <Redirect to="/" />
      </Switch>
    </MainLayout>
  );
};

export default PrivateRoutes;
