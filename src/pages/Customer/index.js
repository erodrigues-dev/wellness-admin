import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import { index, destroy } from '~/services/customer';

import Filter from './Filter';
import ModalForm from './Form';
import List from './List';

const Customer = () => {
  const { sendNotification } = useNotification();
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(FUNCTIONALITIES.customers.create);
  const hasPermissionToUpdate = hasPermission(FUNCTIONALITIES.customers.update);
  const hasPermissionToDelete = hasPermission(FUNCTIONALITIES.customers.delete);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '', email: '' });
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDisplay, setOpenDisplay] = useState(false);
  const [selected, setSelected] = useState();

  const listCustomers = useCallback(async () => {
    try {
      const { data, headers } = await index(page, filter);
      setList(data);
      setTotal(parseInt(headers['x-total-count']));
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification, filter, page]);

  const destroyCustomer = useCallback(
    async (id) => {
      try {
        await destroy(id);
        sendNotification('Customer deleted with success');
        await listCustomers();
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [sendNotification, listCustomers]
  );

  async function handleFilter(filterValues) {
    setFilter(filterValues);
    setPage(1);
  }

  function handlePagination(current) {
    setPage(current);
  }

  function handleOpenDisplay(item) {
    setOpenDisplay(true);
    setSelected(item);
  }

  function handleOpenEdit(item) {
    setOpenEdit(true);
    setSelected(item);
  }

  function handleDelete(item) {
    confirmHandler(
      'Are you sure to delete this customer, this action is irreversible?',
      () => destroyCustomer(item.id)
    );
  }

  useEffect(() => {
    listCustomers();
  }, [listCustomers]);

  return (
    <Card body>
      <Card.Title>Customers</Card.Title>
      <hr />
      <Filter
        onFilter={handleFilter}
        allowCreate={hasPermissionToCreate}
        setOpenNew={setOpenNew}
      />
      <List
        list={list}
        allowEdit={hasPermissionToUpdate}
        allowDelete={hasPermissionToDelete}
        handleOpenEdit={handleOpenEdit}
        handleOpenDisplay={handleOpenDisplay}
        handleDelete={handleDelete}
      />
      <Paginate
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={total}
        onChange={handlePagination}
      />
      {openNew && (
        <ModalForm
          title="New Customer"
          setClose={() => setOpenNew(false)}
          reloadCustomers={listCustomers}
        />
      )}
      {openEdit && (
        <ModalForm
          title="Edit Customer"
          setClose={() => setOpenEdit(false)}
          customer={selected}
          reloadCustomers={listCustomers}
        />
      )}
      {openDisplay && (
        <ModalForm
          title="Display Customer"
          setClose={() => setOpenDisplay(false)}
          customer={selected}
          reloadCustomers={listCustomers}
          display={openDisplay}
        />
      )}
    </Card>
  );
};

export default Customer;
