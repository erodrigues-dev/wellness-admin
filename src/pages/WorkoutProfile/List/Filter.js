import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

export function Filter({ onFilter, onCreate, allowCreate }) {
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
        {allowCreate && (
          <Button variant="secondary" className="ml-2" onClick={onCreate}>
            Add Workout Profile
          </Button>
        )}
      </div>
    </Form>
  );
}
