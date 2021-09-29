import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';

import Paginate from '~/components/Paginate';
import { config } from '~/helpers/config';
import { formatToList } from '~/helpers/date';

export function List({ list, onPaginate, onDisplay, onEdit, onDelete }) {
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
          {list.rows.map((item) => (
            <tr key={item.id}>
              <td>
                <FiEye
                  title="Display"
                  size={18}
                  cursor="pointer"
                  onClick={() => onDisplay(item)}
                />
                <FiEdit
                  title="Edit"
                  size={18}
                  cursor="pointer"
                  className="ml-2"
                  onClick={() => onEdit(item)}
                />
                <FiTrash
                  color="var(--danger)"
                  title="Delete"
                  size={18}
                  cursor="pointer"
                  className="ml-2"
                  onClick={() => onDelete(item.id)}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.category.name}</td>
              <td>{formatToList(item.createdAt)}</td>
            </tr>
          ))}
          {list.total === 0 && (
            <tr>
              <td colSpan="4">No records found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Paginate
        activePage={list.page}
        itemsCountPerPage={config.pageLimit}
        totalItemsCount={list.total}
        onChange={onPaginate}
      />
    </div>
  );
}
