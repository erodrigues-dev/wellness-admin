import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import * as dateHelper from '~/helpers/date';

import { Container } from './styles';

function List({ list }) {
  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th className="text-center">Actions</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Profile</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="text-center">
                <Link to={`/employees/${item.id}`}>
                  <FiEdit size="18" />
                </Link>
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.profile.name}</td>
              <td>{dateHelper.formatToList(item.createdAt)}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan="5">No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
