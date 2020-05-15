import styled from 'styled-components';

export const Container = styled.nav`
  background: linear-gradient(to right, #282828 0%, #111 100%);
  background-size: 150% 150%;
  height: 60px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;

export const Brand = styled.div`
  width: ${({ sidebarOpen }) => (sidebarOpen ? '260px' : '160px')};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.3s;
`;

export const Buttons = styled.div`
  display: flex;
`;

export const Button = styled.div`
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
