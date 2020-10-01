import React, { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import Modal from '~/components/Modal';

import { Container } from './styles';

const Filter = ({ onFilter, allowCreate }) => {
  const [openAdd, setOpenAdd] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: handleSubmit,
    onReset: handleSubmit,
  });

  function handleSubmit(values) {
    onFilter(values);
  }

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Form.Group as={Col} md="8">
            <Form.Control
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Col className="d-flex justify-content-end align-items-start">
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
                Add Category
              </Button>
            )}
          </Col>
        </Row>
      </Form>
      {openAdd && <Modal title="Add Category" setClose={setOpenAdd} />}
    </Container>
  );
};

export default Filter;
