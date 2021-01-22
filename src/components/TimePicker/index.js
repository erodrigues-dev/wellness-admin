import React from 'react';
import Fit from 'react-fit';
import OutsideClickHandler from 'react-outside-click-handler';
import TimeKeeper from 'react-timekeeper';

import { Container } from './styles';

const TimePicker = ({ value, onChange, onClose }) => {
  return (
    <Fit>
      <Container>
        <OutsideClickHandler onOutsideClick={onClose}>
          <TimeKeeper
            switchToMinuteOnHourSelect
            time={value}
            onDoneClick={onClose}
            coarseMinutes={10}
            forceCoarseMinutes
            onChange={({ formatted12 }) => onChange(formatted12)}
          />
        </OutsideClickHandler>
      </Container>
    </Fit>
  );
};

export default TimePicker;
