import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import service from '~/services/team-group';

import { FormTeamGroup } from './Form';
import { List } from './List';

export function TeamGroup() {
  const [data, setData] = useState({
    page: 1,
    count: 0,
    list: [],
    filters: {},
  });
  const [modal, setModal] = useState({});

  const allowCreate = true;
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

  const handleDisplay = ({ id }) => {
    setModal({
      id,
      isDisplay: true,
      isOpen: true,
    });
  };

  const handleCreate = () => {
    setModal({ isOpen: true });
  };

  const handleEdit = ({ id }) => {
    setModal({
      id,
      isOpen: true,
    });
  };

  const handleDelete = ({ id }) => {
    console.log(`>> handle delete ${id}`);
  };

  const handleCloseModal = () => {
    setModal({});
  };

  const handleSaveModal = () => {
    fetchList(1, {});
  };

  const handlePaginate = (page) => {
    setData((state) => ({ ...state, page }));
  };

  useEffect(() => {
    fetchList(data.page, data.filters);
  }, [data.page, data.filters, fetchList]);

  return (
    <Card body>
      <Card.Title>Team/Groups</Card.Title>
      <hr />
      <List
        data={data}
        allowCreate={allowCreate}
        allowEdit={allowEdit}
        allowDelete={allowDelete}
        onPaginate={handlePaginate}
        onDisplay={handleDisplay}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {modal.isOpen && (
        <FormTeamGroup
          id={modal.id}
          isDisplay={modal.isDisplay}
          onClose={handleCloseModal}
          onSave={handleSaveModal}
        />
      )}
    </Card>
  );
}
