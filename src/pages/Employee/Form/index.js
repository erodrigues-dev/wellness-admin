import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import AvatarUpload from '~/components/AvatarUpload';
import ButtonLoading from '~/components/ButtonLoading';
import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import * as employeeService from '~/services/employee';
import * as profileService from '~/services/profile';

import schema from './schema';

const ModalForm = ({ title, setClose, employee, reloadEmployees }) => {
  const { sendNotification } = useNotification();
  const [file, setFile] = useState(null);
  const [profiles, setProfiles] = useState();

  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: employee?.id ?? '',
      name: employee?.name ?? '',
      email: employee?.email ?? '',
      phone: employee?.phone ?? '',
      imageUrl: employee?.imageUrl ?? '',
      profileId: employee?.profile.id ?? '',
      specialty: employee?.specialty ?? '',
    },
  });

  const listProfiles = useCallback(async () => {
    try {
      const { data } = await profileService.listAll();

      setProfiles(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification]);

  useEffect(() => {
    listProfiles();
  }, [listProfiles]);

  async function handleSubmit(data) {
    try {
      if (employee) {
        await employeeService.update({ ...data, file });
      } else {
        await employeeService.create({ ...data, file });
      }

      sendNotification('Employee saved successfully');
      setClose();
      reloadEmployees();
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  return (
    <Modal title={title} setClose={setClose}>
      <Form onSubmit={formik.handleSubmit} className="modal-form">
        <div className="form-wrapper">
          <AvatarUpload
            imageUrl={formik.values.imageUrl}
            handleFile={setFile}
          />
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="ex: yourname@email.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && formik.errors.email}
              isValid={formik.touched.email && !formik.errors.email}
              disabled={!!employee}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              placeholder="ex: 555 111 222"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.phone && formik.errors.phone}
              isValid={formik.touched.phone && !formik.errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Profile</Form.Label>
            <Form.Control
              as="select"
              custom
              name="profileId"
              value={formik.values.profileId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.profileId && formik.errors.profileId}
              isValid={formik.touched.profileId && !formik.errors.profileId}
            >
              <option value="" disabled>
                Select an option
              </option>
              {profiles?.map((profile) => {
                return (
                  <option key={profile.id} value={profile.id}>
                    {profile.name}
                  </option>
                );
              })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.profileId}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Specialty</Form.Label>
            <Form.Control
              placeholder="ex: Admin"
              name="specialty"
              value={formik.values.specialty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.specialty && formik.errors.specialty}
              isValid={formik.touched.specialty && !formik.errors.specialty}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.specialty}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
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

export default ModalForm;
