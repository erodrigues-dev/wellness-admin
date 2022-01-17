import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';

import * as dateHelper from '~/helpers/date';

import { Container } from './styles';

function List({
  list,
  allowEdit,
  allowDelete,
  handleDelete,
  handleEdit,
  handleOpenDisplay,
}) {
  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th className="text-center">Actions</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Profile</th>
            <th>Specialties</th>
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
                  onClick={() => handleOpenDisplay(item)}
                />
                {allowEdit && (
                  <FiEdit
                    size="18"
                    onClick={() => handleEdit(item)}
                    className="ml-2"
                    title="Edit"
                    cursor="pointer"
                  />
                )}
                {allowDelete && (
                  <FiTrash
                    size="18"
                    color="var(--danger)"
                    onClick={() => handleDelete(item)}
                    className="ml-2"
                    title="Delete"
                    cursor="pointer"
                  />
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.profile.name}</td>
              <td>
                {item.specialties.map((spec) => spec.name).join(', ') || '-'}
              </td>
              <td>{dateHelper.formatToList(item.createdAt)}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan={6}>No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
