import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';

import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import * as service from '~/services/activity';

import useToast from '../../hooks/useToast';
import Filter from './Filter';
import ModalForm from './Form';
import List from './List';

const Activity = () => {
  const { sendToast } = useToast();
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.activities.create
  );
  const hasPermissionToUpdate = hasPermission(
    FUNCTIONALITIES.activities.update
  );

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '' });
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDisplay, setOpenDisplay] = useState(false);
  const [selected, setSelected] = useState(false);

  const listActivities = useCallback(async () => {
    try {
      const response = await service.list(page, filter);

      setList(response.data);
      setTotal(parseInt(response.headers['x-total-count']));
    } catch (error) {
      sendToast(error.message, false);
    }
  }, [page, filter, sendToast]);

  useEffect(() => {
    listActivities();
  }, [listActivities]);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
    setPage(1);
  }

  function handlePagination(current) {
    setPage(current);
  }

  return (
    <Card body>
      <Card.Title>Activities</Card.Title>
      <hr />
      <Filter
        onFilter={handleFilter}
        allowCreate={hasPermissionToCreate}
        setOpenNew={setOpenNew}
      />
      <List
        list={list}
        allowEdit={hasPermissionToUpdate}
        setOpenEdit={setOpenEdit}
        setOpenDisplay={setOpenDisplay}
        setSelected={setSelected}
      />
      <Paginate
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={total}
        onChange={handlePagination}
      />
      {openNew && (
        <ModalForm
          title="New Activity"
          setClose={() => setOpenNew(false)}
          reloadActivities={listActivities}
        />
      )}
      {openEdit && (
        <ModalForm
          title="Edit Activity"
          setClose={() => setOpenEdit(false)}
          reloadActivities={listActivities}
          activity={selected}
        />
      )}
      {openDisplay && (
        <ModalForm
          title="Display Activity"
          setClose={() => setOpenDisplay(false)}
          activity={selected}
          display
        />
      )}
    </Card>
  );
};

export default Activity;
