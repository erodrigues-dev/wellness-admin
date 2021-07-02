import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';

import Modal from '~/components/Modal';
import { formatToDisplay, formatToList } from '~/helpers/date';
import service from '~/services/workout-log';

import { ButtonsRight } from '../../assets/styleds';
import confirmHandler from '../../components/ConfirmAlert/confirmHandler';
import Paginate from '../../components/Paginate';
import { WorkoutLogForm } from './WorkoutLogForm';

export function WorkoutLog({ workoutProfile, onClose }) {
  const [modal, setModal] = useState({});
  const [list, setListState] = useState({
    rows: [],
    page: 1,
    total: 0,
  });

  const workoutProfileId = workoutProfile.id;

  const fetchList = useCallback(async () => {
    try {
      const { data, headers } = await service.list(list.page, {
        workoutProfileId,
      });
      setListState({
        page: list.page,
        rows: data,
        total: Number(headers['x-total-count']),
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, [list.page, workoutProfileId]);

  function onCreate() {
    setModal({
      isOpen: true,
      isCreate: true,
    });
  }
  function onDisplay(id) {
    setModal({
      id,
      isDisplay: true,
      isOpen: true,
    });
  }
  function onEdit(id) {
    setModal({
      id,
      isEdit: true,
      isOpen: true,
    });
  }
  function onDelete(id) {
    confirmHandler('Are you sure delete this workout log?', async () => {
      try {
        await service.destroy(id);
        fetchList();
        toast.success('Workout log deleted with success.');
      } catch (error) {
        toast.error(error.message);
      }
    });
  }
  function onPaginate(page) {
    setListState((state) => ({
      ...state,
      page,
    }));
  }
  function onCloseLogModal(role) {
    if (role === 'success') fetchList();
    setModal({});
  }

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <Modal title="Workout Logs" setClose={onClose}>
      <div className="p-4">
        <p style={{ fontWeight: 600, fontSize: '1.2em' }}>
          {workoutProfile.customer.name}{' '}
          <small>{workoutProfile.experienceLevel}</small>
        </p>
        <ButtonsRight>
          <Button variant="secondary" onClick={onCreate}>
            Add Log
          </Button>
        </ButtonsRight>
      </div>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Resume</th>
            <th>Date</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.rows.map((item) => (
            <tr key={item.id}>
              <td>
                <FiEye
                  title="Display"
                  size={18}
                  cursor="pointer"
                  onClick={() => onDisplay(item.id)}
                />
                <FiEdit
                  className="ml-2"
                  title="Edit"
                  size={18}
                  cursor="pointer"
                  onClick={() => onEdit(item.id)}
                />
                <FiTrash
                  color="var(--danger)"
                  className="ml-2"
                  title="Delete"
                  size={18}
                  cursor="pointer"
                  onClick={() => onDelete(item.id)}
                />
              </td>
              <td>{item.resume}</td>
              <td>{formatToDisplay(new Date(item.date))}</td>
              <td>{formatToList(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate
        activePage={list.page}
        itemsCountPerPage={10}
        totalItemsCount={list.total}
        onChange={onPaginate}
      />

      {modal.isOpen && (
        <WorkoutLogForm
          workoutLogId={modal.id}
          workoutProfileId={workoutProfileId}
          isCreate={modal.isCreate}
          isEdit={modal.isEdit}
          isDisplay={modal.isDisplay}
          onClose={onCloseLogModal}
        />
      )}
    </Modal>
  );
}
