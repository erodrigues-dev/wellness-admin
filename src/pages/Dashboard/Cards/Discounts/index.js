import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import * as service from '~/services/discount';

import ModalForm from '../../../Discount/Form';
import List from './List';

const Discounts = () => {
  const { sendNotification } = useNotification();
  const [openAdd, setOpenAdd] = useState(false);
  const [discounts, setDiscounts] = useState();

  const listDiscounts = useCallback(async () => {
    try {
      const { data } = await service.listAll();

      setDiscounts(data);
    } catch (error) {
      sendNotification(error.message);
    }
  }, [sendNotification]);

  useEffect(() => {
    listDiscounts();
  }, [listDiscounts]);

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col md="10" className="d-flex align-items-center">
            <span>Discounts</span>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              variant="outline-secondary"
              className="ml-2"
              onClick={() => setOpenAdd(true)}
            >
              Add
            </Button>
            <Button variant="outline-primary" className="ml-2">
              See More
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <List list={discounts} />
      </Card.Body>
      {openAdd && (
        <Modal title="Add Discount" setClose={setOpenAdd}>
          <ModalForm setClose={setOpenAdd} />
        </Modal>
      )}
    </Card>
  );
};

export default Discounts;
