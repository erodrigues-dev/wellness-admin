import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 15px;
`;

export const CardItem = styled.div`
  background-color: ${(props) => (props.selected ? '#9ce81a' : '#fff')};
  border: 1px solid ${(props) => (props.selected ? '#b0d04c' : '#ccc')};
  border-radius: 0.25rem;
  padding: 15px;
  margin: 0 5px;

  svg {
    font-size: 2rem;
    fill: #132131;
    margin-right: 5px;
  }
`;
