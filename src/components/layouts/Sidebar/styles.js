import styled from 'styled-components';

import avatarBgImg from '~/assets/images/avatar.svg';

export const Container = styled.aside`
  width: 260px;
  background: linear-gradient(to bottom, #282828 0%, #111 100%);
  background-size: 150% 150%;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: calc(100% - 60px);
  left: ${(props) => (props.open ? '0' : '-260px')};
  top: 60px;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  transition: left 0.3s;
  z-index: 100;
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background: url(${avatarBgImg});
  background-size: cover;
  overflow: hidden;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarName = styled.p`
  color: #fff;
  font-size: 14px;
  margin: 0;
  display: flex;
  align-items: center;

  span {
    margin-right: 5px;
  }
`;
export const AvatarProfile = styled.p`
  color: #666;
  font-size: 10px;
  margin: 0;
`;

export const Menu = styled.ul`
  margin-top: 24px;

  .settings {
    margin-bottom: 0;
  }
`;
export const Item = styled.li`
  cursor: pointer;
  color: #fff;
  margin: ${(props) => (props.subgroup === 'settings' ? '0' : '16px')};
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

  a,
  div {
    padding: 8px 16px;
    text-decoration: none;
    color: #fff;
    flex: 1;
    ${(props) => props.subgroup === 'settings' && 'margin-left: 65px;'}
  }

  svg {
    margin-right: 24px;
    /* stroke-width: 1; */
    color: #fff;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 25px;
    transition: background 100ms;
    transform: rotate(0);
    transition: 100ms;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  .retract {
    transform: rotate(-180deg);
    transition: 100ms;
  }
`;

export const RetractButton = styled.button`
  transition: 100ms;
  margin-right: 5px;

  svg {
    margin: 0;
  }
`;

export const Subgroup = styled.div`
  overflow: hidden;
  height: ${(props) => (props.retract ? '0px' : '100%')};
  transition: all 50ms;

  .show {
    animation: openmenu 200ms ease forwards;
  }

  .retract {
    animation: retract 200ms ease forwards;
  }

  @keyframes retract {
    0% {
      height: initial;
    }
    50% {
      height: 50%;
      opacity: 0.5;
    }
    100% {
      height: 0px;
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  @keyframes openmenu {
    0% {
      transform: translateY(-100%);
      height: 0px;
      opacity: 0;
    }
    50% {
      height: 50%;
      opacity: 0.5;
    }
    100% {
      height: initial;
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
