import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
// import * as activityService from '~/services/activity';
// import * as packageService from '~/services/package';

import schema from './schema';

const ModalForm = ({ setClose }) => {
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: '',
      customerId: 0,
      relationType: 'package',
      relationId: 0,
      type: '',
      value: 0,
    },
  });

  useEffect(() => {}, []);

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
          onChange={formik.handleChange}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.relationType && formik.errors.relationType}
          isValid={formik.touched.relationType && !formik.errors.relationType}
        />
        <Feedback type="invalid">{formik.errors.relationType}</Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          {formik.values.relationType === 'activity' ? 'Activity' : 'Package'}
        </Form.Label>
        <Form.Control
          placeholder={
            formik.values.relationType === 'activity' ? 'Activity' : 'Package'
          }
          as="select"
          custom
          name="relationId"
          value={formik.values.relationId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.relationId && formik.errors.relationId}
          isValid={formik.touched.relationId && !formik.errors.relationId}
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
        <Form.Check
          custom
          inline
          type="radio"
          label="Percent"
          id="percent"
          name="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.type && formik.errors.type}
          isValid={formik.touched.type && !formik.errors.type}
        />
        <Form.Check
          custom
          inline
          type="radio"
          label="Amount"
          id="amount"
          name="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.type && formik.errors.type}
          isValid={formik.touched.type && !formik.errors.type}
        />
        <Feedback type="invalid">{formik.errors.type}</Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          {formik.values.type === 'amount' ? 'Amount' : 'Percent'}
        </Form.Label>
        <Form.Control
          placeholder={formik.values.type === 'amount' ? 'Amount' : 'Percent'}
          name="value"
          value={formik.values.value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.value && formik.errors.value}
          isValid={formik.touched.value && !formik.errors.value}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.value}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Row className="d-flex justify-content-end">
        <Button
          variant="secondary"
          className="mr-2"
          onClick={() => setClose(false)}
        >
          Cancel
        </Button>
        <ButtonLoading type="submit">Save</ButtonLoading>
      </Form.Row>
    </Form>
  );
};

export default ModalForm;
