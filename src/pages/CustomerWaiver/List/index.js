import React from 'react';
import { Table } from 'react-bootstrap';
import { FiTrash, FiEye } from 'react-icons/fi';
import { MdFingerprint } from 'react-icons/md';

import Paginate from '~/components/Paginate';
import { formatToList } from '~/helpers/date';

export const List = ({
  data,
  allowEdit,
  allowDelete,
  onSign,
  onDisplay,
  onDelete,
  onPaginate,
}) => {
  const isSigned = (item) => Boolean(item.signedAt);

  return (
    <div className="mt-4">
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Title</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.list.map((item) => (
            <tr key={item.id}>
              <td>
                <FiEye
                  title="Display"
                  size={18}
                  cursor="pointer"
                  onClick={() => onDisplay(item)}
                />
                {allowEdit && !isSigned(item) && (
                  <MdFingerprint
                    className="ml-2"
                    title="Sign"
                    size={18}
                    cursor="pointer"
                    onClick={() => onSign(item)}
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
              <td>{item.waiver.title}</td>
              <td>{formatToList(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate
        activePage={data.page}
        itemsCountPerPage={data.limit}
        totalItemsCount={data.total}
        onChange={onPaginate}
      />
    </div>
  );
};
