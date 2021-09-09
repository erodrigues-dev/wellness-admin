import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import service from '~/services/package';

import confirmHandler from '../../components/ConfirmAlert/confirmHandler';
import Filter from './Filter';
import ModalForm from './Form';
import List from './List';

const Package = () => {
  const { hasPermission } = useAuth();
  const hasPermissionToCreate = hasPermission(FUNCTIONALITIES.packages.create);
  const hasPermissionToUpdate = hasPermission(FUNCTIONALITIES.packages.update);
  const hasPermissionToDelete = hasPermission(FUNCTIONALITIES.packages.delete);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '' });
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDisplay, setOpenDisplay] = useState(false);
  const [selected, setSelected] = useState(false);

  const listPackages = useCallback(async () => {
    try {
      const response = await service.index(page, filter);

      setList(response.data);
      setTotal(parseInt(response.headers['x-total-count']));
    } catch (error) {
      toast.error(error.message);
    }
  }, [page, filter]);

  const destroyPackage = useCallback(
    async (id) => {
      try {
        await service.destroy(id);
        await listPackages();
      } catch (error) {
        toast.error(error.message);
      }
    },
    [listPackages]
  );

  useEffect(() => {
    listPackages();
  }, [listPackages]);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
    setPage(1);
  }

  function handlePagination(current) {
    setPage(current);
  }

  function handleDelete(item) {
    confirmHandler('Are you sure to delete this package?', () =>
      destroyPackage(item.id)
    );
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
        allowDelete={hasPermissionToDelete}
        onDelete={handleDelete}
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
        <ModalForm
          title="New Package"
          setClose={() => setOpenNew(false)}
          reloadPackages={listPackages}
        />
      )}
      {openEdit && (
        <ModalForm
          title="Edit Package"
          setClose={() => setOpenEdit(false)}
          selected={selected}
          reloadPackages={listPackages}
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
