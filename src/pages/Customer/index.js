import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import { index } from '~/services/customer';

import Filter from './Filter';
import ModalForm from './Form';
import List from './List';

const Customer = () => {
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(FUNCTIONALITIES.customers.create);
  const hasPermissionToUpdate = hasPermission(FUNCTIONALITIES.customers.update);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '', email: '' });
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    index(page, filter)
      .then((response) => {
        setList(response.data);
        setTotal(parseInt(response.headers['x-total-count']));
      })
      .catch((error) => toast.error(error.message));
  }, [page, filter]);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
    setPage(1);
  }

  function handlePagination(current) {
    setPage(current);
  }

  function handleOpenEdit(item) {
    setOpenEdit(true);
    setSelected(item);
  }

  return (
    <Card body>
      <Card.Title>Customers</Card.Title>
      <hr />
      <Filter
        onFilter={handleFilter}
        allowCreate={hasPermissionToCreate}
        setOpenNew={setOpenNew}
      />
      <List
        list={list}
        allowEdit={hasPermissionToUpdate}
        handleOpenEdit={handleOpenEdit}
      />
      <Paginate
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={total}
        onChange={handlePagination}
      />
      {openNew && (
        <ModalForm title="New Customer" setClose={() => setOpenNew(false)} />
      )}
      {openEdit && (
        <ModalForm
          title="Edit Customer"
          setClose={() => setOpenEdit(false)}
          customer={selected}
        />
      )}
    </Card>
  );
};

export default Customer;
