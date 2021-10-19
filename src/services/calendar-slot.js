import api from './api';

async function list({ calendarId }) {
  const { data } = await api.get(`/calendars/${calendarId}/slots`);

  return data.map((item) => ({
    ...item,
    title: item.status,
    start: new Date(item.start),
    end: new Date(item.end),
    recurrenceExceptions: item.recurrenceExceptions.map(
      (exceptionDate) => new Date(exceptionDate)
    ),
  }));
}

function store({ calendarId, created, updated, deleted }) {
  const mapToApi = (item) => ({
    id: item.id,
    start: item.start,
    end: item.end,
    recurrenceRule: item.recurrenceRule,
    recurrenceExceptions: item.recurrenceExceptions,
    status: 'available',
  });

  return api.post(`/calendars/${calendarId}/slots`, {
    created: created.map(mapToApi),
    updated: updated.map(mapToApi),
    deleted: deleted.map(mapToApi),
  });
}

export default {
  list,
  store,
};
