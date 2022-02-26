import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineLabel } from 'react-icons/md';
import { RiArrowDownSFill } from 'react-icons/ri';
import OutsideClickHandler from 'react-outside-click-handler';

import { Button } from '@progress/kendo-react-buttons';

import { LabelForm } from './LabelForm';
import {
  Container,
  OpenListButton,
  List,
  ListItem,
  LabelButton,
  EditButton,
  FooterContainer,
  Render,
  HeaderContainer,
} from './styles';

const labels = [
  {
    id: 1,
    name: 'teste',
    color: '#333',
  },
  {
    id: 2,
    name: 'teste2',
    color: '#333',
  },
  {
    id: 3,
    name: 'teste3',
    color: '#333',
  },
];

const ListRender = ({
  openForm,
  showForm,
  selectedLabel,
  handleEditClick,
  closeForm,
}) => {
  if (showForm) {
    return (
      <LabelForm
        isEdit={!!selectedLabel}
        label={selectedLabel}
        closeForm={closeForm}
      />
    );
  }

  return (
    <List>
      <HeaderContainer>Labels</HeaderContainer>
      {labels?.map((label) => (
        <ListItem key={label.id}>
          <LabelButton type="button" color={label.color}>
            {label.name}
          </LabelButton>
          <EditButton type="button" title="Edit" onClick={handleEditClick}>
            <FiEdit />
          </EditButton>
        </ListItem>
      ))}
      <FooterContainer>
        <Button type="button" onClick={openForm}>
          New Label
        </Button>
      </FooterContainer>
    </List>
  );
};

export function LabelList() {
  const [showForm, setShowForm] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

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
              />
            </Render>
          </OutsideClickHandler>
        )}
      </div>
    </Container>
  );
}
