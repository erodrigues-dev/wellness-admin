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
  max-height: 90%;
  width: ${(props) => (props.width ? 'props.width' : '500px')};
  max-width: 90%;

  header {
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
`;
