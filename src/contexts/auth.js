import React, { createContext, useState, useContext } from 'react';

import * as auth from '~/services/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const userStoraged = auth.getUserFromStorage();
  const [user, setUser] = useState(userStoraged);

  async function signIn({ email, password }) {
    const userAuthenticated = await auth.signIn({ email, password });
    setUser(userAuthenticated);
  }

  function signOut() {
    auth.signOut();
    setUser(null);
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
