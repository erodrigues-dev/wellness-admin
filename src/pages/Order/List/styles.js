import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 24px;

  td.actions {
    a + a {
      margin-left: 8px;
    }
  }

  .relation-name svg {
    margin-right: 5px;
  }

  td div {
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
      font-size: 1.4rem;
    }
  }
`;
