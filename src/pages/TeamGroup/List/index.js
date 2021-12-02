import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';

import Paginate from '~/components/Paginate';
import { config } from '~/helpers/config';
import { formatToList } from '~/helpers/date';

import { Filter } from './Filter';

export function List({ data, allowEdit, allowDelete, onPaginate }) {
  const onDisplay = () => {};
  const onEdit = () => {};
  const onDelete = () => {};

  const getMembersNames = (members) => {
    return members
      .map((member) => member.name)
      .map((name) => name.split(' ')[0])
      .join(', ');
  };

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
          {data.list.map((item) => (
            <tr key={item.id}>
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
              <td>{item.name}</td>
              <td>{getMembersNames(item.members)}</td>
              <td>{formatToList(item.createdAt)}</td>
            </tr>
          ))}
          {data.count === 0 && (
            <tr>
              <td colSpan={4}>No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Paginate
        activePage={data.page}
        itemsCountPerPage={config.pageLimit}
        totalItemsCount={data.count}
        onChange={onPaginate}
      />
    </div>
  );
}
