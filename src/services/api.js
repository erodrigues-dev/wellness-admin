import axios from 'axios';

const TOKEN_KEY = '@auth:token';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return { ...config, headers: { Authorization: `Bearer ${token}` } };
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Has ocurred an unexpected error, please try again';
    if (error.response.status === 400) message = error.response.data.message;

    if (error.response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location = '/';
      return;
    }

    throw new Error(message);
  }
);

export default api;
