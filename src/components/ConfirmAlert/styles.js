import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  box-shadow: 0px 1px 5px 5px rgba(0, 0, 0, 0.1);
  padding: 25px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  .buttons {
    margin-top: 10px;
    align-self: flex-end;
  }

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
  }

  p {
    margin: 10px 0;
  }
`;
