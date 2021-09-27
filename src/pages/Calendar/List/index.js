import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';

import Paginate from '~/components/Paginate';

export function List() {
  return (
    <div className="mt-4">
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Name</th>
            <th>Category</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FiEye title="Display" size={18} cursor="pointer" />
              <FiEdit
                title="Edit"
                size={18}
                cursor="pointer"
                className="ml-2"
              />
              <FiTrash
                color="var(--danger)"
                title="Delete"
                size={18}
                cursor="pointer"
                className="ml-2"
              />
            </td>
            <td>Massagem</td>
            <td>Wellness</td>
            <td>a few minutes ago</td>
          </tr>
        </tbody>
      </Table>
      <Paginate
        activePage={1}
        itemsCountPerPage={10}
        totalItemsCount={100}
        onChange={() => {}}
      />
    </div>
  );
}
