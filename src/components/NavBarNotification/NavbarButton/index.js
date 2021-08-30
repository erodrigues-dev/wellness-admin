import React from 'react';
import { FiBell } from 'react-icons/fi';

import useNavBarNotification, {
  NavBarNotificationProvider,
} from '~/contexts/navBarNotification';

import { Container, Badge } from './styles';

export const NotificationNavbarButton = () => (
  <NavBarNotificationProvider>
    <NavbarButton />
  </NavBarNotificationProvider>
);

const NavbarButton = () => {
  const { list, toggleNotifications } = useNavBarNotification();

  return (
    <Container
      title={
        list.unreads > 0 ? `You have ${list.unreads} unreads notifications` : ''
      }
      onClick={toggleNotifications}
    >
      {list.unreads > 0 && <Badge>{list.unreads}</Badge>}
      <FiBell size={22} color="#fff" />
    </Container>
  );
};
