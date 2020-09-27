import React from 'react';
import { ButtonGroup, Button, Form } from 'react-bootstrap';

import Modal from '../Modal';
import { Container } from './styles';

const AccountModal = ({ setOpenAccount }) => {
  return (
    <Modal title="Edit Employee" setClose={setOpenAccount}>
      <Container>
        <Form>
          <Form.Group controlId="formAccountName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group controlId="formAccountEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" />
          </Form.Group>

          <Form.Group controlId="formAccountPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <Form.Group controlId="formAccountConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <Form.Group controlId="formAccountProfile">
            <Form.Label>Profile</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group controlId="formAccountSpeciality">
            <Form.Label>Speciality</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Form>
        <ButtonGroup className="buttons" arial-label="Controls">
          <Button type="submit">Filter</Button>
          <Button type="reset" variant="secondary" className="ml-2">
            Clear Filters
          </Button>
        </ButtonGroup>
      </Container>
    </Modal>
  );
};

export default AccountModal;
