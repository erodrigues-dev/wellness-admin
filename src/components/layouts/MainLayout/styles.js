import styled from 'styled-components';

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  min-height: calc(100vh - 60px);
  margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '259px' : 0)};
  transition: margin-left 0.3s;
  min-height: 100vh;

  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 24px 16px 0;
  margin-top: 60px;
`;

export const Footer = styled.footer`
  color: #888;
  text-align: right;
  padding: 12px;
  font-size: 12px;
`;
