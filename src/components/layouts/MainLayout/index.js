import React from 'react';

import Navbar from '~/components/Navbar';
import Sidebar from '~/components/Sidebar';

import { Container, Main, Content, Footer } from './styles';

const MainLayout = ({ children }) => (
  <Container>
    <Sidebar />
    <Main>
      <Navbar />
      <Content>{children}</Content>
      <Footer>&copy; 2020 . Performance & Recovery</Footer>
    </Main>
  </Container>
);

export default MainLayout;
