import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Avatar from '~/components/Avatar';
import Paginate from '~/components/Paginate';
import useAuth from '~/contexts/auth';
import * as customerService from '~/services/customer';
import service from '~/services/package';

import useNotification from '../../../contexts/notification';
import Filter from './Filter';
import List from './List';

const CustomerPackage = () => {
  const { id } = useParams();
  const { hasPermission, ACTIONS } = useAuth();
  const { sendNotification } = useNotification();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '' });
  const [customer, setCustomer] = useState({});
  const hasPermissionToCreate = hasPermission('packages', ACTIONS.CREATE);
  const hasPermissionToUpdate = hasPermission('packages', ACTIONS.UPDATE);

  useEffect(() => {
    if (id) {
      customerService
        .get(id)
        .then(({ data: { name, imageUrl } }) =>
          setCustomer({
            id,
            name,
            imageUrl,
          })
        )
        .catch(({ message }) => sendNotification(message, false));
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    service.index(page, filter).then((response) => {
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
      <Card.Title>Custom Packages</Card.Title>
      <hr />
      <Avatar
        name={customer.name}
        titleName="Customer"
        imageUrl={customer.imageUrl}
      />
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

export default CustomerPackage;
