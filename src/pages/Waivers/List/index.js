import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';

import Paginate from '~/components/Paginate';
import * as dateHelper from '~/helpers/date';

/**
 *
 * @param {{
 *  list: any[],
 *  page: number,
 *  allowEdit: boolean,
 *  allowDelete: boolean,
 *  onDisplay(item):void,
 *  onEdit(item):void,
 *  onDelete(item):void,
 *  onPaginate(page:number):void
 * }} props
 * @returns
 */
export const List = ({
  list,
  page,
  total,
  allowEdit,
  allowDelete,
  onDisplay,
  onEdit,
  onDelete,
  onPaginate,
}) => (
  <div className="mt-4">
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>Actions</th>
          <th>Title</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td>
              <FiEye
                title="Display"
                size={18}
                cursor="pointer"
                onClick={() => onDisplay(item)}
              />
              {allowEdit && (
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
                  onClick={() => onDelete(item)}
                />
              )}
            </td>
            <td>{item.title}</td>
            <td>{dateHelper.formatToList(item.createdAt)}</td>
            <td>{dateHelper.formatToList(item.updatedAt)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Paginate
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={total}
      onChange={onPaginate}
    />
  </div>
);
