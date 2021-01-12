import {
  FiUsers,
  FiSettings,
  FiActivity,
  FiPackage,
  FiPenTool,
  FiCalendar,
  FiShoppingCart,
} from 'react-icons/fi';

export const MENU = [
  {
    title: 'Appointments',
    path: '/appointments',
    Icon: FiCalendar,
    functionality: 1,
  },
  {
    title: 'Customers',
    path: '/customers',
    Icon: FiUsers,
    functionality: 8,
  },
  {
    title: 'Orders',
    path: '/orders',
    Icon: FiShoppingCart,
    functionality: 32,
  },
  {
    title: 'Activities',
    path: '/activities',
    Icon: FiActivity,
    functionality: 256,
  },
  {
    title: 'Packages',
    path: '/packages',
    Icon: FiPackage,
    functionality: 2048,
  },
  {
    title: 'Employees',
    path: '/employees',
    Icon: FiUsers,
    functionality: 8192,
    subgroup: 'settings',
  },
  {
    title: 'Profiles',
    path: '/profiles',
    Icon: FiSettings,
    functionality: 32768,
    subgroup: 'settings',
  },
  {
    title: 'Categories',
    path: '/categories',
    Icon: FiPenTool,
    functionality: 131072,
    subgroup: 'settings',
  },
  {
    title: 'Discounts',
    path: '/discounts',
    Icon: FiPenTool,
    functionality: 524288,
    subgroup: 'settings',
  },
];
