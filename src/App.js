import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '~/contexts/auth';
import { NotificationProvider } from '~/contexts/notification';

import Routes from './routes';

const App = () => (
  <NotificationProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  </NotificationProvider>
);

export default App;
