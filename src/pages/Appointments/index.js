import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import useToast from '~/hooks/useToast';
import * as appointmentService from '~/services/appointment';

import Details from './Details';
import Filter from './Filter';
import ModalForm from './Form';
import List from './List';

const Appointments = () => {
  const { sendToast } = useToast();
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.appointments.create
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
  const [openDetails, setOpenDetails] = useState(false);
  const [appointment, setAppointment] = useState();

  const listAppointments = useCallback(async () => {
    try {
      const { data, headers } = await appointmentService.list(page, 10, filter);

      setList(data);
      setTotal(parseInt(headers['x-total-count']));
    } catch (error) {
      sendToast(error.message, false);
    }
  }, [page, filter, sendToast]);

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
        <List
          list={list}
          setOpenDetails={setOpenDetails}
          setAppointment={setAppointment}
        />
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
      {openDetails && (
        <Details
          setClose={setOpenDetails}
          reloadAppointments={listAppointments}
          appointment={appointment}
          setAppointment={setAppointment}
        />
      )}
    </>
  );
};

export default Appointments;
