import React from 'react';
import { Card } from 'react-bootstrap';

import useAuth from '~/contexts/auth';

import Cards from './Cards';
import Customer from './Customer';
import { Container } from './styles';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Card body>
      <Container>
        <Card.Title>Dashboard</Card.Title>
        <hr />
        <Customer user={user} />
        <Cards />
      </Container>
    </Card>
  );
};

export default Dashboard;
