import React from 'react';

import { useSchedulerContext } from '~/pages/Scheduler/data/SchedulerContext';

import { ClassDetails } from '../ClassDetails';
import { ClassForm } from '../ClassForm';

export const ClassModals = () => {
  const { modal } = useSchedulerContext();
  const { type, isOpen, isEdit, isCreate, isDisplay } = modal;

  if (type !== 'class' || !isOpen) return null;

  return (
    <>
      {isDisplay && <ClassDetails />}
      {(isEdit || isCreate) && <ClassForm />}
    </>
  );
};
