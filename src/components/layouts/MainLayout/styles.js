import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  min-height: 100vh;
  margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '259px' : 0)};
  transition: margin-left 0.3s;
`;

export const Content = styled.div`
  flex: 1;
  padding: 24px 16px 0;
`;

export const Footer = styled.footer`
  color: #888;
  text-align: right;
  padding: 12px;
  font-size: 12px;
`;
