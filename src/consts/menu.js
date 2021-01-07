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
    functionality: FUNCTIONALITIES.SCHEDULES,
  },
  {
    title: 'Customers',
    path: '/customers',
    Icon: FiUsers,
    functionality: FUNCTIONALITIES.CUSTOMERS,
  },
  {
    title: 'Orders',
    path: '/orders',
    Icon: FiShoppingCart,
    functionality: FUNCTIONALITIES.ORDERS,
  },
  {
    title: 'Activities',
    path: '/activities',
    Icon: FiActivity,
    functionality: FUNCTIONALITIES.ACTIVITIES,
  },
  {
    title: 'Packages',
    path: '/packages',
    Icon: FiPackage,
    functionality: FUNCTIONALITIES.PACKAGES,
  },
  {
    title: 'Employees',
    path: '/employees',
    Icon: FiUsers,
    functionality: FUNCTIONALITIES.EMPLOYEES,
    subgroup: 'settings',
  },
  {
    title: 'Profiles',
    path: '/profiles',
    Icon: FiSettings,
    functionality: FUNCTIONALITIES.PROFILES,
    subgroup: 'settings',
  },
  {
    title: 'Categories',
    path: '/categories',
    Icon: FiPenTool,
    functionality: FUNCTIONALITIES.CATEGORIES,
    subgroup: 'settings',
  },
  {
    title: 'Discounts',
    path: '/discounts',
    Icon: FiPenTool,
    functionality: FUNCTIONALITIES.DISCOUNTS,
    subgroup: 'settings',
  },
];
