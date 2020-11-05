import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import InputDatePicker from '~/components/InputDatePicker';
import useNotification from '~/contexts/notification';
import * as activityService from '~/services/activity';
import * as packageService from '~/services/package';

import schema from './schema';

const CreateOrder = ({ setClose, setPage }) => {
  const { sendNotification } = useNotification();
  const [activities, setActivities] = useState();
  const [packages, setPackages] = useState();
  const [selectedRelation, setSelectedRelation] = useState(null);
  const [minDate] = useState(new Date());
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      customerId: 0,
      relationType: '',
      relationId: '',
      quantity: 1,
    },
  });

  const listActivities = useCallback(async () => {
    try {
      const { data } = await activityService.listAll();

      setActivities(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification]);

  const listPackages = useCallback(async () => {
    try {
      const { data } = await packageService.listAll();

      setPackages(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification]);

  useEffect(() => {
    if (
      formik.values.relationType &&
      formik.values.relationType === 'activity' &&
      activities === undefined
    )
      listActivities();
  }, [formik.values.relationType, listActivities, activities]);

  useEffect(() => {
    if (
      formik.values.relationType &&
      formik.values.relationType === 'package' &&
      packages === undefined
    )
      listPackages();
  }, [formik.values.relationType, listPackages, packages]);

  function handleRelationType(e) {
    const { id: inputId } = e.target;
    formik.setFieldValue('relationType', inputId);
    formik.setFieldValue('relationId', '');
  }

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
          onChange={(e) => handleRelationType(e)}
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
          onChange={(e) => handleRelationType(e)}
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
          <option value="" disabled>
            Select an option
          </option>
          {formik.values.relationType === 'activity'
            ? activities?.map((activity) => (
                <option
                  key={activity.id}
                  value={activity.id}
                  onClick={() => setSelectedRelation(activity)}
                >
                  {activity.name}
                </option>
              ))
            : packages?.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  onClick={() => setSelectedRelation(item)}
                >
                  {item.name}
                </option>
              ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {formik.errors.relationId}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          placeholder="Quantity"
          name="quantity"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.quantity && formik.errors.quantity}
          isValid={formik.touched.quantity && !formik.errors.quantity}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.quantity}
        </Form.Control.Feedback>
      </Form.Group>
      {selectedRelation?.recurrencyPay && (
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
      )}

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
          onClick={() => setPage(2)}
        >
          Pay With Credit Card
        </ButtonLoading>
        <ButtonLoading
          type="submit"
          loading={formik.isSubmitting}
          onClick={() => setPage(3)}
        >
          Pay With Money
        </ButtonLoading>
      </Form.Group>
    </Form>
  );
};

export default CreateOrder;
