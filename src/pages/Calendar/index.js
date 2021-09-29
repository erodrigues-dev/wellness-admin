import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import service from '~/services/calendar';

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
    setModal({ isCreate: true, isOpen: true });
  }

  function handleCloseModal({ role }) {
    if (modal.isCreate && role === 'success') fetchList(1, list.filters);
    setModal({});
  }

  useEffect(() => {
    fetchList(1);
  }, [fetchList]);

  return (
    <Card body>
      <Card.Title>Calendars</Card.Title>
      <hr />
      <Filter onFilter={handleFilter} onCreate={handleCreate} />
      <List list={list} onPaginate={handlePaginate} />

      {modal.isOpen && <CalendarForm onClose={handleCloseModal} />}
    </Card>
  );
}
