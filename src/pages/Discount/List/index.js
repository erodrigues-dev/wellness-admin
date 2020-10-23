import React from 'react';
import { Table } from 'react-bootstrap';
import { FiTrash } from 'react-icons/fi';

import * as dateHelper from '~/helpers/date';
// import { currency } from '~/helpers/intl';

import { Container } from './styles';

function List({ list }) {
  // const formatCurrency = (value) => currency.format(value);

  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th className="text-center">Actions</th>
            <th>Customer</th>
            <th>Activity/Package</th>
            <th>Discount</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="text-center actions">
                <FiTrash />
              </td>

              <td>{item.customerName}</td>
              <td>{item.relationName}</td>
              <td>{item.value}</td>
              <td>{item.type}</td>
              <td>{dateHelper.formatToList(item.createdAt)}</td>
              <td>{item.userName}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan={10}>No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
