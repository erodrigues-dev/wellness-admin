import React from 'react';
import { FiMenu } from 'react-icons/fi';

import { Container, Buttons, Button } from './styles';

const Navbar = ({ sidebarOpen, toggleSidebar }) => (
  <Container>
    <div>{!sidebarOpen && <img src="/images/logo-1.png" alt="logo" />}</div>
    <Buttons>
      <Button onClick={toggleSidebar}>
        <FiMenu size={22} />
      </Button>
    </Buttons>
  </Container>
);

export default Navbar;
