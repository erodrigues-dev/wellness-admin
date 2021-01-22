import React from 'react';

import { currency } from '~/helpers/intl';
import { handleDiscount, subtotalCalc } from '~/helpers/subtotal';

import { Container } from './styles';

const Summary = ({
  children,
  subtotal,
  discount,
  discountType,
  quantity,
  tip,
  recurrency,
  isRecurrencyPay,
}) => {
  return (
    <Container>
      <ul>
        <li>
          <span className="text">Subtotal</span>
          <span className="price">{currency.format(subtotal)}</span>
        </li>
        <li>
          <span className="text">Discounts</span>
          <span className="price">
            {handleDiscount(discountType, discount) || '-'}
          </span>
        </li>
        {isRecurrencyPay ? (
          <li>
            <span className="text">Recurrency</span>
            <span className="price">{recurrency}</span>
          </li>
        ) : (
          <li>
            <span className="text">Tips</span>
            <span className="price">{children}</span>
          </li>
        )}
        <li className="total">
          <span className="text">Total</span>
          <span className="price">
            {subtotalCalc(subtotal, discountType, discount, quantity, tip)}
          </span>
        </li>
      </ul>
    </Container>
  );
};

export default Summary;
