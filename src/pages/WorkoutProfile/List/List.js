import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import { GiWeightLiftingUp } from 'react-icons/gi';

import Paginate from '~/components/Paginate';
import { formatToList } from '~/helpers/date';

export function List({
  list,
  onPaginate,
  onDisplay,
  onEdit,
  onDelete,
  onLog,
  allowEdit,
  allowDelete,
}) {
  const getType = (item) => {
    if (item.customer) return 'Customer';
    return 'Team/Group';
  };

  const getName = (item) => {
    if (item.customer?.name) return item.customer.name;
    return item.teamGroup.name;
  };

  return (
    <div className="mt-4">
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Type</th>
            <th>Name</th>
            <th>Experience</th>
            <th>Goal</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.rows.map((item) => (
            <tr key={item.id}>
              <td>
                <GiWeightLiftingUp
                  title="Log"
                  className="m-1"
                  size={18}
                  cursor="pointer"
                  onClick={() => onLog(item)}
                />
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
              <td>{getType(item)}</td>
              <td>{getName(item)}</td>
              <td>{item.experienceLevel}</td>
              <td>{item.goal}</td>
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
