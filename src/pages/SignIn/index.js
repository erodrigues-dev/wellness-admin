import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '~/contexts/auth';

import { Container, Box, Logo } from './styles';

const SignIn = () => {
  const { signIn } = useAuth();

  return (
    <Container>
      <Logo src="/images/logo.png" />
      <Box>
        <Form>
          <FormControl placeholder="E-mail" className="mb-3" />
          <FormControl
            type="password"
            placeholder="Password"
            className="mb-3"
          />
          <Button block onClick={signIn} className="mb-3">
            Sign In
          </Button>
          <p className="m-0">
            No account?
            <Link to="/sign-up" className="ml-1">
              Create one
            </Link>
          </p>
        </Form>
      </Box>
    </Container>
  );
};

export default SignIn;
