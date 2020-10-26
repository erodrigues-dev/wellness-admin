import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import {
  FiActivity,
  FiDollarSign,
  FiEdit2,
  FiPackage,
  FiPercent,
  FiTrash,
} from 'react-icons/fi';

import ModalForm from '~/pages/Discount/Form';

import { Container } from './styles';

const List = ({ list, reloadList, handleDelete, allowEdit }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState();

  function handleEdit(item) {
    setOpenEdit(true);
    setSelected(item);
  }

  function confirmDelete(item) {
    return confirmAlert({
      title: 'Delete Discount',
      message: 'Are you sure that you want to delete this discount?',
      buttons: [
        {
          label: 'Cancel',
          onClick: () => {},
        },
        {
          label: 'Confirm',
          onClick: () => handleDelete(item.id),
        },
      ],
    });
  }

  return (
    <Container>
      {list?.map((item) => (
        <li key={item.id}>
          <div className="items">
            <div className="name">
              {item.relationType === 'package' ? <FiPackage /> : <FiActivity />}
              <span className="relationName">{item.relationName}</span>
            </div>
            <div className="value">
              {item.type === 'percent' ? <FiPercent /> : <FiDollarSign />}
              <span>
                {item.type === 'amount' ? item.value.toFixed(2) : item.value}
              </span>
            </div>
          </div>
          {allowEdit && (
            <div className="buttons">
              <Button
                variant="secondary"
                className="mr-2"
                onClick={() => handleEdit(item)}
              >
                <FiEdit2 color="white" />
              </Button>
              <Button variant="danger" onClick={() => confirmDelete(item)}>
                <FiTrash />
              </Button>
            </div>
          )}
        </li>
      ))}
      {openEdit && (
        <ModalForm
          setClose={setOpenEdit}
          reloadList={reloadList}
          selected={selected}
        />
      )}
    </Container>
  );
};

export default List;
