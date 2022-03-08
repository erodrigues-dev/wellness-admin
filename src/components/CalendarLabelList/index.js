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
    <OutsideClickHandler onOutsideClick={closeList}>
      <Container>
        <div className="wrapper">
          <OpenListButton
            type="button"
            onClick={() => setIsOpened((prevState) => !prevState)}
            color={selectedLabel?.color}
          >
            <MdOutlineLabel /> {selectedLabel?.name ?? 'Label'}{' '}
            <RiArrowDownSFill />
          </OpenListButton>
          {isOpened && (
            <Render>
              <CalendarListRender />
            </Render>
          )}
        </div>
      </Container>
    </OutsideClickHandler>
  );
}
