import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Modal from '~/components/Modal';
import { get, create, update } from '~/services/team-group';

import { MembersField } from './MembersField';

const initialValues = {
  name: '',
  members: [],
};

const validationSchema = Yup.object({
  name: Yup.string().max(120).required(),
  members: Yup.array(Yup.number()).required().min(1),
});

export const FormTeamGroup = ({ id, isDisplay, onClose, onSave }) => {
  const [members, setMembers] = useState([]);

  const onSubmit = async (values, { setIsSubmiting }) => {
    try {
      if (isDisplay) return;
      if (id) await update({ id, ...values });
      else create(values);
      onSave();
      onClose();
      toast.success('Team/Group saved with succes');
    } catch (error) {
      toast.error(error.message);
      setIsSubmiting(false);
    }
  };

  const { setValues, ...formik } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!id) return;
    get(id)
      .then(({ data }) => {
        setValues({
          name: data.name,
          members: data.members.map((x) => x.id),
        });
        setMembers(data.members);
      })
      .catch(() => toast.error('An unexpected error has occurred'));
  }, [id, setValues]);

  return (
    <Modal title="Team/Group" setClose={onClose}>
      <Form onSubmit={formik.handleSubmit} className="p-4" noValidate>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={Boolean(formik.touched.name && formik.errors.name)}
            isValid={Boolean(formik.touched.name && !formik.errors.name)}
            disabled={isDisplay}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <MembersField
          disabled={isDisplay}
          value={members}
          onChange={(value) => {
            setMembers(value);
            formik.setFieldValue(
              'members',
              value.map((x) => x.id)
            );
          }}
          onBlur={() => formik.setFieldTouched('members')}
          isValid={!(formik.touched.members && formik.errors.members)}
          error={formik.errors.members}
        />

        <div className="d-flex justify-content-end">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          {isDisplay || (
            <Button
              variant="secondary"
              className="ml-2"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Save
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
};
