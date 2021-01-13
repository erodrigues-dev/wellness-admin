import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import Modal from '~/components/Modal';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import * as service from '~/services/order';

import OrderWizard from '../../../../Order/Form';
import List from './List';

const Orders = () => {
  const { id } = useParams();
  const { sendNotification } = useNotification();
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(FUNCTIONALITIES.orders.create);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [filter] = useState({
    customerId: id,
  });
  const [list, setList] = useState([]);

  const listOrders = useCallback(async () => {
    try {
      const { data } = await service.list(1, 3, filter);

      setList(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [filter, sendNotification]);

  useEffect(() => {
    listOrders();
  }, [listOrders]);

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col className="d-flex align-items-center">
            <span>Orders</span>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
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
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <List list={list} />
      </Card.Body>
      {openCheckout && (
        <Modal title="Create Order" setClose={setOpenCheckout}>
          <OrderWizard reloadOrders={listOrders} setClose={setOpenCheckout} />
        </Modal>
      )}
    </Card>
  );
};

export default Orders;
