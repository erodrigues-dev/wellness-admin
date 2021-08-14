import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEye, FiTrash } from 'react-icons/fi';

import Paginate from '~/components/Paginate';
import { formatToList } from '~/helpers/date';

export function List({ list, allowDelete, onDisplay, onDelete, onPaginate }) {
  return (
    <div className="mt-4">
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Title</th>
            <th>Created By</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.rows.map((item) => (
            <tr key={item.id}>
              <td>
                <FiEye
                  title="Display"
                  className="m-1"
                  size={18}
                  cursor="pointer"
                  onClick={() => onDisplay(item)}
                />
                {allowDelete && (
                  <FiTrash
                    color="var(--danger)"
                    className="m-1"
                    title="Delete"
                    size={18}
                    cursor="pointer"
                    onClick={() => onDelete(item)}
                  />
                )}
              </td>
              <td>{item.title}</td>
              <td>{item.createdBy.name}</td>
              <td>{formatToList(item.createdAt)}</td>
            </tr>
          ))}
          {list.total === 0 && (
            <tr>
              <td colSpan={4}>No records found</td>
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
