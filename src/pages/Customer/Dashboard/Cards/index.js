import React from 'react';
import { CardDeck } from 'react-bootstrap';
import styled from 'styled-components';

import Appointments from './Appointments';
import Discounts from './Discounts';
import Orders from './Orders';
// import PrivateAnnotations from './PrivateAnnotations';
// import PublicAnnotations from './PublicAnnotations';
// import Waivers from './Waivers';
// import WorkoutLog from './WorkoutLog';
// import WorkoutProfile from './WorkoutProfile';

const Container = styled.div`
  margin-top: 32px;

  > .card-deck {
    margin-bottom: 32px;
  }
`;

const Cards = () => {
  return (
    <Container className="teste-001">
      <CardDeck>
        <Appointments />
        <Orders />
      </CardDeck>
      {/* <CardDeck>
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
    </Container>
  );
};

export default Cards;
