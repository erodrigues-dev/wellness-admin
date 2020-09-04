import { FREQUENCY, RECURRENCE_ENDSIN } from './consts';

const [{ value: frequencyDefault }] = FREQUENCY;
const [{ value: endsInDefault }] = RECURRENCE_ENDSIN;

export default class ScheduleFormModel {
  constructor() {
    this.id = '';
    this.activityId = '';
    this.title = '';
    this.color = '#b0d04c';
    this.start = '';
    this.end = '';
    this.recurrent = false;
    this.repeatEvery = 1;
    this.frequency = frequencyDefault;
    this.weekDays = [];
    this.endsIn = endsInDefault;
    this.until = '';
    this.ocurrences = '';
  }

  static fromEvent(event) {
    const model = new ScheduleFormModel();
    model.id = event.id;
    model.title = event.title;
    model.start = event.start;
    model.end = event.end;
    model.color = event.backgroundColor;
    return model;
  }

  toEvent() {
    const event = {
      id: this.id,
      title: this.title,
      start: this.start,
      end: this.end,
      backgroundColor: this.color,
    };

    if (this.recurrent) {
      const rrule = {
        dtstart: this.start,
        interval: this.repeatEvery,
        freq: this.frequency,
      };

      if (this.frequency === 'WEEKLY') {
        rrule.byweekday = this.weekDays;
      }

      if (this.endsIn === 'IN') {
        rrule.until = this.until;
      }

      if (this.endsIn === 'AFTER') {
        rrule.count = Number(this.ocurrences);
      }

      delete event.start;
      delete event.end;
      event.rrule = rrule;
      event.duration = this.end - this.start;
    }

    console.log('retorno toEvent', event);

    return event;
  }
}
