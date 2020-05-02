import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Container, Box, Logo } from './styles';

const SignUp = () => (
  <Container>
    <Logo src="/images/logo.png" />
    <Box>
      <Form autoComplete="off" noValidate="off">
        <FormControl placeholder="Name" className="mb-3" autoComplete="off" />
        <FormControl placeholder="E-mail" className="mb-3" />
        <FormControl type="password" placeholder="Password" className="mb-3" />
        <FormControl
          type="password"
          placeholder="Confirm Password"
          className="mb-3"
        />
        <Button block className="mb-3">
          Sign-Up
        </Button>
        <p className="m-0">
          Already have an account?
          <Link to="/sign-in" className="ml-1">
            Sign-In
          </Link>
        </p>
      </Form>
    </Box>
  </Container>
);

export default SignUp;
