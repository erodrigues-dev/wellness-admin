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
  const [labelToEdit, setLabelToEdit] = useState(null);
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
    setLabelToEdit(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setLabelToEdit(null);
  };

  const openForm = () => setShowForm(true);

  const handleEditClick = (label) => {
    openForm();
    setLabelToEdit(label);
  };

  const handleSelectLabel = (label) => {
    setSelectedLabel(label);
  };

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
              <ListRender
                showForm={showForm}
                labelToEdit={labelToEdit}
                handleEditClick={handleEditClick}
                openForm={openForm}
                closeForm={closeForm}
                labels={labels}
                selectedLabel={selectedLabel}
                handleSelectLabel={handleSelectLabel}
              />
            </Render>
          </OutsideClickHandler>
        )}
      </div>
    </Container>
  );
}
