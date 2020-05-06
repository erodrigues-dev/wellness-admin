import React from 'react';
import { FiMenu } from 'react-icons/fi';

import { Container, Brand, Buttons, Button } from './styles';

const Navbar = ({ toggleSidebar }) => (
  <Container>
    <Brand>Dashboard</Brand>
    <Buttons>
      <Button onClick={toggleSidebar}>
        <FiMenu size={22} />
      </Button>
    </Buttons>
  </Container>
);

export default Navbar;
