import React from 'react';

import Avatar from '~components/Avatar';

import { Container } from './styles';

const Customer = ({ user }) => {
  return (
    <Container>
      <Avatar name={user.name} imageUrl={user.imageUrl} size="140px" />
    </Container>
  );
};

export default Customer;
