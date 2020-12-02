import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background-color: #fff;
  min-width: 600px;
  min-height: 300px;
  max-height: 90%;
  max-width: 90%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas: 'header' 'main';

  @media (max-width: 1024px) {
    min-width: 300px;
  }

  @media (min-width: 1160px) {
    max-width: 900px;
  }

  header {
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 25px;

    h1 {
      font-size: 24px;
      margin: 0;
    }

    svg {
      font-size: 1.6rem;
      cursor: pointer;
    }
  }

  main {
    grid-area: main;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;

    .modal-form {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: auto;

      h2 {
        font-size: 1.2rem;
        font-weight: bold;
      }

      .form-wrapper {
        padding: 25px;
        overflow: auto;
      }

      .buttons {
        align-self: flex-end;
        padding: 20px;
      }
    }
  }
`;
