import styled from 'styled-components';

export const Container = styled.ul`
  li {
    list-style: none;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background 100ms;
    display: flex;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    button {
      background-color: transparent;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 15px;

      @media screen and (max-width: 1130px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .items {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;

      h2 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .date {
        display: flex;

        @media screen and (max-width: 1130px) {
          align-items: flex-start;
          flex-direction: column;
        }

        span {
          font-size: 0.9rem;
          margin-top: 5px;

          :nth-child(1) {
            margin-right: 5px;
            padding-right: 5px;
            border-right: 1px solid #ccc;

            @media screen and (max-width: 1130px) {
              border: 0;
              padding: 0;
              margin: 0;
            }
          }
        }
      }
    }
  }
`;
