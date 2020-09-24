import React from 'react';
import { Table, Form } from 'react-bootstrap';

import ButtonDelete from '~/components/List/ButtonDelete';
import { currency } from '~/helpers/intl';

const List = ({ list, onRemove, formik }) => {
  const hasTouched = (index) => {
    const { activities } = formik.touched;
    if (activities && activities.length > index)
      return activities[index]?.quantity;

    return false;
  };

  const hasError = (index) => {
    const { activities } = formik.errors;
    if (activities && activities.length > index)
      return !!activities[index]?.quantity;

    return false;
  };

  const handleChange = (e) => {
    const value = (e.target.value || '').replace(/^0/, '').replace(/\D/g, '');
    e.target.value = value;
    formik.handleChange(e);
  };

  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th className="text-center">Remove</th>
          <th>Activity</th>
          <th>Price</th>
          <th>Duration</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, i) => (
          <tr key={item.id}>
            <td className="text-center">
              <ButtonDelete onClick={() => onRemove(item.id)} />
            </td>
            <td>{item.name}</td>
            <td>{currency.format(item.price)}</td>
            <td>{`${item.duration}min`}</td>
            <td>
              <Form.Control
                style={{ width: 80 }}
                name={`activities[${i}].quantity`}
                value={item.quantity}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                maxLength={3}
                isInvalid={hasTouched(i) && hasError(i)}
                isValid={hasTouched(i) && !hasError(i)}
              />
            </td>
          </tr>
        ))}
        {list.length === 0 && (
          <tr>
            <td colSpan="5">No records</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default List;
