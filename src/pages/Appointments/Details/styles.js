import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  ul {
    list-style: none;

    span {
      font-weight: 600;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
