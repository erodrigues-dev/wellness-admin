import React from 'react';
import { confirmAlert } from 'react-confirm-alert';

import ConfirmAlert from '.';

const confirmHandler = (title, message, handleAction) => {
  return confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <ConfirmAlert
          title={title}
          message={message}
          messageAction="Deletar"
          close={onClose}
          action={handleAction}
        />
      );
    },
  });
};

export default confirmHandler;
