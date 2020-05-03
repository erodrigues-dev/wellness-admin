import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import { Container, Brand, Buttons, Button } from './styles';

const Navbar = () => (
  <Container>
    <Brand>Dashboard</Brand>
    <Buttons>
      <Button>
        <FiLogOut size={22} />
      </Button>
    </Buttons>
  </Container>
);

export default Navbar;
