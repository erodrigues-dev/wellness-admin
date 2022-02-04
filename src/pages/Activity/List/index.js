import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEye, FiEdit } from 'react-icons/fi';

import * as dateHelper from '~/helpers/date';
import { currency } from '~/helpers/intl';

import { Container } from './styles';

function List({ list, allowEdit, setOpenEdit, setOpenDisplay, setSelected }) {
  const formatCurrency = (value) => currency.format(value);

  function handleOpen(callback, item) {
    callback(true);
    setSelected(item);
  }

  function getEmployeeNames(employees) {
    if (!employees) return '-';
    return employees.map((x) => x.name).join(', ');
  }

  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th className="text-center">Actions</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Employee</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="text-center actions" style={{ minWidth: 100 }}>
                <FiEye
                  size="18"
                  title="Display"
                  cursor="pointer"
                  className="mr-2"
                  onClick={() => handleOpen(setOpenDisplay, item)}
                />
                {allowEdit && (
                  <>
                    <FiEdit
                      size="18"
                      onClick={() => handleOpen(setOpenEdit, item)}
                      className="mr-2"
                      title="Edit"
                      cursor="pointer"
                    />
                  </>
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.category.name}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>{`${item.duration}min`}</td>
              <td>{getEmployeeNames(item.employees)}</td>
              <td>{dateHelper.formatToList(item.createdAt)}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan={7}>No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
