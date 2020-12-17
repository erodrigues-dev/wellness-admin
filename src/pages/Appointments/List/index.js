import React from 'react';
import { Table } from 'react-bootstrap';
import { FiXCircle } from 'react-icons/fi';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import { formatToDisplay, transformIn24h } from '~/helpers/date';

import { Container } from './styles';

function List({ list, handleDelete }) {
  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th className="text-center">Actions</th>
            <th>Customer</th>
            <th>Activity</th>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="text-center actions">
                <FiXCircle
                  title="Cancel Appointment"
                  size="18"
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    confirmHandler(
                      'Are you sure you want to cancel this appointment?',
                      () => handleDelete(item.id)
                    )
                  }
                />
              </td>

              <td>{item.customer.name}</td>
              <td>{item.activity.name}</td>
              <td>{formatToDisplay(new Date(item.date))}</td>
              <td>{transformIn24h(item.start)}</td>
              <td>{transformIn24h(item.end)}</td>
              <td>{item.status}</td>
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
