import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import masks from '~/helpers/masks';
import * as activityService from '~/services/activity';
import * as customerService from '~/services/customer';
import * as service from '~/services/discount';
import * as packageService from '~/services/package';

import schema from './schema';

const ModalForm = ({ setClose, reloadList, selected }) => {
  const isAdd = !selected;
  const { id: routeId } = useParams();
  const id = routeId || '';
  const { sendNotification } = useNotification();
  const [customers, setCustomers] = useState();
  const [activities, setActivities] = useState();
  const [packages, setPackages] = useState();

  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: isAdd ? 0 : selected.id,
      customerId: isAdd ? id : selected.customerId,
      relationType: isAdd ? '' : selected.relationType,
      relationId: isAdd ? 0 : selected.relationId,
      type: isAdd ? '' : selected.type,
      value: isAdd ? '' : selected.value,
    },
  });

  const listCustomers = useCallback(async () => {
    try {
      const { data } = await customerService.index();

      setCustomers(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification]);

  const listActivities = useCallback(async () => {
    try {
      const { data } = await activityService.listAll();

      setActivities(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification]);

  const listPackages = useCallback(async () => {
    try {
      const { data } = await packageService.default.index();

      setPackages(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification]);

  useEffect(() => {
    listCustomers();
  }, [listCustomers]);
  useEffect(() => {
    if (formik.values.relationType === 'activity') listActivities();
  }, [formik.values.relationType, listActivities]);
  useEffect(() => {
    if (formik.values.relationType === 'package') listPackages();
  }, [formik.values.relationType, listPackages]);

  async function handleSubmit(data) {
    try {
      if (isAdd) {
        await service.create(data);
      } else {
        await service.update(data);
      }

      reloadList();
      setClose(false);
      toast.success(`Discount ${isAdd ? 'created' : 'edited'} successfully.`);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  function handleRelationType(e) {
    const { id: inputId } = e.target;
    formik.setFieldValue('relationType', inputId);
    formik.setFieldValue('relationId', 0);

    if (inputId === 'package' && packages === undefined) {
      listPackages();
    }

    if (inputId === 'activity' && activities === undefined) {
      listActivities();
    }
  }

  function handleType(e) {
    const { id: inputId } = e.target;
    formik.setFieldValue('type', inputId);
    formik.setFieldValue('value', '');
  }

  function handleValue(e) {
    if (formik.values.type === 'amount') {
      formik.setFieldValue('value', masks.price(e));
    } else {
      formik.setFieldValue('value', masks.duration(e));
    }
  }

  return (
    <Modal setClose={setClose} title={`${isAdd ? 'Add' : 'Edit'} Discount`}>
      <Form onSubmit={formik.handleSubmit}>
        {!id && (
          <Form.Group>
            <Form.Label>Customer</Form.Label>
            <Form.Control
              as="select"
              custom
              name="customerId"
              value={formik.values.customerId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.customerId && formik.errors.customerId}
              isValid={formik.touched.customerId && !formik.errors.customerId}
            >
              <option value="" disabled>
                Select an option
              </option>
              {customers?.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.customerId}
            </Form.Control.Feedback>
          </Form.Group>
        )}
        <Form.Group>
          <Form.Check
            custom
            inline
            type="radio"
            label="Package"
            id="package"
            name="relationType"
            checked={formik.values.relationType === 'package'}
            value={formik.values.relationType}
            onChange={handleRelationType}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.relationType && formik.errors.relationType
            }
            isValid={formik.touched.relationType && !formik.errors.relationType}
          />
          <Form.Check
            custom
            inline
            type="radio"
            label="Activity"
            id="activity"
            name="relationType"
            checked={formik.values.relationType === 'activity'}
            value={formik.values.relationType}
            onChange={handleRelationType}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.relationType && formik.errors.relationType
            }
            isValid={formik.touched.relationType && !formik.errors.relationType}
          />
          <Feedback type="invalid">{formik.errors.relationType}</Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            {formik.values.relationType === 'activity' ? 'Activity' : 'Package'}
          </Form.Label>
          <Form.Control
            as="select"
            custom
            name="relationId"
            value={formik.values.relationId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.relationId && formik.errors.relationId}
            isValid={formik.touched.relationId && !formik.errors.relationId}
            disabled={
              !formik.values.relationType &&
              (activities === undefined || packages === undefined)
            }
          >
            <option value={0} disabled>
              Select an option
            </option>
            {formik.values.relationType === 'activity'
              ? activities?.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))
              : packages?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {formik.errors.relationId}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Check
            custom
            inline
            type="radio"
            label="Percent"
            id="percent"
            name="type"
            checked={formik.values.type === 'percent'}
            value={formik.values.type}
            onChange={handleType}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.type && formik.errors.type}
            isValid={formik.touched.type && !formik.errors.type}
          />
          <Form.Check
            custom
            inline
            type="radio"
            label="Amount"
            id="amount"
            name="type"
            checked={formik.values.type === 'amount'}
            value={formik.values.type}
            onChange={handleType}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.type && formik.errors.type}
            isValid={formik.touched.type && !formik.errors.type}
          />
          <Feedback type="invalid">{formik.errors.type}</Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            {formik.values.type === 'amount' ? 'Amount' : 'Percent'}
          </Form.Label>
          <Form.Control
            placeholder={formik.values.type === 'amount' ? 'Amount' : 'Percent'}
            name="value"
            value={formik.values.value}
            onChange={handleValue}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.value && formik.errors.value}
            isValid={formik.touched.value && !formik.errors.value}
            disabled={!formik.values.type}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.value}
          </Form.Control.Feedback>
        </Form.Group>

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
      </Form>
    </Modal>
  );
};

export default ModalForm;