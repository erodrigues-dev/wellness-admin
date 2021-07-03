import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';

import Modal from '~/components/Modal';
import { formatToDisplay } from '~/helpers/date';
import service from '~/services/workout-exercise';

import { ButtonsRight } from '../../assets/styleds';
import confirmHandler from '../../components/ConfirmAlert/confirmHandler';
import Paginate from '../../components/Paginate';
import { WorkoutLogExerciseForm } from './WorkoutLogExerciseForm';

export function WorkoutLogExercises({
  hasCreateUpdatePermission,
  workoutLog,
  onClose,
}) {
  const [modal, setModal] = useState({});
  const [list, setList] = useState({
    rows: [],
    page: 1,
    total: 0,
  });

  const workoutLogId = useMemo(() => workoutLog.id, [workoutLog.id]);

  const fetchList = useCallback(async () => {
    try {
      const { data, headers } = await service.list(list.page, {
        workoutLogId,
      });
      setList({
        page: list.page,
        rows: data,
        total: Number(headers['x-total-count']),
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, [list.page, workoutLogId]);

  function onCreate() {
    setModal({
      isOpen: true,
      isCreate: true,
    });
  }
  function onDisplay(id) {
    setModal({
      id,
      isOpen: true,
      isDisplay: true,
    });
  }
  function onEdit(id) {
    setModal({
      id,
      isOpen: true,
      isEdit: true,
    });
  }
  function onDelete(id) {
    confirmHandler('Are you sure delete this exercise?', async () => {
      try {
        await service.destroy(id);
        fetchList();
        toast.success('Exercise deleted with success.');
      } catch (error) {
        toast.error(error.message);
      }
    });
  }
  function onPaginate(page) {
    setList((state) => ({
      ...state,
      page,
    }));
  }
  function onCloseModal(role) {
    if (role === 'success') fetchList();
    setModal({});
  }

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <Modal width="1200px" title="Workout Exercises" setClose={onClose}>
      <div className="p-4">
        <p style={{ fontWeight: 600, fontSize: '1.2em' }}>
          {workoutLog.resume} <small>{formatToDisplay(workoutLog.date)}</small>
        </p>
        {hasCreateUpdatePermission && (
          <ButtonsRight>
            <Button variant="secondary" onClick={onCreate}>
              Add Exercise
            </Button>
          </ButtonsRight>
        )}
      </div>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th colSpan={2} />
            <th colSpan={2}>Set 1</th>
            <th colSpan={2}>Set 2</th>
            <th colSpan={2}>Set 3</th>
            <th colSpan={2}>Set 4</th>
          </tr>
          <tr>
            <th>Actions</th>
            <th>Exercise</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {list.rows.map((item) => (
            <tr key={item.id}>
              <td>
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
              <td>{item.name}</td>
              <td className="text-center">{item.set1Reps || '-'}</td>
              <td className="text-center">{item.set1Weight || '-'}</td>
              <td className="text-center">{item.set2Reps || '-'}</td>
              <td className="text-center">{item.set2Weight || '-'}</td>
              <td className="text-center">{item.set3Reps || '-'}</td>
              <td className="text-center">{item.set3Weight || '-'}</td>
              <td className="text-center">{item.set4Reps || '-'}</td>
              <td className="text-center">{item.set4Weight || '-'}</td>
            </tr>
          ))}
          {list.total === 0 && (
            <tr>
              <td colSpan={10}>No records found</td>
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

      {modal.isOpen && (
        <WorkoutLogExerciseForm
          workoutLogId={workoutLogId}
          workoutExerciseId={modal.id}
          isCreate={modal.isCreate}
          isEdit={modal.isEdit}
          isDisplay={modal.isDisplay}
          onClose={onCloseModal}
        />
      )}
    </Modal>
  );
}
