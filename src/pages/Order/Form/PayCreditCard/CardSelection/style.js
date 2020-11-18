import styled from 'styled-components';

export const Container = styled.div``;

export const CardItem = styled.div`
  background-color: ${(props) => (props.selected ? '#9ce81a' : '#ccc')};
  border: 1px solid ${(props) => (props.selected ? '#b0d04c' : '#ccc')};
  border-radius: 2px;
  padding: 15px;
  margin: 0 5px;

  svg {
    font-size: 2rem;
    fill: #132131;
  }
`;
