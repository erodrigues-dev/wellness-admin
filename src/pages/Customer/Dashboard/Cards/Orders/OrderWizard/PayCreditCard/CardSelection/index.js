import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import { Container } from './style';

const CardSelection = () => {
  return (
    <Container>
      <RiArrowLeftSLine />
      <span>Card Selection</span>
      <RiArrowRightSLine />
    </Container>
  );
};

export default CardSelection;
