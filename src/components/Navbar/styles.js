import styled from 'styled-components';

export const Container = styled.nav`
  height: 60px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Brand = styled.p`
  line-height: 40px;
  margin: 0;
`;

export const Buttons = styled.div``;

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
    background: #ddd;
  }
`;
