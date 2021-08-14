import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import service from '~/services/notification';

import confirmHandler from '../../components/ConfirmAlert/confirmHandler';
import { NotificationModalForm } from './Form';
import { List } from './List';

export function Notifications() {
  const [list, setList] = useState({
    page: 1,
    total: 0,
    rows: [],
  });
  const [modal, setModal] = useState({});
  const { hasPermission } = useAuth();
  const allowDelete = hasPermission(FUNCTIONALITIES.notifications.delete);

  const fetch = useCallback(async (page) => {
    const { data, headers } = await service.list(page);
    setList({
      page,
      rows: data,
      total: Number(headers['x-total-count']),
    });
  }, []);

  function onDisplay(data) {
    setModal({
      isOpen: true,
      isDisplay: true,
      data,
    });
  }

  function onCreate(data) {
    setModal({
      isOpen: true,
      isCreate: true,
      data,
    });
  }

  function onDelete(data) {
    confirmHandler('Are you sure delete this notification?', async () => {
      try {
        await service.destroy(data.id);
        fetch(list.page);
        toast.success('Notification deleted with success.');
      } catch (error) {
        toast.error(error.message);
      }
    });
  }

  function onClose(event) {
    setModal({});
    if (event?.role === 'created') fetch(1);
  }

  useEffect(() => {
    fetch(1);
  }, [fetch]);

  return (
    <Card body>
      <Card.Title>Notifications</Card.Title>
      <hr />

      <div className="mt-4 d-flex justify-content-end">
        <Button variant="secondary" onClick={onCreate}>
          Add Notification
        </Button>
      </div>

      <List
        list={list}
        allowDelete={allowDelete}
        onPaginate={fetch}
        onDisplay={onDisplay}
        onDelete={onDelete}
      />

      {modal.isOpen && (
        <NotificationModalForm state={modal} onClose={onClose} />
      )}
    </Card>
  );
}
