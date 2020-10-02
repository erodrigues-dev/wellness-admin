import React, { useCallback, useEffect, useState } from 'react';
import { Card, Form, Col, Button, Image } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import { decimal } from '~/helpers/intl';
import * as service from '~/services/activity';
import * as categoryService from '~/services/category';
import * as employeeService from '~/services/employee';

import schema from './schema';

function FormComponent() {
  const [image, setImage] = useState({ file: null, url: null });
  const [employees, setEmployees] = useState([]);
  const [categories, setCategories] = useState();
  const { sendNotification } = useNotification();
  const { id } = useParams();
  const history = useHistory();
  const action = id ? 'Edit Activity' : 'Add Activity';
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: 0,
      name: '',
      price: '',
      duration: '',
      description: '',
      employeeId: '',
      category: '',
      categoryId: 0,
    },
  });

  const loadCategories = useCallback(async () => {
    try {
      const { data } = await categoryService.listAll();

      setCategories(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (!id) return;
    service
      .get(id)
      .then((response) => {
        const {
          name,
          price,
          duration,
          description,
          employeeId,
          imageUrl,
          categoryId,
          category,
        } = response.data;

        formik.setValues({
          id,
          name,
          price: decimal.format(price),
          duration,
          description,
          employeeId,
          categoryId,
          category: category.name,
        });

        setImage({ url: imageUrl });
      })
      .catch(({ message }) => sendNotification(message, false));

    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    employeeService.listAll().then((response) => setEmployees(response.data));
  }, []);

  async function handleSubmit(values, { setSubmitting }) {
    const selectedCategory = categories.filter(
      (category) =>
        values.category.toLowerCase() === category.name.toLowerCase()
    );

    if (selectedCategory[0] === undefined) {
      toast.error('Category not found. Maybe you wanna add this one.');

      return;
    }

    try {
      if (id === undefined) {
        await service.create({
          ...values,
          categoryId: selectedCategory[0].id,
          image: image.file,
        });
        sendNotification('Activity created with success.');
      } else {
        await service.update({ ...values, image: image.file });
        sendNotification('Activity updated with success.');
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

  function maskPrice(e) {
    let value = e.target.value.replace(/[^0-9]/g, '').replace(/^0*/, '');
    if (value) {
      if (value.length < 3) {
        value = value.padStart(3, '0');
      }
      const chars = value.split('');
      chars.splice(-2, 0, '.');
      value = chars.join('');
      value = decimal.format(value);
    }
    e.target.value = value;
    formik.handleChange(e);
  }

  function maskDuration(e) {
    e.target.value = e.target.value.replace(/\D/g, '');

    formik.handleChange(e);
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

  return (
    <Card body>
      <Card.Title>{action}</Card.Title>
      <hr />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
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

        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Price</Form.Label>
            <Form.Control
              placeholder="Price"
              name="price"
              value={formik.values.price}
              onChange={maskPrice}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.price && formik.errors.price}
              isValid={formik.touched.price && !formik.errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              placeholder="Duration"
              name="duration"
              value={formik.values.duration}
              onChange={maskDuration}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.duration && formik.errors.duration}
              isValid={formik.touched.duration && !formik.errors.duration}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.duration}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Employee</Form.Label>
            <Form.Control
              as="select"
              custom
              name="employeeId"
              value={formik.values.employeeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.employeeId && formik.errors.employeeId}
              isValid={formik.touched.employeeId && !formik.errors.employeeId}
            >
              <option value="">Selecione</option>
              {employees.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.employeeId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Category</Form.Label>
            <Form.Control
              placeholder="Category"
              name="category"
              list="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.category && formik.errors.category}
              isValid={formik.touched.category && !formik.errors.category}
            />
            <datalist id="category">
              {categories &&
                categories.map((category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
            </datalist>
            <Form.Control.Feedback type="invalid">
              {formik.errors.category}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.description && formik.errors.description}
            isValid={formik.touched.description && !formik.errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={handleImage} />
          {image.url && (
            <Image
              className="mt-2"
              src={image.url}
              alt="cover"
              rounded
              fluid
              style={{ maxWidth: 400, maxHeight: 400 }}
            />
          )}
        </Form.Group>

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
    </Card>
  );
}

export default FormComponent;
