import React from 'react';

import { TimePicker } from '@progress/kendo-react-dateinputs';
import { FormElement, Field } from '@progress/kendo-react-form';

import { RecurrenceEditor } from '~/components/Scheduler/RecurrenceEditor';
import { StatusEditor } from '~/components/Scheduler/StatusEditor';

export function CustomEditor() {
  return (
    <FormElement>
      <div className="k-form-field">
        <Field
          name="status"
          label="Status"
          component={StatusEditor}
          as={StatusEditor}
        />
      </div>

      <div className="k-form-field">
        <Field label="Start time" name="start" component={TimePicker} />
      </div>

      <div className="k-form-field">
        <Field label="End time" name="end" component={TimePicker} />
      </div>

      <div className="k-form-field">
        <Field
          name="recurrenceRule"
          displayName="Recurrence"
          component={RecurrenceEditor}
          as={RecurrenceEditor}
        />
      </div>
    </FormElement>
  );
}
