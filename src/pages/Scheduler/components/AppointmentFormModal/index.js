import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
// import { FaMoneyBill as AddPaymentIcon } from 'react-icons/fa';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';
import { useFormik } from 'formik';

import { AutoCompleteFormikAdapter } from '~/components/AutoComplete';
import ButtonLoading from '~/components/ButtonLoading';
import { Input, InputFormikAdapter } from '~/components/Form/Input';
import autocomplete from '~/services/autocomplete';

import InputDateTimePicker from '../../../../components/InputDateTimePicker';
import { useAppointmentContext } from '../../data/AppointmentContext';
import { validationSchema, initialValues } from './schema';

export function AppointmentFormModal() {
  const {
    isOpen,
    slotData,
    calendar,
    activities,
    selectedActivity,
    handleChangeActivity,
    handleClose,
    handleSave,
  } = useAppointmentContext();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const { setValues } = formik;

  function handleSubmit(values) {
    handleSave(values);
  }

  useEffect(() => {
    handleChangeActivity(formik.values.activityId);
  }, [formik.values.activityId, handleChangeActivity]);

  useEffect(() => {
    setValues({
      start: slotData?.start || '',
    });
  }, [slotData, setValues]);

  if (!isOpen) return null;

  return (
    <Window
      title="Add appointment"
      initialWidth={600}
      initialHeight={600}
      onClose={handleClose}
    >
      <Form>
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
        <Input
          label="Calendar"
          name="calendar"
          inputOptions={{ disabled: true, defaultValue: calendar?.name }}
        />

        <Form.Group>
          <Form.Label>Start</Form.Label>
          <InputDateTimePicker
            name="start"
            value={formik.values.start}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={Boolean(formik.touched.start && !formik.errors.start)}
            isInvalid={Boolean(formik.touched.start && formik.errors.start)}
            feedback={formik.errors.start}
          />
        </Form.Group>

        <Input
          name="duration"
          label="Duration (minutes)"
          inputOptions={{
            disabled: true,
            defaultValue: selectedActivity?.duration || '',
          }}
        />

        <InputFormikAdapter
          formik={formik}
          name="activityId"
          label="Activity"
          inputOptions={{
            as: 'select',
          }}
        >
          <option value="">Select</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </InputFormikAdapter>

        <AutoCompleteFormikAdapter
          formik={formik}
          name="customerId"
          label="Customer"
          itemKey="id"
          textField="name"
          onFilter={autocomplete.customers}
          onChange={() => {}}
          appendToBody
        />

        <InputFormikAdapter
          formik={formik}
          name="note"
          label="Notes"
          inputOptions={{
            as: 'textarea',
            rows: 3,
          }}
        />
      </Form>

      {/* <h6>Payment Details</h6>
      <p>
        Paid with <strong>money</strong> on 20/02/22 9:33am order number:
        <u>012345</u>
      </p> */}

      <WindowActionsBar>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {/* <Button disabled>
          <AddPaymentIcon className="mr-2" />
          Add Payment
        </Button> */}
        <ButtonLoading onClick={formik.handleSubmit}>Save</ButtonLoading>
      </WindowActionsBar>
    </Window>
  );
}
