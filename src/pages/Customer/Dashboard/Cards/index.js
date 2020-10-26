import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';

import Discounts from './Discounts';
// import Appointments from './Appointments';
// import Orders from './Orders';
// import PrivateAnnotations from './PrivateAnnotations';
// import PublicAnnotations from './PublicAnnotations';
// import Waivers from './Waivers';
// import WorkoutLog from './WorkoutLog';
// import WorkoutProfile from './WorkoutProfile';

const Cards = () => {
  return (
    <Card>
      {/* <CardDeck>
        <Appointments />
        <Orders />
      </CardDeck>
      <CardDeck>
        <WorkoutProfile />
        <WorkoutLog />
      </CardDeck> */}
      <CardDeck>
        <Discounts />
        {/* <Waivers /> */}
      </CardDeck>
      {/* <CardDeck>
        <PrivateAnnotations />
        <PublicAnnotations />
      </CardDeck> */}
    </Card>
  );
};

export default Cards;
