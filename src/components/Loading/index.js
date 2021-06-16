import React from 'react';

import { Container, Wrapper, Ellipsis } from './styles';

const Loading = () => {
  return (
    <Container>
      <Wrapper>
        <Ellipsis />
        <Ellipsis />
        <Ellipsis />
        <Ellipsis />
        <Ellipsis />
      </Wrapper>
    </Container>
  );
};

export default Loading;
