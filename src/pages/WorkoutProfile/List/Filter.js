import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

export function Filter({ onFilter }) {
  const customerRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    const customer = customerRef.current.value;
    onFilter({ customer });
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Control ref={customerRef} placeholder="Customer" name="customer" />

      <div className="mt-2 d-flex justify-content-end align-items-start">
        <Button type="submit">Filter</Button>
        <Button variant="secondary" className="ml-2">
          Add Workout Profile
        </Button>
      </div>
    </Form>
  );
}
