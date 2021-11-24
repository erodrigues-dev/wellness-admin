import React from 'react';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '~/contexts/auth';
import { LoadingProvider } from '~/contexts/loading';

import Routes from './routes/Routes';

import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <LoadingProvider>
    <ToastContainer />
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </LoadingProvider>
);

export default App;
