const { default: styled } = require('styled-components');

export const Container = styled.div`
  padding: 16px;

  h2 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
    margin-bottom: 1rem;
  }

  .text-container {
    max-height: 360px;
    overflow: auto;
    margin-bottom: 1rem;

    p {
      font-size: 0.9rem;
      line-height: 1rem;
    }
  }

  .agree {
    input {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }

  .info {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    p {
      white-space: nowrap;
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;
