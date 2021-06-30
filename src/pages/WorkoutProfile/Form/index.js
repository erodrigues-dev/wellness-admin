import React, { useCallback, useEffect, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import { ButtonsRight } from '~/assets/styleds';
import Modal from '~/components/Modal';
import customerService from '~/services/customer';
import service from '~/services/workout-profile';

import { validationSchema, initialValues } from './schema';

export function FormWorkoutProfile({
  onClose,
  isDisplay,
  isCreate,
  isEdit,
  workoutProfileId,
}) {
  const [customers, setCustomers] = useState([]);
  const { setValues, ...formik } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const fetchWorkoutProfile = useCallback(async () => {
    try {
      if (!workoutProfileId) return;
      const { data } = await service.get(workoutProfileId);
      const { customer, ...values } = data;
      setCustomers([customer]);
      setValues(parseDataToFormValues(values));
    } catch (error) {
      toast.error('Unable to load workout profile.');
    }
  }, [setValues, workoutProfileId]);

  function parseDataToFormValues(data) {
    return {
      id: data.id,
      customerId: data.customerId,
      age: data.age,
      height: data.height,
      weight: data.weight,
      goal: data.goal,
      test1: data.test1,
      test2: data.test2,
      injuriesLimitations: data.injuriesLimitations,
      experienceLevel: data.experienceLevel,
      notes: data.notes,
    };
  }

  async function onSubmit({ id, ...values }, { setSubmitting }) {
    try {
      if (isCreate) {
        await service.create(values);
        toast.success('Workout profile created with success.');
      }
      if (isEdit) {
        await service.update({ id, ...values });
        toast.success('Workout profile updated with success.');
      }
      onClose('success');
    } catch (error) {
      toast.error(error.message);
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (isCreate)
      customerService.listAll().then(({ data }) => setCustomers(data));
  }, [isCreate]);

  useEffect(() => {
    fetchWorkoutProfile();
  }, [fetchWorkoutProfile]);

  return (
    <Modal title="Workout Profile" setClose={onClose}>
      <Form className="p-4" onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Customer</Form.Label>
          <Form.Control
            type="text"
            as="select"
            name="customerId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.customerId}
            isInvalid={formik.touched.customerId && formik.errors.customerId}
            isValid={formik.touched.customerId && !formik.errors.customerId}
            disabled={isDisplay || isEdit}
          >
            <option value="">Select</option>
            {customers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {formik.errors.customerId}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Experience Level</Form.Label>
          <Form.Control
            type="text"
            name="experienceLevel"
            value={formik.values.experienceLevel}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.experienceLevel && formik.errors.experienceLevel
            }
            isValid={
              formik.touched.experienceLevel && !formik.errors.experienceLevel
            }
            disabled={isDisplay}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.experienceLevel}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Form.Group as={Col} sm>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.age && formik.errors.age}
              isValid={formik.touched.age && !formik.errors.age}
              disabled={isDisplay}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.age}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} sm>
            <Form.Label>Height</Form.Label>
            <Form.Control
              type="text"
              name="height"
              value={formik.values.height}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.height && formik.errors.height}
              isValid={formik.touched.height && !formik.errors.height}
              maxLength={10}
              disabled={isDisplay}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.height}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} sm>
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="number"
              name="weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.weight && formik.errors.weight}
              isValid={formik.touched.weight && !formik.errors.weight}
              disabled={isDisplay}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.weight}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group>
          <Form.Label>Goal</Form.Label>
          <Form.Control
            type="text"
            name="goal"
            value={formik.values.goal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.goal && formik.errors.goal}
            isValid={formik.touched.goal && !formik.errors.goal}
            maxLength={60}
            disabled={isDisplay}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.goal}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Form.Group as={Col} md>
            <Form.Label>Test 1</Form.Label>
            <Form.Control
              type="text"
              name="test1"
              value={formik.values.test1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.test1 && formik.errors.test1}
              isValid={formik.touched.test1 && !formik.errors.test1}
              maxLength={60}
              disabled={isDisplay}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.test1}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md>
            <Form.Label>Test 2</Form.Label>
            <Form.Control
              type="text"
              name="test2"
              value={formik.values.test2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.test2 && formik.errors.test2}
              isValid={formik.touched.test2 && !formik.errors.test2}
              maxLength={60}
              disabled={isDisplay}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.test2}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group>
          <Form.Label>Injuries and limitations</Form.Label>
          <Form.Control
            type="text"
            name="injuriesLimitations"
            value={formik.values.injuriesLimitations}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.injuriesLimitations &&
              formik.errors.injuriesLimitations
            }
            isValid={
              formik.touched.injuriesLimitations &&
              !formik.errors.injuriesLimitations
            }
            maxLength={60}
            disabled={isDisplay}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.injuriesLimitations}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type="text"
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
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
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
