import { FiUsers, FiSettings, FiActivity, FiPackage } from 'react-icons/fi';

import {
  Employee,
  EmployeeForm,
  Customer,
  CustomerForm,
  Profile,
  ProfileForm,
  Activity,
  ActivityForm,
  Package,
  PackageForm,
} from '~/pages/employees';

const routes = [
  {
    title: 'Activities',
    path: '/activities',
    Icon: FiActivity,
    routes: {
      functionality: 'activities',
      componentList: Activity,
      componentForm: ActivityForm,
    },
  },
  {
    title: 'Packages',
    path: '/packages',
    Icon: FiPackage,
    routes: {
      functionality: 'packages',
      componentList: Package,
      componentForm: PackageForm,
    },
  },
  {
    title: 'Employees',
    path: '/employees',
    Icon: FiUsers,
    routes: {
      functionality: 'employees',
      componentList: Employee,
      componentForm: EmployeeForm,
    },
  },
  {
    title: 'Customers',
    path: '/customers',
    Icon: FiUsers,
    routes: {
      functionality: 'customers',
      componentList: Customer,
      componentForm: CustomerForm,
    },
  },
  {
    title: 'Profiles',
    path: '/profiles',
    Icon: FiSettings,
    routes: {
      functionality: 'profiles',
      componentList: Profile,
      componentForm: ProfileForm,
    },
  },
];

export default routes;
