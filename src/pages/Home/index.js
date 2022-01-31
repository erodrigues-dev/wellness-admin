import React from 'react';
import { Card } from 'react-bootstrap';

import { SchedulerPage } from '../Scheduler';

const flex = { display: 'flex', flex: 1 };

const Home = () => (
  <Card style={flex}>
    <Card.Body style={flex}>
      <SchedulerPage />
    </Card.Body>
  </Card>
);

export default Home;
