import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiCheckFill, RiCloseFill } from 'react-icons/ri';

import { Button } from '@progress/kendo-react-buttons';

import { useCalendarLabel } from '../../data/CalendarLabelContext';
import { FooterContainer, HeaderContainer } from '../../styles';
import { CalendarLabelForm } from '../CalendarLabelForm';
import {
  List,
  ListItem,
  LabelButton,
  EditButton,
  ListContainer,
  EmptyText,
} from './styles';

const CalendarListRender = () => {
  const {
    openForm,
    showForm,
    labelToEdit,
    handleEditClick,
    labels,
    handleSelectLabel,
    selectedLabel,
    closeList,
    loading,
  } = useCalendarLabel();

  const isSelected = (label) => selectedLabel?.id === label.id;

  if (showForm) {
    return <CalendarLabelForm isEdit={!!labelToEdit} label={labelToEdit} />;
  }

  return (
    <ListContainer>
      <HeaderContainer>
        <span>Labels</span>
        <button type="button" onClick={closeList} title="Close">
          <RiCloseFill />
        </button>
      </HeaderContainer>
      <List>
        {labels?.map((label) => (
          <ListItem key={label.id}>
            <LabelButton
              type="button"
              color={label.color}
              onClick={() => handleSelectLabel(label)}
              title={label.name}
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
        {labels.length <= 0 && !loading && (
          <EmptyText>No labels yet.</EmptyText>
        )}
      </List>
      <FooterContainer>
        <Button type="button" onClick={openForm}>
          New Label
        </Button>
      </FooterContainer>
    </ListContainer>
  );
};

export default CalendarListRender;
