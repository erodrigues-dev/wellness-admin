import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Modal from '~/components/Modal';
import useAuth from '~/contexts/auth';

import OrderWizard from '../../../../Order/Form';
import List from './List';

const Orders = () => {
  const { hasPermission, ACTIONS, FUNCTIONALITIES } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.ACTIVITIES,
    ACTIONS.CREATE
  );
  const [openCheckout, setOpenCheckout] = useState(false);

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
            <Link to="/discounts">
              <Button variant="outline-primary" className="ml-2 text-nowrap">
                See More
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <List />
      </Card.Body>
      {openCheckout && (
        <Modal width="800px" title="Create Order" setClose={setOpenCheckout}>
          <OrderWizard setClose={setOpenCheckout} />
        </Modal>
      )}
    </Card>
  );
};

export default Orders;
