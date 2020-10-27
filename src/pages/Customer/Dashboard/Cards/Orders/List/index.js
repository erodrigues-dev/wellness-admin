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

import { Container } from './styles';

const List = () => {
  return (
    <Container>
      <li>
        <div className="items">
          <div className="name">Teste</div>
        </div>
      </li>
      {/* {list?.map((item) => (
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
                <FiTrash />
              </Button>
            </div>
          )}
        </li>
      ))} */}
    </Container>
  );
};

export default List;
