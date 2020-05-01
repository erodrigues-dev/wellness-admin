import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import useAuth from '~/contexts/auth';

const SignIn = () => {
  const { signIn } = useAuth();

  return (
    <Container fluid>
      <div>
        <h2>SignIn</h2>

        <Button onClick={signIn}>SignIn</Button>
      </div>
    </Container>
  );
};

export default SignIn;
