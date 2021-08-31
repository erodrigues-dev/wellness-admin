import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import useToast from '~/hooks/useToast';
import * as service from '~/services/order';

import Details from './Details';
import Filter from './Filter';
import OrderWizard from './Form';
import List from './List';

const Order = () => {
  const { sendToast } = useToast();
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(FUNCTIONALITIES.orders.create);
  const hasPermissionToUpdate = hasPermission(FUNCTIONALITIES.orders.create);

  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ customerId: id, customerName: '' });
  const [openAdd, setOpenAdd] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [orderId, setOrderId] = useState();

  const listOrders = useCallback(async () => {
    try {
      const response = await service.list(page, 10, filter);

      setList(response.data);
      setTotal(parseInt(response.headers['x-total-count']));
    } catch (error) {
      sendToast(error.message, false);
    }
  }, [page, filter, sendToast]);

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
          customerId={id}
        />
        <List
          list={list}
          setOrderId={setOrderId}
          setOpenDetails={setOpenDetails}
        />
        <Paginate
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={total}
          onChange={handlePagination}
        />
      </Card>
      {openAdd && (
        <OrderWizard
          reloadOrders={listOrders}
          openAdd={openAdd}
          setClose={setOpenAdd}
        />
      )}
      {openDetails && (
        <Details
          setClose={setOpenDetails}
          reloadOrders={listOrders}
          orderId={orderId}
          hasPermissionToUpdate={hasPermissionToUpdate}
        />
      )}
    </>
  );
};

export default Order;
