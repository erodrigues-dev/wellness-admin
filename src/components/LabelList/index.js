import React, { useState, useEffect } from 'react';
import { MdOutlineLabel } from 'react-icons/md';
import { RiArrowDownSFill } from 'react-icons/ri';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';

import { listCalendarLabels } from '~/services/calendar-labels';

import ListRender from './LabelRender';
import { Container, OpenListButton, Render } from './styles';

export function LabelList() {
  const [labels, setLabels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    listCalendarLabels()
      .then((response) => setLabels(response.data))
      .catch(() => toast.error('Error on fetch calendar labels'));
  }, []);

  const closeList = () => {
    setShowForm(false);
    setIsOpened(false);
    setSelectedLabel(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedLabel(null);
  };

  const openForm = () => setShowForm(true);

  const handleEditClick = (label) => {
    openForm();
    setSelectedLabel(label);
  };

  return (
    <Container>
      <div className="wrapper">
        <OpenListButton type="button" onClick={() => setIsOpened(true)}>
          <MdOutlineLabel /> Label <RiArrowDownSFill />
        </OpenListButton>
        {isOpened && (
          <OutsideClickHandler onOutsideClick={closeList}>
            <Render>
              <ListRender
                showForm={showForm}
                selectedLabel={selectedLabel}
                handleEditClick={handleEditClick}
                openForm={openForm}
                closeForm={closeForm}
                labels={labels}
              />
            </Render>
          </OutsideClickHandler>
        )}
      </div>
    </Container>
  );
}
