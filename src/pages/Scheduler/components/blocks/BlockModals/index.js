import React from 'react';

import { useSchedulerContext } from '~/pages/Scheduler/data/SchedulerContext';

import { BlockForm } from '../BlockForm';

export const BlockModals = () => {
  const { modal } = useSchedulerContext();
  const { type, isEdit, isCreate, isOpen } = modal;

  if (type === 'block' && (isEdit || isCreate) && isOpen) return <BlockForm />;

  return null;
};
