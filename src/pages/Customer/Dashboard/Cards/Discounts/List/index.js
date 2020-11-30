import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  FiActivity,
  FiDollarSign,
  FiEdit2,
  FiPackage,
  FiPercent,
  FiTrash,
} from 'react-icons/fi';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import ModalForm from '~/pages/Discount/Form';

import { Container } from './styles';

const List = ({ list, reloadList, handleDelete, allowEdit }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState();

  function handleEdit(item) {
    setOpenEdit(true);
    setSelected(item);
  }

  return (
    <Container>
      {list?.map((item) => (
        <li key={item.id}>
          <div className="items">
            <div className="name">
              {item.relationType === 'package' ? (
                <FiPackage title="Package" />
              ) : (
                <FiActivity title="Activity" />
              )}
              <span className="relationName">{item.relationName}</span>
            </div>
            <div className="value">
              {item.type === 'percent' ? (
                <FiPercent title="Percent" />
              ) : (
                <FiDollarSign title="Amount" />
              )}
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
                <FiEdit2 color="white" title="Edit" />
              </Button>
              <Button
                variant="danger"
                onClick={() =>
                  confirmHandler(
                    'Delete Discount',
                    'Are you sure you want to delete this discount?',
                    () => handleDelete(item.id)
                  )
                }
              >
                <FiTrash title="Delete" />
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
