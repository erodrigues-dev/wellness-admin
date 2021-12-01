import React from 'react';
import { Card } from 'react-bootstrap';

import { List } from './List';

export function TeamGroup() {
  return (
    <Card body>
      <Card.Title>Team/Group</Card.Title>
      <hr />
      <List />
    </Card>
  );
}
