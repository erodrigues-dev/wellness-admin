import React from 'react';
import { Table } from 'react-bootstrap';
import { FiPackage, FiActivity } from 'react-icons/fi';

import * as dateHelper from '~/helpers/date';
import { currency } from '~/helpers/intl';

import { Container } from './styles';

function List({ list }) {
  const formatCurrency = (value) => currency.format(value);

  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Activity/Package</th>
            <th>Subtotal</th>
            <th>Created At</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.customer.name}</td>
              <td className="relation-name">
                {item.type === 'package' ? <FiPackage /> : <FiActivity />}
                {item.name}
              </td>
              <td>{formatCurrency(item.total)}</td>
              <td>{dateHelper.formatToList(item.createdAt)}</td>
              <td>{item.user.name}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan={9}>No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
