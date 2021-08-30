import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import Modal from '~/components/Modal';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import useToast from '~/hooks/useToast';
import Details from '~/pages/Order/Details';
import * as service from '~/services/order';

import OrderWizard from '../../../../Order/Form';
import { CardLayout } from '../CardLayout';
import List from './List';

const Orders = () => {
  const { id } = useParams();
  const { sendToast } = useToast();
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(FUNCTIONALITIES.orders.create);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [filter] = useState({
    customerId: id,
  });
  const [list, setList] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [order, setOrder] = useState();

  const listOrders = useCallback(async () => {
    try {
      const { data } = await service.list(1, 3, filter);

      setList(data);
    } catch (error) {
      sendToast(error.message, false);
    }
  }, [filter, sendToast]);

  useEffect(() => {
    listOrders();
  }, [listOrders]);

  return (
    <CardLayout
      title="Orders"
      buttons={
        <>
          {hasPermissionToCreate && (
            <Button
              variant="outline-secondary"
              className="ml-2"
              onClick={() => setOpenCheckout(true)}
            >
              Checkout
            </Button>
          )}
          <Link to={`/orders/${id}`}>
            <Button variant="outline-primary" className="ml-2 text-nowrap">
              See More
            </Button>
          </Link>
        </>
      }
    >
      <List list={list} setOrder={setOrder} setOpenDetails={setOpenDetails} />
      {openCheckout && (
        <Modal title="Create Order" setClose={setOpenCheckout}>
          <OrderWizard reloadOrders={listOrders} setClose={setOpenCheckout} />
        </Modal>
      )}
      {openDetails && (
        <Details
          setClose={setOpenDetails}
          orderId={order.id}
          reloadOrders={listOrders}
          setOrder={setOrder}
        />
      )}
    </CardLayout>
  );
};

export default Orders;
