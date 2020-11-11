import React from 'react';

import { currency } from '~/helpers/intl';
import { handleDiscount, subtotalCalc } from '~/helpers/subtotal';

import { Container } from './styles';

const OrderSummary = ({
  price,
  discountType,
  discountValue,
  quantity,
  children,
}) => {
  return (
    <Container>
      <li>
        Price: <span>{currency.format(price || 0)}</span>
      </li>
      <li>
        Discount: <span>{handleDiscount(discountType, discountValue)}</span>
      </li>
      <li>
        Quantity: <span>{quantity}</span>
      </li>
      {children && <li>{children}</li>}
      <li className="subtotal">
        Subtotal:{' '}
        <span>
          {subtotalCalc(price, discountType, discountValue, quantity)}
        </span>
      </li>
    </Container>
  );
};

export default OrderSummary;
