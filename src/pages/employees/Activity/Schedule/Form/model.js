export default class ScheduleFormModel {
  constructor() {
    this.id = '';
    this.activityId = '';
    this.title = '';
    this.color = '#b0d04c';
    this.start = '';
    this.end = '';
    this.repeat = 1;
    this.recurrence = 'daily';
    this.weekDays = [];
    this.endsIn = 'never';
    this.expiration = '';
    this.ocurrences = '';
  }

  static fromObject(obj) {
    const model = new ScheduleFormModel();

    model.id = obj.id;
    model.activityId = obj.activityId;
    model.title = obj.title;
    model.color = obj.color;
    model.start = obj.start;
    model.end = obj.end;
    model.repeat = obj.repeat;
    model.recurrence = obj.recurrence;
    model.weekdays = obj.weekdays;
    model.endsIn = obj.endsIn;
    model.expiration = obj.expiration;
    model.ocurrences = obj.ocurrences;
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

    return event;
  }
}
