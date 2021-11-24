import api from './api';

export const list = (page, filters) => {
  return api.get('/notifications', {
    params: {
      page,
      limit: 10,
      ...filters,
    },
  });
};

export const get = (id) => api.get(`/notifications/${id}`);

export function create(data) {
  return api.post('/notifications', data);
}

export function destroy(id) {
  return api.delete(`/notifications/${id}`);
}

export function listByEmployee({ page, limit }) {
  return api.get('/notifications/by-employee', {
    params: {
      page,
      limit,
    },
  });
}

export function markAsRead(id) {
  return api.put(`/notifications/${id}/mark-as-read`);
}

export function markAsUnread(id) {
  return api.put(`/notifications/${id}/mark-as-unread`);
}

export function markAllAsRead() {
  return api.put(`/notifications/mark-all-as-read`);
}

export function markAllAsUnread() {
  return api.put(`/notifications/mark-all-as-unread`);
}

export default {
  get,
  list,
  create,
  destroy,
  listByEmployee,
  markAsRead,
  markAsUnread,
  markAllAsRead,
  markAllAsUnread,
};
