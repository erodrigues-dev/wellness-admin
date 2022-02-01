import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaMoneyBill as AddPaymentIcon } from 'react-icons/fa';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';

import ButtonLoading from '../../../components/ButtonLoading';
import { useSchedulerContext } from '../data/Context';

export function AppointmentFormModal() {
  const { modal, setModal } = useSchedulerContext();

  const handleClose = () => setModal({});

  if (!modal.isOpen) return null;

  return (
    <Window
      title="Add appointment"
      initialWidth={600}
      initialHeight={600}
      onClose={handleClose}
    >
      <Form>
        <Form.Group>
          <Form.Label>Calendar</Form.Label>
          <Form.Control />
          <Form.Control.Feedback type="invalid">erro</Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Form.Group as={Col} md>
            <Form.Label>Start</Form.Label>
            <Form.Control />
            <Form.Control.Feedback type="invalid">erro</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md>
            <Form.Label>Duration</Form.Label>
            <Form.Control />
            <Form.Control.Feedback type="invalid">erro</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group>
          <Form.Label>Activity</Form.Label>
          <Form.Control />
          <Form.Control.Feedback type="invalid">erro</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Customer</Form.Label>
          <Form.Control />
          <Form.Control.Feedback type="invalid">erro</Form.Control.Feedback>
        </Form.Group>
      </Form>

      <h6>Payment Details</h6>
      <p>
        Paid with <strong>money</strong> on 20/02/22 9:33am order number:
        <u>012345</u>
      </p>

      <WindowActionsBar>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button>
          <AddPaymentIcon className="mr-2" />
          Add Payment
        </Button>
        <ButtonLoading>Save</ButtonLoading>
      </WindowActionsBar>
    </Window>
  );
}
