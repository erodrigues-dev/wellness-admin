import React from 'react';
import { Button } from 'react-bootstrap';

import styled from 'styled-components';

import avatarImageDefault from '~/assets/images/avatar.svg';
import { formatToList } from '~/helpers/date';

import Modal from '../../Modal';

export function NotificationDetail({ item, onClose }) {
  return (
    <Modal setClose={onClose} title="Notification">
      <Container>
        <div className="avatar">
          <img
            src={item.createdBy.imageUrl || avatarImageDefault}
            alt="avatar"
          />
        </div>

        <p className="created-info">
          {item.createdBy.name} {formatToList(item.createdAt)}
        </p>
        <h2>{item.title}</h2>

        <p>{item.text}</p>

        <div className="buttons">
          <Button onClick={onClose}>Close</Button>
        </div>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  padding: 16px 32px;

  .avatar {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;

    img {
      border-radius: 50%;
      width: 80px;
      height: 80px;
      object-fit: cover;
    }
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 32px;
  }

  p {
    margin-bottom: 32px;
  }

  p.created-info {
    font-size: 0.75rem;
    margin: 0;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;
