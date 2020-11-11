import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import * as checkoutService from '~/services/checkout';
import * as discountService from '~/services/discount';

import OrderSummary from '../OrderSummary';
import { Container } from './styles';

const PayMoney = ({ setClose, order, reloadOrders }) => {
  const { sendNotification } = useNotification();
  const [discount, setDiscount] = useState(0);

  const findDiscount = useCallback(async () => {
    try {
      const { data } = await discountService.find(
        order.customerId,
        order.itemType,
        order.item.id
      );

      setDiscount(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification, order.customerId, order.itemType, order.item.id]);

  useEffect(() => {
    findDiscount();
  }, [findDiscount]);

  async function handleSubmit() {
    try {
      await checkoutService.payWithMoney({
        itemType: order.itemType,
        itemId: order.item.id,
        customerId: order.customerId,
        quantity: order.quantity,
      });

      sendNotification('Order created successfully.');
      setClose(false);
      reloadOrders();
    } catch (error) {
      sendNotification(error, false);
    }
  }

  return (
    <Container>
      <h2>Package/Activity Name</h2>
      <OrderSummary
        price={order.item.price}
        discountType={discount?.type}
        discountValue={discount?.value}
        quantity={order.quantity}
      />
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
