import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FiBell, FiX } from 'react-icons/fi';

import {
  Container,
  Header,
  CloseButton,
  List,
  Item,
  ReadStatus,
  EmptyList,
} from './styles';

export function NotificationSuspensionList({ onClose }) {
  return (
    <Container>
      <Header>
        <h1>Notifications</h1>
        <CloseButton onClick={onClose}>
          <FiX size={22} />
        </CloseButton>
      </Header>
      <Scrollbars autoHeightMax="400px" autoHeight>
        <List>
          <Item>
            <ReadStatus />
            <div>
              <h2>Titulo da notificação</h2>
              <p>2 days ago by Josi Pinheiro</p>
            </div>
          </Item>
          {1 === 2 && (
            <EmptyList>
              <p>No unread notifications</p>
              <FiBell size={32} />
            </EmptyList>
          )}
        </List>
      </Scrollbars>
    </Container>
  );
}
