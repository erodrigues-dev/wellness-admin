import React, { useCallback, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Modal from '~/components/Modal';
import autocomplete from '~/services/autocomplete';
import { get, create, update } from '~/services/team-group';

const initialValues = {
  name: '',
};

const validationSchema = Yup.object({
  name: Yup.string().max(120).required(),
});

export const FormTeamGroup = ({ id, isDisplay, onClose, onSave }) => {
  const [membersData, setMembersData] = useState({
    data: [],
    value: [],
    loading: false,
    timeout: null,
  });

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

  const handleChangeMembers = ({ value }) => {
    setMembersData((state) => ({ ...state, value }));
  };

  const handleFilterMembers = useCallback(
    ({ filter }) => {
      clearTimeout(membersData.timeout);
      const timeout = setTimeout(() => {
        autocomplete
          .customers(filter.value)
          .then(({ data }) => {
            setMembersData((state) => ({
              ...state,
              data,
              loading: false,
            }));
          })
          .catch(() => {
            toast.error('Unable to list members');
          });
      }, 500);

      setMembersData((state) => ({
        ...state,
        loading: true,
        data: [],
        timeout,
        filter: filter.value,
      }));
    },
    [membersData.timeout]
  );

  useEffect(() => {
    if (!id) return;
    get(id)
      .then(({ data }) =>
        setValues({
          name: data.name,
        })
      )
      .catch(() => toast.error('An unexpected error has occurred'));
  }, [id, setValues]);

  return (
    <Modal title="Team/Group" setClose={onClose}>
      <Form onSubmit={formik.handleSubmit} className="p-4">
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

        <Form.Group>
          <Form.Label>Members</Form.Label>
          <MultiSelect
            textField="name"
            dataItemKey="id"
            data={membersData.data}
            loading={membersData.loading}
            value={membersData.value}
            filter={membersData.filter}
            onFocus={() => handleFilterMembers({ filter: { value: '' } })}
            onBlur={() => setMembersData((state) => ({ ...state, filter: '' }))}
            onChange={handleChangeMembers}
            onFilterChange={handleFilterMembers}
            popupSettings={{ className: 'z-index-in-modal' }}
            filterable
          />
        </Form.Group>

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
