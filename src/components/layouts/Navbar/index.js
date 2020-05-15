import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, Buttons, Button } from './styles';

const Navbar = ({ sidebarOpen, toggleSidebar }) => (
  <Container>
    <div>
      {!sidebarOpen && (
        <Link to="/">
          <img src="/images/logo-1.png" alt="logo" />
        </Link>
      )}
    </div>
    <Buttons>
      <Button onClick={toggleSidebar}>
        <FiMenu size={22} />
      </Button>
    </Buttons>
  </Container>
);

export default Navbar;
