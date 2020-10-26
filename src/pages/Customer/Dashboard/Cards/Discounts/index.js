import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import * as service from '~/services/discount';

import ModalForm from '../../../../Discount/Form';
import List from './List';

const Discounts = () => {
  const { hasPermission, ACTIONS, FUNCTIONALITIES } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.ACTIVITIES,
    ACTIONS.CREATE
  );
  const hasPermissionToUpdate = hasPermission(
    FUNCTIONALITIES.ACTIVITIES,
    ACTIONS.UPDATE
  );
  const { id } = useParams();
  const { sendNotification } = useNotification();
  const [openAdd, setOpenAdd] = useState(false);
  const [discounts, setDiscounts] = useState();

  const listDiscounts = useCallback(async () => {
    try {
      const { data } = await service.listAll({
        customerId: id,
      });

      setDiscounts(data);
    } catch (error) {
      sendNotification(error.message);
    }
  }, [sendNotification, id]);

  useEffect(() => {
    listDiscounts();
  }, [listDiscounts]);

  async function handleDelete(item) {
    try {
      await service.destroy(item);

      sendNotification('Discount deleted.');
      listDiscounts();
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col md="10" className="d-flex align-items-center">
            <span>Discounts</span>
          </Col>
          <Col className="d-flex justify-content-end">
            {hasPermissionToCreate && (
              <Button
                variant="outline-secondary"
                className="ml-2"
                onClick={() => setOpenAdd(true)}
              >
                Add
              </Button>
            )}
            <Link to="/discounts">
              <Button variant="outline-primary" className="ml-2">
                See More
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <List
          list={discounts}
          reloadList={listDiscounts}
          handleDelete={handleDelete}
          allowEdit={hasPermissionToUpdate}
        />
      </Card.Body>
      {openAdd && (
        <ModalForm setClose={setOpenAdd} reloadList={listDiscounts} />
      )}
    </Card>
  );
};

export default Discounts;
