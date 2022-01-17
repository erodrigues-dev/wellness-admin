import React, { useCallback, useEffect, useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import { ButtonsRight } from '~/assets/styleds';
import Modal from '~/components/Modal';
import { clearEmptyFields } from '~/helpers/forms';
import service from '~/services/workout-profile';

import { AutoCompleteFormikAdapter } from '../../../components/AutoComplete';
import autocomplete from '../../../services/autocomplete';
import { validationSchema, initialValues } from './schema';

export function FormWorkoutProfile({
  onClose,
  isDisplay,
  isCreate,
  isEdit,
  workoutProfileId,
}) {
  const [customer, setCustomer] = useState(null);
  const [teamGroup, setTeamGroup] = useState(null);

  const { setValues, ...formik } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const fetchWorkoutProfile = useCallback(async () => {
    try {
      if (!workoutProfileId) return;
      const { data } = await service.get(workoutProfileId);
      setCustomer(data.customer);
      setTeamGroup(data.teamGroup);
      setValues(parseDataToFormValues(data));
    } catch (error) {
      toast.error('Unable to load workout profile.');
    }
  }, [setValues, workoutProfileId]);

  function parseDataToFormValues(data) {
    return {
      id: data.id,
      type: data.customerId ? 'customer' : 'team-group',
      customerId: data.customerId,
      teamGroupId: data.teamGroupId,
      age: data.age || '',
      height: data.height || '',
      weight: data.weight || '',
      goal: data.goal || '',
      test1: data.test1 || '',
      test2: data.test2 || '',
      injuriesLimitations: data.injuriesLimitations || '',
      experienceLevel: data.experienceLevel || '',
      notes: data.notes || '',
    };
  }

  async function onSubmit({ id, ...data }, { setSubmitting }) {
    try {
      const values = clearEmptyFields(data);
      if (isCreate) {
        const { data: createdItem } = await service.create(values);
        toast.success('Workout profile created with success.');
        onClose({ role: 'created', createdItem });
      }
      if (isEdit) {
        await service.update({ id, ...values });
        toast.success('Workout profile updated with success.');
        onClose({ role: 'updated' });
      }
    } catch (error) {
      toast.error(error.message);
      setSubmitting(false);
    }
  }

  useEffect(() => {
    fetchWorkoutProfile();
  }, [fetchWorkoutProfile]);

  return (
    <Modal title="Workout Profile" setClose={onClose} width="400px">
      <Form className="p-4" onSubmit={formik.handleSubmit}>
        {(isDisplay || isEdit) && (
          <p style={{ fontSize: '1.15em' }}>
            {customer?.name || teamGroup?.name}
          </p>
        )}
        {isDisplay || isEdit || (
          <>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                name="type"
                as="select"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.type && formik.errors.type}
                isValid={formik.touched.type && !formik.errors.type}
              >
                <option value="">Select</option>
                <option value="customer">Customer</option>
                <option value="team-group">Team/Group</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.type}
              </Form.Control.Feedback>
            </Form.Group>
            {formik.values.type === 'customer' && (
              <AutoCompleteFormikAdapter
                label="Customer"
                name="customerId"
                value={customer}
                formik={formik}
                itemKey="id"
                textField="name"
                onChange={setCustomer}
                onFilter={autocomplete.customers}
              />
            )}

            {formik.values.type === 'team-group' && (
              <AutoCompleteFormikAdapter
                label="Team/Group"
                name="teamGroupId"
                value={teamGroup}
                formik={formik}
                itemKey="id"
                textField="name"
                onChange={setTeamGroup}
                onFilter={autocomplete.teamGroups}
              />
            )}
          </>
        )}

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

        {formik.values.type === 'customer' && (
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
        )}

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
              as="textarea"
              rows={3}
              value={formik.values.test1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.test1 && formik.errors.test1}
              isValid={formik.touched.test1 && !formik.errors.test1}
              maxLength={1200}
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
              as="textarea"
              rows={3}
              value={formik.values.test2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.test2 && formik.errors.test2}
              isValid={formik.touched.test2 && !formik.errors.test2}
              maxLength={1200}
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
            as="textarea"
            rows={2}
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
            maxLength={1200}
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
