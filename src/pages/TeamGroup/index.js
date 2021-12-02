import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import service from '~/services/team-group';

import { List } from './List';

export function TeamGroup() {
  const [data, setData] = useState({
    page: 1,
    count: 0,
    list: [],
    filters: {},
  });

  const allowEdit = true;
  const allowDelete = true;

  const fetchList = useCallback(async (page, filters) => {
    try {
      const response = await service.list({ page, ...filters });
      setData((state) => ({
        ...state,
        page,
        filters,
        count: Number(response.headers['x-total-count']),
        list: response.data,
      }));
    } catch (error) {
      toast.error('Unble to list team groups');
    }
  }, []);

  useEffect(() => {
    fetchList(data.page, data.filters);
  }, [data.page, data.filters, fetchList]);

  return (
    <Card body>
      <Card.Title>Team/Groups</Card.Title>
      <hr />
      <List
        data={data}
        allowEdit={allowEdit}
        allowDelete={allowDelete}
        onPaginate={(page) => setData((state) => ({ ...state, page }))}
      />
    </Card>
  );
}
