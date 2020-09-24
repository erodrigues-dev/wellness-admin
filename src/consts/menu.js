import { FiUsers, FiSettings, FiActivity, FiPackage } from 'react-icons/fi';

import { FUNCTIONALITIES } from './functionalities';

export const MENU = [
  {
    title: 'Activities',
    path: '/activities',
    Icon: FiActivity,
    functionality: FUNCTIONALITIES.ACTIVITIES,
  },
  {
    title: 'Customers',
    path: '/customers',
    Icon: FiUsers,
    functionality: FUNCTIONALITIES.CUSTOMERS,
  },
  {
    title: 'Employees',
    path: '/employees',
    Icon: FiUsers,
    functionality: FUNCTIONALITIES.EMPLOYEES,
  },
  {
    title: 'Packages',
    path: '/packages',
    Icon: FiPackage,
    functionality: FUNCTIONALITIES.PACKAGES,
  },
  {
    title: 'Profiles',
    path: '/profiles',
    Icon: FiSettings,
    functionality: FUNCTIONALITIES.PROFILES,
  },
];
