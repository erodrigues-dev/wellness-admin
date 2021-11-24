import React from 'react';
import { Button } from 'react-bootstrap';

import { Container } from './styles';

const ConfirmAlert = ({ title, message, close, action }) => {
  function handleConfirm() {
    action();
    close();
  }

  return (
    <Container>
      <h1>{title}</h1>
      <p>{message}</p>
      <div className="buttons">
        <Button variant="primary" className="mr-2" onClick={close}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </Container>
  );
};

export default ConfirmAlert;
