import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import timeGridPlugin from '@fullcalendar/timegrid';

import { getTimezone } from '~/helpers/date';

const TIMEZONE = getTimezone();

export const FULLCALENDAR_CONFIG = {
  timeZone: TIMEZONE,
  plugins: [rrulePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  headerToolbar: {
    end: 'prev,today,next dayGridMonth,timeGridWeek,timeGridDay',
  },
  height: '680px',
  slotDuration: '00:15',
  slotLabelInterval: '01:00',
  slotMinTime: '08:00',
  slotMaxTime: '20:00',
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: false,
    hour12: false,
  },
  navLinks: true,
  editable: true,
  eventResizableFromStart: true,
  selectable: true,
  nowIndicator: true,
  businessHours: [
    {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: '11:00',
      endTime: '19:00',
    },
    {
      daysOfWeek: [0, 6],
      startTime: '10:00',
      endTime: '15:00',
    },
  ],
};
