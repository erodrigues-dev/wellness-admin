import React, { useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';
import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import { confirm } from '~/components/ConfirmAlertWithButtons';
import { DateTimePickerFormikAdapter } from '~/components/Form/DateTimePicker';
import { InputFormikAdapter } from '~/components/Form/Input';
import { RecurrenceEditor } from '~/components/Scheduler/RecurrenceEditor';
import { useBlockContext } from '~/pages/Scheduler/data/BlockContext';

import { useSchedulerContext } from '../../../data/SchedulerContext';
import { validationSchema, getInitialValues } from './schema';

export function BlockForm() {
  const { modal, closeModal, calendars } = useSchedulerContext();
  const { onSubmit, selected } = useBlockContext();
  const { isEdit } = modal;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema,
    initialValues: getInitialValues({
      id: selected?.slotData?.id,
      dateStart: selected?.slotData?.start,
      dateEnd: selected?.slotData?.end,
      calendar: selected?.slotData?.calendar,
      recurrenceRule: selected?.slotData?.recurrenceRule,
    }),
  });

  const { setFieldValue } = formik;

  function isChanged(newValues, oldValues) {
    return (
      newValues.calendar?.id !== oldValues?.calendar?.id ||
      newValues.dateStart.getTime() !==
        new Date(oldValues?.dateStart).getTime() ||
      newValues.dateEnd.getTime() !== new Date(oldValues?.dateEnd).getTime() ||
      (newValues.recurrenceRule || null) !== (oldValues?.recurrenceRule || null)
    );
  }

  function isRecurrent() {
    return Boolean(selected?.slotData?.recurrenceRule);
  }

  function askToUpdate() {
    return new Promise((resolve) => {
      const originalDate = selected.slotData.start;
      confirm(
        'Update recurrent block',
        'Select an option to update this recurrent block',
        [
          {
            text: 'Only this block',
            action: () => resolve({ updateOnDate: originalDate }),
          },
          {
            text: 'This block and following',
            action: () =>
              resolve({
                updateOnDate: originalDate,
                updateFollowing: true,
              }),
          },
          {
            text: 'Cancel',
            color: 'secondary',
            action: () => resolve(null),
          },
        ],
        {
          closeOnEscape: false,
          closeOnClickOutside: false,
        }
      );
    });
  }

  async function handleSubmit(values) {
    if (!isChanged(values, selected?.slotData)) {
      return closeModal();
    }

    if (isRecurrent()) {
      const updateOptions = await askToUpdate();
      if (!updateOptions) return null;
      return onSubmit(values, updateOptions);
    }

    return onSubmit(values);
  }

  function handleSelectFields(value, field, cb) {
    const selectedItem = cb(value);

    formik.setFieldValue(field, selectedItem);
  }

  async function handleChangeCalendar({ target }) {
    const { value } = target;

    handleSelectFields(value, 'calendar', (id) =>
      calendars.find((x) => x.id === id)
    );
  }

  const handleRecurrenceChange = useCallback(
    ({ value }) => {
      setFieldValue('recurrenceRule', value);
    },
    [setFieldValue]
  );

  return (
    <Window
      title={`${isEdit ? 'Edit' : 'Add'} block`}
      initialWidth={600}
      initialHeight={600}
      onClose={closeModal}
    >
      <Form onSubmit={formik.handleSubmit}>
        <InputFormikAdapter
          formik={formik}
          name="calendar.id"
          label="Calendar"
          inputOptions={{
            as: 'select',
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

        <DateTimePickerFormikAdapter
          formik={formik}
          name="dateStart"
          label="Start Date"
          min={formik.values.dateEnd}
          max={formik.values.dateEnd}
        />

        <DateTimePickerFormikAdapter
          formik={formik}
          name="dateEnd"
          label="End Date"
          min={formik.values.dateStart}
          max={formik.values.dateStart}
        />

        <RecurrenceEditor
          value={formik.values.recurrenceRule}
          onChange={handleRecurrenceChange}
        />
      </Form>

      <WindowActionsBar>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <ButtonLoading onClick={formik.submitForm}>Save</ButtonLoading>
      </WindowActionsBar>
    </Window>
  );
}
