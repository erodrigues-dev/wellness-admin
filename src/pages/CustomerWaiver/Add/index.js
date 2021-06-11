import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import ButtonLoading from '~/components/ButtonLoading';
import Modal from '~/components/Modal';
import service from '~/services/customerWaiver';
import waiverService from '~/services/waiver';

const validationSchema = Yup.object({
  waiverId: Yup.number().required(),
});

export const CustomerWaiverAdd = ({
  customerId,
  onClose,
  onRefresh = () => {},
}) => {
  const [waivers, setWaivers] = useState([]);

  const formik = useFormik({
    initialValues: {
      waiverId: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit({ waiverId }, { setSubmitting }) {
    try {
      await service.add(customerId, waiverId);
      toast.success('Associate waiver in customer account with success');
      onRefresh();
      onClose();
    } catch (error) {
      toast.error(error.message);
      setSubmitting(false);
    }
  }

  useEffect(() => {
    waiverService
      .listAll()
      .then(({ data }) => setWaivers(data))
      .catch(() => {});
  }, []);

  return (
    <Modal setClose={onClose} title="Add Waiver">
      <Form onSubmit={formik.handleSubmit} className="modal-form">
        <div className="form-wrapper">
          <Form.Group>
            <Form.Label>Waiver</Form.Label>
            <Form.Control
              as="select"
              custom
              name="waiverId"
              value={formik.values.waiverId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={Boolean(
                formik.touched.waiverId && formik.errors.waiverId
              )}
              isValid={Boolean(
                formik.touched.waiverId && !formik.errors.waiverId
              )}
              feedback="teste"
            >
              <option value="">Select an option</option>
              {waivers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </Form.Control>
            {/* <Form.Control.Feedback type="invalid">
              {formik.errors.waiverId}
            </Form.Control.Feedback> */}
          </Form.Group>
        </div>
        <div className="buttons">
          <Form.Row className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="mr-2"
              onClick={() => onClose(false)}
            >
              Cancel
            </Button>
            <ButtonLoading
              type="submit"
              disabled={!formik.isValid}
              loading={formik.isSubmitting}
            >
              Save
            </ButtonLoading>
          </Form.Row>
        </div>
      </Form>
    </Modal>
  );
};
