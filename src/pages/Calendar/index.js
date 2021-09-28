import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import service from '~/services/calendar';

import { Filter } from './Filter';
import { List } from './List';

export function Calendar() {
  const [list, setList] = useState({
    page: 1,
    filters: {},
    rows: [],
    total: 0,
  });

  const fetchList = useCallback(async (page) => {
    try {
      const { headers, data } = await service.index({ page });

      setList({
        page,
        total: Number(headers['x-total-count']),
        rows: data,
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  function handlePaginate(page) {
    fetchList(page);
  }

  useEffect(() => {
    fetchList(1);
  }, [fetchList]);

  return (
    <Card body>
      <Card.Title>Calendars</Card.Title>
      <hr />
      <Filter />
      <List list={list} onPaginate={handlePaginate} />
    </Card>
  );
}
