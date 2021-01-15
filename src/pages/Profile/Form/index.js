import React, { useCallback, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import * as domainService from '~/services/domain';
import * as profileService from '~/services/profile';

import schema from './schema';
import { Container } from './styles';

const ProfileForm = ({ profileId, setClose, reloadProfiles }) => {
  const { sendNotification } = useNotification();
  const [groups, setGroups] = useState([]);
  const [subgroups, setSubgroups] = useState([]);
  const [profile, setProfile] = useState();

  const { setValues, ...formik } = useFormik({
    onSubmit: handleSubmit,
    validationSchema: schema,
    initialValues: {
      name: '',
      description: '',
      permissions: 0,
    },
  });

  const handleGroups = useCallback((data) => {
    setGroups(data.filter((item) => item.subgroup === undefined));
    setSubgroups(data.filter((item) => item.subgroup !== undefined));
  }, []);

  const saveProfile = useCallback(
    async (data) => {
      try {
        if (!profile) {
          await profileService.create(data);
        } else {
          await profileService.update(data);
        }

        toast.success('Profile saved successfully');
      } catch (error) {
        sendNotification(error.message, false);
      }

      reloadProfiles();
      setClose(false);
    },
    [sendNotification, profile, setClose, reloadProfiles]
  );

  const listPermissions = useCallback(async () => {
    try {
      const { data } = await domainService.listPermissions();

      handleGroups(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification, handleGroups]);

  const getProfile = useCallback(
    async (id) => {
      try {
        const { data } = await profileService.get(id);

        setProfile(data);
        handleGroups(data.permissions);
        const permissions = data.permissions
          .filter((item) => item.hasPermission)
          .map((item) => item.id)
          .reduce((cur, acc) => cur + acc);
        setValues({
          id: data.id,
          name: data.name,
          description: data.description,
          permissions,
        });
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [sendNotification, handleGroups, setValues]
  );

  useEffect(() => {
    if (!profileId) listPermissions();
    else getProfile(profileId);
  }, [profileId, getProfile, listPermissions]);

  function handleSubmit(data) {
    saveProfile(data);
  }

  function handlePermissionChange(e) {
    const { id, name, checked } = e.target;

    formik.setFieldValue(
      name,
      checked
        ? formik.values.permissions + Number(id)
        : formik.values.permissions - Number(id)
    );
  }

  return (
    <Modal title={`${!profileId ? 'New' : 'Edit'} Profile`} setClose={setClose}>
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
              {formik.touched.permissions && formik.errors.permissions && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: 'block', fontWeight: 'normal' }}
                >
                  {formik.errors.permissions}
                </Form.Control.Feedback>
              )}
              {groups.map((permission, index) => {
                return (
                  <li key={permission.id}>
                    {permission.group !== groups[index - 1]?.group && (
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {permission.group}
                      </h3>
                    )}
                    <Form.Check
                      custom
                      inline
                      name="permissions"
                      className="text-nowrap"
                      type="checkbox"
                      label={permission.name}
                      id={permission.id}
                      defaultChecked={permission.hasPermission}
                      onChange={handlePermissionChange}
                    />
                    <br />
                  </li>
                );
              })}
              <h2 className="settings">Settings</h2>
              {subgroups.map((permission, index) => {
                return (
                  <li key={permission.id}>
                    {permission.subgroup !== subgroups[index - 1]?.subgroup && (
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {permission.subgroup}
                      </h3>
                    )}
                    <Form.Check
                      custom
                      inline
                      name="permissions"
                      className="text-nowrap"
                      type="checkbox"
                      label={permission.name}
                      id={permission.id}
                      onChange={handlePermissionChange}
                      defaultChecked={permission.hasPermission}
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
