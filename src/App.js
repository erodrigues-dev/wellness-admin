import React from 'react';

import { AuthProvider } from '~/contexts/auth';
import { LoadingProvider } from '~/contexts/loading';
import { NotificationProvider } from '~/contexts/notification';

import Routes from './routes';

import 'react-confirm-alert/src/react-confirm-alert.css';

const App = () => (
  <LoadingProvider>
    <NotificationProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NotificationProvider>
  </LoadingProvider>
);

export default App;
