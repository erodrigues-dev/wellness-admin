import React from 'react';
import { Button } from 'react-bootstrap';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import { Status } from '~/components/Label/styles';
import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import * as orderService from '~/services/order';

import { Container } from './styles';

const Details = ({ order, setOrder, setClose, reloadOrders }) => {
  const { sendNotification } = useNotification();

  async function cancelOrder(orderId, status) {
    try {
      await orderService.cancel(orderId, status);

      sendNotification(`order set as ${status} successfully`);
      reloadOrders();

      setOrder({ ...order, status });
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  function handleChangeStatus(status) {
    cancelOrder(order.id, status);
  }

  return (
    <Modal title="Details" setClose={setClose}>
      <Container>
        <ul>
          <li>
            <span>Customer:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Activity/Package:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Quantity:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Discount:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Tip:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Total:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Created At:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Created By:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Payment Type:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Paid until date:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Canceled date:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Order&apos;s Progress:</span>
            <span className="order">test</span>
          </li>
          <li>
            <span>Status:</span>
            <div className="order">
              <Status status="completed">completed</Status>
            </div>
          </li>
        </ul>
        <div className="buttons">
          <Button
            variant="danger"
            onClick={() =>
              confirmHandler(
                'Are you sure you want to cancel this order?',
                () => handleChangeStatus('canceled')
              )
            }
          >
            Cancel Order
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default Details;
