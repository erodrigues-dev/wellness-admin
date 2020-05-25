import React, { useEffect, useState } from 'react';
import { Card, Form, Col, Button, Table } from 'react-bootstrap';
import { FiX } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import { decimal, currency } from '~/helpers/intl';
import * as activityService from '~/services/activity';
import service from '~/services/package';

import schema from './schema';

function FormComponent() {
  const [listActivity, setListActivity] = useState([]);
  const { sendNotification } = useNotification();
  const { id } = useParams();
  const history = useHistory();
  const action = id ? 'Edit Package' : 'Add Package';
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: 0,
      name: '',
      price: '',
      description: '',
      activities: [],
    },
  });

  useEffect(() => {
    if (!id) return;
    service
      .get(id)
      .then((response) => {
        const { name, price, description, activities } = response.data;
        formik.setValues({
          id,
          name,
          price: decimal.format(price),
          description,
          activities,
        });
      })
      .catch(({ message }) => sendNotification(message, false));

    // TODO
    // React Hook useEffect has missing dependencies
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    activityService
      .listAll()
      .then((response) => setListActivity(response.data));
  }, []);

  async function handleSubmit(values, { setSubmitting }) {
    try {
      if (id === undefined) {
        await service.create(values);
        sendNotification('Package created with success.');
      } else {
        await service.update(values);
        sendNotification('Package updated with success.');
      }

      history.goBack();
    } catch (error) {
      sendNotification(error.message, false);
      setSubmitting(false);
    }
  }

  function handleCancel() {
    history.goBack();
  }

  function maskPrice(e) {
    let value = e.target.value.replace(/[^0-9]/g, '').replace(/^0*/, '');
    if (value) {
      if (value.length < 3) {
        value = value.padStart(3, '0');
      }
      const chars = value.split('');
      chars.splice(-2, 0, '.');
      value = chars.join('');
      value = decimal.format(value);
    }
    e.target.value = value;
    formik.handleChange(e);
  }

  // function maskDuration(e) {
  //   e.target.value = e.target.value.replace(/\D/g, '');

  //   formik.handleChange(e);
  // }

  return (
    <Card body>
      <Card.Title>{action}</Card.Title>
      <hr />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
              isValid={formik.touched.name && !formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Price</Form.Label>
            <Form.Control
              placeholder="Price"
              name="price"
              value={formik.values.price}
              onChange={maskPrice}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.price && formik.errors.price}
              isValid={formik.touched.price && !formik.errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.price}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row />

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.description && formik.errors.description}
            isValid={formik.touched.description && !formik.errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Activity</Form.Label>
            <Form.Control as="select" custom>
              <option value="">Selecione</option>
              {listActivity.map((item) => (
                <option key={item.id} value={item}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} className="d-flex align-items-end">
            <Button>Add</Button>
          </Form.Group>
        </Form.Row>

        <Table striped hover responsive>
          <thead>
            <tr>
              <th className="text-center">Remove</th>
              <th>Activity</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {formik.values.activities.map((item) => (
              <tr key={item.id}>
                <td className="text-center">
                  <Button variant="outline-danger" size="sm">
                    <FiX size="22" />
                  </Button>
                </td>
                <td>{item.name}</td>
                <td>{currency.format(item.price)}</td>
                <td>{`${item.duration}min`}</td>
                <td>
                  <Form.Control
                    style={{ width: 80 }}
                    defaultValue={item.PackageActivity.quantity}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Form.Row className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="mr-2"
            onClick={handleCancel}
            disabled={formik.isSubmitting}
          >
            Cancel
          </Button>
          <ButtonLoading type="submit" loading={formik.isSubmitting}>
            Save
          </ButtonLoading>
        </Form.Row>
      </Form>
    </Card>
  );
}

export default FormComponent;
