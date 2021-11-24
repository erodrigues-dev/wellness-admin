import api from './api';

const ENDPOINT = '/sessions';

export function sendConfirmation({ name, email }) {
  return api.post(`${ENDPOINT}/send-confirmation`, {
    name,
    email,
  });
}

export function update({
  image,
  name,
  email,
  confirmationCode,
  password,
  specialtyId,
}) {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('email', email);
  formData.append('confirmationCode', confirmationCode);
  if (password && !!password.trim()) formData.append('password', password);
  formData.append('specialtyId', specialtyId);
  if (image) formData.append('image', image);

  return api.put(ENDPOINT, formData);
}

const service = {
  update,
  sendConfirmation,
};

export default service;
