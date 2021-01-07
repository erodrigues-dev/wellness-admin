import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import { currency } from '~/helpers/intl';
import masks from '~/helpers/masks';
import { sanitize } from '~/helpers/sanitize';
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
      id: isAdd ? '' : selected.id,
      customerId: isAdd ? id : selected.customerId,
      relationType: isAdd ? '' : selected.relationType,
      relationId: isAdd ? '' : selected.relationId,
      type: isAdd ? '' : selected.type,
      value: isAdd ? '' : selected.value,
      relationPrice: isAdd ? '' : selected.relationPrice,
    },
  });

  const listCustomers = useCallback(async () => {
    if (!id) {
      try {
        const { data } = await customerService.listAll();

        setCustomers(data);
      } catch (error) {
        sendNotification(error.message, false);
      }
    }
  }, [id, sendNotification]);

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
      const { data } = await packageService.listAll();

      setPackages(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification]);

  useEffect(() => {
    listCustomers();
  }, [listCustomers]);

  useEffect(() => {
    if (
      formik.values.relationType &&
      formik.values.relationType === 'activity' &&
      activities === undefined
    )
      listActivities();
  }, [formik.values.relationType, listActivities, activities]);

  useEffect(() => {
    if (
      formik.values.relationType &&
      formik.values.relationType === 'package' &&
      packages === undefined
    )
      listPackages();
  }, [formik.values.relationType, listPackages, packages]);

  async function handleSubmit(data) {
    const submitValue = { ...data, value: sanitize.number(data.value) };

    try {
      if (isAdd) {
        await service.create(submitValue);
      } else {
        await service.update(submitValue);
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
  }

  function handleType(e) {
    const { id: inputId } = e.target;
    formik.setFieldValue('type', inputId);
    formik.setFieldValue('value', '');
  }

  function handleValue(e) {
    const { value } = e.target;
    if (formik.values.type === 'amount') {
      formik.setFieldValue('value', masks.price(e));
    } else if (value <= 100) {
      formik.setFieldValue('value', masks.duration(e));
    }
  }

  function handleSelectRelation(e) {
    const { value } = e.target;
    formik.setFieldValue('relationId', value);

    const relationType =
      formik.values.relationType === 'package' ? packages : activities;

    const relation = relationType?.find((item) => item.id === Number(value));

    formik.setFieldValue('relationPrice', relation?.price);
  }

  function relationTypeName(type) {
    let name = 'Activity/Package';

    if (type === 'activity') {
      name = 'Activity';
    } else if (type === 'package') {
      name = 'Package';
    }

    return name;
  }

  function typeName(type) {
    let name = 'Amount/Percent';

    if (type === 'amount') {
      name = 'Amount ($)';
    } else if (type === 'percent') {
      name = 'Percent (%)';
    }

    return name;
  }

  return (
    <Modal setClose={setClose} title={`${isAdd ? 'Add' : 'Edit'} Discount`}>
      <Form onSubmit={formik.handleSubmit} className="modal-form">
        <div className="form-wrapper">
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
                isInvalid={
                  formik.touched.customerId && formik.errors.customerId
                }
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
              isValid={
                formik.touched.relationType && !formik.errors.relationType
              }
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
              isValid={
                formik.touched.relationType && !formik.errors.relationType
              }
            />
            {formik.touched.relationType && formik.errors.relationType && (
              <Feedback type="invalid" style={{ display: 'block' }}>
                {formik.errors.relationType}
              </Feedback>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>
              {relationTypeName(formik.values.relationType)}
            </Form.Label>
            <Form.Control
              as="select"
              custom
              name="relationId"
              value={formik.values.relationId}
              onChange={handleSelectRelation}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.relationId && formik.errors.relationId}
              isValid={formik.touched.relationId && !formik.errors.relationId}
              disabled={
                !formik.values.relationType &&
                (activities === undefined || packages === undefined)
              }
            >
              <option value="" disabled>
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
          {formik.values.relationPrice && (
            <p className="mt-1">
              {relationTypeName(formik.values.relationType)} Price:{' '}
              {currency.format(formik.values.relationPrice)}
            </p>
          )}
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
            {formik.touched.type && formik.errors.type && !formik.values.type && (
              <Feedback type="invalid" style={{ display: 'block' }}>
                {formik.errors.type}
              </Feedback>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>{typeName(formik.values.type)}</Form.Label>
            <Form.Control
              placeholder={typeName(formik.values.type)}
              name="value"
              value={formik.values.value}
              onChange={handleValue}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.value && formik.errors.value}
              isValid={formik.touched.value && !formik.errors.value}
              disabled={!formik.values.type || !formik.values.relationId}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.value}
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
