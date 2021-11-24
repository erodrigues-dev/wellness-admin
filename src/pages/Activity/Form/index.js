import React, { useCallback, useEffect, useState } from 'react';
import { Form, Col, Button, Image, InputGroup, Table } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import Modal from '~/components/Modal';
import { decimal } from '~/helpers/intl';
import masks from '~/helpers/masks';
import useToast from '~/hooks/useToast';
import ModalCategory from '~/pages/Category/Modal';
import * as service from '~/services/activity';
import * as categoryService from '~/services/category';
import * as employeeService from '~/services/employee';
import waiverService from '~/services/waiver';

import schema from './schema';

const initialValues = {
  id: 1,
  name: '',
  price: '',
  duration: '',
  description: '',
  waiverId: '',
  categoryId: 0,
  showInApp: true,
  showInWeb: true,
  maxPeople: '',
  employees: [],
};

function ModalForm({
  title,
  setClose,
  activity,
  display = false,
  reloadActivities,
}) {
  const [image, setImage] = useState({ file: null, url: null });
  const [employees, setEmployees] = useState([]);
  const [categories, setCategories] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [waivers, setWaivers] = useState([]);
  const [employeeId, setEmployeeId] = useState('');

  const { sendToast } = useToast();

  const { setValues, ...formik } = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues,
  });

  const fetch = useCallback(
    async (activityId) => {
      try {
        const { data } = await service.get(activityId);

        setValues({
          ...data,
          maxPeople: data.maxPeople ?? (display ? '-' : ''),
          price: decimal.format(data.price),
        });
        setImage(data.imageUrl ?? '');
      } catch (error) {
        sendToast(error.message, false);
      }
    },
    [sendToast, setValues, display]
  );

  const fetchCategories = useCallback(async () => {
    const { data } = await categoryService.listByType('activity');
    setCategories(data);
  }, []);

  const fetchLists = useCallback(() => {
    employeeService.listAll().then((response) => setEmployees(response.data));
    waiverService.listAll().then(({ data }) => setWaivers(data));
    fetchCategories();
  }, [fetchCategories]);

  async function handleSubmit(values, { setSubmitting }) {
    try {
      const data = {
        ...values,
        image: image.file,
        employees: values.employees.map((x) => x.id),
      };
      if (activity === undefined) await service.create(data);
      else await service.update(data);

      sendToast('Activity saved successfully');
      reloadActivities();
      setClose();
    } catch (error) {
      sendToast(error.message, false);
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

  function selectEmployee() {
    const employee = employees.find((x) => x.id === Number(employeeId));
    const selecteds = formik.values.employees;
    formik.setFieldValue('employees', [...selecteds, employee]);
    setEmployeeId('');
  }

  function unselectEmployee(item) {
    const selecteds = formik.values.employees;
    formik.setFieldValue(
      'employees',
      selecteds.filter((selected) => selected.id !== item.id)
    );
  }

  useEffect(() => {
    if (activity) fetch(activity.id);
  }, [fetch, activity]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return (
    <>
      <Modal title={title} setClose={setClose}>
        <Form onSubmit={formik.handleSubmit} className="modal-form">
          <div className="form-wrapper">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="ex: Name 1"
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

            <Form.Row>
              <Form.Group as={Col} md="6">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  placeholder="ex: 1000.00"
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
              <Form.Group as={Col} md="6">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  placeholder="ex: 150"
                  name="duration"
                  value={formik.values.duration}
                  onChange={(e) =>
                    formik.setFieldValue('duration', masks.duration(e))
                  }
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.duration && formik.errors.duration}
                  isValid={formik.touched.duration && !formik.errors.duration}
                  disabled={display}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.duration}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={6}>
                <Form.Label>Category</Form.Label>
                {categories && (
                  <InputGroup>
                    <Form.Control
                      as="select"
                      custom
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
                      {categories.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Control>
                    <InputGroup.Append>
                      <Button
                        onClick={() => setOpenAdd(true)}
                        disabled={display}
                      >
                        Add
                      </Button>
                    </InputGroup.Append>
                    {formik.errors && formik.errors.categoryId && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.categoryId}
                      </Form.Control.Feedback>
                    )}
                  </InputGroup>
                )}
              </Form.Group>
              <Form.Group as={Col} md={6}>
                <Form.Label>Max Number of People</Form.Label>
                <Form.Control
                  type="text"
                  name="maxPeople"
                  value={formik.values.maxPeople}
                  placeholder="ex: 25"
                  onChange={(e) => {
                    const regex = /^[0-9]*$/g;
                    if (!regex.test(e.target.value)) {
                      return;
                    }
                    formik.setFieldValue('maxPeople', e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.maxPeople && formik.errors.maxPeople
                  }
                  isValid={formik.touched.maxPeople && !formik.errors.maxPeople}
                  disabled={display}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.maxPeople}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Waiver</Form.Label>
              <Form.Control
                as="select"
                name="waiverId"
                value={formik.values.waiverId}
                onChange={formik.handleChange}
                disabled={display}
              >
                <option value="">Select a waiver</option>
                {waivers.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Employees</Form.Label>
              {display || (
                <InputGroup>
                  <Form.Control
                    as="select"
                    custom
                    disabled={display}
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                  >
                    <option value="">Select a employee</option>
                    {employees
                      .filter(
                        (item) =>
                          !formik.values.employees.some(
                            (selected) => selected.id === item.id
                          )
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </Form.Control>
                  <InputGroup.Append>
                    <Button
                      disabled={!employeeId || display}
                      onClick={selectEmployee}
                    >
                      Add
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              )}
              <Table striped hover className="mt-1 mb-0">
                <tbody>
                  {formik.values.employees.map((item, i) => (
                    <tr key={item.id}>
                      <td width="40px" className="p-1 text-center">
                        #{i + 1}
                      </td>
                      <td className="p-1">{item.name}</td>
                      {display || (
                        <td width="40px" className="p-1 text-center">
                          <FaTrash
                            title="Remove"
                            cursor="pointer"
                            color="var(--danger)"
                            onClick={() => unselectEmployee(item)}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                  {display && formik.values.employees.length === 0 && (
                    <tr>
                      <td className="p-1">No employee selected</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="ex: Some description here"
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
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Label>Settings</Form.Label>
                <Form.Check
                  type="checkbox"
                  name="showInApp"
                  id="showInApp"
                  custom
                  checked={formik.values.showInApp}
                  onChange={formik.handleChange}
                  label="Show in App"
                  disabled={display}
                />
                <Form.Check
                  type="checkbox"
                  name="showInWeb"
                  id="showInWeb"
                  custom
                  checked={formik.values.showInWeb}
                  onChange={formik.handleChange}
                  label="Show in Web"
                  disabled={display}
                />
              </Form.Group>
              {display || (
                <Form.Group as={Col}>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImage}
                    disabled={display}
                  />
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
              )}
            </Form.Row>
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
            addComponent="activity"
            loadCategories={fetchCategories}
          />
        </Modal>
      )}
    </>
  );
}

export default ModalForm;
