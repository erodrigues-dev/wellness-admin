import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';

import Modal from '~/components/Modal';

import Paginate from '../../components/Paginate';

export function WorkoutLog({ onClose }) {
  function onDisplay() {}
  function onEdit() {}
  function onDelete() {}
  function onPaginate() {}

  return (
    <Modal title="Workout Logs" setClose={onClose}>
      <div className="p-4">
        <p>Customer name</p>
      </div>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Resume</th>
            <th>Date</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FiEye
                title="Display"
                size={18}
                cursor="pointer"
                onClick={() => onDisplay()}
              />
              <FiEdit
                className="ml-2"
                title="Edit"
                size={18}
                cursor="pointer"
                onClick={() => onEdit()}
              />
              <FiTrash
                color="var(--danger)"
                className="ml-2"
                title="Delete"
                size={18}
                cursor="pointer"
                onClick={() => onDelete()}
              />
            </td>
            <td>Ombro/Trapezio</td>
            <td>20 jan 2021</td>
            <td>6 months ago</td>
          </tr>
        </tbody>
      </Table>
      <Paginate
        activePage={1}
        itemsCountPerPage={10}
        totalItemsCount={100}
        onChange={onPaginate}
      />
    </Modal>
  );
}
