import React from 'react';
import { RiBankCardLine, RiMoneyDollarBoxLine } from 'react-icons/ri';

import { currency } from '~/helpers/intl';

import { Container } from './styles';

const List = ({ list, setOrder, setOpenDetails }) => {
  function handleClickInfo(item) {
    setOrder(item);
    setOpenDetails(true);
  }

  return (
    <Container>
      {list?.map((item) => (
        <li key={item.id}>
          <button type="button" onClick={() => handleClickInfo(item)}>
            <div className="name">
              {item?.paymentType === 'money' ? (
                <RiMoneyDollarBoxLine title="Money" />
              ) : (
                <RiBankCardLine title="Credit Card" />
              )}
              <span className="relationName">{item.name}</span>
            </div>
            <div className="value">
              <span>{currency.format(item.total)}</span>
            </div>
          </button>
        </li>
      ))}
    </Container>
  );
};

export default List;
