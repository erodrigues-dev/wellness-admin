import React from 'react';
import { FiBell } from 'react-icons/fi';

import styled from 'styled-components';

import useNotification from '../../../contexts/notification';

export const NotificationNavbarButton = () => {
  const { list, toggleNotifications } = useNotification();

  return (
    <Container
      title={
        list.unreads > 0 ? `You have ${list.unreads} unreads notifications` : ''
      }
      onClick={toggleNotifications}
    >
      {list.unreads > 0 && <Badge>{list.unreads}</Badge>}
      <FiBell size={22} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Badge = styled.div`
  background: var(--secondary);
  width: 16px;
  height: 16px;
  border-radius: 50%;

  position: absolute;
  top: 0;
  right: 0;

  color: var(--dark);
  line-height: 16px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;
