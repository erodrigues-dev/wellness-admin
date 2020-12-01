import styled from 'styled-components';

export const Container = styled.div`
  #form-container {
    display: flex;
    margin: 10px 5px;

    @media (max-width: 800px) {
      flex-direction: column;
    }
  }

  .card-form {
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;

    @media (max-width: 1024px) {
      border: none;
      margin: 0;
    }
  }

  .confirmOrder {
    margin-left: 5px;

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
