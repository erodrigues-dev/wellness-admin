import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .counters {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .counter {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid black;
      border-radius: 100%;
      padding: 10px;

      p {
        margin: 0;
      }
    }
  }
`;
