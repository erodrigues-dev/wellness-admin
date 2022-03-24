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

export async function updateBlock({
  id,
  calendarId,
  dateStart,
  dateEnd,
  recurrenceRule,
}) {
  const response = await api.put(`/scheduler/blocks/${id}`, {
    data: {
      calendarId,
      dateStart,
      dateEnd,
      recurrenceRule,
    },
    updateOptions: {},
  });

  return response;
}
