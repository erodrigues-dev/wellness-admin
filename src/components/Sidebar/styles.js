import styled from 'styled-components';

export const Container = styled.aside`
  width: 260px;
  background: linear-gradient(to bottom, #282828 0%, #111 100%);
  background-size: 150% 150%;
  display: flex;
  flex-direction: column;
`;

export const Top = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Logo = styled.img`
  margin: 0 8px;
  height: 30px;
`;

export const Title = styled.p`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
  color: #eee;
  margin: 0;
`;

export const Content = styled.div`
  flex: 1;
`;
export const Itens = styled.ul`
  margin-top: 20px;
`;
export const Item = styled.li`
  color: #fff;
  margin: 8px 16px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  height: 50px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  border-radius: 4px;
  transition: background-color 0.2s;
  cursor: pointer;

  &.active,
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const Icon = styled.div`
  margin-right: 16px;
  font-weight: 400;
`;
