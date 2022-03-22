import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 16px;

  .wrapper {
    position: relative;
  }
`;

export const OpenListButton = styled.button`
  padding: 4px 8px;
  border-radius: 2px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 200ms;
  position: relative;

  & > .name {
    display: flex;
    align-items: center;
    gap: 8px;

    & > span {
      max-width: 172px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const Render = styled.div`
  background-color: white;
  width: 300px;
  overflow-y: auto;
  z-index: 2;
  padding: 12px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.2);
`;

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 8px;

  & > span {
    text-align: center;
    flex: 1;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    font-size: 1.2rem;
  }
`;

export const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
  margin-top: 16px;

  button {
    width: 100%;
  }
`;

export const Color = styled.div`
  height: 16px;
  min-width: 16px;
  width: 16px;
  border-radius: 50px;
  background-color: ${(props) => props.color};
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
