import JwtDecode from 'jwt-decode';

import api from './api';

function setStorage(token) {
  localStorage.setItem('@auth:token', token);
}

export async function signIn({ email, password }) {
  const {
    data: { token },
  } = await api.post('/sessions', {
    email,
    password,
  });

  setStorage(token);
  return JwtDecode(token);
}

export function signOut() {
  localStorage.removeItem('@auth:token');
}

export function getUserFromStorage() {
  const token = localStorage.getItem('@auth:token');

  if (token) {
    return JwtDecode(token);
  }

  return null;
}
