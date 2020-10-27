import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import InputDatePicker from '~/components/InputDatePicker';

import schema from './schema';

const CreateOrder = ({ setClose, goToStep }) => {
  const [minDate] = useState(new Date());
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      customerId: 0,
      relationType: '',
      relationId: 0,
    },
  });

  function handleSubmit() {}

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Check
          custom
          inline
          type="radio"
          label="Package"
          id="package"
          name="relationType"
          checked={formik.values.relationType === 'package'}
          value={formik.values.relationType}
          onChange={(e) => formik.setFieldValue('relationType', e.target.id)}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.relationType && formik.errors.relationType}
          isValid={formik.touched.relationType && !formik.errors.relationType}
        />
        <Form.Check
          custom
          inline
          type="radio"
          label="Activity"
          id="activity"
          name="relationType"
          checked={formik.values.relationType === 'activity'}
          value={formik.values.relationType}
          onChange={(e) => formik.setFieldValue('relationType', e.target.id)}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.relationType && formik.errors.relationType}
          isValid={formik.touched.relationType && !formik.errors.relationType}
        />
        <Feedback type="invalid">{formik.errors.relationType}</Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          {formik.values.relationType === 'activity'
            ? 'Activity'
            : formik.values.relationType === 'package'
            ? 'Package'
            : 'Activity/Package'}
        </Form.Label>
        <Form.Control
          as="select"
          custom
          name="relationId"
          value={formik.values.relationId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.relationId && formik.errors.relationId}
          isValid={formik.touched.relationId && !formik.errors.relationId}
          disabled={!formik.values.relationType}
        >
          <option value={0} disabled>
            Select an option
          </option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {formik.errors.relationId}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Due Date</Form.Label>
        <InputDatePicker
          min={minDate}
          name="expiration"
          value={formik.values.expiration}
          onChange={formik.handleChange}
          isInvalid={formik.touched.expiration && formik.errors.expiration}
          isValid={formik.touched.expiration && !formik.errors.expiration}
        />
      </Form.Group>
      <Form.Group className="d-flex justify-content-end mt-5">
        <Button
          variant="secondary"
          className="mr-2"
          disabled={formik.isSubmitting}
          onClick={() => setClose(false)}
        >
          Cancel
        </Button>
        <ButtonLoading
          type="submit"
          className="mr-2"
          loading={formik.isSubmitting}
          onClick={() => goToStep(2)}
        >
          Pay With Credit Card
        </ButtonLoading>
        <ButtonLoading
          type="submit"
          loading={formik.isSubmitting}
          onClick={() => goToStep(3)}
        >
          Pay With Money
        </ButtonLoading>
      </Form.Group>
    </Form>
  );
};

export default CreateOrder;
