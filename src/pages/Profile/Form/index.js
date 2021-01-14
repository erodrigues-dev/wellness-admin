import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import Modal from '~/components/Modal';
import useAuth from '~/contexts/auth';

import { Container } from './styles';

const ProfileForm = ({ setClose }) => {
  const { permissions } = useAuth();
  const [groups] = useState(
    permissions.filter((item) => item.subgroup === undefined)
  );
  const [subgroups] = useState(
    permissions.filter((item) => item.subgroup !== undefined)
  );

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: {
      name: '',
      description: '',
    },
  });

  function handleSubmit() {}

  return (
    <Modal title="New Profile" setClose={setClose}>
      <Form onSubmit={formik.handleSubmit} className="modal-form">
        <Container className="form-wrapper">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="ex: Profile 1"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
              isValid={formik.touched.name && !formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="ex: Some description here"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.description && formik.errors.description
              }
              isValid={formik.touched.description && !formik.errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <ul>
              <h1>Permissions</h1>
              {groups.map((permission, index) => {
                return (
                  <li>
                    {permission.group !== groups[index - 1]?.group && (
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {permission.group}
                      </h3>
                    )}
                    <Form.Check
                      key={permission.id}
                      custom
                      inline
                      className="text-nowrap"
                      type="checkbox"
                      label={permission.name}
                      id={permission.id}
                      name="saveCard"
                      onChange={formik.handleChange}
                    />
                    <br />
                  </li>
                );
              })}
              <h2 className="settings">Settings</h2>
              {subgroups.map((permission, index) => {
                return (
                  <li>
                    {permission.subgroup !== subgroups[index - 1]?.subgroup && (
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {permission.subgroup}
                      </h3>
                    )}
                    <Form.Check
                      key={permission.id}
                      custom
                      inline
                      className="text-nowrap"
                      type="checkbox"
                      label={permission.name}
                      id={permission.id}
                      name="saveCard"
                      onChange={formik.handleChange}
                    />
                    <br />
                  </li>
                );
              })}
            </ul>
          </Form.Group>
        </Container>
        <div className="buttons">
          <Form.Row className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="mr-2"
              onClick={() => setClose(false)}
            >
              Cancel
            </Button>
            <ButtonLoading type="submit">Save</ButtonLoading>
          </Form.Row>
        </div>
      </Form>
    </Modal>
  );
};

export default ProfileForm;
