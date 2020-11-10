import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import * as discountService from '~/services/discount';
import * as orderService from '~/services/order';

import OrderSummary from '../OrderSummary';
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
      <OrderSummary
        price={order.relation.price}
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
