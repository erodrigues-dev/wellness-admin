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
  const { modal, closeModal, calendars } = useSchedulerContext();
  const {
    activities,
    setActivities,
    onSubmit,
    resetSelected,
    selected,
    fetchActivities,
    isFetchingActivites,
  } = useAppointmentContext();
  const { isEdit } = modal;

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: getInitialValues({
      id: selected?.item?.id,
      dateStart: selected?.item?.start ?? selected?.slotData?.start,
      activity: selected?.item?.activity,
      calendar: selected?.calendar,
      notes: selected?.item?.notes,
      customer: selected?.item?.customer,
    }),
  });

  function handleSelectFields(value, field, cb) {
    const selectedItem = cb(value);

    formik.setFieldValue(field, selectedItem);
  }

  function handleChangeActivity({ target }) {
    handleSelectFields(target.value, 'activity', (value) =>
      activities.find((x) => x.id === Number(value))
    );
  }

  async function handleChangeCalendar({ target }) {
    const { value } = target;

    handleSelectFields(value, 'calendar', (id) =>
      calendars.find((x) => x.id === id)
    );

    formik.setFieldValue('activity', {
      id: '',
      name: '',
      duration: '',
    });

    await fetchActivities(value);
  }

  function handleCloseModal() {
    closeModal();
    resetSelected();
    setActivities([]);
  }

  return (
    <Window
      title={`${isEdit ? 'Edit' : 'Add'} appointment`}
      initialWidth={600}
      initialHeight={600}
      onClose={handleCloseModal}
    >
      <Form onSubmit={formik.handleSubmit}>
        <InputFormikAdapter
          formik={formik}
          name="calendar.id"
          label="Calendar"
          inputOptions={{
            as: 'select',
            disabled: isEdit,
          }}
          onChange={handleChangeCalendar}
        >
          <option value="" disabled>
            Select
          </option>
          {calendars?.map((calendar) => (
            <option key={calendar.id} value={calendar.id}>
              {calendar.name}
            </option>
          ))}
        </InputFormikAdapter>

        <InputFormikAdapter
          formik={formik}
          name="activity.id"
          label="Activity"
          inputOptions={{
            as: 'select',
            disabled:
              isEdit || isFetchingActivites || !formik.values.calendar?.id,
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
          name="customer"
          label="Customer"
          itemKey="id"
          textField="name"
          onFilter={autocomplete.customers}
          defaultValue={selected?.item?.customer}
          onChange={(value) => formik.setFieldValue('customer', value)}
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
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <ButtonLoading onClick={formik.handleSubmit}>Save</ButtonLoading>
      </WindowActionsBar>
    </Window>
  );
}
