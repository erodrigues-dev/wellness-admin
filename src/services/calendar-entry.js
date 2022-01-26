import api from './api';

export async function list({ calendars, date }) {
  const { data } = await api.get('/calendars/scheduler/entries', {
    params: { calendars, date },
  });

  return data;
}
