import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import { index } from '~/services/customer';

import Filter from './Filter';
import List from './List';

const Customer = () => {
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(FUNCTIONALITIES.customers.create);
  const hasPermissionToUpdate = hasPermission(FUNCTIONALITIES.customers.update);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '', email: '' });

  useEffect(() => {
    index(page, filter).then((response) => {
      setList(response.data);
      setTotal(parseInt(response.headers['x-total-count']));
    });
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
