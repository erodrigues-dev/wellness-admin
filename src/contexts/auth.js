import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import JwtDecode from 'jwt-decode';

import { MENU } from '~/consts/menu';
import * as auth from '~/services/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const userStoraged = auth.getUserFromStorage();
  const [permissions, setPermissions] = useState(
    auth.getPermissionsFromStorage()
  );
  const [user, setUser] = useState(userStoraged);
  const [menu, setMenu] = useState([]);

  const hasPermission = useCallback(
    (functionality) => {
      if (user !== undefined && permissions !== undefined) {
        const allowed = permissions?.find(
          (x) => (x.id & user?.permissions) === functionality
        );

        return !!allowed;
      }

      return null;
    },
    [user, permissions]
  );

  const buildMenu = useCallback(() => {
    if (user) {
      const menuHasPermission = MENU.filter((itemMenu) =>
        hasPermission(itemMenu.functionality)
      );

      setMenu(menuHasPermission);
    }
  }, [user, hasPermission]);

  useEffect(() => {
    buildMenu();
  }, [buildMenu]);

  async function signIn({ email, password }) {
    const { userAuthenticated, permissionsAuthenticated } = await auth.signIn({
      email,
      password,
    });
    setUser(userAuthenticated);
    setPermissions(permissionsAuthenticated);
  }

  function signOut() {
    auth.signOut();
    setUser(null);
  }

  function updateUserFromToken(token) {
    const decoded = JwtDecode(token);

    auth.setStorage('@auth:token', token);

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
        updateUserFromToken,
        permissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
