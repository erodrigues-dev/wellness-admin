import React from 'react';
import { Button } from 'react-bootstrap';
import {
  FiActivity,
  FiDollarSign,
  FiEdit2,
  FiPackage,
  FiPercent,
  FiTrash,
} from 'react-icons/fi';

import { Container } from './styles';

const List = ({ list }) => {
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
              <span>{item.value}</span>
            </div>
          </div>
          <div className="buttons">
            <Button variant="secondary" className="mr-2">
              <FiEdit2 color="white" />
            </Button>
            <Button variant="danger">
              <FiTrash />
            </Button>
          </div>
        </li>
      ))}
    </Container>
  );
};

export default List;
