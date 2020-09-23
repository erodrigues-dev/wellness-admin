import React from 'react';

import { AuthProvider } from '~/contexts/auth';
import { NotificationProvider } from '~/contexts/notification';

import Routes from './routes';

import 'react-confirm-alert/src/react-confirm-alert.css';

const App = () => (
  <NotificationProvider>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </NotificationProvider>
);

export default App;
