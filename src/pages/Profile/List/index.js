import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';

import styled from 'styled-components';

import * as dateHelper from '~/helpers/date';

const Container = styled.div`
  margin-top: 24px;
`;

function List({ list, allowEdit, setOpenEdit, setSelected }) {
  function handleEdit(item) {
    setOpenEdit(true);
    setSelected(item);
  }

  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            {allowEdit && <th className="text-center">Actions</th>}
            <th>Name</th>
            <th>Description</th>
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
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEdit(item.id)}
                    title="Edit"
                  />
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
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
