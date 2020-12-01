import React from 'react';
import { Table } from 'react-bootstrap';
import { FiPackage, FiActivity } from 'react-icons/fi';
import { RiBankCardLine, RiMoneyDollarBoxLine } from 'react-icons/ri';

import * as dateHelper from '~/helpers/date';
import { currency } from '~/helpers/intl';

import { Container } from './styles';

function List({ list }) {
  const formatCurrency = (value) => currency.format(value);

  function handleStatusName(status) {
    let value = (
      <div>
        <RiMoneyDollarBoxLine title="Money" /> Paid with money
      </div>
    );

    if (status === 'paid-with-card') {
      value = (
        <div>
          <RiBankCardLine title="Credit Card" /> Paid with card
        </div>
      );
    }

    return value;
  }

  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Status</th>
            <th>Activity/Package</th>
            <th>Total</th>
            <th>Created At</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.customer.name}</td>
              <td>{handleStatusName(item?.paymentType)}</td>
              <td className="relation-name">
                {item.type === 'package' ? (
                  <FiPackage title="Package" />
                ) : (
                  <FiActivity title="Activity" />
                )}
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
