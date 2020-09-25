import React, { createContext, useState, useContext, useEffect } from 'react';

import { ACTIONS } from '~/consts/actions';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import { MENU } from '~/consts/menu';
import * as auth from '~/services/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const userStoraged = auth.getUserFromStorage();
  const [user, setUser] = useState(userStoraged);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (user) buildMenu();
    // eslint-disable-next-line
  }, [user]);

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

  function buildMenu() {
    const menuHasPermission = MENU.filter((itemMenu) =>
      hasPermission(itemMenu.functionality, ACTIONS.LIST)
    );

    setMenu(menuHasPermission);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
        hasPermission,
        menu,
        ACTIONS,
        FUNCTIONALITIES,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
