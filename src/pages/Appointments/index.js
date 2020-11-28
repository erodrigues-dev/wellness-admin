import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

import Paginate from '~/components/Paginate';
import useAuth from '~/contexts/auth';

import Filter from './Filter';
import ModalForm from './Form';
import List from './List';

const Appointments = () => {
  // const { sendNotification } = useNotification();
  const { hasPermission, ACTIONS, FUNCTIONALITIES } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.CHECKOUT,
    ACTIONS.CREATE
  );

  const [page, setPage] = useState(1);
  const [total] = useState(0);
  const [list] = useState([]);
  const [, setFilter] = useState({ customerId: '' });
  const [openAdd, setOpenAdd] = useState(false);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
    setPage(1);
  }

  function handlePagination(current) {
    setPage(current);
  }

  return (
    <>
      <Card body>
        <Card.Title>Appointments</Card.Title>
        <hr />
        <Filter
          onFilter={handleFilter}
          allowCreate={hasPermissionToCreate}
          list={list}
          setOpenAdd={setOpenAdd}
        />
        <List list={list} />
        <Paginate
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={total}
          onChange={handlePagination}
        />
      </Card>
      {openAdd && <ModalForm reloadAppointments="" setClose={setOpenAdd} />}
    </>
  );
};

export default Appointments;
