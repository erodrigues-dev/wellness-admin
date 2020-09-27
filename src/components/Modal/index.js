import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

import { Container, Content } from './styles';

const Modal = ({ children, title, setClose }) => {
  return (
    <Container>
      <Content>
        <header>
          <h1>{title}</h1>
          <RiCloseLine onClick={() => setClose(false)} />
        </header>
        <main>{children}</main>
      </Content>
    </Container>
  );
};

export default Modal;
