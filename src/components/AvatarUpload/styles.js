import { FiCamera } from 'react-icons/fi';

import styled from 'styled-components';

import avatarSvg from '~/assets/images/avatar.svg';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    display: none;
  }
`;

export const CameraIcon = styled(FiCamera)`
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  font-size: 40px;
  transform: translate(-50%, -50%);
  stroke-width: 1;
  opacity: 0;
  transition: opacity 0.3s;
`;

export const Preview = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: url(${avatarSvg});
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:hover ${CameraIcon} {
    opacity: 1;
  }
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
