import React from 'react';
import { Table } from 'react-bootstrap';

import { Container } from './styles';

function List() {
  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Activity</th>
            <th>Scheduled Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}>No record found</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default List;
