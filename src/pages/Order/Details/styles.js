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

    span:not(.order) {
      width: 30%;
      font-weight: 600;
    }

    .order {
      display: flex;
      width: 70%;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
