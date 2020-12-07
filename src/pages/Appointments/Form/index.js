import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import InputDatePicker from '~/components/InputDatePicker';
import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import { sanitize } from '~/helpers/sanitize';
import * as activityService from '~/services/activity';
import * as customerService from '~/services/customer';
import * as service from '~/services/discount';

import schema from './schema';

const ModalForm = ({ setClose, reloadAppointments, selected }) => {
  const isAdd = !selected;
  const { id: routeId } = useParams();
  const id = routeId || '';
  const { sendNotification } = useNotification();
  const [customers, setCustomers] = useState();
  const [activities, setActivities] = useState();

  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: isAdd ? 0 : selected.id,
      customerId: isAdd ? id : selected.customerId,
      relationId: isAdd ? 0 : selected.relationId,
      scheduleDate: '',
      scheduleTime: '',
    },
  });

  const listCustomers = useCallback(async () => {
    if (!id) {
      try {
        const { data } = await customerService.listAll();

        setCustomers(data);
      } catch (error) {
        sendNotification(error.message, false);
      }
    }
  }, [id, sendNotification]);

  const listActivities = useCallback(async () => {
    try {
      const { data } = await activityService.listAll();

      setActivities(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification]);

  useEffect(() => {
    listCustomers();
  }, [listCustomers]);

  useEffect(() => {
    listActivities();
  }, [listActivities]);

  async function handleSubmit(data) {
    const submitValue = { ...data, value: sanitize.number(data.value) };

    try {
      if (isAdd) {
        await service.create(submitValue);
      } else {
        await service.update(submitValue);
      }

      reloadAppointments();
      setClose(false);
      toast.success(`Discount ${isAdd ? 'created' : 'edited'} successfully.`);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  function handleSelectRelation(e) {
    const { value } = e.target;
    formik.setFieldValue('relationId', value);
  }

  return (
    <Modal setClose={setClose} title={`${isAdd ? 'Add' : 'Edit'} Appointments`}>
      <Form onSubmit={formik.handleSubmit} className="modal-form">
        <div className="form-wrapper">
          {!id && (
            <Form.Group>
              <Form.Label>Customer</Form.Label>
              <Form.Control
                as="select"
                custom
                name="customerId"
                value={formik.values.customerId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.customerId && formik.errors.customerId
                }
                isValid={formik.touched.customerId && !formik.errors.customerId}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {customers?.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.customerId}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label>Activity</Form.Label>
            <Form.Control
              as="select"
              custom
              name="relationId"
              value={formik.values.relationId}
              onChange={handleSelectRelation}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.relationId && formik.errors.relationId}
              isValid={formik.touched.relationId && !formik.errors.relationId}
              disabled={activities === undefined}
            >
              <option value={0} disabled>
                Select an option
              </option>
              {activities?.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.relationId}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Schedule Date</Form.Label>
            <InputDatePicker
              min={new Date()}
              name="scheduleDate"
              value={formik.values.scheduleDate}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.scheduleDate && formik.errors.scheduleDate
              }
              isValid={
                formik.touched.scheduleDate && !formik.errors.scheduleDate
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.scheduleDate}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Schedule Time</Form.Label>
            <Form.Control
              as="select"
              custom
              name="scheduleTime"
              value={formik.values.scheduleTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.scheduleTime && formik.errors.scheduleTime
              }
              isValid={
                formik.touched.scheduleTime && !formik.errors.scheduleTime
              }
              disabled={activities === undefined}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option>12:00</option>
              <option>13:00</option>
              <option>14:00</option>
              <option>15:00</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.scheduleTime}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="buttons">
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
        </div>
      </Form>
    </Modal>
  );
};

export default ModalForm;
