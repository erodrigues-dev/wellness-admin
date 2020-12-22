import React, { useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';

import { Full, Container, Content } from './styles';

const Modal = ({ children, title, setClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  return (
    <Full>
      <Container>
        <Content>
          <header>
            <h1>{title}</h1>
            <RiCloseLine onClick={() => setClose(false)} title="Close" />
          </header>
          <main>{children}</main>
        </Content>
      </Container>
    </Full>
  );
};

export default Modal;
