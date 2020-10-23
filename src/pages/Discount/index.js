import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

import Paginate from '~/components/Paginate';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import * as service from '~/services/discount';

import Filter from './Filter';
import List from './List';

const Discount = () => {
  const { sendNotification } = useNotification();
  const { hasPermission, ACTIONS, FUNCTIONALITIES } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.ACTIVITIES,
    ACTIONS.CREATE
  );
  const hasPermissionToUpdate = hasPermission(
    FUNCTIONALITIES.ACTIVITIES,
    ACTIONS.UPDATE
  );

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  // const [filter, setFilter] = useState({ customer: '' });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    service
      .list(page, filter)
      .then((response) => {
        setList(response.data);
        setTotal(parseInt(response.headers['x-total-count']));
      })
      .catch(({ message }) => sendNotification(message, false));
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
      <Card.Title>Discounts</Card.Title>
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

export default Discount;
