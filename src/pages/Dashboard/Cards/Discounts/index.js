import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

import ButtonLoading from '~/components/ButtonLoading';
import Modal from '~/components/Modal';

const Discounts = () => {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col md="10" className="d-flex align-items-center">
            <span>Discounts</span>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              variant="outline-primary"
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
      {openAdd && (
        <Modal title="Add Discount" setClose={setOpenAdd}>
          <Form>
            <Form.Group>
              <Form.Check
                custom
                inline
                type="radio"
                label="Package"
                id="Package"
                name="package-activity"
              />
              <Form.Check
                custom
                inline
                type="radio"
                label="Activity"
                id="Activity"
                name="package-activity"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Package/Activity</Form.Label>
              <Form.Control placeholder="Package/Activity" name="duration" />
            </Form.Group>
            <Form.Group>
              <Form.Check
                custom
                inline
                type="radio"
                label="Percent"
                id="Percent"
                name="amount-percent"
              />
              <Form.Check
                custom
                inline
                type="radio"
                label="Amount"
                id="Amount"
                name="amount-percent"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Percent/Amount</Form.Label>
              <Form.Control placeholder="Percent/Amount" name="duration" />
            </Form.Group>
            <Form.Row className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="mr-2"
                onClick={() => setOpenAdd(false)}
              >
                Cancel
              </Button>
              <ButtonLoading type="submit">Save</ButtonLoading>
            </Form.Row>
          </Form>
        </Modal>
      )}
    </Card>
  );
};

export default Discounts;
