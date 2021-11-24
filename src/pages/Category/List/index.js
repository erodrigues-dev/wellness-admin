import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';

import * as dateHelper from '~/helpers/date';

import { Container } from './styles';

function List({ list, allowEdit, setOpenEdit, setSelectedCategory }) {
  return (
    <Container>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th className="text-center">Actions</th>
            <th>Name</th>
            <th>Type</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="text-center">
                {allowEdit && (
                  <FiEdit
                    size="18"
                    cursor="pointer"
                    onClick={() => {
                      setOpenEdit(true);
                      setSelectedCategory(item);
                    }}
                  />
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.type}</td>
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
