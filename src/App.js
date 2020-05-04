import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '~/contexts/auth';

import Routes from './routes';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
