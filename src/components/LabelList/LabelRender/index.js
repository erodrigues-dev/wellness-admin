import React from 'react';
import { FiEdit } from 'react-icons/fi';

import { Button } from '@progress/kendo-react-buttons';

import { LabelForm } from '../LabelForm';
import { FooterContainer, HeaderContainer } from '../styles';
import { List, ListItem, LabelButton, EditButton } from './styles';

const ListRender = ({
  openForm,
  showForm,
  selectedLabel,
  handleEditClick,
  closeForm,
  labels,
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

export default ListRender;
