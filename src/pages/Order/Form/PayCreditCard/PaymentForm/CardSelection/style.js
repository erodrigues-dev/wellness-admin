import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 15px;
`;

export const CardItem = styled.div`
  background-color: ${(props) => (props.selected ? '#42c5be' : '#fff')};
  border: 1px solid ${(props) => (props.selected ? '##b0d04c;' : '#ccc')};
  color: ${(props) => (props.selected ? 'white' : '#132131')};
  border-radius: 0.25rem;
  padding: 15px;
  margin: 0 5px;
  align-self: flex-start;

  svg {
    font-size: 2rem;
    fill: ${(props) => (props.selected ? 'white' : '#132131')};
    margin-right: 5px;
  }
`;
