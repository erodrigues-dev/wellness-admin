import React, { useCallback, useEffect, useState } from 'react';
import {
  Card,
  Form,
  Col,
  Button,
  InputGroup,
  Modal,
  Row,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import InputDatePicker from '~/components/InputDatePicker';
import useNotification from '~/contexts/notification';
import { decimal } from '~/helpers/intl';
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
    },
  });

  const loadCategories = useCallback(async () => {
    try {
      const { data } = await categoryService.listAll();

      setCategories(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  function findCategory(query) {
    const selectedCategory = categories.filter(
      (loadedCategory) =>
        query.toLowerCase() === loadedCategory.name.toLowerCase()
    );

    return selectedCategory;
  }

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
        });

        setImage({ file: null, url: response.data.imageUrl });
      })
      .catch(({ message }) => sendNotification(message, false));

    // TODO
    // React Hook useEffect has missing dependencies
    // eslint-disable-next-line
  }, [id]);

  async function handleSubmit(values, { setSubmitting }) {
    const selectedCategory = findCategory(values.category);

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

      formik.setFieldValue('categoryId', data.id);

      setCategory(data);
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
              onChange={maskPrice}
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
                list="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.category && formik.errors.category}
                isValid={formik.touched.category && !formik.errors.category}
              >
                {categories &&
                  categories.map((loadedCategory) => (
                    <option key={loadedCategory.id}>
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
        </Form.Row>

        <Activities formik={formik} />

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

      <Modal show={openAdd} onHide={() => setOpenAdd(false)}>
        <Modal.Header close>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>
    </Card>
  );
}

export default FormComponent;
