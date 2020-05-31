import React, { useState, useEffect } from 'react';

import Navbar from '~/components/layouts/Navbar';
import Sidebar from '~/components/layouts/Sidebar';

import { Main, Content, Footer } from './styles';

const MainLayout = ({ children, routes }) => {
  const [sidebar, setSidebar] = useState(true);

  const handleResize = () => {
    const isOpen = window.innerWidth > 1024;
    setSidebar(isOpen);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToglesidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <Navbar sidebarOpen={sidebar} toggleSidebar={handleToglesidebar} />
      <Sidebar open={sidebar} routes={routes} />
      <Main sidebarOpen={sidebar}>
        <Content>{children}</Content>
        <Footer>&copy; 2020 . Elite Wellness . Performance & Recovery</Footer>
      </Main>
    </>
  );
};

export default MainLayout;
