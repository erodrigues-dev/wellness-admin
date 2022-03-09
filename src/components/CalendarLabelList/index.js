import React from 'react';
import { Spinner } from 'react-bootstrap';
import { MdOutlineLabel } from 'react-icons/md';
import { RiArrowDownSFill } from 'react-icons/ri';
import OutsideClickHandler from 'react-outside-click-handler';

import CalendarListRender from './components/CalendarListRender';
import {
  CalendarLabelProvider,
  useCalendarLabel,
} from './data/CalendarLabelContext';
import { Color, Container, OpenListButton, Render } from './styles';

export function CalendarLabels({ value, onChange }) {
  return (
    <CalendarLabelProvider value={value} onChange={onChange}>
      <CalendarLabelList />
    </CalendarLabelProvider>
  );
}

export function CalendarLabelList() {
  const { selectedLabel, setIsOpened, isOpened, closeList, fetchingLabels } =
    useCalendarLabel();

  return (
    <Container>
      <div className="wrapper">
        <OpenListButton
          type="button"
          onClick={() => setIsOpened((prevState) => !prevState)}
          disabled={fetchingLabels}
        >
          <MdOutlineLabel />
          <div className="name" title={selectedLabel?.name ?? 'Label'}>
            <span>{selectedLabel?.name ?? 'Label'}</span>
            {selectedLabel?.color && <Color color={selectedLabel?.color} />}
          </div>
          {fetchingLabels ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              className="spinner mr-2"
            />
          ) : (
            <RiArrowDownSFill />
          )}
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
