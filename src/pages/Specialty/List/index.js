import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';

import * as dateHelper from '~/helpers/date';

import { Container } from './styles';

/**
 *
 * @param {{
 *  list: [],
 *  allowEdit: boolean,
 *  allowDelete: boolean,
 *  onEdit(item): void,
 *  onDelete(item): void,
 *  onDisplay(item): void,
 * }} props
 * @returns
 */
function List({ list, allowEdit, allowDelete, onEdit, onDelete, onDisplay }) {
  return (
    <Container>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th className="text-center">Actions</th>
            <th>Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="text-center">
                <FiEye
                  title="Display"
                  className="ml-2"
                  size="18"
                  cursor="pointer"
                  onClick={() => {
                    onDisplay(item);
                  }}
                />
                {allowEdit && (
                  <FiEdit
                    title="Edit"
                    className="ml-2"
                    size="18"
                    cursor="pointer"
                    onClick={() => {
                      onEdit(item);
                    }}
                  />
                )}
                {allowDelete && (
                  <FiTrash
                    color="var(--danger)"
                    title="Delete"
                    className="ml-2"
                    size="18"
                    cursor="pointer"
                    onClick={() => {
                      onDelete(item);
                    }}
                  />
                )}
              </td>
              <td>{item.name}</td>
              <td>{dateHelper.formatToList(item.createdAt)}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan={3}>No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
