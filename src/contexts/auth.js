import React, { createContext, useState, useContext } from 'react';

import * as auth from '~/services/auth';

const ACTIONS = {
  LIST: 1,
  GET: 1,
  CREATE: 2,
  UPDATE: 4,
};

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

  function hasPermission(functionality, action) {
    const { actions } = user.profile.functionalities.find(
      (x) => x.name.toLowerCase() === functionality.toLowerCase()
    );

    const allowed = (action & actions) === action;

    return allowed;
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        isEmployee: user?.type === 'employee',
        user,
        signIn,
        signOut,
        hasPermission,
        ACTIONS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
