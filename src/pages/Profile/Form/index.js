import React, { useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import * as service from '~/services/profile';

import Functionalities from './Functionalities';
import schema from './schema';

const functionalities = service.listFunctionalities();

function FormComponent() {
  const { sendNotification } = useNotification();
  const { id } = useParams();
  const history = useHistory();
  const title = id ? 'Edit Profile' : 'Add Profile';
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: 0,
      name: '',
      description: '',
      functionalities: [],
    },
  });

  useEffect(() => {
    if (!id) return;
    service
      .get(id)
      .then((response) => formik.setValues({ ...response.data }))
      .catch(({ message }) => sendNotification(message, false));

    // TODO
    // React Hook useEffect has missing dependencies
    // eslint-disable-next-line
  }, [id]);

  async function handleSubmit(values, { setSubmitting }) {
    try {
      const submitValues = {
        ...values,
        functionalities: values.functionalities.map((functionality) => ({
          name: functionality.name,
          actions: functionality.actions,
        })),
      };

      if (id === undefined) {
        await service.create(submitValues);
        sendNotification('Profile created with success.');
      } else {
        await service.update(submitValues);
        sendNotification('Profile updated with success.');
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
      <Card.Title>{title}</Card.Title>
      <hr />

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
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
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
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

        <Functionalities list={functionalities} formik={formik} />

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
