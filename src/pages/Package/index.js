import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import service from '~/services/package';

import Filter from './Filter';
import ModalForm from './Form';
import List from './List';

const Package = () => {
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(FUNCTIONALITIES.packages.create);
  const hasPermissionToUpdate = hasPermission(FUNCTIONALITIES.packages.update);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '' });
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDisplay, setOpenDisplay] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    service
      .index(page, filter)
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

  return (
    <Card body>
      <Card.Title>Packages</Card.Title>
      <hr />
      <Filter
        onFilter={handleFilter}
        allowCreate={hasPermissionToCreate}
        setOpenNew={setOpenNew}
      />
      <List
        list={list}
        allowEdit={hasPermissionToUpdate}
        setOpenDisplay={setOpenDisplay}
        setOpenEdit={setOpenEdit}
        setSelected={setSelected}
      />
      <Paginate
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={total}
        onChange={handlePagination}
      />
      {openNew && (
        <ModalForm title="New Package" setClose={() => setOpenNew(false)} />
      )}
      {openEdit && (
        <ModalForm
          title="Edit Package"
          setClose={() => setOpenEdit(false)}
          selected={selected}
        />
      )}
      {openDisplay && (
        <ModalForm
          title="Display Package"
          setClose={() => setOpenDisplay(false)}
          selected={selected}
          display
        />
      )}
    </Card>
  );
};

export default Package;
