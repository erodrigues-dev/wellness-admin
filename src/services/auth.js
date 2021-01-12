import JwtDecode from 'jwt-decode';

import api from './api';

const KEY_TOKEN = '@auth:token';
const PERMISSIONS = '@auth:permissions';

export function setStorage(name, key) {
  localStorage.setItem(name, key);
}

export async function signIn({ email, password }) {
  try {
    const {
      data: { token, permissions },
    } = await api.post('/sessions', {
      email,
      password,
    });
    setStorage(KEY_TOKEN, token);
    setStorage(PERMISSIONS, btoa(JSON.stringify(permissions)));
    return JwtDecode(token);
  } catch (error) {
    throw new Error('Email or password are invalid!');
  }
}

export function signOut() {
  localStorage.removeItem(KEY_TOKEN);
}

export function getUserFromStorage() {
  try {
    const token = localStorage.getItem(KEY_TOKEN);
    if (token) {
      const decoded = JwtDecode(token);

      if (isExpired(decoded.exp)) return null;

      return decoded;
    }

    return null;
  } catch {
    return null;
  }
}

export function getPermissionsFromStorage() {
  try {
    const permissions = localStorage.getItem(PERMISSIONS);
    if (permissions) {
      const decoded = JSON.parse(atob(permissions));

      return decoded;
    }

    return null;
  } catch {
    return null;
  }
}

function isExpired(exp) {
  const now = new Date().getTime() / 1000;

  return now > exp;
}
