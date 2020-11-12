import React from 'react';

import { Container } from './styles';

const List = ({ list }) => {
  return (
    <Container>
      {list?.map((item) => (
        <li key={item.id}>
          <div className="items">
            <div className="name">
              <span className="relationName">{item.name}</span>
            </div>
            <div className="value">
              <span>
                {item.type === 'amount' ? item.value.toFixed(2) : item.value}
              </span>
            </div>
          </div>
        </li>
      ))}
    </Container>
  );
};

export default List;
