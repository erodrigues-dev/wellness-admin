import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash, FiCalendar } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Paginate from '~/components/Paginate';
import { config } from '~/helpers/config';
import { formatToList } from '~/helpers/date';

export function List({
  list,
  allowUpdate,
  allowDelete,
  onPaginate,
  onDisplay,
  onEdit,
  onDelete,
}) {
  const history = useHistory();

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
                {allowUpdate && (
                  <FiEdit
                    title="Edit"
                    size={18}
                    cursor="pointer"
                    className="ml-2"
                    onClick={() => onEdit(item)}
                  />
                )}
                {allowDelete && (
                  <FiTrash
                    color="var(--danger)"
                    title="Delete"
                    size={18}
                    cursor="pointer"
                    className="ml-2"
                    onClick={() => onDelete(item.id)}
                  />
                )}
                <FiCalendar
                  title="Availability"
                  size={18}
                  cursor="pointer"
                  className="ml-2"
                  onClick={() => history.push(`calendars/${item.id}/slots`)}
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
