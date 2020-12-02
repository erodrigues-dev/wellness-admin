import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 10px 15px;

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    li {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 5px 0;

      .price {
        font-weight: 600;
      }

      .tip {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-bottom: 25px;

        input {
          margin-left: 5px;
          max-width: 125px;
          border-bottom: 1px solid #294651;
          font-weight: bold;
          text-align: right;
          background-color: transparent;
        }
      }
    }

    .total {
      padding-top: 15px;
      border-top: 1px solid #ccc;
      font-size: 1.1rem;

      .price {
        color: #1c3038;
        font-size: 1.2rem;
      }
    }
  }
`;
