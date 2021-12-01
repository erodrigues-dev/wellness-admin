import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';

import Paginate from '~/components/Paginate';

import { Filter } from './Filter';

export function List() {
  const allowEdit = true;
  const allowDelete = true;

  const onDisplay = () => {};
  const onEdit = () => {};
  const onDelete = () => {};

  const items = [{ id: 1 }];

  return (
    <div className="mt-4">
      <Filter />
      <Table className="mt-4">
        <thead>
          <tr>
            <th>Actions</th>
            <th>Name</th>
            <th>Members</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <td>
                <FiEye
                  title="Display"
                  className="m-1"
                  size={18}
                  cursor="pointer"
                  onClick={() => onDisplay(item.id)}
                />
                {allowEdit && (
                  <FiEdit
                    className="m-1"
                    title="Edit"
                    size={18}
                    cursor="pointer"
                    onClick={() => onEdit(item.id)}
                  />
                )}
                {allowDelete && (
                  <FiTrash
                    color="var(--danger)"
                    className="m-1"
                    title="Delete"
                    size={18}
                    cursor="pointer"
                    onClick={() => onDelete(item.id)}
                  />
                )}
              </td>
              <td>T-0001</td>
              <td>Jhon, Gui, Alicia, Mary</td>
              <td>1 month ago</td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={4}>No record found</td>
            </tr>
          )}
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
