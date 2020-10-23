import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import Modal from '~/components/Modal';
import * as customerService from '~/services/customer';

import ModalForm from '../Form';
import { Container } from './styles';

function Filter({ onFilter, allowCreate }) {
  const [customers, setCustomers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const formik = useFormik({
    initialValues: { customerId: 0, relationName: '' },
    onSubmit: handleSubmit,
    onReset: handleSubmit,
  });

  useEffect(() => {
    customerService.index().then((response) => setCustomers(response.data));
  }, []);

  function handleSubmit(values) {
    onFilter(values);
  }

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Form.Group as={Col} sm={6}>
            <Form.Control
              as="select"
              custom
              name="customerId"
              value={formik.values.customerId}
              onChange={formik.handleChange}
            >
              <option value={0} disabled>
                Select an option
              </option>
              {customers?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} sm={6}>
            <Form.Control
              placeholder="Activity/Package"
              name="relationName"
              value={formik.values.relationName}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button type="submit">Filter</Button>
            <Button type="reset" className="ml-2" onClick={formik.handleReset}>
              Clear Filters
            </Button>
            {allowCreate && (
              <Button
                variant="secondary"
                className="ml-2"
                onClick={() => setOpenAdd(true)}
              >
                Add Activity
              </Button>
            )}
          </Col>
        </Row>
      </Form>
      {openAdd && (
        <Modal setClose={setOpenAdd} title="Add Discount">
          <ModalForm setClose={setOpenAdd} />
        </Modal>
      )}
    </Container>
  );
}

export default Filter;
