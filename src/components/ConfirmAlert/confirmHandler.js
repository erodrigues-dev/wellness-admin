import React from 'react';
import { confirmAlert } from 'react-confirm-alert';

import ConfirmAlert from '.';

const confirmHandler = (message, handleAction) => {
  return confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <ConfirmAlert
          title="Are you sure?"
          message={message}
          messageAction="Delete"
          close={onClose}
          action={handleAction}
        />
      );
    },
  });
};

export default confirmHandler;
