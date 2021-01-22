import styled from 'styled-components';

export const Full = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

export const Content = styled.div`
  background-color: #fff;
  min-width: 600px;
  min-height: 300px;
  max-width: 900px;
  margin: auto;

  @media (max-width: 720px) {
    width: 100%;
    min-width: 350px;
    max-width: 600px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    min-width: 350px;
  }

  @media (min-width: 1160px) {
    max-width: 900px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 25px;
    height: 80px;

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
    height: 100%;
    display: flex;
    flex-direction: column;

    .modal-form {
      display: flex;
      flex-direction: column;
      height: 100%;

      & > h2 {
        font-size: 1.2rem;
        font-weight: bold;
      }

      .form-wrapper {
        padding: 25px;
      }

      .buttons {
        align-self: flex-end;
        padding: 20px;
      }
    }
  }
`;
