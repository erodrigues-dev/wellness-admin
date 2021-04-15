import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';

import confirmHandler from '~/components/ConfirmAlert/confirmHandler';
import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import * as service from '~/services/employee';

import Filter from './Filter';
import ModalForm from './Form';
import List from './List';

const Employee = () => {
  const { hasPermission } = useAuth();
  const { sendNotification } = useNotification();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.settings.employees.create
  );
  const hasPermissionToUpdate = hasPermission(
    FUNCTIONALITIES.settings.employees.update
  );

  const hasPermissionToDelete = hasPermission(
    FUNCTIONALITIES.settings.employees.delete
  );
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '', email: '' });
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDisplay, setOpenDisplay] = useState(false);
  const [selected, setSelected] = useState();

  const listEmployees = useCallback(async () => {
    try {
      const { data, headers } = await service.index(page, filter);

      setList(data);
      setTotal(parseInt(headers['x-total-count']));
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification, page, filter]);

  const destroyEmployee = useCallback(
    async (item) => {
      try {
        await service.destroy(item);
        listEmployees();
      } catch (error) {
        sendNotification(error.message, false);
      }
    },
    [sendNotification, listEmployees]
  );

  useEffect(() => {
    listEmployees();
  }, [listEmployees]);

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

  function handleEdit(item) {
    setOpenEdit(true);
    setSelected(item);
  }

  function handleDelete(item) {
    console.log('>> hadnle delete');
    confirmHandler('Are you sure to delete this employee?', () =>
      destroyEmployee(item)
    );
  }

  return (
    <Card body>
      <Card.Title>Employee</Card.Title>
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
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleOpenDisplay={handleOpenDisplay}
      />
      <Paginate
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={total}
        onChange={handlePagination}
      />
      {openNew && (
        <ModalForm
          title="New Employee"
          setClose={() => setOpenNew(false)}
          reloadEmployees={listEmployees}
        />
      )}
      {openEdit && (
        <ModalForm
          title="Edit Employee"
          setClose={() => setOpenEdit(false)}
          employee={selected}
          reloadEmployees={listEmployees}
        />
      )}
      {openDisplay && (
        <ModalForm
          title="Display Employee"
          setClose={() => setOpenDisplay(false)}
          employee={selected}
          reloadEmployees={listEmployees}
          display={openDisplay}
        />
      )}
    </Card>
  );
};

export default Employee;
