import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';
import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import { DateTimePickerFormikAdapter } from '~/components/Form/DateTimePicker';
import { Input, InputFormikAdapter } from '~/components/Form/Input';
import { RecurrenceEditor } from '~/components/Scheduler/RecurrenceEditor';

import { useClassContext } from '../../data/ClassContext';
import { useSchedulerContext } from '../../data/SchedulerContext';
import { validationSchema, getInitialValues } from './schema';
import { DateFields } from './styles';

export function ClassFormModal() {
  const {
    modal: { type, isOpen },
  } = useSchedulerContext();

  if (type === 'class' && isOpen) {
    return <ClassFormComponent />;
  }

  return null;
}

function ClassFormComponent() {
  const { modal, closeModal, calendars } = useSchedulerContext();
  const { onSubmit, activities, fetchActivities } = useClassContext();
  const { isEdit } = modal;

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: getInitialValues(),
  });

  function handleCloseModal() {
    closeModal();
  }

  function handleSelectFields(value, field, cb) {
    const selectedItem = cb(value);

    formik.setFieldValue(field, selectedItem);
  }

  function handleChangeActivity({ target }) {
    handleSelectFields(target.value, 'activity', (value) =>
      activities?.list?.find((x) => x.id === Number(value))
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

  return (
    <Window
      title={`${isEdit ? 'Edit' : 'Add'} class`}
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
              isEdit || activities.loading || !formik.values.calendar?.id,
          }}
          onChange={handleChangeActivity}
          loading={activities.loading}
        >
          <option value="" disabled>
            Select
          </option>
          {activities?.list?.map((activity) => (
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

        <RecurrenceEditor
          onChange={() => {}}
          styles={{ marginBottom: '16px' }}
        />

        <InputFormikAdapter
          formik={formik}
          name="appointmentLimit"
          label="Appointment limit"
          inputOptions={{
            type: 'number',
          }}
        />

        <InputFormikAdapter
          formik={formik}
          name="color"
          label="Color"
          inputOptions={{
            type: 'color',
          }}
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
        <ButtonLoading onClick={formik.submitForm}>Save</ButtonLoading>
      </WindowActionsBar>
    </Window>
  );
}
