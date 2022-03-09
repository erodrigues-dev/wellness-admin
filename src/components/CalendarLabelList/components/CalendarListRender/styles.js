import styled from 'styled-components';

export const ListContainer = styled.div``;

export const List = styled.ul`
  margin-bottom: 0;
  overflow: auto;
  max-height: 200px;
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
  align-items: center;
  width: 100%;
  border-radius: 5px;
  padding: 4px 8px;
  transition: all 200ms;

  &:hover {
    background-image: linear-gradient(
      ${(props) => props.color},
      rgba(0, 0, 0, 0.2)
    );
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    align-self: flex-start;
    text-align: left;

    & > span {
      max-width: 172px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
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

export const EmptyText = styled.p`
  width: 100%;
  text-align: center;
  color: #ccc;
  margin-top: 16px;
`;
