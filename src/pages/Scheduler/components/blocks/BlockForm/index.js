import React, { useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';

import { Window, WindowActionsBar } from '@progress/kendo-react-dialogs';
import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import { DateTimePickerFormikAdapter } from '~/components/Form/DateTimePicker';
import { InputFormikAdapter } from '~/components/Form/Input';
import { RecurrenceEditor } from '~/components/Scheduler/RecurrenceEditor';
import { useBlockContext } from '~/pages/Scheduler/data/BlockContext';

import { useSchedulerContext } from '../../../data/SchedulerContext';
import { validationSchema, getInitialValues } from './schema';

export function BlockForm() {
  const { modal, closeModal, calendars } = useSchedulerContext();
  const { onSubmit, selected } = useBlockContext();
  const { selectedClass, isEdit } = modal;

  const formik = useFormik({
    onSubmit,
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
            disabled: isEdit || selectedClass,
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
          disabled
        />

        <DateTimePickerFormikAdapter
          formik={formik}
          name="dateEnd"
          label="End Date"
          disabled
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
