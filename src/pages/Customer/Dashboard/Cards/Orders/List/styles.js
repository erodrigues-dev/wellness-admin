import styled from 'styled-components';

export const Container = styled.ul`
  li {
    list-style: none;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;

    & > button {
      background-color: transparent;
      border: 0;
      outline: 0;
      width: 100%;
      height: 100%;
      padding: 5px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .name {
      font-weight: 600;
      display: flex;
      align-items: center;

      svg {
        font-size: 2rem;
        margin-right: 5px;
      }
    }

    .value {
      font-size: 1rem;
      display: flex;
      align-items: center;

      svg {
        margin-right: 5px;
      }
    }
  }
`;
