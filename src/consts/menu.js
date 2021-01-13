import {
  FiUsers,
  FiSettings,
  FiActivity,
  FiPackage,
  FiPenTool,
  FiCalendar,
  FiShoppingCart,
} from 'react-icons/fi';

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
    title: 'Employees',
    path: '/employees',
    Icon: FiUsers,
    functionality: FUNCTIONALITIES.settings.employees.list,
    subgroup: 'settings',
  },
  {
    title: 'Profiles',
    path: '/profiles',
    Icon: FiSettings,
    functionality: FUNCTIONALITIES.settings.profiles.list,
    subgroup: 'settings',
  },
  {
    title: 'Categories',
    path: '/categories',
    Icon: FiPenTool,
    functionality: FUNCTIONALITIES.settings.categories.list,
    subgroup: 'settings',
  },
  {
    title: 'Discounts',
    path: '/discounts',
    Icon: FiPenTool,
    functionality: FUNCTIONALITIES.settings.discount.list,
    subgroup: 'settings',
  },
];
