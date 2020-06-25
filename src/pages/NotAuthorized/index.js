import React from 'react';
import { Card } from 'react-bootstrap';

// import { Container } from './styles';

const NotAuthorized = () => (
  <Card body>
    <Card.Title>404 Not Authorized</Card.Title>
    <hr />
    <br />
    <p>You are not authorized to access this page.</p>
    <p>Request privileges from the system administrator.</p>
  </Card>
);

export default NotAuthorized;
