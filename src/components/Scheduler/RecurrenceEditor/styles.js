import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-bottom: 16px;

  .k-button.k-state-selected {
    z-index: 1;
  }
`;
