import React, { useCallback, useEffect, useState } from 'react';
import {
  Card,
  Form,
  Col,
  Button,
  Image,
  InputGroup,
  Modal,
  Row,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import useNotification from '~/contexts/notification';
import { decimal } from '~/helpers/intl';
import masks from '~/helpers/masks';
import * as service from '~/services/activity';
import * as categoryService from '~/services/category';
import * as employeeService from '~/services/employee';

import schema from './schema';

function FormComponent() {
  const [image, setImage] = useState({ file: null, url: null });
  const [employees, setEmployees] = useState([]);
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const { sendNotification } = useNotification();
  const { id } = useParams();
  const history = useHistory();
  const action = id ? 'Edit Activity' : 'Add Activity';
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      id: 1,
      name: '',
      price: '',
      duration: '',
      description: '',
      employeeId: '',
      categoryId: category !== undefined && category.id ? category.id : 1,
      showInApp: true,
      showInWeb: true,
      maxPeople: 0,
    },
  });

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
          type,
          showInApp,
          showInWeb,
          maxPeople,
        } = response.data;

        formik.setValues({
          id,
          name,
          price: decimal.format(price),
          duration,
          description,
          employeeId,
          categoryId,
          type,
          showInApp,
          showInWeb,
          maxPeople,
        });

        setImage({ url: imageUrl });
      })
      .catch(({ message }) => sendNotification(message, false));

    // eslint-disable-next-line
  }, [id]);

  const loadCategories = useCallback(async () => {
    try {
      const { data } = await categoryService.listAll();

      if (!id) formik.setFieldValue('categoryId', data[0].id);

      setCategories(data);
    } catch (error) {
      sendNotification(error.message, false);
    }
    // eslint-disable-next-line
  }, [sendNotification, id]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    employeeService.listAll().then((response) => setEmployees(response.data));
  }, []);

  async function handleSubmit(values, { setSubmitting }) {
    try {
      if (id === undefined) {
        await service.create({
          ...values,
          image: image.file,
        });
      } else {
        await service.update({
          ...values,
          image: image.file,
        });
      }
      sendNotification(`Activity ${id ? 'updated' : 'created'} with success.`);

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
      const { data } = await categoryService.create(category, 'activity');

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
              onChange={(e) => formik.setFieldValue('price', masks.price(e))}
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
              onChange={(e) =>
                formik.setFieldValue('duration', masks.duration(e))
              }
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
            {categories && (
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
                >
                  {categories.map((loadedCategory) => (
                    <option key={loadedCategory.id} value={loadedCategory.id}>
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
            )}
            <Form.Control.Feedback type="invalid">
              {formik.errors.categoryId}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Options</Form.Label>
            <Form.Check
              type="checkbox"
              name="showInApp"
              id="showInApp"
              custom
              defaultChecked={formik.values.showInApp}
              onChange={formik.handleChange}
              label="Show in App"
            />
            <Form.Check
              type="checkbox"
              name="showInWeb"
              id="showInWeb"
              custom
              defaultChecked={formik.values.showInWeb}
              onChange={formik.handleChange}
              label="Show in Web"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Max Number of People</Form.Label>
            <Form.Control
              type="number"
              name="maxPeople"
              value={formik.values.maxPeople}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.maxPeople && formik.errors.maxPeople}
              isValid={formik.touched.maxPeople && !formik.errors.maxPeople}
            />
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
