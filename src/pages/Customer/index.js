import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

import Paginate from '~/components/Paginate';
import useAuth from '~/contexts/auth';
import api from '~/services/api';

import Filter from './Filter';
import List from './List';

const Customer = () => {
  const { hasPermission, ACTIONS } = useAuth();
  const hasPermissionToCreate = hasPermission('customers', ACTIONS.CREATE);
  const hasPermissionToUpdate = hasPermission('customers', ACTIONS.UPDATE);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '', email: '' });

  useEffect(() => {
    api
      .get('/customers', {
        params: {
          ...filter,
          page,
          limit: 10,
        },
      })
      .then((response) => {
        setList(response.data);
        setTotal(parseInt(response.headers['x-total-count']));
      });
  }, [page, filter]);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
  }

  function handlePagination(current) {
    setPage(current);
  }

  return (
    <Card body>
      <Card.Title>Customers</Card.Title>
      <hr />
      <Filter onFilter={handleFilter} allowCreate={hasPermissionToCreate} />
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

export default Customer;