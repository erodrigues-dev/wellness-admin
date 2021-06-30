import React, { useEffect, useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { FUNCTIONALITIES } from '~/consts/functionalities';
import useAuth from '~/contexts/auth';
import service from '~/services/workout-profile';

import { FormWorkoutProfile } from './Form';
import { List, Filter } from './List';

export function WorkoutProfile() {
  const { hasPermission } = useAuth();
  const [list, setList] = useState({
    rows: [],
    filter: {},
    page: 1,
    total: 0,
  });
  const [modal, setModal] = useState({});

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
    console.log('>>> onDisplay is called', id);
    setModal({
      id,
      isOpen: true,
      isDisplay: true,
    });
  }

  function onCreate() {
    console.log('>>> onCreate is called!');
    setModal({
      isOpen: true,
      isCreate: true,
    });
  }

  function onEdit(id) {
    console.log('>>> onEdit is called!', id);
    setModal({
      id,
      isOpen: true,
      isEdit: true,
    });
  }

  function onDelete(id) {
    console.log('>>> onDelete is called!', id);
  }

  function onCloseModal(role) {
    if (modal.isCreate && role === 'success') {
      fetchList(1, {});
    }

    if (modal.isEdit && role === 'success') {
      fetchList(list.page, list.filter);
    }

    setModal({});
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
        allowEdit={hasCreateUpdatePermission}
        allowDelete={hasDeletePermission}
      />

      {modal.isOpen && (
        <FormWorkoutProfile
          workoutProfileId={modal.id}
          isCreate={modal.isCreate}
          isEdit={modal.isEdit}
          isDisplay={modal.isDisplay}
          onClose={onCloseModal}
        />
      )}
    </Card>
  );
}
