import React, { useEffect, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';
import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import { confirm } from '~/components/ConfirmAlertWithButtons';
import { DateTimePickerFormikAdapter } from '~/components/Form/DateTimePicker';
import { Input, InputFormikAdapter } from '~/components/Form/Input';
import Loading from '~/components/Loading';
import { RecurrenceEditor } from '~/components/Scheduler/RecurrenceEditor';
import { endOfDay, addMonths } from '~/helpers/date';

import { useClassContext } from '../../../data/ClassContext';
import { useSchedulerContext } from '../../../data/SchedulerContext';
import { validationSchema, getInitialValues } from './schema';
import { DateFields, LimitAndColorWrapper } from './styles';

export function ClassForm() {
  const { modal, calendars } = useSchedulerContext();
  const {
    selectedClass,
    fetchingClass,
    onSubmit,
    activities,
    fetchActivities,
    handleCloseModal,
  } = useClassContext();
  const { isEdit } = modal;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema,
    initialValues: getInitialValues({
      ...selectedClass,
      dateStart: selectedClass?.dateStart
        ? new Date(selectedClass?.dateStart)
        : null,
    }),
  });

  const { setFieldValue } = formik;

  function handleSelectFields(value, field, cb) {
    const selectedItem = cb(value);

    setFieldValue(field, selectedItem);
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

    setFieldValue('activity', {
      id: '',
      name: '',
      duration: '',
    });

    await fetchActivities(value);
  }

  const handleRecurrenceChange = useCallback(
    ({ value }) => {
      setFieldValue('recurrenceRule', value);
    },
    [setFieldValue]
  );

  function isRecurrent() {
    return Boolean(selectedClass?.recurrenceRule);
  }

  function recurrenceHasChanged(newValues, oldValues) {
    return (
      (newValues.recurrenceRule || null) !== (oldValues?.recurrenceRule || null)
    );
  }

  function askToUpdate(recurrenceIsChanged) {
    return new Promise((resolve) => {
      const buttons = [
        {
          text: 'Only this class',
          action: () => resolve({ updateFollowing: false }),
        },
        {
          text: 'This class and following',
          action: () =>
            resolve({
              updateFollowing: true,
            }),
        },
        {
          text: 'Cancel',
          color: 'secondary',
          action: () => resolve(null),
        },
      ];

      if (recurrenceIsChanged) {
        buttons.shift();
      }

      confirm(
        'Update Class',
        'Select an option to update this class',
        buttons,
        {
          closeOnEscape: false,
          closeOnClickOutside: false,
        }
      );
    });
  }

  async function handleSubmit(newValues) {
    if (isRecurrent()) {
      const isChanged = recurrenceHasChanged(newValues, selectedClass);
      const result = await askToUpdate(isChanged);
      if (!result) return null;
      return onSubmit({ ...newValues, following: result.updateFollowing });
    }

    return onSubmit(newValues);
  }

  useEffect(() => {
    if (selectedClass?.calendarId) fetchActivities(selectedClass?.calendarId);
  }, [fetchActivities, selectedClass]);

  if (fetchingClass) {
    return <Loading />;
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

        <LimitAndColorWrapper>
          <InputFormikAdapter
            formik={formik}
            name="slots"
            label="Appointment limit"
            inputOptions={{
              type: 'number',
              min: 1,
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
        </LimitAndColorWrapper>

        <RecurrenceEditor
          value={formik.values.recurrenceRule}
          onChange={handleRecurrenceChange}
          styles={{ marginBottom: '16px' }}
          disableEndNever
          maxEndAfter={180}
          maxEndOn={addMonths(endOfDay(new Date()), 6)}
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
