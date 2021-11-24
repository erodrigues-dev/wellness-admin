import styled from 'styled-components';

import avatarBgImg from '~/assets/images/avatar.svg';

export const Container = styled.div`
  .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const AvatarContainer = styled.div`
  align-self: center;
  justify-self: center;

  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    background: url(${avatarBgImg});
    background-size: cover;
    overflow: hidden;
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
