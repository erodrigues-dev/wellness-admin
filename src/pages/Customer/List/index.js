import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiGrid } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import * as dateHelper from '~/helpers/date';

import { Container } from './styles';

function List({ list, allowEdit, handleOpenEdit }) {
  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th className="text-center">Actions</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="text-center">
                <Link
                  to={`/customers/${item.id}/display`}
                  className="mr-2"
                  title="Display"
                >
                  <FiEye size="18" />
                </Link>
                {allowEdit && (
                  <>
                    <FiEdit
                      size="18"
                      title="Edit"
                      cursor="pointer"
                      className="mr-2"
                      onClick={() => handleOpenEdit(item)}
                    />
                    <Link
                      to={`/customers/${item.id}/dashboard`}
                      className="mr-2"
                      title="Dashboard"
                    >
                      <FiGrid size="18" />
                    </Link>
                  </>
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{dateHelper.formatToList(item.createdAt)}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan={4}>No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
