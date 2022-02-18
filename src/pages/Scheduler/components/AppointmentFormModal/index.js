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
import { useSchedulerContext } from '../../data/SchedulerContext';
import { validationSchema, getInitialValues } from './schema';
import { DateFields } from './styles';

export function AppointmentFormModal() {
  const {
    modal: { type, isOpen },
  } = useSchedulerContext();

  if (type !== 'appointment' && !isOpen) return null;

  return <AppointmentFormComponent />;
}

function AppointmentFormComponent() {
  const { modal, closeModal } = useSchedulerContext();
  const { selectedItem, slotData, calendar, activities, onSubmit } =
    useAppointmentContext();
  const { isEdit } = modal;

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: getInitialValues({
      dateStart: selectedItem?.start ?? slotData?.start,
      activity: selectedItem?.activity,
      calendarId: calendar?.id,
      notes: selectedItem?.notes,
      customerId: selectedItem?.customer?.id,
    }),
  });

  function handleChangeActivity({ target }) {
    const { value } = target;
    const selectedActivity = activities.find((x) => x.id === Number(value));

    formik.setFieldValue('activity', selectedActivity);
  }

  return (
    <Window
      title={`${isEdit ? 'Edit' : 'Add'} appointment`}
      initialWidth={600}
      initialHeight={600}
      onClose={closeModal}
    >
      <Form onSubmit={formik.handleSubmit}>
        <Input
          label="Calendar"
          name="calendarId"
          inputOptions={{ disabled: true, defaultValue: calendar?.name ?? '-' }}
        />

        <InputFormikAdapter
          formik={formik}
          name="activity.id"
          label="Activity"
          inputOptions={{
            as: 'select',
            disabled: isEdit,
          }}
          onChange={handleChangeActivity}
        >
          <option value="" disabled>
            Select
          </option>
          {activities?.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </InputFormikAdapter>

        <DateFields>
          <DateTimePickerFormikAdapter
            formik={formik}
            name="dateStart"
            label="Start Date"
          />

          <Input
            name="duration"
            label="Duration (minutes)"
            inputOptions={{
              disabled: true,
              defaultValue: formik.values.activity?.duration || '',
              placeholder: '-',
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
          disabled={isEdit}
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
      </Form>

      <WindowActionsBar>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <ButtonLoading onClick={formik.handleSubmit}>Save</ButtonLoading>
      </WindowActionsBar>
    </Window>
  );
}
