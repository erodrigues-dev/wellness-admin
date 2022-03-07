import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiCheckFill } from 'react-icons/ri';

import { Button } from '@progress/kendo-react-buttons';

import { useCalendarLabel } from '../../data/CalendarLabelContext';
import { FooterContainer, HeaderContainer } from '../../styles';
import { CalendarLabelForm } from '../CalendarLabelForm';
import { List, ListItem, LabelButton, EditButton } from './styles';

const CalendarListRender = () => {
  const {
    openForm,
    showForm,
    labelToEdit,
    handleEditClick,
    closeForm,
    labels,
    handleSelectLabel,
    selectedLabel,
  } = useCalendarLabel();

  const isSelected = (label) => selectedLabel?.id === label.id;

  if (showForm) {
    return (
      <CalendarLabelForm
        isEdit={!!labelToEdit}
        label={labelToEdit}
        closeForm={closeForm}
      />
    );
  }

  return (
    <List>
      <HeaderContainer>Labels</HeaderContainer>
      {labels?.map((label) => (
        <ListItem key={label.id}>
          <LabelButton
            type="button"
            color={label.color}
            onClick={() => handleSelectLabel(label)}
          >
            <span>{label.name}</span>
            {isSelected(label) && <RiCheckFill />}
          </LabelButton>
          <EditButton
            type="button"
            title="Edit"
            onClick={() => handleEditClick(label)}
          >
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

export default CalendarListRender;
