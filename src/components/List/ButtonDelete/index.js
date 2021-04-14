import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { FiTrash } from 'react-icons/fi';

const ButtonDelete = ({ onClick: handleDelete, disabled }) => {
  const handleClick = () => {
    if (disabled) return;
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
      color={disabled ? '#ccc' : '#dc3545'}
      style={{ cursor: !disabled && 'pointer' }}
      onClick={handleClick}
      disabled={disabled}
    />
  );
};

export default ButtonDelete;
