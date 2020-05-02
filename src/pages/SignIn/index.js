import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '~/contexts/auth';

import { Container, Box, Logo } from './styles';

const SignIn = () => {
  const { signIn } = useAuth();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formState;
    console.log(email, password);
    if (email && password) {
      console.log('signin....');
      await signIn({ email, password });
    }
  };

  return (
    <Container>
      <Logo src="/images/logo.png" />
      <Box>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              placeholder="E-mail"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
            <Form.Text className="text-danger">{}</Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Control
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <Form.Text className="text-danger">{}</Form.Text>
          </Form.Group>

          <Button block className="mb-3" type="submit">
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
