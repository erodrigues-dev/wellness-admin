import React, { useCallback, useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FaMoneyBill as AddPaymentIcon } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';
import { useFormik } from 'formik';

import { formatToDateTime, addMinutes } from '~/helpers/date';
import autocomplete from '~/services/autocomplete';
import { listActivities } from '~/services/scheduler';

import { AutoCompleteFormikAdapter } from '../../../../components/AutoComplete';
import ButtonLoading from '../../../../components/ButtonLoading';
import { useSchedulerContext } from '../../data/Context';
import { validationSchema, initialValues } from './schema';

export function AppointmentFormModal() {
  const { modal, setModal } = useSchedulerContext();
  const [activities, setActivities] = useState([]);
  const [end, setEnd] = useState(null);

  const { data = {}, isOpen } = modal;
  const { start, calendar } = data;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit() {
    const submitData = {
      start,
      end,
      calendarId: calendar.id,
      activityId: formik.values.activityId,
      customerId: formik.values.customerId,
    };

    console.log(submitData);
  }
  const handleClose = () => setModal({});
  const fetchActivities = useCallback(async (calendarId) => {
    try {
      const { data: response } = await listActivities(calendarId);
      setActivities(response);
    } catch (error) {
      toast.error('Unable to list activities of calendar');
    }
  }, []);
  const handleChangeActivity = useCallback(() => {
    const { activityId } = formik.values;
    const activity = activities.find((x) => x.id === Number(activityId));
    setEnd(activity?.duration ? addMinutes(start, activity.duration) : null);
  }, [formik.values, activities, start]);

  useEffect(() => {
    if (calendar?.id) fetchActivities(calendar?.id);
  }, [calendar, fetchActivities]);

  useEffect(() => {
    handleChangeActivity();
  }, [handleChangeActivity]);

  if (!isOpen) return null;

  return (
    <Window
      title="Add appointment"
      initialWidth={600}
      initialHeight={600}
      onClose={handleClose}
    >
      <Form>
        <Form.Group>
          <Form.Label>Calendar</Form.Label>
          <Form.Control disabled defaultValue={calendar?.name} />
        </Form.Group>
        <Row>
          <Form.Group as={Col} md>
            <Form.Label>Start</Form.Label>
            <Form.Control disabled defaultValue={formatToDateTime(start)} />
          </Form.Group>
          <Form.Group as={Col} md>
            <Form.Label>End</Form.Label>
            <Form.Control disabled defaultValue={formatToDateTime(end)} />
          </Form.Group>
        </Row>

        <Form.Group>
          <Form.Label>Activity</Form.Label>
          <Form.Control
            as="select"
            name="activityId"
            value={formik.values.activityId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={formik.touched.activityId && !formik.errors.activityId}
            isInvalid={formik.touched.activityId && formik.errors.activityId}
          >
            <option value="">Select</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {formik.errors.activityId}
          </Form.Control.Feedback>
        </Form.Group>

        <AutoCompleteFormikAdapter
          name="customerId"
          label="Customer"
          formik={formik}
          itemKey="id"
          textField="name"
          onFilter={autocomplete.customers}
          onChange={() => {}}
          appendToBody
        />
      </Form>

      <h6>Payment Details</h6>
      <p>
        Paid with <strong>money</strong> on 20/02/22 9:33am order number:
        <u>012345</u>
      </p>

      <WindowActionsBar>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled>
          <AddPaymentIcon className="mr-2" />
          Add Payment
        </Button>
        <ButtonLoading onClick={formik.handleSubmit}>Save</ButtonLoading>
      </WindowActionsBar>
    </Window>
  );
}
