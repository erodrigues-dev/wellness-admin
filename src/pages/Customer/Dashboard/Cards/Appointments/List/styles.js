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

    .items {
      display: flex;
      flex-direction: column;

      .name {
        font-weight: 600;

        svg {
          margin-right: 5px;
        }
      }

      .value {
        font-size: 0.9rem;
        display: flex;
        align-items: center;

        svg {
          margin-right: 5px;
        }
      }
    }
  }
`;

export const DateSpan = styled.span`
  color: #777;
  margin-right: 5px;
`;
