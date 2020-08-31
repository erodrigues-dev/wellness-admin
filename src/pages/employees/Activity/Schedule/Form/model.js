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
}
