import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import * as checkoutService from '~/services/checkout';
import * as discountService from '~/services/discount';

import OrderSummary from '../OrderSummary';

const PayMoney = ({ setClose, order, reloadOrders }) => {
  const { sendNotification } = useNotification();
  const [discount, setDiscount] = useState(0);

  const findDiscount = useCallback(async () => {
    try {
      const { data } = await discountService.find(
        order.customerId,
        order.itemType,
        order.item?.id
      );

      setDiscount(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification, order]);

  useEffect(() => {
    findDiscount();
  }, [findDiscount]);

  async function handleSubmit() {
    try {
      await checkoutService.payWithMoney({
        itemType: order.itemType,
        itemId: order.item?.id,
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
    <Form className="modal-form">
      <div className="form-wrapper">
        <h2>Package/Activity Name</h2>
        <OrderSummary
          price={order.item.price}
          discountType={discount?.type}
          discountValue={discount?.value}
          recurrency={order.item.recurrencyPay}
          quantity={order.quantity}
          showQuantity
        />
      </div>
      <div className="buttons">
        <Button
          variant="secondary"
          className="mr-2"
          onClick={() => setClose(false)}
        >
          Cancel
        </Button>
        <ButtonLoading type="button" onClick={handleSubmit}>
          Confirm Order
        </ButtonLoading>
      </div>
    </Form>
  );
};

export default PayMoney;
