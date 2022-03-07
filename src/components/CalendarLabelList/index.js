import React from 'react';
import { MdOutlineLabel } from 'react-icons/md';
import { RiArrowDownSFill } from 'react-icons/ri';
import OutsideClickHandler from 'react-outside-click-handler';

import CalendarListRender from './components/CalendarListRender';
import {
  CalendarLabelProvider,
  useCalendarLabel,
} from './data/CalendarLabelContext';
import { Container, OpenListButton, Render } from './styles';

export function CalendarLabels() {
  return (
    <CalendarLabelProvider>
      <CalendarLabelList />
    </CalendarLabelProvider>
  );
}

export function CalendarLabelList() {
  const { selectedLabel, setIsOpened, isOpened, closeList } =
    useCalendarLabel();

  return (
    <Container>
      <div className="wrapper">
        <OpenListButton
          type="button"
          onClick={() => setIsOpened(true)}
          color={selectedLabel?.color}
        >
          <MdOutlineLabel /> {selectedLabel?.name ?? 'Label'}{' '}
          <RiArrowDownSFill />
        </OpenListButton>
        {isOpened && (
          <OutsideClickHandler onOutsideClick={closeList}>
            <Render>
              <CalendarListRender />
            </Render>
          </OutsideClickHandler>
        )}
      </div>
    </Container>
  );
}
