import {
  FiUsers,
  FiActivity,
  FiPackage,
  FiCalendar,
  FiShoppingCart,
  FiBell,
} from 'react-icons/fi';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { MdGroup } from 'react-icons/md';

import { FUNCTIONALITIES } from './functionalities';

export const MENU = [
  {
    title: 'Appointments',
    path: '/appointments',
    Icon: FiCalendar,
    functionality: FUNCTIONALITIES.appointments.list,
  },
  {
    title: 'Customers',
    path: '/customers',
    Icon: FiUsers,
    functionality: FUNCTIONALITIES.customers.list,
  },
  {
    title: 'Team/Groups',
    path: '/team-groups',
    Icon: MdGroup,
    functionality: FUNCTIONALITIES.customers.list,
  },
  {
    title: 'Orders',
    path: '/orders',
    Icon: FiShoppingCart,
    functionality: FUNCTIONALITIES.orders.list,
  },
  {
    title: 'Activities',
    path: '/activities',
    Icon: FiActivity,
    functionality: FUNCTIONALITIES.activities.list,
  },
  {
    title: 'Packages',
    path: '/packages',
    Icon: FiPackage,
    functionality: FUNCTIONALITIES.packages.list,
  },
  {
    title: 'Workout',
    path: '/workout-profiles',
    Icon: GiWeightLiftingUp,
    functionality: FUNCTIONALITIES.workoutProfile.list,
  },
  {
    title: 'Notifications',
    path: '/notifications',
    Icon: FiBell,
    functionality: FUNCTIONALITIES.notifications.list,
  },
  {
    title: 'Employees',
    path: '/employees',
    functionality: FUNCTIONALITIES.settings.employees.list,
    subgroup: 'settings',
  },
  {
    title: 'Profiles',
    path: '/profiles',
    functionality: FUNCTIONALITIES.settings.profiles.list,
    subgroup: 'settings',
  },
  {
    title: 'Categories',
    path: '/categories',
    functionality: FUNCTIONALITIES.settings.categories.list,
    subgroup: 'settings',
  },
  {
    title: 'Discounts',
    path: '/discounts',
    functionality: FUNCTIONALITIES.settings.discount.list,
    subgroup: 'settings',
  },
  {
    title: 'Specialties',
    path: '/specialties',
    functionality: FUNCTIONALITIES.settings.specialties.list,
    subgroup: 'settings',
  },
  {
    title: 'Waivers',
    path: '/waivers',
    functionality: FUNCTIONALITIES.settings.waivers.list,
    subgroup: 'settings',
  },
  {
    title: 'Calendars',
    path: '/calendars',
    functionality: FUNCTIONALITIES.settings.calendar.list,
    subgroup: 'settings',
  },
];
