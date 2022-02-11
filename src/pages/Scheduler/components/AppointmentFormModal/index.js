import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';
import { useFormik } from 'formik';

import { AutoCompleteFormikAdapter } from '~/components/AutoComplete';
import ButtonLoading from '~/components/ButtonLoading';
import { DateTimePickerFormikAdapter } from '~/components/Form/DateTimePicker';
import { Input, InputFormikAdapter } from '~/components/Form/Input';
import autocomplete from '~/services/autocomplete';

import { useAppointmentContext } from '../../data/AppointmentContext';
import { validationSchema, getInitialValues } from './schema';
import { DateFields } from './styles';

export function AppointmentFormModal() {
  const { isOpen } = useAppointmentContext();

  if (!isOpen) return null;

  return <AppointmentFormComponent />;
}

function AppointmentFormComponent() {
  const { slotData, calendar, activities, handleClose, handleSave } =
    useAppointmentContext();

  function handleSubmit(values) {
    handleSave(values);
  }

  const formik = useFormik({
    validationSchema,
    onSubmit: handleSubmit,
    initialValues: getInitialValues({ start: slotData?.start }),
  });

  function handleChangeActivity({ target }) {
    const { value } = target;
    const selectedActivity = activities.find((x) => x.id === Number(value));

    formik.setFieldValue('activity', selectedActivity);
  }

  return (
    <Window
      title="Add appointment"
      initialWidth={600}
      initialHeight={600}
      onClose={handleClose}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Input
          label="Calendar"
          name="calendar"
          inputOptions={{ disabled: true, defaultValue: calendar?.name }}
        />

        <InputFormikAdapter
          formik={formik}
          name="activity"
          identifier="id"
          label="Activity"
          inputOptions={{
            as: 'select',
          }}
          onChange={handleChangeActivity}
        >
          <option value="" disabled>
            Select
          </option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </InputFormikAdapter>

        <DateFields>
          <DateTimePickerFormikAdapter
            formik={formik}
            name="start"
            label="Start"
          />

          <Input
            name="duration"
            label="Duration (minutes)"
            inputOptions={{
              disabled: true,
              defaultValue: formik.values.activity?.duration || '',
            }}
          />
        </DateFields>

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
          name="notes"
          label="Notes"
          inputOptions={{
            as: 'textarea',
            rows: 3,
          }}
        />
        <pre>values: {JSON.stringify(formik.values, null, 2)}</pre>
        <pre>touched: {JSON.stringify(formik.touched, null, 2)}</pre>
        <pre>errors: {JSON.stringify(formik.errors, null, 2)}</pre>
      </Form>

      <WindowActionsBar>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <ButtonLoading onClick={() => {}}>Save</ButtonLoading>
      </WindowActionsBar>
    </Window>
  );
}
