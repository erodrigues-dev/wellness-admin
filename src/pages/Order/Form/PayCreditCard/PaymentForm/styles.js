import styled from 'styled-components';

export const Container = styled.div`
  #form-container {
    display: flex;
    margin: 10px 0;

    @media (max-width: 1050px) {
      flex-direction: column;
    }
  }

  .card-form {
    border-right: 1px solid #ccc;
    margin-right: 15px;

    @media (max-width: 1024px) {
      border: none;
      margin: 0;
    }
  }

  .confirmOrder {
    .button-request {
      display: flex;
      justify-content: flex-end;
    }
  }
`;
