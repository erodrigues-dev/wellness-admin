import React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@progress/kendo-react-buttons';

import { ButtonsRight } from '~/assets/styleds';

import { useAppointmentContext } from '../data/AppointmentContext';

export const CustomButtons = () => {
  const { openNewAppointment } = useAppointmentContext();

  const notImplementedYet = () => toast.info('Not implemented yet!');

  return (
    <ButtonsRight>
      <Button type="button" onClick={openNewAppointment}>
        New
      </Button>
      <Button type="button" onClick={notImplementedYet}>
        Class
      </Button>
      <Button type="button" onClick={notImplementedYet}>
        Block
      </Button>
    </ButtonsRight>
  );
};
