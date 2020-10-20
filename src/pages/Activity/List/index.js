import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEye, FiEdit, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import * as dateHelper from '~/helpers/date';
import { currency } from '~/helpers/intl';

import { Container } from './styles';

function List({ list, allowEdit }) {
  const formatCurrency = (value) => currency.format(value);

  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th className="text-center">Actions</th>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Employee</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="text-center actions">
                <Link to={`/activities/${item.id}/display`} title="View">
                  <FiEye size="18" />
                </Link>
                {allowEdit && (
                  <>
                    <Link to={`/activities/${item.id}`} title="Edit">
                      <FiEdit size="18" />
                    </Link>
                    <Link
                      to={`/activities/${item.id}/schedule`}
                      title="Schedule"
                    >
                      <FiCalendar size="18" />
                    </Link>
                  </>
                )}
              </td>

              <td>{item.category.name}</td>
              <td>{item.name}</td>
              <td>{formatCurrency(item.price)}</td>
              <td>{`${item.duration}min`}</td>
              <td>{item.employee.name}</td>
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
