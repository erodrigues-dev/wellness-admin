import { formatToTime, createDateTime, clearTime } from '~/helpers/date';

import { FREQUENCY, RECURRENCE_ENDSIN } from './consts';

const [{ value: frequencyDefault }] = FREQUENCY;
const [{ value: endsInDefault }] = RECURRENCE_ENDSIN;

function randomId() {
  return new Date().getTime();
}

export default class ScheduleFormModel {
  constructor(obj) {
    this.id = obj?.id || randomId();
    this.activityId = obj?.activityId;
    this.title = obj?.title;
    this.color = obj?.color || '#b0d04c';
    this.date = clearTime(obj?.date);
    this.start = formatToTime(obj?.start);
    this.end = formatToTime(obj?.end);
    this.recurrent = obj?.recurrent || false;
    this.repeatEvery = obj?.repeatEvery || 1;
    this.frequency = obj?.frequency || frequencyDefault;
    this.weekDays = obj?.weekDays || [];
    this.endsIn = obj?.endsIn || endsInDefault;
    this.until = obj?.until;
    this.ocurrences = obj?.ocurrences;
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
        rrule.byweekday = this.weekDays;
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
}
