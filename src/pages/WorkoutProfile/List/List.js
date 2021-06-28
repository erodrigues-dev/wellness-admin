import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';

import Paginate from '~/components/Paginate';
import { formatToList } from '~/helpers/date';

export function List({ list, onPaginate }) {
  return (
    <div className="mt-4">
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Customer</th>
            <th>Experience</th>
            <th>Goal</th>
            <th>Age</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.rows.map((item) => (
            <tr key={item.id}>
              <td>
                <FiEye title="Display" size={18} cursor="pointer" />
                <FiEdit
                  className="ml-2"
                  title="Edit"
                  size={18}
                  cursor="pointer"
                />
                <FiTrash
                  color="var(--danger)"
                  className="ml-2"
                  title="Delete"
                  size={18}
                  cursor="pointer"
                />
              </td>
              <td>{item.customer.name}</td>
              <td>{item.experienceLevel}</td>
              <td>{item.goal}</td>
              <td>{item.age}</td>
              <td>{item.height}</td>
              <td>{item.weight}lbs</td>
              <td>{formatToList(item.createdAt)}</td>
            </tr>
          ))}
          {list.total === 0 && (
            <tr>
              <td colSpan={8}>No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Paginate
        activePage={list.page}
        itemsCountPerPage={10}
        totalItemsCount={list.total}
        onChange={onPaginate}
      />
    </div>
  );
}
