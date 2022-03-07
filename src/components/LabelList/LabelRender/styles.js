import styled from 'styled-components';

export const List = styled.ul`
  margin-bottom: 0;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 40px;
  column-gap: 8px;
`;

export const LabelButton = styled.button`
  display: flex;
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  padding: 4px 8px;
  color: white;
  transition: all 200ms;

  &:hover {
    background-image: linear-gradient(
      ${(props) => props.color},
      rgba(0, 0, 0, 0.2)
    );
  }
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: transparent;
  transition: all 200ms;
  border-radius: 2px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
