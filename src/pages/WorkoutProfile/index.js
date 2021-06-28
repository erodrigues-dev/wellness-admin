import React, { useEffect, useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import service from '~/services/workout-profile';

import { List, Filter } from './List';

export function WorkoutProfile() {
  const [list, setList] = useState({
    rows: [],
    filter: {},
    page: 1,
    total: 0,
  });

  const fetchList = useCallback(async (page, filter) => {
    try {
      const { data: rows, headers } = await service.list(page, filter);
      const total = Number(headers['x-total-count']);
      setList((state) => ({
        ...state,
        rows,
        total,
        page,
      }));
    } catch (error) {
      toast.error('Unable to load workout profiles');
    }
  }, []);

  function onPaginate(page) {
    setList((state) => ({ ...state, page }));
  }

  function onFilter(filter) {
    setList((state) => ({ ...state, filter }));
  }

  useEffect(() => {
    fetchList(list.page, list.filter);
  }, [fetchList, list.page, list.filter]);

  return (
    <Card body>
      <Card.Title>Workout Profiles</Card.Title>
      <hr />
      <Filter onFilter={onFilter} />
      <List list={list} onPaginate={onPaginate} />
    </Card>
  );
}
