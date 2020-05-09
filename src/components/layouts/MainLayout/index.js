import React, { useState, useEffect } from 'react';

import Navbar from '~/components/layouts/Navbar';
import Sidebar from '~/components/layouts/Sidebar';

import { Container, Main, Content, Footer } from './styles';

const MainLayout = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  const handleResize = () => {
    const isOpen = window.innerWidth > 1024;
    setSidebar(isOpen);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToglesidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <Container>
      <Sidebar open={sidebar} />
      <Main sidebarOpen={sidebar}>
        <Navbar sidebarOpen={sidebar} toggleSidebar={handleToglesidebar} />
        <Content>{children}</Content>
        <Footer>&copy; 2020 . Elite Wellness . Performance & Recovery</Footer>
      </Main>
    </Container>
  );
};

export default MainLayout;
