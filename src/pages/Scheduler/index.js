import React, { useEffect, useState } from 'react';

import { Scheduler, DayView } from '@progress/kendo-react-scheduler';

import calendarService from '~/services/calendar';

import { group, data } from './data';

const defaultDate = new Date('2022-01-18T00:00');

export function MainScheduler() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    calendarService.index({}).then(({ data: list }) => {
      const categoriesMap = list.reduce((map, calendar) => {
        return { ...map, [calendar.category.id]: calendar.category };
      }, {});

      setResources([
        {
          name: 'Calendars',
          data: list,
          field: 'calendarId',
          valueField: 'id',
          textField: 'name',
        },
        {
          name: 'Categories',
          data: Object.values(categoriesMap),
          field: 'categoryId',
          valueField: 'id',
          textField: 'name',
        },
      ]);
    });
  }, []);

  return (
    <div>
      <h3>Scheduler</h3>
      <Scheduler
        group={{
          resources: ['Calendars'],
          orientation: 'horizontal',
        }}
        resources={resources}
        data={data}
        defaultDate={defaultDate}
      >
        <DayView />
      </Scheduler>
    </div>
  );
}
