import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineLabel } from 'react-icons/md';
import { RiArrowDownSFill } from 'react-icons/ri';
import OutsideClickHandler from 'react-outside-click-handler';

import { Button } from '@progress/kendo-react-buttons';

import {
  Container,
  OpenListButton,
  List,
  ListItem,
  LabelButton,
  EditButton,
  FooterContainer,
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

export function LabelList() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Container>
      <div className="wrapper">
        <OpenListButton type="button" onClick={() => setIsOpened(true)}>
          <MdOutlineLabel /> Label <RiArrowDownSFill />
        </OpenListButton>
        {isOpened && (
          <OutsideClickHandler onOutsideClick={() => setIsOpened(false)}>
            <List>
              {labels?.map((label) => (
                <ListItem key={label.id}>
                  <LabelButton type="button" color={label.color}>
                    {label.name}
                  </LabelButton>
                  <EditButton type="button" title="Edit">
                    <FiEdit />
                  </EditButton>
                </ListItem>
              ))}
              <FooterContainer>
                <Button type="button" onClick={(e) => e.preventDefault()}>
                  New Label
                </Button>
              </FooterContainer>
            </List>
          </OutsideClickHandler>
        )}
      </div>
    </Container>
  );
}
