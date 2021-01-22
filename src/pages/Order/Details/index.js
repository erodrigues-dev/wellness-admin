import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import { Status } from '~/components/Label/styles';
import Modal from '~/components/Modal';
import { ORDER_STATUS_COLOR } from '~/consts/labelColors';
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
    async (id) => {
      try {
        await orderService.cancel(id);

        sendNotification('Order canceled successfully');
        reloadOrders();

        setOrder((prevState) => ({ ...prevState, canceledDate: new Date() }));
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [reloadOrders, sendNotification]
  );

  useEffect(() => {
    getOrder(orderId);
  }, [getOrder, orderId]);

  function handleCancelOrder() {
    cancelOrder(orderId);
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
            <span className="order">
              {formatCurrency(order?.discount ?? 0)}
            </span>
          </li>
          {!order?.recurrency && (
            <li>
              <span>Tip:</span>
              <span className="order">{formatCurrency(order?.tip ?? 0)}</span>
            </li>
          )}
          <li>
            <span>Total:</span>
            <span className="order">
              {formatCurrency(order?.amount ?? 0 ?? 0)}
            </span>
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
          {order?.recurrency && order?.paidUntilDate && (
            <li>
              <span>Paid Until Date:</span>
              <span className="order">
                {dateHelper.formatToDisplay(
                  dateHelper.toDate(order?.paidUntilDate ?? '')
                )}
              </span>
            </li>
          )}
          {order?.recurrency && order?.canceledDate && (
            <li>
              <span>Canceled Date:</span>
              <span className="order">
                {dateHelper.formatToDisplay(
                  order?.canceledDate instanceof Date
                    ? order?.canceledDate
                    : dateHelper.toDate(order?.canceledDate ?? '')
                )}
              </span>
            </li>
          )}
          <li>
            <span>Status:</span>
            <div className="order">
              <Status
                color={ORDER_STATUS_COLOR}
                status={order?.status.toLowerCase()}
              >
                {order?.status.toLowerCase()}
              </Status>
            </div>
          </li>
        </ul>
        <div className="buttons">
          {order?.recurrency && !order?.canceledDate && (
            <Button
              variant="danger"
              onClick={() =>
                confirmHandler(
                  'Are you sure you want to cancel this order?',
                  () => handleCancelOrder()
                )
              }
            >
              Cancel Order
            </Button>
          )}
        </div>
      </Container>
    </Modal>
  );
};

export default Details;
