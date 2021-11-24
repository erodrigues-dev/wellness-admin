import React, { useCallback, useState, useEffect } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import ButtonLoading from '~/components/ButtonLoading';
import Modal from '~/components/Modal';
import masks from '~/helpers/masks';
import ModalCategory from '~/pages/Category/Modal';
import service from '~/services/calendar';
import categoryService from '~/services/category';

import { initialValues, validationSchema } from './schema';

export function CalendarForm({ onClose, action, model }) {
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState(false);

  const isDisplay = action === 'display';

  const { setValues, ...formik } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const fetchCategories = useCallback(async () => {
    const { data } = await categoryService.listAll({ type: 'calendar' });
    setCategories(data);
  }, []);

  async function handleSubmit(values) {
    try {
      if (action === 'create') {
        await service.create(values);
        toast.success('Calendar created with success');
      }

      if (action === 'edit') {
        await service.update({ id: model.id, ...values });
        toast.success('Calendar updated with success');
      }

      onClose({ role: 'success' });
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (model) {
      setValues({
        name: model.name,
        categoryId: model.category.id,
        minHoursToSchedule: model.minHoursToSchedule,
        minHoursToCancel: model.minHoursToCancel,
        maxDaysInFuture: model.maxDaysInFuture,
        maxEntryPerSlot: model.maxEntryPerSlot,
      });
    }
  }, [model, setValues]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Modal title="Calendar" setClose={onClose}>
      <Form className="p-4" onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && formik.errors.name}
            isValid={formik.touched.name && !formik.errors.name}
            disabled={isDisplay}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <InputGroup>
            <Form.Control
              as="select"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.categoryId && formik.errors.categoryId}
              isValid={formik.touched.categoryId && !formik.errors.categoryId}
              disabled={isDisplay}
            >
              <option value="">Select</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
            {isDisplay || (
              <InputGroup.Append>
                <Button onClick={() => setAddCategory(true)}>Add</Button>
              </InputGroup.Append>
            )}
            <Form.Control.Feedback type="invalid">
              {formik.errors.categoryId}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Row>
          <Form.Group as={Col}>
            <Form.Label>Min hours to schedule</Form.Label>
            <Form.Control
              name="minHoursToSchedule"
              value={formik.values.minHoursToSchedule}
              onChange={(e) => formik.handleChange(masks.onlyNumbers(e))}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.minHoursToSchedule &&
                formik.errors.minHoursToSchedule
              }
              isValid={
                formik.touched.minHoursToSchedule &&
                !formik.errors.minHoursToSchedule
              }
              disabled={isDisplay}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.minHoursToSchedule}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Min hours to cancel</Form.Label>
            <Form.Control
              name="minHoursToCancel"
              value={formik.values.minHoursToCancel}
              onChange={(e) => formik.handleChange(masks.onlyNumbers(e))}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.minHoursToCancel &&
                formik.errors.minHoursToCancel
              }
              isValid={
                formik.touched.minHoursToCancel &&
                !formik.errors.minHoursToCancel
              }
              disabled={isDisplay}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.minHoursToCancel}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Form.Label>Max days in future</Form.Label>
            <Form.Control
              name="maxDaysInFuture"
              value={formik.values.maxDaysInFuture}
              onChange={(e) => formik.handleChange(masks.onlyNumbers(e))}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.maxDaysInFuture && formik.errors.maxDaysInFuture
              }
              isValid={
                formik.touched.maxDaysInFuture && !formik.errors.maxDaysInFuture
              }
              disabled={isDisplay}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.maxDaysInFuture}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Max entry per slot</Form.Label>
            <Form.Control
              name="maxEntryPerSlot"
              value={formik.values.maxEntryPerSlot}
              onChange={(e) => formik.handleChange(masks.onlyNumbers(e))}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.maxEntryPerSlot && formik.errors.maxEntryPerSlot
              }
              isValid={
                formik.touched.maxEntryPerSlot && !formik.errors.maxEntryPerSlot
              }
              disabled={isDisplay}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.maxEntryPerSlot}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <div className="d-flex justify-content-end align-items-start">
          <Button
            variant="secondary"
            disabled={formik.isSubmitting}
            onClick={onClose}
          >
            {isDisplay ? 'Close' : 'Cancel'}
          </Button>
          {isDisplay || (
            <ButtonLoading
              type="submit"
              className="ml-2"
              loading={formik.isSubmitting}
            >
              Save
            </ButtonLoading>
          )}
        </div>
      </Form>
      {addCategory && (
        <Modal setClose={() => setAddCategory(false)} title="Add category">
          <ModalCategory
            handleOpenModal={() => setAddCategory(false)}
            addComponent="calendar"
            loadCategories={fetchCategories}
            handleValue={(categoryId) =>
              formik.setFieldValue('categoryId', categoryId)
            }
          />
        </Modal>
      )}
    </Modal>
  );
}
