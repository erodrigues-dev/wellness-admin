import styled from 'styled-components';

export const ListContainer = styled.ul`
  list-style: none;

  li + li {
    margin-top: 4px;
  }
`;

export const ListItem = styled.li`
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;
