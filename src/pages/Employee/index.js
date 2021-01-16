import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import * as service from '~/services/employee';

import Filter from './Filter';
import List from './List';

const Employee = () => {
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.settings.employees.create
  );
  const hasPermissionToUpdate = hasPermission(
    FUNCTIONALITIES.settings.employees.update
  );
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '', email: '' });
  const isMounted = useRef(true);

  useEffect(() => {
    service
      .index(page, filter)
      .then((response) => {
        if (isMounted.current) {
          setList(response.data);
          setTotal(parseInt(response.headers['x-total-count']));
        }
      })
      .catch((error) => toast.error(error.message));

    return () => {
      isMounted.current = false;
    };
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
      <Card.Title>Employee</Card.Title>
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

export default Employee;
