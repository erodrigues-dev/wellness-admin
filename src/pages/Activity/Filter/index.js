import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';

import { listAll as listAllEmployees } from '~/services/employee';

import { Container } from './styles';

function Filter({ onFilter, allowCreate, list }) {
  const [employees, setEmployees] = useState([]);
  const formik = useFormik({
    initialValues: { name: '', employeeId: '' },
    onSubmit: handleSubmit,
    onReset: handleSubmit,
  });

  useEffect(() => {
    listAllEmployees().then((response) => setEmployees(response.data));
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
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              list="activities"
            />
            <datalist id="activities">
              {list &&
                list.map((item) => <option key={item.id}>{item.name}</option>)}
            </datalist>
          </Form.Group>
          <Form.Group as={Col} sm={6}>
            <Form.Control
              custom
              as="select"
              name="employeeId"
              value={formik.values.employeeId}
              onChange={formik.handleChange}
            >
              <option value="">All Employees</option>
              {employees.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
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
                as={Link}
                to="/activities/create"
                variant="secondary"
                className="ml-2"
              >
                Add Activity
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Filter;
