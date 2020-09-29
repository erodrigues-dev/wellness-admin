import api from './api';

const ENDPOINT = '/sessions';

export function update({ image, name, email, password, specialty }) {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('specialty', specialty);
  if (image) formData.append('image', image);

  return api.put(ENDPOINT, formData);
}

const service = {
  update,
};

export default service;
