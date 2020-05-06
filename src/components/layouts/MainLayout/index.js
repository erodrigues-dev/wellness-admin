import React, { useState } from 'react';

import Navbar from '~/components/layouts/Navbar';
import Sidebar from '~/components/layouts/Sidebar';

import { Container, Main, Content, Footer } from './styles';

const MainLayout = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);

  const handleToglesidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <Container>
      <Sidebar open={sidebar} />
      <Main sidebarOpen={sidebar}>
        <Navbar toggleSidebar={handleToglesidebar} />
        <Content>{children}</Content>
        <Footer>&copy; 2020 . Elite Wellness . Performance & Recovery</Footer>
      </Main>
    </Container>
  );
};

export default MainLayout;
