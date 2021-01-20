import {
  formatToTime,
  createDateTime,
  clearTime,
  formatTime24To12,
  toDate,
} from '~/helpers/date';

import { FREQUENCY, RECURRENCE_ENDSIN } from './consts';

const [{ value: frequencyDefault }] = FREQUENCY;
const [{ value: endsInDefault }] = RECURRENCE_ENDSIN;

// function randomId() {
//   return new Date().getTime();
// }

export default class ScheduleFormModel {
  constructor(obj) {
    this.id = obj?.id;
    this.activityId = obj?.activityId;
    this.title = obj?.title || '';
    this.color = obj?.color || '#b0d04c';
    this.date = obj?.date ? clearTime(obj?.date) : '';
    this.start = obj?.start ? formatToTime(obj?.start) : '';
    this.end = obj?.end ? formatToTime(obj?.end) : '';
    this.recurrent = obj?.recurrent || false;
    this.repeatEvery = obj?.repeatEvery || 1;
    this.frequency = obj?.frequency || frequencyDefault;
    this.weekdays = obj?.weekdays || [];
    this.endsIn = obj?.endsIn || endsInDefault;
    this.until = obj?.until || '';
    this.ocurrences = obj?.ocurrences || '';
  }

  setId(id) {
    this.id = id;
  }

  toEvent() {
    const event = {
      id: this.id,
      title: this.title,
      start: createDateTime(this.date, this.start),
      end: createDateTime(this.date, this.end),
      color: this.color,
      extendedProps: { ...this },
    };

    if (this.recurrent) {
      const rrule = {
        dtstart: createDateTime(this.date, this.start).toISOString(),
        interval: this.repeatEvery,
        freq: this.frequency,
      };

      if (this.frequency === 'WEEKLY') {
        rrule.byweekday = this.weekdays;
      }

      if (this.endsIn === 'IN') {
        rrule.until = this.until.toISOString();
      }

      if (this.endsIn === 'AFTER') {
        rrule.count = Number(this.ocurrences);
      }

      event.rrule = rrule;
      event.duration = event.end - event.start;
    }

    return event;
  }

  /**
   * @param {Date} start
   * @param {Date} end
   */
  updateDuration(start, end) {
    this.start = formatToTime(start);
    this.end = formatToTime(end);
  }

  /**
   * update range
   * @param {Date} start
   * @param {Date} end
   */
  updateRange(start, end) {
    this.date = clearTime(start);
    this.start = formatToTime(start);
    this.end = formatToTime(end);
  }

  toApi() {
    return {
      id: this.id ?? undefined,
      activityId: this.activityId,
      title: this.title,
      color: this.color,
      date: this.date.toISOString(),
      start: this.start,
      end: this.end,
      recurrent: this.recurrent,
      repeatEvery: this.recurrent ? this.repeatEvery || undefined : undefined,
      frequency: this.recurrent ? this.frequency || undefined : undefined,
      weekdays: this.recurrent
        ? this.weekdays?.join(',') || undefined
        : undefined,
      endsIn: this.recurrent ? this.endsIn || undefined : undefined,
      until: this.recurrent
        ? this.until instanceof Date
          ? this.until.toISOString()
          : undefined
        : undefined,
      ocurrences: this.recurrent ? this.ocurrences || undefined : undefined,
    };
  }

  static fromApi({ date, start, end, weekdays, ...rest }) {
    return new ScheduleFormModel({
      date: toDate(date),
      start: formatTime24To12(start),
      end: formatTime24To12(end),
      weekdays: weekdays?.split(','),
      ...rest,
    });
  }
}
