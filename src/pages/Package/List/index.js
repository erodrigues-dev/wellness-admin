import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye } from 'react-icons/fi';

import * as dateHelper from '~/helpers/date';
import { currency } from '~/helpers/intl';

import { Container } from './styles';

function List({ list, allowEdit, setSelected, setOpenEdit, setOpenDisplay }) {
  const formatCurrency = (value) => currency.format(value);

  function handleOpen(callback, item) {
    callback(true);
    setSelected(item);
  }

  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th className="text-center">Actions</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Recurrency Pay</th>
            <th>Package Type</th>
            <th>Total of </th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="text-center">
                <FiEye
                  size="18"
                  title="Display"
                  cursor="pointer"
                  className="mr-2"
                  onClick={() => handleOpen(setOpenDisplay, item)}
                />
                {allowEdit && (
                  <FiEdit
                    size="18"
                    onClick={() => handleOpen(setOpenEdit, item)}
                    className="ml-2"
                    title="Edit"
                    cursor="pointer"
                  />
                )}
              </td>
              <td>{item.name}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>{item.category.name}</td>
              <td>{item.recurrencyPay}</td>
              <td>{item.type}</td>
              <td>{item.total || '-'}</td>
              <td>{dateHelper.formatToList(item.createdAt)}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan={8}>No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
