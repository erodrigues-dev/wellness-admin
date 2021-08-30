import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import useToast from '~/hooks/useToast';
import * as service from '~/services/discount';

import Filter from './Filter';
import ModalForm from './Form';
import List from './List';

const Discount = () => {
  const { sendToast } = useToast();
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.settings.discount.create
  );
  const hasPermissionToUpdate = hasPermission(
    FUNCTIONALITIES.settings.discount.update
  );

  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ customerId: id, relationName: '' });
  const [openAdd, setOpenAdd] = useState(false);

  const listDiscounts = useCallback(async () => {
    try {
      const { data, headers } = await service.list(page, filter);

      setList(data);
      setTotal(parseInt(headers['x-total-count']));
    } catch (error) {
      sendToast(error.message, false);
    }
  }, [page, filter, sendToast]);

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

  async function handleDelete(discountId) {
    try {
      await service.destroy(discountId);

      sendToast('Discount deleted.');
      listDiscounts();
    } catch (error) {
      sendToast(error.message, false);
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
          customerId={id}
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
