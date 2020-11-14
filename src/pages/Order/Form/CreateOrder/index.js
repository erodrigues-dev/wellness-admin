import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import InputDatePicker from '~/components/InputDatePicker';
import useNotification from '~/contexts/notification';
import * as activityService from '~/services/activity';
import * as customerService from '~/services/customer';
import * as discountService from '~/services/discount';
import * as packageService from '~/services/package';

import OrderSummary from '../OrderSummary';
import schema from './schema';

const CreateOrder = ({ setClose, setPage, setOrder }) => {
  const { id } = useParams();
  const { sendNotification } = useNotification();
  const [activities, setActivities] = useState();
  const [packages, setPackages] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [customers, setCustomers] = useState();
  const [discount, setDiscount] = useState(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const [minDate] = useState(new Date());
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      customerId: id || '',
      itemType: '',
      item: '',
      quantity: 1,
      date: '',
    },
  });

  const findDiscount = useCallback(
    async (customerId, itemType, itemId) => {
      if (!itemType || !itemId || !customerId) return;
      try {
        const { data } = await discountService.find(
          customerId,
          itemType,
          itemId
        );

        setDiscount(data);
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [sendNotification]
  );

  useEffect(() => {
    findDiscount(
      formik.values.customerId,
      formik.values.itemType,
      formik.values.item
    );
  }, [
    formik.values.item,
    formik.values.itemType,
    formik.values.customerId,
    findDiscount,
  ]);

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
      formik.values.itemType &&
      formik.values.itemType === 'activity' &&
      activities === undefined
    )
      listActivities();
  }, [formik.values.itemType, listActivities, activities]);

  useEffect(() => {
    if (
      formik.values.itemType &&
      formik.values.itemType === 'package' &&
      packages === undefined
    )
      listPackages();
  }, [formik.values.itemType, listPackages, packages]);

  function handleItemType(e) {
    const { id: inputId } = e.target;
    setDiscount(null);
    setSelectedItem(null);
    formik.setFieldValue('itemType', inputId);
    formik.setFieldValue('item', '');
  }

  function handleItemSelect(e) {
    formik.setFieldValue('item', e.target.value);

    setSelectedItem(
      formik.values.itemType === 'activity'
        ? activities.find((item) => item.id === Number(e.target.value))
        : packages.find((item) => item.id === Number(e.target.value))
    );
  }

  function handleSubmit(data) {
    setOrder({ ...data, item: selectedItem });
    setPage(selectedPage);
  }

  return (
    <Form onSubmit={formik.handleSubmit} className="modal-form">
      <div className="form-wrapper">
        {id === undefined && (
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
              {customers?.map((customer) => {
                return (
                  <option value={customer.id} key={customer.id}>
                    {customer.name}
                  </option>
                );
              })}
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
            name="itemType"
            checked={formik.values.itemType === 'package'}
            value={formik.values.itemType}
            onChange={(e) => handleItemType(e)}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.itemType && formik.errors.itemType}
            isValid={formik.touched.itemType && !formik.errors.itemType}
          />
          <Form.Check
            custom
            inline
            type="radio"
            label="Activity"
            id="activity"
            name="itemType"
            checked={formik.values.itemType === 'activity'}
            value={formik.values.itemType}
            onChange={(e) => handleItemType(e)}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.itemType && formik.errors.itemType}
            isValid={formik.touched.itemType && !formik.errors.itemType}
          />
          <Feedback type="invalid">{formik.errors.itemType}</Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            {formik.values.itemType === 'activity'
              ? 'Activity'
              : formik.values.itemType === 'package'
              ? 'Package'
              : 'Activity/Package'}
          </Form.Label>
          {/* {console.log(formik.values.item)} */}
          <Form.Control
            as="select"
            custom
            name="item"
            value={formik.values.item}
            // onChange={formik.handleChange}
            onChange={handleItemSelect}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.item && formik.errors.item}
            isValid={formik.touched.item && !formik.errors.item}
            disabled={!formik.values.itemType}
          >
            <option value="" disabled>
              Select an option
            </option>
            {formik.values.itemType === 'activity'
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
            {formik.errors.item}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.quantity && formik.errors.quantity}
            isValid={formik.touched.quantity && !formik.errors.quantity}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.quantity}
          </Form.Control.Feedback>
        </Form.Group>
        {selectedItem?.recurrencyPay !== 'one-time' && (
          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <InputDatePicker
              min={minDate}
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              isInvalid={formik.touched.date && formik.errors.date}
              isValid={formik.touched.date && !formik.errors.date}
            />
          </Form.Group>
        )}
        {selectedItem?.price !== undefined && (
          <OrderSummary
            price={selectedItem?.price}
            discountType={discount?.type}
            discountValue={discount?.value}
            recurrency={selectedItem?.recurrencyPay}
            quantity={formik.values.quantity}
            createOrder
          />
        )}
      </div>
      <div className="buttons">
        <Form.Group className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="mr-2 text-nowrap"
            disabled={formik.isSubmitting}
            onClick={() => setClose(false)}
          >
            Cancel
          </Button>
          <ButtonLoading
            type="submit"
            className="mr-2 text-nowrap"
            loading={formik.isSubmitting}
            onClick={() => {
              formik.handleSubmit();
              setSelectedPage(2);
            }}
          >
            Pay With Credit Card
          </ButtonLoading>
          {selectedItem?.recurrencyPay !== 'weekly' &&
            selectedItem?.recurrencyPay !== 'monthly' && (
              <ButtonLoading
                type="submit"
                className="text-nowrap"
                loading={formik.isSubmitting}
                onClick={() => setSelectedPage(3)}
              >
                Pay With Money
              </ButtonLoading>
            )}
        </Form.Group>
      </div>
    </Form>
  );
};

export default CreateOrder;
