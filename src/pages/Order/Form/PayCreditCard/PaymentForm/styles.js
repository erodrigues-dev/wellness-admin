import styled from 'styled-components';

export const Container = styled.div`
  #form-container {
    display: flex;
    margin: 0;

    @media (max-width: 767px) {
      flex-direction: column;
    }
  }

  .card-form {
    padding: 10px 25px;
    margin-bottom: 10px;

    @media (max-width: 767px) {
      border: none;
      margin: 0;
    }
  }

  .confirmOrder {
    background-color: rgb(248, 248, 248);
    display: flex;
    width: 100%;
    align-items: center;

    @media (max-width: 767px) {
      padding: 10px 0;
    }

    & > div {
      width: 100%;
      text-align: center;
    }

    .button-request {
      margin-top: 15px;
      display: flex;
      justify-content: center;
    }
  }
`;

export const CardForm = styled.div`
  ${(props) => !props.formLoaded && 'max-height: 0.1px;'}
  ${(props) => !props.formLoaded && 'overflow: hidden;'}

  .square-form {
    ${(props) => props.hasCardSelected && 'max-height: 0.1px;'}
    ${(props) => props.hasCardSelected && 'overflow: hidden;'}
  }
`;
