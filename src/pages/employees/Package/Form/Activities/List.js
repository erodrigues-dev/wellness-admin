import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FiX } from 'react-icons/fi';

import { currency } from '~/helpers/intl';

const List = ({ list, onRemove }) => (
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
      {list.map((item) => (
        <tr key={item.id}>
          <td className="text-center">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onRemove(item.id)}
            >
              <FiX size="22" />
            </Button>
          </td>
          <td>{item.name}</td>
          <td>{currency.format(item.price)}</td>
          <td>{`${item.duration}min`}</td>
          <td>
            <Form.Control
              style={{ width: 80 }}
              defaultValue={item.PackageActivity?.quantity || 1}
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

export default List;
