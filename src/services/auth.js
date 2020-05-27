import JwtDecode from 'jwt-decode';

import api from './api';

const KEY_TOKEN = '@auth:token';

function setStorage(token) {
  localStorage.setItem(KEY_TOKEN, token);
}

export async function signIn({ email, password }) {
  try {
    const {
      data: { token },
    } = await api.post('/sessions', {
      email,
      password,
    });
    setStorage(token);
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
    const token = localStorage.getItem('@auth:token');
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

function isExpired(exp) {
  const now = new Date().getTime() / 1000;

  return now > exp;
}
