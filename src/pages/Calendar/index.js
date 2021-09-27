import React from 'react';
import { Card } from 'react-bootstrap';

import { Filter } from './Filter';
import { List } from './List';

export function Calendar() {
  return (
    <Card body>
      <Card.Title>Calendars</Card.Title>
      <hr />
      <Filter />
      <List />
    </Card>
  );
}
