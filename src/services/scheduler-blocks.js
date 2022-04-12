import api from './api';

export async function createBlock({
  calendarId,
  dateStart,
  dateEnd,
  recurrenceRule,
}) {
  const response = await api.post('/scheduler/blocks', {
    calendarId,
    dateStart,
    dateEnd,
    recurrenceRule,
  });

  return response;
}

export async function updateBlock({ id, ...data }, updateOptions) {
  const response = await api.put(`/scheduler/blocks/${id}`, {
    data,
    updateOptions,
  });

  return response;
}

export async function deleteBlock({ id, date, following }) {
  await api.delete(`/scheduler/blocks/${id}`, {
    params: { date, following },
  });
}
