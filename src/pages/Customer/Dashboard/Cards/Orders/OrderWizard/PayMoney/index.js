import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import { currency } from '~/helpers/intl';
import * as discountService from '~/services/discount';
import * as orderService from '~/services/order';

import { Container } from './styles';

const PayMoney = ({ setClose, order }) => {
  const { id } = useParams();
  const { sendNotification } = useNotification();
  const [discount, setDiscount] = useState(0);

  const findDiscount = useCallback(async () => {
    try {
      const { data } = await discountService.find(
        id,
        order.relationType,
        order.relation.id
      );

      setDiscount(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification, id, order.relationType, order.relation.id]);

  useEffect(() => {
    findDiscount();
  }, [findDiscount]);

  function subtotalCalc() {
    let subtotal;

    if (order.relation.price === undefined) {
      subtotal = 0;
    } else if (discount === null) {
      subtotal = order.relation.price * order.quantity;
    } else if (discount.type === 'amount') {
      subtotal = (order.relation.price - discount.value) * order.quantity;
    } else if (discount.type === 'percent') {
      subtotal =
        (order.relation.price - (discount.value / 100) * order.relation.price) *
        order.quantity;
    }

    return currency.format(subtotal);
  }

  function handleDiscount() {
    let discountFormat = `$0.00`;

    if (discount?.type === 'percent') {
      discountFormat = `${discount.value}%`;
    } else if (discount?.type === 'amount') {
      discountFormat = `${currency.format(discount.value)}`;
    }

    return discountFormat;
  }

  async function handleSubmit() {
    try {
      await orderService.payWithMoney({
        itemType: order.relationType,
        itemId: order.relation.id,
        customerId: order.customerId,
        quantity: order.quantity,
      });
    } catch (error) {
      sendNotification(error, false);
    }
  }

  return (
    <Container>
      <h2>Package/Activity Name</h2>
      <ul>
        <li>
          Price*: <span>{currency.format(order.relation.price || 0)}</span>
        </li>
        <li>
          Discount: <span>{handleDiscount()}</span>
        </li>
        <li>
          Quantity: <span>{order.quantity}</span>
        </li>
        <li>
          Subtotal: <span>{subtotalCalc()}</span>
        </li>
      </ul>
      <div className="d-flex justify-content-end mt-5">
        <Button
          variant="secondary"
          className="mr-2"
          onClick={() => setClose(false)}
        >
          Cancel
        </Button>
        <ButtonLoading type="submit" onClick={handleSubmit}>
          Confirm Order
        </ButtonLoading>
      </div>
    </Container>
  );
};

export default PayMoney;
