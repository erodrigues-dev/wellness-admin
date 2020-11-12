import React from 'react';
import { RiBankCardLine, RiMoneyDollarBoxLine } from 'react-icons/ri';

import { currency } from '~/helpers/intl';

import { Container } from './styles';

const List = ({ list }) => {
  return (
    <Container>
      {list?.map((item) => (
        <li key={item.id}>
          <div className="name">
            {item.status === 'paid-with-money' ? (
              <RiMoneyDollarBoxLine />
            ) : (
              <RiBankCardLine />
            )}
            <span className="relationName">{item.name}</span>
          </div>
          <div className="value">
            <span>{currency.format(item.subtotal)}</span>
          </div>
        </li>
      ))}
    </Container>
  );
};

export default List;
