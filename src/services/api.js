import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@auth:token');
  if (token) {
    return { ...config, headers: { Authorization: `Bearer ${token}` } };
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Has ocurred an unuxpected error, please try again';
    if (error.response.status === 400) message = error.response.data.message;
    throw new Error(message);
  }
);

export default api;
