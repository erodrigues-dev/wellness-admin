import React from 'react';
import { CardDeck } from 'react-bootstrap';

import styled from 'styled-components';

import Discounts from './Discounts';
import Orders from './Orders';
import Waivers from './Waivers';

const Container = styled.div`
  margin-top: 32px;

  > .card-deck {
    margin-bottom: 32px;
  }
`;

const Cards = () => {
  return (
    <Container>
      <CardDeck>
        <Waivers />
      </CardDeck>

      <CardDeck>
        <Orders />
      </CardDeck>

      <CardDeck>
        <Discounts />
      </CardDeck>
    </Container>
  );
};

export default Cards;
