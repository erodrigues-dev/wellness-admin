import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

import Modal from '~/components/Modal';
import Paginate from '~/components/Paginate';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import * as service from '~/services/order';

import Filter from './Filter';
import OrderWizard from './Form';
import List from './List';

const Order = () => {
  const { sendNotification } = useNotification();
  const { hasPermission, ACTIONS, FUNCTIONALITIES } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.CHECKOUT,
    ACTIONS.CREATE
  );

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ customerId: '' });
  const [openAdd, setOpenAdd] = useState(true);
  // const [openAdd, setOpenAdd] = useState(true);

  const listOrders = useCallback(async () => {
    try {
      let response;
      if (filter.customerId) response = await service.list(page, 10, filter);
      else response = await service.list(page);

      setList(response.data);
      setTotal(parseInt(response.headers['x-total-count']));
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [page, filter, sendNotification]);

  useEffect(() => {
    listOrders();
  }, [listOrders]);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
    setPage(1);
  }

  function handlePagination(current) {
    setPage(current);
  }

  // CANCELAR REQUEST DO USEEFFECT

  return (
    <>
      <Card body>
        <Card.Title>Orders</Card.Title>
        <hr />
        <Filter
          onFilter={handleFilter}
          allowCreate={hasPermissionToCreate}
          list={list}
          setOpenAdd={setOpenAdd}
        />
        <List list={list} />
        <Paginate
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={total}
          onChange={handlePagination}
        />
      </Card>
      {openAdd && (
        <Modal title="Create Order" setClose={setOpenAdd}>
          <OrderWizard reloadOrders={listOrders} setClose={setOpenAdd} />
        </Modal>
      )}
    </>
  );
};

export default Order;
