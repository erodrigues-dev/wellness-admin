import axios from 'axios';

const TOKEN_KEY = '@auth:token';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return req;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Has ocurred an unexpected error, please try again';

    if (error.response?.status === 400) message = error.response.data.message;

    if (error.response.data.errors.length > 0) {
      // message = messages[error.response.data.errors[0].code];
      return Promise.reject(error.response.data.errors);
    }

    redirectToAuth(error);

    return Promise.reject(new Error(message));
  }
);

function redirectToAuth(error) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (error.response?.status === 401 && token) {
    localStorage.removeItem(TOKEN_KEY);
    window.location = '/';
  }
}

export default api;
