import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { toast } from 'react-toastify';

import Modal from '~/components/Modal';
import { formatToDisplay, formatToList } from '~/helpers/date';
import service from '~/services/workout-log';
import { ButtonsRight } from '~assets/styleds';
import confirmHandler from '~components/ConfirmAlert/confirmHandler';
import Paginate from '~components/Paginate';

import { WorkoutLogExercises } from '../WorkoutLogExercises';
import { WorkoutLogForm } from './WorkoutLogForm';

export function WorkoutLog({
  hasCreateUpdatePermission,
  workoutProfile,
  onClose,
}) {
  const [modal, setModal] = useState({});
  const [list, setListState] = useState({
    rows: [],
    page: 1,
    total: 0,
  });

  const workoutProfileId = workoutProfile.id;
  const name = workoutProfile.customer?.name || workoutProfile.teamGroup?.name;

  const fetchList = useCallback(
    async (page) => {
      try {
        const { data, headers } = await service.list(page, {
          workoutProfileId,
        });
        setListState({
          page,
          rows: data,
          total: Number(headers['x-total-count']),
        });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [workoutProfileId]
  );

  function onExercises(log) {
    setModal({
      log,
      type: 'exercises',
      isOpen: true,
    });
  }
  function onCreate() {
    setModal({
      type: 'logs',
      isOpen: true,
      isCreate: true,
    });
  }
  function onDisplay(id) {
    setModal({
      id,
      type: 'logs',
      isDisplay: true,
      isOpen: true,
    });
  }
  function onEdit(id) {
    setModal({
      id,
      type: 'logs',
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
  function onCloseModal({ role, ...data }) {
    if (role === 'created') {
      fetchList(1);
      onExercises(data.createdItem);
    } else if (role === 'updated') {
      fetchList();
      setModal({});
    } else {
      setModal({});
    }
  }

  function getNames(trainers) {
    return trainers
      ?.map((trainer) => trainer.name.split(' ')[0])
      .sort()
      .join(', ');
  }

  useEffect(() => {
    fetchList(list.page);
  }, [fetchList, list.page]);

  return (
    <Modal title="Workout Logs" setClose={onClose}>
      <div className="p-4">
        <p style={{ fontWeight: 600, fontSize: '1.2em' }}>
          {name} <small>{workoutProfile.experienceLevel}</small>
        </p>
        {hasCreateUpdatePermission && (
          <ButtonsRight>
            <Button variant="secondary" onClick={onCreate}>
              Add Log
            </Button>
          </ButtonsRight>
        )}
      </div>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Trainers</th>
            <th>Resume</th>
            <th>Date</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {list.rows.map((item) => (
            <tr key={item.id}>
              <td>
                <GiWeightLiftingUp
                  title="Exercises"
                  className="m-1"
                  size={18}
                  cursor="pointer"
                  onClick={() => onExercises(item)}
                />
                <FiEye
                  title="Display"
                  className="m-1"
                  size={18}
                  cursor="pointer"
                  onClick={() => onDisplay(item.id)}
                />
                {hasCreateUpdatePermission && (
                  <>
                    <FiEdit
                      className="m-1"
                      title="Edit"
                      size={18}
                      cursor="pointer"
                      onClick={() => onEdit(item.id)}
                    />
                    <FiTrash
                      color="var(--danger)"
                      className="m-1"
                      title="Delete"
                      size={18}
                      cursor="pointer"
                      onClick={() => onDelete(item.id)}
                    />
                  </>
                )}
              </td>
              <td>{getNames(item.trainers)}</td>
              <td>{item.resume}</td>
              <td>{formatToDisplay(new Date(item.date))}</td>
              <td>{formatToList(item.createdAt)}</td>
            </tr>
          ))}
          {list.total === 0 && (
            <tr>
              <td colSpan={4}>No records found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Paginate
        activePage={list.page}
        itemsCountPerPage={10}
        totalItemsCount={list.total}
        onChange={onPaginate}
      />

      {modal.type === 'logs' && modal.isOpen && (
        <WorkoutLogForm
          workoutLogId={modal.id}
          workoutProfileId={workoutProfileId}
          isCreate={modal.isCreate}
          isEdit={modal.isEdit}
          isDisplay={modal.isDisplay}
          onClose={onCloseModal}
        />
      )}

      {modal.type === 'exercises' && modal.isOpen && (
        <WorkoutLogExercises
          hasCreateUpdatePermission={hasCreateUpdatePermission}
          workoutLog={modal.log}
          onClose={onCloseModal}
        />
      )}
    </Modal>
  );
}
