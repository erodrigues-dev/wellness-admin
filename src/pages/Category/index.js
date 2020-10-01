import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

import Paginate from '~/components/Paginate';
import useAuth from '~/contexts/auth';
import * as service from '~/services/category';

import Filter from './Filter';
import List from './List';

const Category = () => {
  const { hasPermission, ACTIONS } = useAuth();

  const hasPermissionToCreate = hasPermission('employees', ACTIONS.CREATE);
  const hasPermissionToUpdate = hasPermission('employees', ACTIONS.UPDATE);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '' });

  useEffect(() => {
    // service.index(page, filter).then((response) => {
    //   setList(response.data);
    //   setTotal(parseInt(response.headers['x-total-count']));
    // });
  }, [page, filter]);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
  }

  function handlePagination(current) {
    setPage(current);
  }

  return (
    <Card body>
      <Card.Title>Categories</Card.Title>
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

export default Category;
