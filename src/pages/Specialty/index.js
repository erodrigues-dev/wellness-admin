import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Modal from '~/components/Modal';
import Paginate from '~/components/Paginate';
import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import * as service from '~/services/specialty';

import confirmHandler from '../../components/ConfirmAlert/confirmHandler';
import Filter from './Filter';
import FormSpecialty from './Form';
import List from './List';

export const Specialty = () => {
  const { hasPermission } = useAuth();

  const hasPermissionToCreate = hasPermission(
    FUNCTIONALITIES.settings.specialties.create
  );
  const hasPermissionToUpdate = hasPermission(
    FUNCTIONALITIES.settings.specialties.update
  );
  const hasPermissionToDelete = hasPermission(
    FUNCTIONALITIES.settings.specialties.delete
  );

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({ name: '' });
  const [selected, setSelected] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState();

  const fetchList = useCallback(() => {
    service
      .list(page, filter)
      .then((response) => {
        setList(response.data);
        setTotal(parseInt(response.headers['x-total-count']));
      })
      .catch(() => toast.error('Unable to list specialties'));
  }, [page, filter]);

  async function handleFilter(filterValues) {
    setFilter(filterValues);
    setPage(1);
  }

  function handlePagination(current) {
    setPage(current);
  }

  function handleOpenModal(item, action) {
    setSelected(item);
    setModalAction(action);
    setIsOpenModal(true);
  }

  function handleDelete(item) {
    confirmHandler('Are you sure want delete this record?', async () => {
      try {
        await service.destroy(item.id);
        fetchList();
        toast.success('Specialty deleted succesfully');
      } catch (error) {
        toast.error(error.message);
      }
    });
  }

  function getTitle() {
    if (!modalAction) return 'Add Specialty';

    if (modalAction === 'display') return 'Display Specialty';

    return 'Edit Specialty';
  }

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <Card body>
      <Card.Title>Specialties</Card.Title>
      <hr />
      <Filter
        handleOpenAdd={handleOpenModal}
        onFilter={handleFilter}
        allowCreate={hasPermissionToCreate}
      />
      <List
        list={list}
        allowEdit={hasPermissionToUpdate}
        allowDelete={hasPermissionToDelete}
        onDisplay={(item) => handleOpenModal(item, 'display')}
        onEdit={(item) => handleOpenModal(item, 'edit')}
        onDelete={handleDelete}
      />
      <Paginate
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={total}
        onChange={handlePagination}
      />
      {isOpenModal && (
        <Modal setClose={setIsOpenModal} title={getTitle()}>
          <FormSpecialty
            onClose={() => setIsOpenModal(false)}
            refreshList={fetchList}
            model={selected}
            action={modalAction}
          />
        </Modal>
      )}
    </Card>
  );
};
