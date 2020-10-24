import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit, FiTrash } from 'react-icons/fi';

import * as dateHelper from '~/helpers/date';
import { currency } from '~/helpers/intl';

import ModalForm from '../Form';
import { Container } from './styles';

function List({ list, allowEdit, reloadList, handleDelete }) {
  const formatCurrency = (value) => currency.format(value);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState();

  function handleEdit(item) {
    setOpenEdit(true);
    setSelected(item);
  }

  return (
    <Container>
      <Table style={{ minWidth: 800 }} striped hover responsive>
        <thead>
          <tr>
            <th className="text-center">Actions</th>
            <th>Customer</th>
            <th>Activity/Package</th>
            <th>Discount</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="text-center actions">
                {allowEdit && (
                  <>
                    <FiEdit
                      title="Edit"
                      size="18"
                      className="mr-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleEdit(item)}
                    />
                    <FiTrash
                      title="Delete"
                      size="18"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDelete(item.id)}
                    />
                  </>
                )}
              </td>

              <td>{item.customerName}</td>
              <td>{item.relationName}</td>
              {/* <td>{`${item.value} ${item.type === 'amount' ? '$' : '%'}`}</td> */}
              <td>{`${
                item.type === 'amount'
                  ? formatCurrency(item.value)
                  : `${item.value} %`
              }`}</td>
              <td>{item.type}</td>
              <td>{dateHelper.formatToList(item.createdAt)}</td>
              <td>{item.userName}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan={10}>No record found</td>
            </tr>
          )}
        </tbody>
      </Table>
      {openEdit && (
        <ModalForm
          setClose={setOpenEdit}
          reloadList={reloadList}
          selected={selected}
        />
      )}
    </Container>
  );
}

export default List;
