import React, { useEffect, useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';

import service from '~/services/notification';

import { List } from './List';

export function Notifications() {
  const [list, setList] = useState({
    page: 1,
    total: 0,
    rows: [],
  });

  const allowEdit = true;
  const allowDelete = true;

  const fetch = useCallback(async (page) => {
    const { data, headers } = await service.list(page);
    setList({
      page,
      rows: data,
      total: Number(headers['x-total-count']),
    });
  }, []);

  useEffect(() => {
    fetch(1);
  }, [fetch]);

  return (
    <Card body>
      <Card.Title>Notifications</Card.Title>
      <hr />

      <List
        list={list}
        allowEdit={allowEdit}
        allowDelete={allowDelete}
        onPaginate={fetch}
      />
    </Card>
  );
}
