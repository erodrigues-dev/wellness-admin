import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { RiErrorWarningLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';
import { useFormik } from 'formik';

import { AutoCompleteFormikAdapter } from '~/components/AutoComplete';
import ButtonLoading from '~/components/ButtonLoading';
import { CalendarLabels } from '~/components/CalendarLabelList';
import { DateTimePickerFormikAdapter } from '~/components/Form/DateTimePicker';
import { Input, InputFormikAdapter } from '~/components/Form/Input';
import autocomplete from '~/services/autocomplete';
import { checkAppointmentAvailability } from '~/services/scheduler';

import { useAppointmentContext } from '../../data/AppointmentContext';
import { useSchedulerContext } from '../../data/SchedulerContext';
import { validationSchema, getInitialValues } from './schema';
import { DateFields, FreeWarning } from './styles';

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
  const [isFree, setIsFree] = useState(true);

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: getInitialValues({
      id: selected?.item?.id,
      dateStart: selected?.item?.start ?? selected?.slotData?.start,
      dateEnd: selected?.item?.end ?? selected?.slotData?.end,
      activity: selected?.item?.activity,
      calendar: selected?.calendar,
      notes: selected?.item?.notes,
      customer: selected?.item?.customer,
      calendarLabelId: selected?.item?.calendarLabelId,
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

  function submitForm() {
    formik.submitForm();
    formik.setFieldTouched('calendar');
  }

  const handleChangeLabel = (calendarLabelId) => {
    formik.setFieldValue('calendarLabelId', calendarLabelId);
  };

  useEffect(() => {
    const { calendar, id, dateStart: date } = formik.values;
    const calendarId = calendar?.id;

    if (calendarId && date) {
      checkAppointmentAvailability({
        date,
        calendarId,
        ignoreAppointmentId: id || null,
      })
        .then(({ data }) => setIsFree(data.isFree))
        .catch(() => toast.error('Error on fetch availability'));
    }
  }, [formik.values]);

  return (
    <Window
      title={`${isEdit ? 'Edit' : 'Add'} appointment`}
      initialWidth={600}
      initialHeight={600}
      onClose={handleCloseModal}
    >
      <Form onSubmit={formik.handleSubmit}>
        {isEdit && (
          <CalendarLabels
            value={formik.values.calendarLabelId}
            onChange={handleChangeLabel}
          />
        )}

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
          loading={isFetchingActivites}
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
          name="customer.id"
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

        {!isFree && (
          <FreeWarning>
            <RiErrorWarningLine />
            <span>
              The current activity time conflicts with another appointment or is
              outside of your hours. If you submit the current appointment, an
              overbook might happen.
            </span>
          </FreeWarning>
        )}
      </Form>

      <WindowActionsBar>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <ButtonLoading onClick={submitForm}>Save</ButtonLoading>
      </WindowActionsBar>
    </Window>
  );
}
