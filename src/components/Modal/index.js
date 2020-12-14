import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

import { Container, Content } from './styles';

const Modal = ({ children, title, overflowNone, setClose }) => {
  return (
    <Container>
      <Content overflowNone={overflowNone}>
        <header>
          <h1>{title}</h1>
          <RiCloseLine onClick={() => setClose(false)} title="Close" />
        </header>
        <main>{children}</main>
      </Content>
    </Container>
  );
};

export default Modal;
