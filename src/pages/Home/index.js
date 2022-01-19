import React from 'react';
import { Card } from 'react-bootstrap';

import { MainScheduler } from '../Scheduler';

const Home = () => (
  <Card body>
    <MainScheduler />
  </Card>
);

export default Home;
