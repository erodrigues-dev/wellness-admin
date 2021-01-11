import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import { Status } from '~/components/Label/styles';
import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import * as dateHelper from '~/helpers/date';
import { currency } from '~/helpers/intl';
import masks from '~/helpers/masks';
import * as orderService from '~/services/order';

import { Container } from './styles';

const Details = ({ orderId, setClose, reloadOrders }) => {
  const { sendNotification } = useNotification();
  const formatCurrency = (value) => currency.format(value);
  const [order, setOrder] = useState();

  const getOrder = useCallback(
    async (id) => {
      try {
        const { data } = await orderService.get(id);

        setOrder(data);
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [sendNotification]
  );

  const cancelOrder = useCallback(
    async (id, status) => {
      try {
        await orderService.cancel(id, status);

        sendNotification(`order set as ${status} successfully`);
        reloadOrders();

        setOrder((prevState) => ({ ...prevState, status }));
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [reloadOrders, sendNotification]
  );

  useEffect(() => {
    getOrder(orderId);
  }, [getOrder, orderId]);

  function handleChangeStatus(status) {
    cancelOrder(orderId, status);
  }

  return (
    <Modal title="Details" setClose={setClose}>
      <Container>
        <ul>
          <li>
            <span>Customer:</span>
            <span className="order">{order?.customer.name}</span>
          </li>
          <li>
            <span>{masks.capitalize(order?.type) ?? 'Activity/Package'}:</span>
            <span className="order">{order?.name}</span>
          </li>
          <li>
            <span>Quantity:</span>
            <span className="order">{order?.quantity}</span>
          </li>
          <li>
            <span>Discount:</span>
            <span className="order">{formatCurrency(order?.discount)}</span>
          </li>
          {!order?.recurrency && (
            <li>
              <span>Tip:</span>
              <span className="order">{formatCurrency(order?.tip)}</span>
            </li>
          )}
          <li>
            <span>Total:</span>
            <span className="order">{formatCurrency(order?.total ?? 0)}</span>
          </li>
          <li>
            <span>Created At:</span>
            <span className="order">
              {dateHelper.formatToDisplay(dateHelper.toDate(order?.createdAt))}
            </span>
          </li>
          <li>
            <span>Created By:</span>
            <span className="order">{order?.user.name}</span>
          </li>
          <li>
            <span>Payment Type:</span>
            <span className="order">
              {masks.capitalize(order?.paymentType)}
            </span>
          </li>
          {order?.recurrency && (
            <>
              <li>
                <span>Paid until date:</span>
                <span className="order">{order?.paidUntilDate}</span>
              </li>
              <li>
                <span>Canceled date:</span>
                <span className="order">
                  {dateHelper.formatToList(order?.canceledDate)}
                </span>
              </li>
            </>
          )}
          <li>
            <span>Status:</span>
            <div className="order">
              <Status order status={order?.status.toLowerCase()}>
                {order?.status.toLowerCase()}
              </Status>
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
