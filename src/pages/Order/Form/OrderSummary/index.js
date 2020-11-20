import React from 'react';

import { currency } from '~/helpers/intl';
import masks from '~/helpers/masks';
import { handleDiscount, subtotalCalc } from '~/helpers/subtotal';

import { Container } from './styles';

const OrderSummary = ({
  price,
  discountType,
  discountValue,
  quantity,
  recurrency,
  createOrder,
  hasTip,
  tip,
  setTip,
}) => {
  function handleTip(e) {
    setTip(masks.price(e));
  }

  return (
    <Container>
      <li>
        Price: <span>{currency.format(price || 0)}</span>
      </li>
      <li>
        Discount: <span>{handleDiscount(discountType, discountValue)}</span>
      </li>
      {recurrency !== undefined && (
        <li>
          Recurrency Pay: <span>{recurrency}</span>
        </li>
      )}
      {(createOrder === undefined || !createOrder) && (
        <li>
          Quantity: <span>{quantity}</span>
        </li>
      )}
      {hasTip && (
        <li>
          Tip: <input type="text" value={tip} onChange={handleTip} />
        </li>
      )}
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
