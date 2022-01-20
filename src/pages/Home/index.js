import React from 'react';
import { Card } from 'react-bootstrap';

import { MainScheduler } from '../Scheduler';

const flex = { display: 'flex', flex: 1 };

const Home = () => (
  <Card style={flex}>
    <Card.Body style={flex}>
      <MainScheduler />
    </Card.Body>
  </Card>
);

export default Home;
