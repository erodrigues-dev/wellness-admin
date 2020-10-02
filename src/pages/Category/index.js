import React, { useCallback, useEffect, useState } from 'react';
import { Card, Modal } from 'react-bootstrap';

import Paginate from '~/components/Paginate';
import useAuth from '~/contexts/auth';
import * as service from '~/services/category';

import Filter from './Filter';
import List from './List';
import ModalCategory from './Modal';

const Category = () => {
  const { hasPermission, ACTIONS } = useAuth();

  const hasPermissionToCreate = hasPermission('employees', ACTIONS.CREATE);
  const hasPermissionToUpdate = hasPermission('employees', ACTIONS.UPDATE);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '' });
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();

  function handleOpenAdd(state) {
    setOpenAdd(state);
  }

  const loadCategories = useCallback(() => {
    service.index(page, filter).then((response) => {
      setList(response.data);
      setTotal(parseInt(response.headers['x-total-count']));
    });
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

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
      <Filter
        handleOpenAdd={handleOpenAdd}
        onFilter={handleFilter}
        allowCreate={hasPermissionToCreate}
      />
      <Modal show={openAdd} onHide={() => setOpenAdd(false)}>
        <ModalCategory
          handleOpenModal={handleOpenAdd}
          loadCategories={loadCategories}
        />
      </Modal>
      <Modal show={openEdit} onHide={() => setOpenEdit(false)}>
        <ModalCategory
          handleOpenModal={setOpenEdit}
          loadCategories={loadCategories}
          selectedCategory={selectedCategory}
        />
      </Modal>
      <List
        list={list}
        allowEdit={hasPermissionToUpdate}
        setOpenEdit={setOpenEdit}
        setSelectedCategory={setSelectedCategory}
      />
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
