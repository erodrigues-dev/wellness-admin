import React from 'react';
import { Table } from 'react-bootstrap';
import { FiPackage, FiActivity, FiInfo } from 'react-icons/fi';
import { RiBankCardLine, RiMoneyDollarBoxLine } from 'react-icons/ri';

import * as dateHelper from '~/helpers/date';
import { currency } from '~/helpers/intl';

import { Container } from './styles';

function List({ list, setOrderId, setOpenDetails }) {
  const formatCurrency = (value) => currency.format(value);

  function handleClickInfo(item) {
    setOrderId(item.id);
    setOpenDetails(true);
  }

  function handleStatusName(status) {
    let value = (
      <div>
        <RiMoneyDollarBoxLine title="Money" /> Paid with money
      </div>
    );

    if (status === 'card') {
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
            <th>Actions</th>
            <th>Customer</th>
            <th>Payment Type</th>
            <th>Activity/Package</th>
            <th>Total</th>
            <th>Created At</th>
            <th>Created By</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="text-center actions">
                <FiInfo
                  title="Details"
                  size="18"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClickInfo(item)}
                />
              </td>
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
              <td>{item.user?.name ?? ''}</td>
              <td>{item?.status.toLowerCase()}</td>
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
