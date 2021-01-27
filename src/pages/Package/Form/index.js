import React, { useCallback, useEffect, useState } from 'react';
import { Form, Col, Button, InputGroup } from 'react-bootstrap';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import InputDatePicker from '~/components/InputDatePicker';
import Modal from '~/components/Modal';
import useNotification from '~/contexts/notification';
import { decimal } from '~/helpers/intl';
import masks from '~/helpers/masks';
import { sanitize } from '~/helpers/sanitize';
import ModalCategory from '~/pages/Category/Modal';
import * as categoryService from '~/services/category';
import service from '~/services/package';

import Activities from './Activities';
import schema from './schema';
import { ImageContainer } from './styles';

function ModalForm({ title, setClose, selected, display, reloadPackages }) {
  const [minDate] = useState(new Date());
  const [image, setImage] = useState({ file: null, url: null });
  const [categories, setCategories] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const { sendNotification } = useNotification();

  const { setValues, ...formik } = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: 0,
      name: '',
      price: '',
      description: '',
      expiration: null,
      showInApp: true,
      showInWeb: true,
      activities: [],
      categoryId: 0,
      recurrencyPay: '',
      type: '',
      total: '',
    },
  });

  const getPackage = useCallback(
    async (packageId) => {
      try {
        const { data } = await service.get(packageId);

        setValues({
          ...data,
          price: decimal.format(data.price),
          expiration: data.expiration ? new Date(data.expiration) : null,
          showInApp: data.showInApp ?? true,
          showInWeb: data.showInWeb ?? true,
        });
        setImage({ file: null, url: data.imageUrl });
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [sendNotification, setValues]
  );

  useEffect(() => {
    if (selected) getPackage(selected.id);
  }, [getPackage, selected]);

  const loadCategories = useCallback(async () => {
    try {
      const { data } = await categoryService.listByType('package');

      setCategories(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  async function handleSubmit(values, { setSubmitting }) {
    try {
      const data = {
        ...values,
        image: image.file,
        price: sanitize.number(values.price),
      };

      if (values.total) data.total = sanitize.number(values.total);

      if (selected === undefined) {
        await service.create(data);
        sendNotification('Package created with success.');
      } else {
        await service.update(data);
        sendNotification('Package updated with success.');
      }

      reloadPackages();
      setClose();
    } catch (error) {
      sendNotification(error.message, false);
      setSubmitting(false);
    }
  }

  function handleCancel() {
    setClose();
  }

  function handleImage(e) {
    if (e.target.files.length === 0) {
      setImage({ file: null, url: null });
      return;
    }

    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setImage({ file, url });
  }

  function handlePackageTypeChange(e) {
    const { value } = e.target;

    formik.handleChange(e);
    formik.setFieldValue('total', '');
    if (value === 'appointments' && formik.values.activities.length > 0) {
      formik.setErrors(formik.errors);
      formik.setFieldValue(
        'activities',
        formik.values.activities.map((item) => ({
          ...item,
          quantity: item.quantity ?? 1,
        }))
      );
    }
  }

  return (
    <>
      <Modal title={title} setClose={setClose} width="750px">
        <ImageContainer>
          {image.url && (
            <img src={image.url} alt="cover" accept=".jpg,.jpeg,.png" />
          )}
        </ImageContainer>

        <Form onSubmit={formik.handleSubmit} className="modal-form">
          <div className="form-wrapper">
            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.name && formik.errors.name}
                  isValid={formik.touched.name && !formik.errors.name}
                  disabled={display}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  placeholder="Price"
                  name="price"
                  value={formik.values.price}
                  onChange={(e) =>
                    formik.setFieldValue('price', masks.price(e))
                  }
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.price && formik.errors.price}
                  isValid={formik.touched.price && !formik.errors.price}
                  disabled={display}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row />
            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="10"
                  placeholder="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.description && formik.errors.description
                  }
                  isValid={
                    formik.touched.description && !formik.errors.description
                  }
                  disabled={display}
                  style={{ resize: 'none' }}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Col>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImage}
                    disabled={display}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Expiration Date</Form.Label>
                  <InputDatePicker
                    min={minDate}
                    name="expiration"
                    value={formik.values.expiration}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.expiration && formik.errors.expiration
                    }
                    isValid={
                      formik.touched.expiration && !formik.errors.expiration
                    }
                    disabled={display}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Show In</Form.Label>
                  <Form.Group controlId="showInApp">
                    <Form.Check
                      type="checkbox"
                      label="App"
                      onChange={formik.handleChange}
                      checked={formik.values.showInApp}
                      custom
                      disabled={display}
                    />
                  </Form.Group>
                  <Form.Group controlId="showInWeb">
                    <Form.Check
                      type="checkbox"
                      label="Web"
                      onChange={formik.handleChange}
                      checked={formik.values.showInWeb}
                      custom
                      disabled={display}
                    />
                  </Form.Group>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Label>Category</Form.Label>
                <InputGroup>
                  <Form.Control
                    as="select"
                    custom
                    placeholder="Category"
                    name="categoryId"
                    value={formik.values.categoryId}
                    onChange={(e) => {
                      formik.setFieldValue('categoryId', e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.categoryId && formik.errors.categoryId
                    }
                    isValid={
                      formik.touched.categoryId && !formik.errors.categoryId
                    }
                    disabled={display}
                  >
                    <option value={0} disabled>
                      Select a Category
                    </option>
                    {categories &&
                      categories.map((loadedCategory) => (
                        <option
                          key={loadedCategory.id}
                          value={loadedCategory.id}
                        >
                          {loadedCategory.name}
                        </option>
                      ))}
                  </Form.Control>
                  <InputGroup.Append>
                    <Button
                      variant="primary"
                      onClick={() => setOpenAdd(true)}
                      disabled={display}
                    >
                      Add
                    </Button>
                  </InputGroup.Append>
                  {formik.errors.categoryId && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.categoryId}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Recurrency Pay</Form.Label>
                <Form.Control
                  placeholder="Recurrency Pay"
                  as="select"
                  custom
                  name="recurrencyPay"
                  value={formik.values.recurrencyPay}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.recurrencyPay && formik.errors.recurrencyPay
                  }
                  isValid={
                    formik.touched.recurrencyPay && !formik.errors.recurrencyPay
                  }
                  disabled={display}
                >
                  <option value="" disabled>
                    Select a Recurrency Pay
                  </option>
                  <option value="one-time">One Time</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.recurrencyPay}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Label>Package Type</Form.Label>
                <Form.Control
                  placeholder="Package Type"
                  as="select"
                  custom
                  name="type"
                  value={formik.values.type}
                  onChange={handlePackageTypeChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.type && formik.errors.type}
                  isValid={formik.touched.type && !formik.errors.type}
                  disabled={display}
                >
                  <option value="" disabled>
                    Select a Package Type
                  </option>
                  <option value="minutes">Minutes</option>
                  <option value="amount">Amount</option>
                  <option value="unlimited">Unlimited</option>
                  <option value="appointments">Appointments</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.type}
                </Form.Control.Feedback>
              </Form.Group>

              {(formik.values.type === 'minutes' ||
                formik.values.type === 'amount') && (
                <Form.Group as={Col} md="6">
                  <Form.Label>{`Total of ${formik.values.type}`}</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder={`Total of ${formik.values.type}`}
                      name="total"
                      value={formik.values.total || ''}
                      onChange={(e) =>
                        formik.setFieldValue(
                          'total',
                          formik.values.type === 'minutes'
                            ? masks.duration(e)
                            : masks.price(e)
                        )
                      }
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.total && formik.errors.total}
                      isValid={formik.touched.total && !formik.errors.total}
                      disabled={display}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.total}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              )}
            </Form.Row>
            <Activities
              formik={formik}
              packageType={formik.values.type}
              display={display}
            />
          </div>

          <div className="buttons">
            <Form.Row className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="mr-2"
                onClick={handleCancel}
                disabled={formik.isSubmitting}
              >
                {display ? 'Close' : 'Cancel'}
              </Button>
              {!display && (
                <ButtonLoading type="submit" loading={formik.isSubmitting}>
                  Save
                </ButtonLoading>
              )}
            </Form.Row>
          </div>
        </Form>
      </Modal>

      {openAdd && (
        <Modal setClose={() => setOpenAdd(false)} title="Add Category">
          <ModalCategory
            handleOpenModal={setOpenAdd}
            handleValue={(e) => formik.setFieldValue('categoryId', e)}
            addComponent="package"
            loadCategories={loadCategories}
          />
        </Modal>
      )}
    </>
  );
}

export default ModalForm;
