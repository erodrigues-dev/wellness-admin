import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 16px;

  .wrapper {
    position: relative;
  }
`;

export const OpenListButton = styled.button`
  padding: 4px 8px;
  border-radius: 2px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const List = styled.ul`
  background-color: white;
  position: absolute;
  top: 36px;
  width: 300px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 2;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.2);
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

export const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 12px;
`;
