import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import service from '~/services/calendar';

import confirmHandler from '../../components/ConfirmAlert/confirmHandler';
import { Filter } from './Filter';
import { CalendarForm } from './Form';
import { List } from './List';

export function Calendar() {
  const [list, setList] = useState({
    page: 1,
    filters: {},
    rows: [],
    total: 0,
  });
  const [modal, setModal] = useState({});

  const fetchList = useCallback(async (page, filters = {}) => {
    try {
      const { headers, data } = await service.index({ page, filters });

      setList({
        page,
        filters,
        total: Number(headers['x-total-count']),
        rows: data,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  function handleFilter(filters) {
    fetchList(1, filters);
  }

  function handlePaginate(page) {
    fetchList(page);
  }

  function handleCreate() {
    setModal({ action: 'create', isOpen: true });
  }

  function handleEdit(model) {
    setModal({ action: 'edit', isOpen: true, model });
  }

  function handleDisplay(model) {
    setModal({ action: 'display', isOpen: true, model });
  }

  function handleCloseModal({ role }) {
    if (role === 'success') {
      if (modal.action === 'create') fetchList(1);
      if (modal.action === 'edit') fetchList(list.page, list.filters);
    }

    setModal({});
  }

  function handleDelete(id) {
    confirmHandler('Are you sure delete this calendar?', async () => {
      try {
        await service.destroy(id);
        const page = list.rows.length === 1 ? 1 : list.page;
        fetchList(page, list.filters);
        toast.success('Calendar deleted with success');
      } catch (error) {
        toast.error(error.message);
      }
    });
  }

  useEffect(() => {
    fetchList(1);
  }, [fetchList]);

  return (
    <Card body>
      <Card.Title>Calendars</Card.Title>
      <hr />
      <Filter onFilter={handleFilter} onCreate={handleCreate} />
      <List
        list={list}
        onPaginate={handlePaginate}
        onDisplay={handleDisplay}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modal.isOpen && (
        <CalendarForm
          onClose={handleCloseModal}
          action={modal.action}
          model={modal.model}
        />
      )}
    </Card>
  );
}
