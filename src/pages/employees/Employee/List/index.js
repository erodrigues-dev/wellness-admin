import React from 'react';
import { Table } from 'react-bootstrap';

import { Container } from './styles';

function List({ list }) {
  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan="3">No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
