import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { NotificationNavbarButton } from '../../NavBarNotification/NavbarButton';
import { Container, Brand, Buttons, Button } from './styles';

const Navbar = ({ sidebarOpen, toggleSidebar }) => (
  <Container>
    <Brand sidebarOpen={sidebarOpen}>
      <Link to="/">
        <img src="/images/logo-1.png" alt="logo" />
      </Link>
    </Brand>
    <Buttons>
      <NotificationNavbarButton />
      <Button onClick={toggleSidebar}>
        <FiMenu size={22} />
      </Button>
    </Buttons>
  </Container>
);

export default Navbar;
