import styled from 'styled-components';

export const Container = styled.aside`
  width: 260px;
  background: linear-gradient(to bottom, #282828 0%, #111 100%);
  background-size: 150% 150%;
  display: flex;
  flex-direction: column;
  position: absolute;
  height: calc(100% - 60px);
  left: ${(props) => (props.open ? '0' : '-260px')};
  top: 60px;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  transition: left 0.3s;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  margin-top: 24px;
`;
export const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  & svg {
    stroke-width: 1;
  }
`;
export const AvatarName = styled.p`
  color: #fff;
  font-size: 14px;
  margin: 0;
`;
export const AvatarProfile = styled.p`
  color: #666;
  font-size: 10px;
  margin: 0;
`;

export const Menu = styled.ul`
  margin-top: 24px;
`;
export const Item = styled.li`
  cursor: pointer;
  color: #fff;
  margin: 8px 16px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  height: 50px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  border-radius: 4px;
  transition: background-color 0.2s;
  background-color: ${({ active }) =>
    active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  a {
    text-decoration: none;
    color: #fff;
  }

  svg {
    margin-right: 24px;
    stroke-width: 1;
    color: #fff;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
