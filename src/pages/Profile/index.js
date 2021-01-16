import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from 'react-bootstrap';

import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import * as service from '~/services/profile';

import Filter from './Filter';
import Form from './Form';
import List from './List';

function Profile() {
  const { hasPermission } = useAuth();
  const { sendNotification } = useNotification();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.settings.profiles.create
  );
  const hasPermissionToUpdate = hasPermission(
    FUNCTIONALITIES.settings.profiles.update
  );
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '', description: '' });
  const [selected, setSelected] = useState();
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const isMounted = useRef(true);

  const listProfiles = useCallback(async () => {
    try {
      const { headers, data } = await service.list(page, filter);

      if (isMounted.current) {
        setList(data);
        setTotal(parseInt(headers['x-total-count']));
      }
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [filter, page, sendNotification]);

  useEffect(() => {
    listProfiles();

    return () => {
      isMounted.current = false;
    };
  }, [listProfiles]);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
    setPage(1);
  }

  function handlePagination(current) {
    setPage(current);
  }

  return (
    <Card body>
      <Card.Title>Profiles</Card.Title>
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
        setSelected={setSelected}
      />
      <Paginate
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={total}
        onChange={handlePagination}
      />

      {openNew && <Form setClose={setOpenNew} reloadProfiles={listProfiles} />}
      {openEdit && (
        <Form
          setClose={setOpenEdit}
          profileId={selected}
          reloadProfiles={listProfiles}
        />
      )}
    </Card>
  );
}

export default Profile;
