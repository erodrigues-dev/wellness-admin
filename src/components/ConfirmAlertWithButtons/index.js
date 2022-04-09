import React from 'react';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

import { Container } from './styles';

export const confirm = (title, message, buttons, options = {}) => {
  return confirmAlert({
    ...options,
    customUI: ({ onClose }) => {
      return (
        <ConfirmAlertWithButtons
          title={title}
          message={message}
          onClose={onClose}
          buttons={buttons}
        />
      );
    },
  });
};

export const ConfirmAlertWithButtons = ({
  title,
  message,
  onClose,
  buttons,
}) => {
  const handle = async (button) => {
    await button.action();
    onClose();
  };

  return (
    <Container>
      <h1>{title}</h1>
      <p>{message}</p>
      <div className="buttons">
        {buttons.map((button) => (
          <Button
            key={button.text}
            variant={button.color || 'primary'}
            className="mr-2"
            onClick={() => handle(button)}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </Container>
  );
};
