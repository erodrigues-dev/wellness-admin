import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';

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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '', email: '' });
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState();

  const listEmpĺoyees = useCallback(async () => {
    try {
      const { data, headers } = await service.index(page, filter);

      setList(data);
      setTotal(parseInt(headers['x-total-count']));
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [sendNotification, page, filter]);

  useEffect(() => {
    listEmpĺoyees();
  }, [listEmpĺoyees]);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
    setPage(1);
  }

  function handlePagination(current) {
    setPage(current);
  }

  function handleEdit(item) {
    setOpenEdit(true);
    setSelected(item);
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
        handleEdit={handleEdit}
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
          reloadEmployees={listEmpĺoyees}
        />
      )}
      {openEdit && (
        <ModalForm
          title="Edit Employee"
          setClose={() => setOpenEdit(false)}
          employee={selected}
          reloadEmployees={listEmpĺoyees}
        />
      )}
    </Card>
  );
};

export default Employee;
