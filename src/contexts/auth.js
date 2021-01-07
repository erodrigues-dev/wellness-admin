import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import JwtDecode from 'jwt-decode';

import { ACTIONS } from '~/consts/actions';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import { MENU } from '~/consts/menu';
import * as auth from '~/services/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const userStoraged = auth.getUserFromStorage();
  const [user, setUser] = useState(userStoraged);
  const [menu, setMenu] = useState([]);

  const hasPermission = useCallback(
    (functionality, action) => {
      if (user !== undefined) {
        const funcionality = user.profile.functionalities.find(
          (x) => x.name.toLowerCase() === functionality.toLowerCase()
        );

        const allowed =
          (action & funcionality?.actions) === action &&
          funcionality !== undefined;

        return allowed;
      }

      return null;
    },
    [user]
  );

  const buildMenu = useCallback(() => {
    if (user) {
      const menuHasPermission = MENU.filter((itemMenu) =>
        hasPermission(itemMenu.functionality, ACTIONS.LIST)
      );

      setMenu(menuHasPermission);
    }
  }, [user, hasPermission]);

  useEffect(() => {
    buildMenu();
  }, [buildMenu]);

  async function signIn({ email, password }) {
    const userAuthenticated = await auth.signIn({ email, password });
    setUser(userAuthenticated);
  }

  function signOut() {
    auth.signOut();
    setUser(null);
  }

  function updateUserFromToken(token) {
    const decoded = JwtDecode(token);

    auth.setStorage(token);

    setUser(decoded);
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
        updateUserFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
