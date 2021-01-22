import React from 'react';
import { Table } from 'react-bootstrap';

import { currency } from '~/helpers/intl';

const List = ({ list }) => (
  <Table striped hover responsive>
    <thead>
      <tr>
        <th>Activity</th>
        <th>Price</th>
        <th>Duration</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      {list.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{currency.format(item.price)}</td>
          <td>{`${item.duration}min`}</td>
          <td>{item.quantity}</td>
        </tr>
      ))}
      {list.length === 0 && (
        <tr>
          <td colSpan="4">No records</td>
        </tr>
      )}
    </tbody>
  </Table>
);

export default List;
