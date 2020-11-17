import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

import Paginate from '~/components/Paginate';
import useAuth from '~/contexts/auth';
import useNotification from '~/contexts/notification';
import * as service from '~/services/discount';

import Filter from './Filter';
import ModalForm from './Form';
import List from './List';

const Discount = () => {
  const { sendNotification } = useNotification();
  const { hasPermission, ACTIONS, FUNCTIONALITIES } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.DISCOUNTS,
    ACTIONS.CREATE
  );
  const hasPermissionToUpdate = hasPermission(
    FUNCTIONALITIES.DISCOUNTS,
    ACTIONS.UPDATE
  );

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ customerId: '', relationName: '' });
  const [openAdd, setOpenAdd] = useState(true);

  const listDiscounts = useCallback(async () => {
    try {
      const { data, headers } = await service.list(page, filter);

      setList(data);
      setTotal(parseInt(headers['x-total-count']));
    } catch (error) {
      sendNotification(error.message, false);
    }
  }, [page, filter, sendNotification]);

  useEffect(() => {
    listDiscounts();
  }, [listDiscounts]);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
    setPage(1);
  }

  function handlePagination(current) {
    setPage(current);
  }

  async function handleDelete(id) {
    try {
      await service.destroy(id);

      sendNotification('Discount deleted.');
      listDiscounts();
    } catch (error) {
      sendNotification(error.message, false);
    }
  }

  return (
    <>
      <Card body>
        <Card.Title>Discounts</Card.Title>
        <hr />
        <Filter
          onFilter={handleFilter}
          allowCreate={hasPermissionToCreate}
          list={list}
          setOpenAdd={setOpenAdd}
        />
        <List
          list={list}
          allowEdit={hasPermissionToUpdate}
          reloadList={listDiscounts}
          handleDelete={handleDelete}
        />
        <Paginate
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={total}
          onChange={handlePagination}
        />
      </Card>
      {openAdd && (
        <ModalForm setClose={setOpenAdd} reloadList={listDiscounts} />
      )}
    </>
  );
};

export default Discount;
