import React, { useEffect, useState, useRef } from 'react';
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
  const [buttonPosition, setButtonPosition] = useState(null);
  const openListButtonRef = useRef(null);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setButtonPosition(openListButtonRef?.current?.getBoundingClientRect());
    });
  }, []);

  const getTopPosition = () =>
    `${openListButtonRef?.current?.getBoundingClientRect()?.top + 36}px`;

  const getLeftPosition = () =>
    `${openListButtonRef?.current?.getBoundingClientRect()?.right - 110}px`;

  return (
    <Container>
      <div className="wrapper">
        <OpenListButton
          type="button"
          onClick={() => setIsOpened((prevState) => !prevState)}
          disabled={fetchingLabels}
          ref={openListButtonRef}
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
            <Render
              position={buttonPosition}
              style={{
                position: 'fixed',
                top: getTopPosition(),
                left: getLeftPosition(),
              }}
            >
              <CalendarListRender />
            </Render>
          </OutsideClickHandler>
        )}
      </div>
    </Container>
  );
}
