import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Paginate from '~/components/Paginate';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import * as appointmentService from '~/services/appointment';

import Filter from './Filter';
import ModalForm from './Form';
import List from './List';

const Appointments = () => {
  const { sendNotification } = useNotification();
  const { hasPermission, ACTIONS, FUNCTIONALITIES } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.SCHEDULES,
    ACTIONS.CREATE
  );

  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({
    customerId: id,
    activityId: '',
    status: '',
    dateStart: '',
    dateEnd: '',
  });
  const [openAdd, setOpenAdd] = useState(false);

  const listAppointments = useCallback(async () => {
    try {
      const { data, headers } = await appointmentService.list(page, 10, filter);

      setList(data);
      setTotal(parseInt(headers['x-total-count']));
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [page, filter, sendNotification]);

  useEffect(() => {
    listAppointments();
  }, [listAppointments]);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
    setPage(1);
  }

  function handlePagination(current) {
    setPage(current);
  }

  async function handleDelete(appointmentId) {
    try {
      await appointmentService.cancel(appointmentId);

      sendNotification('Appointment cancelled successfully');
      listAppointments();
    } catch (error) {
      sendNotification(error.message, false);
    }
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
        <List list={list} handleDelete={handleDelete} />
        <Paginate
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={total}
          onChange={handlePagination}
        />
      </Card>
      {openAdd && (
        <ModalForm
          reloadAppointments={listAppointments}
          setClose={setOpenAdd}
        />
      )}
    </>
  );
};

export default Appointments;
