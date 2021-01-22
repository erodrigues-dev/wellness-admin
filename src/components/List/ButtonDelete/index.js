import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { FiTrash } from 'react-icons/fi';

const ButtonDelete = ({ onClick: handleDelete }) => {
  const handleClick = () => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to do this?',
      buttons: [
        {
          label: 'YES',
          onClick: handleDelete,
        },
        {
          label: 'NO',
        },
      ],
    });
  };

  return (
    <FiTrash
      size={22}
      color="#dc3545"
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
    />
  );
};

export default ButtonDelete;
