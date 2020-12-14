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
  const [activeStartDate, setActiveStartDate] = useState();
  const [, setDateRange] = useState();
  const [openedDatePicker, setOpenedDatePicker] = useState(false);

  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: isAdd ? 0 : selected.id,
      customerId: isAdd ? id : selected.customerId,
      relationId: isAdd ? 0 : selected.relationId,
      date: '',
      schedule: '',
    },
  });

  const getFullMonth = useCallback((startDate) => {
    if (startDate === undefined) return;
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    setDateRange([startDate, endDate]);
  }, []);

  useEffect(() => {
    getFullMonth(activeStartDate?.activeStartDate);
  }, [activeStartDate, getFullMonth]);

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
    <Modal
      setClose={setClose}
      title={`${isAdd ? 'Add' : 'Edit'} Appointments`}
      overflowNone={openedDatePicker}
    >
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
              disabled={activities === undefined || !formik.values.customerId}
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
            <Form.Label>Date</Form.Label>
            <InputDatePicker
              min={new Date()}
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.date && formik.errors.date}
              isValid={formik.touched.date && !formik.errors.date}
              setOpenedDatePicker={setOpenedDatePicker}
              disabled={!formik.values.relationId}
              // tileDisabled={(e) => console.log(e)}
              onActiveStartDateChange={(e) => setActiveStartDate(e)}
            />
            {formik.touched.date && formik.errors.date && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: 'block' }}
              >
                {formik.errors.date}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Available Time Slots</Form.Label>
            <Form.Control
              as="select"
              custom
              name="schedule"
              value={formik.values.schedule}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.schedule && formik.errors.schedule}
              isValid={formik.touched.schedule && !formik.errors.schedule}
              disabled={!formik.values.date}
            >
              <option value="" disabled>
                Select an option
              </option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.schedule}
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
