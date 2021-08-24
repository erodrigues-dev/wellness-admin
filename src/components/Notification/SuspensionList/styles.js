import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 64px;
  right: 4px;

  width: 100%;
  max-width: 320px;

  background: #fff;
  box-shadow: 1px 1px 4px #0004;
  border-radius: 4px;
  padding: 16px;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
  h1 {
    font-size: 1.2rem;
    margin: 0;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;

  button {
    background: transparent;
    font-size: 0.8rem;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const EmptyList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 32px;

  p {
    text-align: center;
  }
`;

export const Item = styled.div`
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  padding: 16px;
  gap: 16px;
  align-items: center;
  background: #fff;
  transition: background 300ms;
  border-radius: 4px;

  .avatar {
    align-self: flex-start;
    width: 36px;
    height: 36px;

    img {
      width: 100%;
    }
  }

  .content {
    flex: 1;

    h2 {
      font-size: 1rem;
      font-weight: 400;
      margin: 0;
    }

    p {
      font-size: 0.7rem;
      margin: 0;
    }
  }

  &:hover {
    background: #0001;
  }

  &:last-child {
    border-bottom: 0;
  }
`;

export const ReadStatus = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;

  flex: 16px 0 0;
  align-self: center;
  justify-content: center;

  cursor: pointer;

  background: ${({ read }) => (read ? 'var(--gray)' : 'var(--secondary)')};
`;

export const CloseButton = styled.div`
  padding: 4px;
  border-radius: 50%;
  line-height: 22px;
  transition: background 300ms;
  cursor: pointer;

  &:hover {
    background: #0001;
  }
`;

export const LoadMore = styled.button`
  align-self: center;
  justify-self: center;

  text-align: center;
  text-transform: uppercase;
  font-size: 0.8rem;
  padding: 4px 8px;
  margin-top: 16px;
  margin-bottom: 16px;

  border-radius: 4px;
  background: var(--primary);
  color: #fff;
  outline: 0 !important;
  border: 0 !important;
`;
