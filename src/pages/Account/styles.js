import styled from 'styled-components';

import avatarBgImg from '~/assets/images/avatar.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
  }

  .input-wrapper {
    display: flex;

    .form-group {
      width: 100%;

      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }

  .buttons {
    align-self: flex-end;
    justify-self: flex-end;
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
