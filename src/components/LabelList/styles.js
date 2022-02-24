import styled from 'styled-components';

export const Container = styled.div``;

export const List = styled.ul``;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 40px;

  button {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MultiSelectFooterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 12px;
`;
