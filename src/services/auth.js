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
    if (error.response.status === 401)
      throw new Error('Email or password are invalid!');
    throw new Error('Unexpected error, try again!');
  }
}

export function signOut() {
  localStorage.removeItem(KEY_TOKEN);
}

export function getUserFromStorage() {
  try {
    const token = localStorage.getItem('@auth:token');
    if (token) return JwtDecode(token);

    return null;
  } catch {
    return null;
  }
}
