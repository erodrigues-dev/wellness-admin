import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import service from '~/services/waiver';

import { Filter } from './Filter';
import { List } from './List';

export const Waiver = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const fetchList = useCallback(async () => {
    try {
      const { data, headers } = await service.list(page, filters);
      setList(data);
      setTotal(Number(headers['x-total-count']));
    } catch (error) {
      toast.error('Unable to list waivers');
    }
  }, [page, filters]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <Card body>
      <Card.Title>Waivers</Card.Title>
      <hr />
      <Filter onFilter={setFilters} allowCreate onCreate={() => {}} />
      <List
        list={list}
        total={total}
        page={1}
        allowEdit
        allowDelete
        onDisplay={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        onPaginate={setPage}
      />
    </Card>
  );
};
