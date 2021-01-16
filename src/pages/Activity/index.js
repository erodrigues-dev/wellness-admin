import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';

import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import * as service from '~/services/activity';

import useNotification from '../../contexts/notification';
import Filter from './Filter';
import List from './List';

const Activity = () => {
  const { sendNotification } = useNotification();
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
  const isMounted = useRef(true);

  useEffect(() => {
    service
      .list(page, filter)
      .then((response) => {
        if (isMounted.current) {
          setList(response.data);
          setTotal(parseInt(response.headers['x-total-count']));
        }
      })
      .catch(({ message }) => sendNotification(message, false));

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [page, filter]);

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
        list={list}
      />
      <List list={list} allowEdit={hasPermissionToUpdate} />
      <Paginate
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={total}
        onChange={handlePagination}
      />
    </Card>
  );
};

export default Activity;
