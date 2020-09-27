import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;

  form {
    display: flex;
    flex-direction: column;
  }

  .buttons {
    align-self: flex-end;
    justify-self: flex-end;
  }
`;
