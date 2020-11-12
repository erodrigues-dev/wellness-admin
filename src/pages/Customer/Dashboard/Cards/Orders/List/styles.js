import styled from 'styled-components';

export const Container = styled.ul`
  li {
    list-style: none;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    margin-bottom: 5px;

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
