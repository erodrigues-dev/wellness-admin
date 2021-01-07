import React from 'react';
import { Table } from 'react-bootstrap';
import { FiInfo } from 'react-icons/fi';

import { formatToDisplay, transformIn24h, toDate } from '~/helpers/date';

import { Container } from './styles';

function List({ list, setOpenDetails, setAppointment }) {
  function handleClickInfo(item) {
    setAppointment(item);
    setOpenDetails(true);
  }

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
                <FiInfo
                  title="Details"
                  size="18"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClickInfo(item)}
                />
              </td>

              <td>{item.customer.name}</td>
              <td>{item.activity.name}</td>
              <td>{formatToDisplay(toDate(item.date))}</td>
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
