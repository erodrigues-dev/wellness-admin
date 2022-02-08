import React from 'react';
import Fit from 'react-fit';
import OutsideClickHandler from 'react-outside-click-handler';
import TimeKeeper from 'react-timekeeper';

import { Container } from './styles';

const TimePicker = ({ value, onChange, onClose, stepMinutes = 10 }) => {
  return (
    <Fit>
      <Container>
        <OutsideClickHandler onOutsideClick={onClose}>
          <TimeKeeper
            switchToMinuteOnHourSelect
            time={value}
            onDoneClick={onClose}
            coarseMinutes={stepMinutes}
            forceCoarseMinutes
            onChange={onChange}
          />
        </OutsideClickHandler>
      </Container>
    </Fit>
  );
};

export default TimePicker;
