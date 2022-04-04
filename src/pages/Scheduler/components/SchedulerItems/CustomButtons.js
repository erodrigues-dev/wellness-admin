import React from 'react';

import { Button } from '@progress/kendo-react-buttons';

import { ButtonsRight } from '~/assets/styleds';

import { useAppointmentContext } from '../../data/AppointmentContext';
import { useBlockContext } from '../../data/BlockContext';
import { useClassContext } from '../../data/ClassContext';

export const CustomButtons = () => {
  const { openNewAppointment } = useAppointmentContext();
  const { openNewClass } = useClassContext();
  const { openNewBlock } = useBlockContext();

  return (
    <ButtonsRight>
      <Button type="button" onClick={() => openNewAppointment()}>
        New
      </Button>
      <Button type="button" onClick={openNewClass}>
        Class
      </Button>
      <Button type="button" onClick={openNewBlock}>
        Block
      </Button>
    </ButtonsRight>
  );
};
