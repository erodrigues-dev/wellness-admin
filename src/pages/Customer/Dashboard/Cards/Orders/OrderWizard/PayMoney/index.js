import React from 'react';
import { Button } from 'react-bootstrap';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import { currency } from '~/helpers/intl';
import * as orderService from '~/services/order';

import { Container } from './styles';

const PayMoney = ({ setClose, order }) => {
  const { sendNotification } = useNotification();
  console.log(order);
  function subtotalCalc() {
    const discount = 0;
    const subtotal = (order.relation?.price + discount) * order.quantity;
    return currency.format(subtotal || 0);
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
          Discount: <span>10% ou $10.00</span>
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
