import React, { useEffect, useCallback } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import { ButtonsRight } from '~/assets/styleds';
import Modal from '~/components/Modal';
import { clearEmptyFields } from '~/helpers/forms';
import service from '~/services/workout-exercise';

import { initialValues, validationSchema } from './schema';

export function WorkoutLogExerciseForm({
  workoutLogId,
  workoutExerciseId,
  isCreate,
  isEdit,
  isDisplay,
  onClose,
}) {
  const { setValues, ...formik } = useFormik({
    initialValues: { ...initialValues, workoutLogId },
    validationSchema,
    onSubmit,
  });

  const fetchExercise = useCallback(async () => {
    try {
      if (!workoutExerciseId) return;
      const { data } = await service.get(workoutExerciseId);
      delete data.createdAt;
      delete data.updatedAt;
      setValues(data);
    } catch (error) {
      toast.error(error.message);
    }
  }, [setValues, workoutExerciseId]);

  async function onSubmit(data, { setSubmiting }) {
    try {
      const { id, ...values } = clearEmptyFields(data);

      if (isDisplay) return;

      if (isCreate) {
        await service.create(values);
        toast.success('Exercise created with success.');
      }
      if (isEdit) {
        await service.update({ id, ...values });
        toast.success('Exercise updated with success.');
      }
      onClose('success');
    } catch (error) {
      toast.error(error.message);
      setSubmiting(false);
    }
  }

  function makeSets() {
    const getName = (set, name) => `set${set}${name}`;

    return [1, 2, 3, 4].map((set) => (
      <Row key={set}>
        <Form.Group as={Col}>
          <Form.Label>Reps (set {set})</Form.Label>
          <Form.Control
            type="number"
            name={getName(set, 'Reps')}
            value={formik.values[getName(set, 'Reps')]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched[getName(set, 'Reps')] &&
              formik.errors[getName(set, 'Reps')]
            }
            isValid={
              formik.touched[getName(set, 'Reps')] &&
              !formik.errors[getName(set, 'Reps')]
            }
            disabled={isDisplay}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors[getName(set, 'Reps')]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Weight (set {set})</Form.Label>
          <Form.Control
            type="number"
            name={getName(set, 'Weight')}
            value={formik.values[getName(set, 'Weight')]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched[getName(set, 'Weight')] &&
              formik.errors[getName(set, 'Weight')]
            }
            isValid={
              formik.touched[getName(set, 'Weight')] &&
              !formik.errors[getName(set, 'Weight')]
            }
            disabled={isDisplay}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors[getName(set, 'Weight')]}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    ));
  }

  useEffect(() => {
    fetchExercise();
  }, [fetchExercise]);

  return (
    <Modal setClose={onClose} title="Workout Exercise">
      <Form className="p-4" onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && formik.errors.name}
            isValid={formik.touched.name && !formik.errors.name}
            disabled={isDisplay}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {makeSets()}

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
