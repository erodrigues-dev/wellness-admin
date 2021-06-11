import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import InputDatePicker from '~/components/InputDatePicker';
import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import {
  toDate,
  formatTime24To12,
  toInputValue,
  formatToSubmit,
} from '~/helpers/date';
import * as appointmentService from '~/services/appointment';
import * as customerService from '~/services/customer';

import { CustomerWaiverStatus } from '../../CustomerWaiver/WaiverStatus';
import schema from './schema';
import { Container } from './styles';

const ModalForm = ({ setClose, reloadAppointments, dashboard = false }) => {
  const { id: routeId } = useParams();
  const customerId = routeId || '';
  const { sendNotification } = useNotification();
  const [customers, setCustomers] = useState();
  const [activities, setActivities] = useState();
  const [activeStartDate, setActiveStartDate] = useState(
    formatToSubmit(new Date())
  );
  const [dateRange, setDateRange] = useState();
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: '',
      customerId: dashboard ? customerId : '',
      relationId: '',
      date: '',
      timeId: '',
    },
  });

  const getFullMonth = useCallback((start) => {
    if (start === undefined) return;
    const startDate = toDate(start);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    setDateRange([startDate, endDate]);
  }, []);

  useEffect(() => {
    getFullMonth(activeStartDate);
  }, [activeStartDate, getFullMonth]);

  const listCustomers = useCallback(async () => {
    if (!dashboard) {
      try {
        const { data } = await customerService.listAll();

        setCustomers(data);
      } catch (error) {
        sendNotification(error.message, false);
      }
    }
  }, [dashboard, sendNotification]);

  const listActivities = useCallback(
    async (id) => {
      try {
        const { data } = await appointmentService.customerActivities(id);

        setActivities(data);
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [sendNotification]
  );

  useEffect(() => {
    listCustomers();
  }, [listCustomers]);

  useEffect(() => {
    if (formik.values.customerId) listActivities(formik.values.customerId);
  }, [listActivities, formik.values.customerId]);

  const listAvailableDates = useCallback(
    async (activityId, start, end) => {
      try {
        const { data } = await appointmentService.listDates(
          activityId,
          start,
          end
        );

        setAvailableDates(data.map((item) => toDate(item)));
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [sendNotification]
  );

  useEffect(() => {
    if (formik.values.relationId && dateRange?.length > 0) {
      listAvailableDates(
        formik.values.relationId,
        formatToSubmit(dateRange[0]),
        formatToSubmit(dateRange[1])
      );
    }
  }, [listAvailableDates, formik.values.relationId, dateRange]);

  const listAvailableTimeSlots = useCallback(
    async (activityId, date) => {
      try {
        const { data } = await appointmentService.listAvailableTimeSlots(
          activityId,
          date
        );

        if (data.length <= 0) {
          toast.error(
            "The selected date doesn't have available time slots. Please try another date"
          );

          return;
        }
        setAvailableTimeSlots(data);
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [sendNotification]
  );

  useEffect(() => {
    if (formik.values.date)
      listAvailableTimeSlots(formik.values.relationId, formik.values.date);
  }, [listAvailableTimeSlots, formik.values.date, formik.values.relationId]);

  async function handleSubmit(data) {
    try {
      const { orderActivityId } = activities.find(
        (x) => x.id === +data.relationId
      );

      await appointmentService.create({
        customerId: +data.customerId,
        orderActivityId,
        activityScheduleId: +data.timeId,
        date: toInputValue(data.date),
      });

      reloadAppointments();
      setClose(false);
      toast.success(`Appointments created successfully.`);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  function handleSelectCustomer(e) {
    formik.setFieldValue('customerId', e.target.value);

    formik.setFieldValue('relationId', '');
    formik.setFieldValue('date', '');
    formik.setFieldValue('timeId', '');

    setAvailableDates([]);
    setAvailableTimeSlots([]);
    setActiveStartDate(formatToSubmit(new Date()));
  }

  function handleSelectRelation(e) {
    const { value } = e.target;

    formik.setFieldValue('relationId', value);
    formik.setFieldValue('date', '');
    formik.setFieldValue('timeId', '');
    setAvailableTimeSlots([]);
    setActiveStartDate(formatToSubmit(new Date()));
  }

  function handleDateChange(e) {
    const { value } = e.target;

    formik.setFieldValue('date', formatToSubmit(value));
    formik.setFieldValue('timeId', '');
  }

  function handleDateValue(value) {
    if (value && typeof value === 'string') {
      return toDate(value);
    }

    return null;
  }

  function handleTileDisable({ date, view }) {
    return (
      availableDates.find(
        (item) =>
          item.getDate() === date.getDate() &&
          item.getMonth() === date.getMonth() &&
          toDate(activeStartDate).getMonth() === date.getMonth()
      ) === undefined && view === 'month'
    );
  }

  return (
    <Modal setClose={setClose} title="Add Appointments">
      <Form onSubmit={formik.handleSubmit} className="modal-form">
        <Container className="form-wrapper">
          {!dashboard && (
            <Form.Group>
              <Form.Label>Customer</Form.Label>
              <Form.Control
                as="select"
                custom
                name="customerId"
                value={formik.values.customerId}
                onChange={handleSelectCustomer}
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
              <option value="" disabled>
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

          <CustomerWaiverStatus
            customerId={formik.values.customerId}
            activityId={formik.values.relationId}
          />

          <Form.Group>
            <Form.Label>Date</Form.Label>
            <InputDatePicker
              min={new Date()}
              name="date"
              value={() => handleDateValue(formik.values.date)}
              onChange={handleDateChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.date && formik.errors.date && !formik.values.date
              }
              isValid={
                formik.touched.date && !formik.errors.date && formik.values.date
              }
              disabled={!formik.values.relationId && availableDates.length <= 0}
              tileDisabled={handleTileDisable}
              onActiveStartDateChange={({ activeStartDate: startDate }) =>
                setActiveStartDate(formatToSubmit(startDate))
              }
            />
            {formik.touched.date && formik.errors.date && !formik.values.date && (
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
              name="timeId"
              value={formik.values.timeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.timeId && formik.errors.timeId}
              isValid={formik.touched.timeId && !formik.errors.timeId}
              disabled={!formik.values.date || availableTimeSlots.length <= 0}
            >
              <option value="" disabled>
                Select an option
              </option>
              {availableTimeSlots.length > 0 &&
                availableTimeSlots.map((item) => (
                  <option value={item.id} key={item.id}>
                    {formatTime24To12(item.start)} -{' '}
                    {formatTime24To12(item.end)}
                  </option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.timeId}
            </Form.Control.Feedback>
          </Form.Group>
        </Container>
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
