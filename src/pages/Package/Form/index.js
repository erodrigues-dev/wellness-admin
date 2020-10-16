import React, { useCallback, useEffect, useState } from 'react';
import {
  Card,
  Form,
  Col,
  Button,
  InputGroup,
  ModalBody,
  Row,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import InputDatePicker from '~/components/InputDatePicker';
import ModalComponent from '~/components/Modal';
import useNotification from '~/contexts/notification';
import { decimal } from '~/helpers/intl';
import masks from '~/helpers/masks';
import * as categoryService from '~/services/category';
import service from '~/services/package';

import Activities from './Activities';
import schema from './schema';
import { ImageContainer } from './styles';

function FormComponent() {
  const [minDate] = useState(new Date());
  const [image, setImage] = useState({ file: null, url: null });
  const [categories, setCategories] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [category, setCategory] = useState();
  const { sendNotification } = useNotification();
  const { id } = useParams();
  const history = useHistory();
  const action = id ? 'Edit Package' : 'Add Package';
  const formik = useFormik({
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
      category: '',
      categoryId: 0,
      recurrencyPay: 'one-time',
      type: 'minutes',
      total: '',
    },
  });

  useEffect(() => {
    if (!id) return;
    service
      .get(id)
      .then((response) => {
        formik.setValues({
          id,
          name: response.data.name,
          price: decimal.format(response.data.price),
          description: response.data.description,
          expiration: response.data.expiration
            ? new Date(response.data.expiration)
            : null,
          showInApp: response.data.showInApp ?? true,
          showInWeb: response.data.showInWeb ?? true,
          activities: response.data.activities,
          categoryId: response.data.category.id,
          category: response.data.category.name,
          recurrencyPay: response.data.recurrencyPay,
          type: response.data.type,
          total: response.data.total,
        });

        setImage({ file: null, url: response.data.imageUrl });
      })
      .catch(({ message }) => sendNotification(message, false));

    // TODO
    // React Hook useEffect has missing dependencies
    // eslint-disable-next-line
  }, [id]);

  const loadCategories = useCallback(async () => {
    try {
      const { data } = await categoryService.listAll();

      setCategories(data);

      formik.setFieldValue('category', data[0].name);
    } catch (error) {
      sendNotification(error.message, false);
    }
    // TODO
    // React Hook useEffect has missing dependencies
    // eslint-disable-next-line
  }, [sendNotification]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  async function handleSubmit(values, { setSubmitting }) {
    const selectedCategory = categories.filter(
      (loadedCategory) => loadedCategory.name === values.category
    );

    try {
      if (id === undefined) {
        await service.create({
          ...values,
          categoryId: selectedCategory[0].id,
          image: image.file,
        });
        sendNotification('Package created with success.');
      } else {
        await service.update({
          ...values,
          categoryId: selectedCategory[0].id,
          image: image.file,
        });
        sendNotification('Package updated with success.');
      }

      history.goBack();
    } catch (error) {
      sendNotification(error.message, false);
      setSubmitting(false);
    }
  }

  function handleCancel() {
    history.goBack();
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

  async function createCategory() {
    try {
      const { data } = await categoryService.create(category, 'package');

      sendNotification('Add category successfuly.');

      loadCategories();

      formik.setFieldValue('category', data.name);

      if (!id) {
        formik.setFieldValue('categoryId', data.id);
      }

      setCategory(data);
      setOpenAdd(false);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  return (
    <Card body>
      <Card.Title>{action}</Card.Title>
      <hr />

      <ImageContainer>
        {image.url && (
          <img src={image.url} alt="cover" accept=".jpg,.jpeg,.png" />
        )}
      </ImageContainer>

      <Form onSubmit={formik.handleSubmit}>
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
              onChange={(e) => formik.setFieldValue('price', masks.price(e))}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.price && formik.errors.price}
              isValid={formik.touched.price && !formik.errors.price}
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
              isValid={formik.touched.description && !formik.errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Col>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImage} />
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
                isValid={formik.touched.expiration && !formik.errors.expiration}
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
                />
              </Form.Group>
              <Form.Group controlId="showInWeb">
                <Form.Check
                  type="checkbox"
                  label="Web"
                  onChange={formik.handleChange}
                  checked={formik.values.showInWeb}
                  custom
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
                name="category"
                value={formik.values.category}
                onChange={(e) => {
                  formik.setFieldValue('category', e.target.value);
                }}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.category && formik.errors.category}
                isValid={formik.touched.category && !formik.errors.category}
              >
                {categories &&
                  categories.map((loadedCategory) => (
                    <option key={loadedCategory.id} value={loadedCategory.name}>
                      {loadedCategory.name}
                    </option>
                  ))}
              </Form.Control>
              <InputGroup.Append>
                <Button variant="primary" onClick={() => setOpenAdd(true)}>
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {formik.errors.category}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Recurrency Pay</Form.Label>
            <InputGroup>
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
              >
                <option value="one-time">One Time</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Form.Control>
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {formik.errors.recurrencyPay}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Package Type</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="Package Type"
                as="select"
                custom
                name="type"
                value={formik.values.type}
                onChange={(e) => {
                  formik.setFieldValue('type', e.target.value);
                  formik.setFieldValue('total', '');
                }}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.type && formik.errors.type}
                isValid={formik.touched.type && !formik.errors.type}
              >
                <option value="minutes">Minutes</option>
                <option value="amount">Amount</option>
                <option value="unlimited">Unlimited</option>
                <option value="appointments">Appointments</option>
              </Form.Control>
            </InputGroup>
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
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.total}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          )}
        </Form.Row>

        <Activities formik={formik} packageType={formik.values.type} />

        <Form.Row className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="mr-2"
            onClick={handleCancel}
            disabled={formik.isSubmitting}
          >
            Cancel
          </Button>
          <ButtonLoading type="submit" loading={formik.isSubmitting}>
            Save
          </ButtonLoading>
        </Form.Row>
      </Form>

      {openAdd && (
        <ModalComponent setClose={() => setOpenAdd(false)} title="Add Category">
          <ModalBody>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Form.Group as={Col} md="12">
                  <Form.Control
                    placeholder="Name"
                    name="name"
                    value={
                      category !== undefined && category.id
                        ? category.name
                        : category
                    }
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
                <Col className="d-flex justify-content-end align-items-start">
                  <Button
                    type="reset"
                    className="ml-2"
                    onClick={() => setOpenAdd(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    className="ml-2"
                    onClick={createCategory}
                  >
                    Add Category
                  </Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </ModalComponent>
      )}
    </Card>
  );
}

export default FormComponent;
