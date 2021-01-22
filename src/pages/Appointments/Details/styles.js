import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  ul {
    list-style: none;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;

      &:not(:last-child) {
        border-bottom: 1px solid #ccc;
      }
    }

    .appointment {
      display: flex;
      width: 75%;
    }

    span:not(.appointment) {
      width: 25%;
      font-weight: 600;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
