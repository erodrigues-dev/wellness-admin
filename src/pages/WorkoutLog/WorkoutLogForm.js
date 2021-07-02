import React, { useEffect, useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import { ButtonsRight } from '~/assets/styleds';
import Modal from '~/components/Modal';
import service from '~/services/workout-log';

import InputDatePicker from '../../components/InputDatePicker';
import { initialValues, validationSchema } from './schema';

export function WorkoutLogForm({
  workoutLogId,
  workoutProfileId,
  isCreate,
  isEdit,
  isDisplay,
  onClose,
}) {
  const { setValues, ...formik } = useFormik({
    initialValues: { ...initialValues, workoutProfileId },
    validationSchema,
    onSubmit,
  });

  const fetchWorkoutLog = useCallback(async () => {
    try {
      if (!workoutLogId) return;
      const { data } = await service.get(workoutLogId);
      setValues({
        id: data.id,
        workoutProfileId: data.workoutProfileId,
        resume: data.resume,
        date: data.date,
        notes: data.notes,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, [setValues, workoutLogId]);

  async function onSubmit({ id, ...values }, { setSubmiting }) {
    try {
      if (isDisplay) return;

      if (isCreate) {
        await service.create(values);
        toast.success('Workout Log created with success.');
      }
      if (isEdit) {
        await service.update({ id, ...values });
        toast.success('Workout Log updated with success.');
      }
      onClose('success');
    } catch (error) {
      toast.error(error.message);
      setSubmiting(false);
    }
  }

  useEffect(() => {
    fetchWorkoutLog();
  }, [fetchWorkoutLog]);

  return (
    <Modal setClose={onClose} title="Workout Log">
      <Form className="p-4" onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Resume</Form.Label>
          <Form.Control
            type="text"
            name="resume"
            value={formik.values.resume}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.resume && formik.errors.resume}
            isValid={formik.touched.resume && !formik.errors.resume}
            disabled={isDisplay}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.resume}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Date</Form.Label>
          <InputDatePicker
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.date && formik.errors.date}
            isValid={formik.touched.date && !formik.errors.date}
            feedback={formik.errors.date}
            disabled={isDisplay}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.notes && formik.errors.notes}
            isValid={formik.touched.notes && !formik.errors.notes}
            disabled={isDisplay}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.notes}
          </Form.Control.Feedback>
        </Form.Group>

        <ButtonsRight>
          <Button onClick={onClose}>Cancel</Button>
          {isDisplay || (
            <Button
              variant="secondary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Save
            </Button>
          )}
        </ButtonsRight>
      </Form>
    </Modal>
  );
}
