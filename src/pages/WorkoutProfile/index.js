import React, { useEffect, useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import service from '~/services/workout-profile';
import confirmHandler from '~components/ConfirmAlert/confirmHandler';

import { WorkoutLog } from '../WorkoutLog';
import { FormWorkoutProfile } from './Form';
import { List, Filter } from './List';

export function WorkoutProfile() {
  const { hasPermission } = useAuth();
  const [modal, setModal] = useState({});
  const [list, setList] = useState({
    rows: [],
    filter: {},
    page: 1,
    total: 0,
  });

  const hasCreateUpdatePermission = hasPermission(
    FUNCTIONALITIES.workoutProfile.createUpdate
  );
  const hasDeletePermission = hasPermission(
    FUNCTIONALITIES.workoutProfile.delete
  );

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

  function onDisplay(id) {
    setModal({
      id,
      isOpen: true,
      isDisplay: true,
      type: 'workout-profile',
    });
  }

  function onCreate() {
    setModal({
      isOpen: true,
      isCreate: true,
      type: 'workout-profile',
    });
  }

  function onEdit(id) {
    setModal({
      id,
      isOpen: true,
      isEdit: true,
      type: 'workout-profile',
    });
  }

  function onDelete(id) {
    const callback = async () => {
      try {
        await service.destroy(id);
        await fetchList(list.page, list.filter);
        toast.success('Workout profile deleted with success.');
      } catch (error) {
        toast.error(error.message);
      }
    };

    confirmHandler('Are you sure delete this workout profile?', callback);
  }

  function onLog(item) {
    setModal({
      item,
      isOpen: true,
      type: 'workout-log',
    });
  }

  function onCloseModal({ role, ...data }) {
    if (modal.isCreate && role === 'created') {
      fetchList(1, {});
      onLog(data.createdItem);
    } else if (modal.isEdit && role === 'updated') {
      fetchList(list.page, list.filter);
      setModal({});
    } else setModal({});
  }

  useEffect(() => {
    fetchList(list.page, list.filter);
  }, [fetchList, list.page, list.filter]);

  return (
    <Card body>
      <Card.Title>Workout Profiles</Card.Title>
      <hr />
      <Filter
        onFilter={onFilter}
        allowCreate={hasCreateUpdatePermission}
        onCreate={onCreate}
      />
      <List
        list={list}
        onPaginate={onPaginate}
        onDisplay={onDisplay}
        onEdit={onEdit}
        onDelete={onDelete}
        onLog={onLog}
        allowEdit={hasCreateUpdatePermission}
        allowDelete={hasDeletePermission}
      />

      {modal.type === 'workout-profile' && modal.isOpen && (
        <FormWorkoutProfile
          workoutProfileId={modal.id}
          isCreate={modal.isCreate}
          isEdit={modal.isEdit}
          isDisplay={modal.isDisplay}
          onClose={onCloseModal}
        />
      )}

      {modal.type === 'workout-log' && modal.isOpen && (
        <WorkoutLog
          hasCreateUpdatePermission={hasCreateUpdatePermission}
          workoutProfile={modal.item}
          onClose={onCloseModal}
        />
      )}
    </Card>
  );
}
