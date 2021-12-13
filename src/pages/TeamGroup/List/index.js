import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';

import Paginate from '~/components/Paginate';
import { config } from '~/helpers/config';
import { formatToList } from '~/helpers/date';

import { Filter } from './Filter';

export function List({
  data,
  allowCreate,
  allowEdit,
  allowDelete,
  onPaginate,
  onDisplay,
  onEdit,
  onDelete,
  onCreate,
  onFilter,
}) {
  const getMembersNames = (members) => {
    return members
      .map((member) => member.name)
      .map((name) => name.split(' ')[0])
      .join(', ');
  };

  return (
    <div className="mt-4">
      <Filter
        allowCreate={allowCreate}
        onCreate={onCreate}
        onFilter={onFilter}
      />
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
              <td className="column-actions">
                <FiEye
                  title="Display"
                  className="m-1"
                  size={18}
                  cursor="pointer"
                  onClick={() => onDisplay(item)}
                />
                {allowEdit && (
                  <FiEdit
                    className="m-1"
                    title="Edit"
                    size={18}
                    cursor="pointer"
                    onClick={() => onEdit(item)}
                  />
                )}
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
              <td>{item.name}</td>
              <td style={{ textTransform: 'capitalize' }}>
                {getMembersNames(item.members)}
              </td>
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
