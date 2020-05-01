import React, { createContext, useState, useContext, useEffect } from 'react';

import * as auth from '~/services/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('@auth:token');
    if (token) {
      setUser({});
    }
  }, []);

  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);
    localStorage.setItem('@auth:token', response.token);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@auth:token');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        isEmployee: user?.type === 'employee',
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
