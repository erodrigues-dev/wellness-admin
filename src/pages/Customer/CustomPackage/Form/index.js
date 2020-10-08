import React, { useEffect, useState } from 'react';
import { Card, Form, Col, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { startOfTomorrow, parseISO } from 'date-fns';
import { useFormik } from 'formik';

import Avatar from '~/components/Avatar';
import ButtonLoading from '~/components/ButtonLoading';
import InputDatePicker from '~/components/InputDatePicker';
import useNotification from '~/contexts/notification';
import { decimal } from '~/helpers/intl';
import masks from '~/helpers/masks';
import service from '~/services/custom-package';
import { get as getCustomer } from '~/services/customer';

import Activities from './Activities';
import schema from './schema';

function FormComponent() {
  const history = useHistory();
  const { id, packageId } = useParams();
  const { sendNotification } = useNotification();
  const [customer, setCustomer] = useState(null);
  const action = packageId ? 'Edit Custom Package' : 'Add Custom Package';
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: 0,
      name: '',
      price: '',
      description: '',
      expiration: null,
      activities: [],
    },
  });

  useEffect(() => {
    if (id && packageId) {
      service
        .get(id, packageId)
        .then(({ data }) => {
          formik.setValues({
            id: data.id,
            customerId: data.costumerId,
            name: data.name,
            price: decimal.format(data.price),
            description: data.description,
            expiration: data.expiration ? parseISO(data.expiration) : null,
            activities: data.activities,
          });

          setCustomer(data.customer);
        })
        .catch(({ message }) => sendNotification(message, false));
    }

    if (!packageId) {
      getCustomer(id).then(({ data }) => setCustomer(data));
    }

    // eslint-disable-next-line
  }, [id, packageId]);

  async function handleSubmit(values, { setSubmitting }) {
    try {
      if (packageId === undefined) {
        await service.create(id, { ...values });
        sendNotification('Custom Package created with success.');
      } else {
        await service.update(id, { ...values });
        sendNotification('Custom Package updated with success.');
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

  return (
    <Card body>
      <Card.Title>{action}</Card.Title>
      <hr />

      <Avatar
        name={customer?.name}
        titleName="Customer"
        imageUrl={customer?.imageUrl}
      />

      <Form onSubmit={formik.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="12" lg="5">
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
          <Form.Group as={Col} md="6" lg="3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              placeholder="Price"
              name="price"
              value={formik.values.price}
              onChange={(e) => formik.setFieldValue('price', masks.price(e))}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.price && formik.errors.price}
              isValid={formik.touched.price && !formik.errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" lg="4">
            <Form.Label>Expiration Date</Form.Label>
            <InputDatePicker
              min={startOfTomorrow()}
              name="expiration"
              value={formik.values.expiration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.expiration && formik.errors.expiration}
              isValid={formik.touched.expiration && !formik.errors.expiration}
              feedback={formik.errors.expiration}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row />

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
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

        <Activities formik={formik} />

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
