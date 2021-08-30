import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import useToast from '~/hooks/useToast';
import service from '~/services/customer';

import Cards from './Cards';
import Customer from './Customer';
import { Container } from './styles';

const Dashboard = () => {
  const { sendToast } = useToast();
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    if (!id) return;
    service
      .get(id)
      .then((response) => {
        setUser(response.data);
      })
      .catch(({ message }) => sendToast(message, false));

    // eslint-disable-next-line
  }, [id]);

  return (
    <Card body>
      <Container>
        <Card.Title>Dashboard</Card.Title>
        <hr />
        {user && <Customer user={user} />}
        <Cards />
      </Container>
    </Card>
  );
};

export default Dashboard;
