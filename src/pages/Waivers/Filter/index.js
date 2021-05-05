import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { useFormik } from 'formik';

export const Filter = ({ onFilter, onCreate, allowCreate }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: onFilter,
    onReset: onFilter,
  });

  return (
    <div className="mt-4">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Control
          placeholder="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />

        <div className="mt-2 d-flex justify-content-end align-items-start">
          <Button type="submit">Filter</Button>
          <Button type="reset" className="ml-2" onClick={formik.handleReset}>
            Clear Filter
          </Button>
          {allowCreate && (
            <Button variant="secondary" className="ml-2" onClick={onCreate}>
              Add Waiver
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};
