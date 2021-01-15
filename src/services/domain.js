import api from './api';

const ENDPOINT = '/domain';

export function listPermissions() {
  return api.get(`${ENDPOINT}/default-permissions`);
}
