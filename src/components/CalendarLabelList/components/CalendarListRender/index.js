import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiCheckFill, RiCloseFill } from 'react-icons/ri';

import { Button } from '@progress/kendo-react-buttons';

import { useSchedulerContext } from '~/pages/Scheduler/data/SchedulerContext';

import { useCalendarLabel } from '../../data/CalendarLabelContext';
import { Color, FooterContainer, HeaderContainer } from '../../styles';
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
  const { labels, fetchingLabels } = useSchedulerContext();
  const {
    openForm,
    showForm,
    labelToEdit,
    handleEditClick,
    handleSelectLabel,
    selectedLabel,
    closeList,
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
              onClick={() => handleSelectLabel(label)}
              title={label.name}
            >
              <div>
                <Color color={label.color} />
                <span>{label.name}</span>
              </div>
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
        {labels.length <= 0 && !fetchingLabels && (
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
