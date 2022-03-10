import styled from 'styled-components';

export const DateFields = styled.div`
  display: flex;
  gap: 12px;
`;

export const FreeWarning = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: var(--warning);
  padding: 16px;
  margin: 12px 0;
  border-radius: 5px;

  & > svg {
    font-size: 3rem;
  }
`;
