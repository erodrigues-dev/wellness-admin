import styled from 'styled-components';

export const Container = styled.ul`
  list-style: none;

  li {
    color: black;

    span {
      color: #777;
      margin-left: 5px;
    }
  }

  .tip {
    .tip-wrapper {
      display: flex;
      align-items: center;

      input {
        margin-left: 10px;
        width: 125px;
        padding: 5px;
        border-bottom: 1px solid #ccc;
      }
    }

    .invalid-feedback {
      display: block;
    }
  }

  .subtotal {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #ccc;
  }
`;
